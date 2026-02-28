import React from 'react';
import Layout from '../components/layout/DashboardLayout';
import { Terminal, Server, Box } from 'lucide-react';
import { InstallScript } from '../components/install/InstallScript';

export default function Install() {
  return (
    <Layout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Installation</h2>
          <p className="text-slate-500">Utilisez ces scripts pour installer SelfUp sur votre infrastructure.</p>
        </div>

        <div className="grid gap-8">
          <InstallScript 
            title="Installation Debian / Ubuntu"
            description="Script d'installation automatisé pour les systèmes basés sur Debian."
            icon={Server}
            script={`curl -sSL https://install.selfup.sh | bash`}
          />

          <InstallScript 
            title="Installation LXC (Proxmox)"
            description="Créez automatiquement un conteneur LXC optimisé pour SelfUp."
            icon={Box}
            script={`bash -c "$(wget -qLO - https://github.com/selfup/scripts/raw/main/lxc_install.sh)"`}
          />

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4">
            <div className="p-2 bg-amber-100 rounded-lg h-fit">
              <Terminal className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Note importante</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Assurez-vous d'exécuter ces scripts en tant qu'utilisateur avec des privilèges sudo. 
                Le script d'installation configurera automatiquement Docker, Node.js et les dépendances nécessaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}