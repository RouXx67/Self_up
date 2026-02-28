#!/usr/bin/env bash

# Setup colors
YW=$(echo "\033[33m")
BL=$(echo "\033[36m")
RD=$(echo "\033[01;31m")
BGN=$(echo "\033[4;92m")
GN=$(echo "\033[1;92m")
DGN=$(echo "\033[32m")
CL=$(echo "\033[m")

echo -e "${BL}Installation des dépendances système...${CL}"
apt-get update
apt-get install -y curl git sudo mc

echo -e "${BL}Installation de Node.js 20...${CL}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo -e "${BL}Installation de Docker & Compose...${CL}"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

echo -e "${BL}Configuration de SelfUp...${CL}"
cd /opt
git clone https://github.com/RouXx67/Self_up.git
cd Self_up
npm install
npm run build
npm install -g serve

echo -e "${GN}SelfUp a été installé avec succès !${CL}"