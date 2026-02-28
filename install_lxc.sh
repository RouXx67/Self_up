#!/usr/bin/env bash

# VERSION DU SCRIPT
SCRIPT_VERSION="1.2"

echo -e "
  ____       _  __ _   _         
 / ___|  ___| |/ _| | | |_ __    
 \___ \ / _ \ | |_| | | | '_ \   
  ___) |  __/ |  _| |_| | |_) |  
 |____/ \___|_|_|  \___/| .__/   
                        |_|      
"
echo "Bienvenue dans l'installateur Proxmox pour SelfUp ! (Version $SCRIPT_VERSION)"

# Vérification Proxmox
if [ ! -d /etc/pve ]; then
    echo "❌ Erreur : Ce script doit être exécuté sur un hôte Proxmox VE."
    exit 1
fi

# Détection des stockages compatibles
echo "Recherche des stockages compatibles avec les conteneurs..."
STORAGE_LIST=$(pvesm status -content rootdir | awk 'NR>1 {print $1}')

if [ -z "$STORAGE_LIST" ]; then
    echo "❌ Erreur : Aucun stockage compatible trouvé. Vérifiez vos stockages Proxmox."
    exit 1
fi

# Paramètres
CTID=$(pvesh get /cluster/nextid)
PCT_NAME="selfup"

echo -e "\n--- Configuration du conteneur LXC ---"
read -p "ID du conteneur [$CTID]: " input_id
CTID=${input_id:-$CTID}

read -p "Nom d'hôte [$PCT_NAME]: " input_name
PCT_NAME=${input_name:-$PCT_NAME}

echo -e "\nStockages détectés sur votre système :"
echo "$STORAGE_LIST"
DEFAULT_STORAGE=$(echo "$STORAGE_LIST" | grep -E "local-lvm|data|zfs" | head -n1)
DEFAULT_STORAGE=${DEFAULT_STORAGE:-$(echo "$STORAGE_LIST" | head -n1)}

read -p "Choisissez votre stockage [$DEFAULT_STORAGE]: " input_storage
PCT_STORAGE=${input_storage:-$DEFAULT_STORAGE}

# Template
echo -e "\n--- Préparation du template Debian 12 ---"
pveam update > /dev/null
TEMPLATE=$(pveam available -section system | grep debian-12 | head -n1 | awk '{print $2}')
pveam download local $TEMPLATE || true

# Création
echo -e "\n--- Création du conteneur LXC $CTID sur $PCT_STORAGE ---"
if pct create $CTID local:vztmpl/$TEMPLATE \
    --hostname $PCT_NAME \
    --cores 1 \
    --memory 1024 \
    --net0 name=eth0,bridge=vmbr0,ip=dhcp \
    --rootfs $PCT_STORAGE:8 \
    --onboot 1 \
    --unprivileged 1 \
    --features nesting=1; then

    echo "✅ Conteneur créé. Démarrage..."
    pct start $CTID
    sleep 5

    echo "Installation de SelfUp..."
    pct exec $CTID -- bash -c "
        apt-get update && apt-get install -y curl git sudo
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
        git clone https://github.com/RouXx67/Self_up.git /opt/selfup
        cd /opt/selfup
        npm install
        npm run build
        npm install -g serve
    "

    echo "Configuration du service..."
    pct exec $CTID -- bash -c "
cat <<EOF > /etc/systemd/system/selfup.service
[Unit]
Description=SelfUp Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/selfup
ExecStart=/usr/bin/serve -s dist -l 3000
Restart=always

[Install]
WantedBy=multi-user.target
EOF
systemctl enable --now selfup
"

    IP=$(pct exec $CTID -- hostname -I | awk '{print $1}')
    echo -e "\n🎉 Installation terminée ! Accès : http://$IP:3000"
else
    echo -e "\n❌ ÉCHEC : Le stockage '$PCT_STORAGE' n'est pas valide."
    exit 1
fi