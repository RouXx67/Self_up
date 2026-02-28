#!/usr/bin/env bash

# Logo
echo -e "
  ____       _  __ _   _         
 / ___|  ___| |/ _| | | |_ __    
 \___ \ / _ \ | |_| | | | '_ \   
  ___) |  __/ |  _| |_| | |_) |  
 |____/ \___|_|_|  \___/| .__/   
                        |_|      
"
echo "Bienvenue dans l'installateur Proxmox pour SelfUp !"

# Vérification Proxmox
if [ ! -d /etc/pve ]; then
    echo "❌ Erreur : Ce script doit être exécuté sur un hôte Proxmox VE."
    exit 1
fi

# Détection des stockages supportant les conteneurs (rootdir)
echo "Recherche des stockages compatibles..."
STORAGE_LIST=$(pvesm status -content rootdir | awk 'NR>1 {print $1}')

if [ -z "$STORAGE_LIST" ]; then
    echo "❌ Erreur : Aucun stockage compatible avec les conteneurs n'a été trouvé."
    exit 1
fi

# Paramètres par défaut
CTID=$(pvesh get /cluster/nextid)
PCT_NAME="selfup"
PCT_DISK="8"
PCT_RAM="1024"
PCT_CPU="1"

echo -e "\n--- Configuration du conteneur LXC ---"
read -p "ID du conteneur [$CTID]: " input_id
CTID=${input_id:-$CTID}

read -p "Nom d'hôte [$PCT_NAME]: " input_name
PCT_NAME=${input_name:-$PCT_NAME}

echo -e "\nStockages disponibles pour le disque :"
echo "$STORAGE_LIST"
# On essaie de deviner le meilleur (souvent local-lvm ou zfs)
DEFAULT_STORAGE=$(echo "$STORAGE_LIST" | grep -E "local-lvm|data|zfs" | head -n1)
DEFAULT_STORAGE=${DEFAULT_STORAGE:-$(echo "$STORAGE_LIST" | head -n1)}

read -p "Choisissez votre stockage [$DEFAULT_STORAGE]: " input_storage
PCT_STORAGE=${input_storage:-$DEFAULT_STORAGE}

# Téléchargement du template
echo -e "\n--- Préparation du template ---"
pveam update > /dev/null
TEMPLATE=$(pveam available -section system | grep debian-12 | head -n1 | awk '{print $2}')
echo "Utilisation du template : $TEMPLATE"
pveam download local $TEMPLATE || true

# Création du conteneur
echo -e "\n--- Création du conteneur LXC $CTID ---"
if pct create $CTID local:vztmpl/$TEMPLATE \
    --hostname $PCT_NAME \
    --cores $PCT_CPU \
    --memory $PCT_RAM \
    --net0 name=eth0,bridge=vmbr0,ip=dhcp \
    --rootfs $PCT_STORAGE:$PCT_DISK \
    --onboot 1 \
    --unprivileged 1 \
    --features nesting=1; then

    echo "✅ Conteneur créé avec succès."
    echo "Démarrage..."
    pct start $CTID
    sleep 5

    echo "Installation de SelfUp (Node.js, Git, etc.)..."
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

    echo "Configuration du service de démarrage..."
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
    echo -e "\n🎉 Installation terminée avec succès !"
    echo "-------------------------------------------------------"
    echo "Accédez à l'interface : http://$IP:3000"
    echo "-------------------------------------------------------"
else
    echo -e "\n❌ ÉCHEC : Le stockage '$PCT_STORAGE' a refusé la création."
    echo "Vérifiez vos stockages dans l'interface Proxmox (Datacenter > Storage)."
    exit 1
fi