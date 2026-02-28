import React from 'react';
import Layout from '../components/layout/DashboardLayout';
import { Terminal, Server, Box, ShieldCheck } from 'lucide-react';
import { InstallScript } from '../components/install/InstallScript';

export default function Install() {
  return (
    <Layout>
      <div className="max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Installation</h2>
            <p className="text-slate-500">Déployez SelfUp sur votre infrastructure en quelques secondes.</p>
          </div>
          <div className="hidden md:block">
            <ShieldCheck className="w-12 h-12 text-indigo-100" />
          </div>
        </div>

        <div className="grid gap-8">
          <InstallScript 
            title="Proxmox VE Helper (LXC)"
            description="Crée automatiquement un conteneur optimisé et installe SelfUp."
            icon={Box}
            script={`bash -c "$(curl -fsSL https://raw.githubusercontent.com/RouXx67/Self_up/main/install_lxc.sh)"`}
          />

          <InstallScript 
            title="Docker Compose"
            description="Déploiement rapide via Docker pour n'importe quel système Linux."
            icon={Server}
            script={`curl -sSL https://raw.githubusercontent.com/RouXx67/Self_up/main/docker-install.sh | bash`}
          />

          <div className="bg-slate-900 rounded-2xl p-8 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                Notes de déploiement
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  Le script LXC nécessite les privilèges root sur votre hôte Proxmox.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  Par défaut, l'application écoute sur le port 3000.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  Assurez-vous que votre pare-feu autorise le trafic sortant vers GitHub et Docker Hub.
                </li>
              </ul>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Box size={200} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}