# 🚀 SelfUp

**SelfUp** est une plateforme moderne de surveillance et de gestion pour vos services auto-hébergés. Gardez un œil sur vos conteneurs Docker, recevez des notifications de mise à jour via Gotify et gérez votre infrastructure en toute simplicité.

## ✨ Caractéristiques

- 📊 **Tableau de bord intuitif** : Vue d'ensemble de l'état de vos services.
- 🔔 **Notifications Gotify** : Soyez alerté dès qu'une mise à jour est disponible.
- 🐳 **Support Docker & GitHub** : Surveillez les images Docker Hub ou les releases GitHub.
- 📜 **Logs en temps réel** : Accédez aux journaux de vos applications directement depuis l'interface.
- 🛠️ **Installation simplifiée** : Scripts optimisés pour Proxmox (LXC) et Docker.

## 🛠️ Installation

### Proxmox VE (LXC)
Pour créer automatiquement un conteneur et installer SelfUp sur Proxmox, lancez cette commande dans votre shell Proxmox :

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/RouXx67/Self_up/main/install_lxc.sh)"
```

### Docker Compose
Pour un déploiement rapide sur n'importe quel système Linux :

```bash
curl -sSL https://raw.githubusercontent.com/RouXx67/Self_up/main/docker-install.sh | bash
```

## 🚀 Développement

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/RouXx67/Self_up.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---
Fait avec ❤️ par [RouXx67](https://github.com/RouXx67)