#!/usr/bin/env bash

# Affichage du logo et message de bienvenue
echo -e "
  ____       _  __ _   _         
 / ___|  ___| |/ _| | | |_ __    
 \___ \ / _ \ | |_| | | | '_ \   
  ___) |  __/ |  _| |_| | |_) |  
 |____/ \___|_|_|  \___/| .__/   
                        |_|      
"
echo "Bienvenue dans l'installateur Proxmox pour SelfUp !"

# Vérification si on est sur Proxmox
if [ ! -d /etc/pve ]; then
    echo "Erreur : Ce script doit être exécuté sur un hôte Proxmox VE."
    exit 1
fi

# Paramètres par défaut
CTID=$(pvesh get /cluster/nextid)
PCT_NAME="selfup"
PCT_DISK="8"
PCT_RAM="1024"
PCT_CPU="1"

echo "Configuration du conteneur LXC :"
read -p "ID du conteneur [$CTID]: " input_id
CTID=${input_id:-$CTID}

read -p "Nom d'hôte [$PCT_NAME]: " input_name
PCT_NAME=${input_name:-$PCT_NAME}

# Création du conteneur (Debian 12)
echo "Téléchargement du template Debian 12..."
pveam update
TEMPLATE=$(pveam available -section system | grep debian-12 | head -n1 | awk '{print $2}')
pveam download local $TEMPLATE

echo "Création du conteneur LXC $CTID ($PCT_NAME)..."
pct create $CTID local:vztmpl/$TEMPLATE \
    --hostname $PCT_NAME \
    --cores $PCT_CPU \
    --memory $PCT_RAM \
    --net0 name=eth0,bridge=vmbr0,ip=dhcp \
    --rootfs local:$PCT_DISK \
    --onboot 1 \
    --unprivileged 1 \
    --features nesting=1

# Démarrage du conteneur
pct start $CTID
sleep 5

# Installation à l'intérieur du conteneur
echo "Installation de SelfUp à l'intérieur du conteneur..."
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

# Création du service systemd pour le démarrage automatique
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
echo -e "\nInstallation terminée !"
echo "Accédez à SelfUp sur : http://$IP:3000"