#!/usr/bin/env bash

# Affichage du logo
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
    echo "Erreur : Ce script doit être exécuté sur un hôte Proxmox VE."
    exit 1
fi

# Détection du stockage pour conteneurs
# On cherche un stockage qui supporte 'rootdir'
DEFAULT_STORAGE=$(pvesm status -content rootdir | awk 'NR>1 {print $1}' | head -n1)
if [ -z "$DEFAULT_STORAGE" ]; then
    DEFAULT_STORAGE="local-lvm"
fi

# Paramètres par défaut
CTID=$(pvesh get /cluster/nextid)
PCT_NAME="selfup"
PCT_DISK="8"
PCT_RAM="1024"
PCT_CPU="1"

echo "--- Configuration du conteneur LXC ---"
read -p "ID du conteneur [$CTID]: " input_id
CTID=${input_id:-$CTID}

read -p "Nom d'hôte [$PCT_NAME]: " input_name
PCT_NAME=${input_name:-$PCT_NAME}

read -p "Stockage pour le disque [$DEFAULT_STORAGE]: " input_storage
PCT_STORAGE=${input_storage:-$DEFAULT_STORAGE}

# Téléchargement du template
echo "Vérification du template Debian 12..."
pveam update > /dev/null
TEMPLATE=$(pveam available -section system | grep debian-12 | head -n1 | awk '{print $2}')
# On télécharge toujours dans 'local' car c'est là que sont les templates par défaut
pveam download local $TEMPLATE || true

# Création du conteneur
echo "Création du conteneur LXC $CTID sur $PCT_STORAGE..."
if pct create $CTID local:vztmpl/$TEMPLATE \
    --hostname $PCT_NAME \
    --cores $PCT_CPU \
    --memory $PCT_RAM \
    --net0 name=eth0,bridge=vmbr0,ip=dhcp \
    --rootfs $PCT_STORAGE:$PCT_DISK \
    --onboot 1 \
    --unprivileged 1 \
    --features nesting=1; then

    echo "Démarrage du conteneur..."
    pct start $CTID
    sleep 5

    echo "Installation de SelfUp (cela peut prendre quelques minutes)..."
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
    echo -e "\n✅ Installation terminée !"
    echo "Accédez à SelfUp sur : http://$IP:3000"
else
    echo -e "\n❌ Erreur lors de la création du conteneur. Vérifiez le nom du stockage ($PCT_STORAGE)."
    exit 1
fi