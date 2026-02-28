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
            title="Installation Standard (Docker)"
            description="La méthode recommandée pour déployer SelfUp rapidement."
            icon={Server}
            script={`curl -sSL https://raw.githubusercontent.com/RouXx67/Self_up/main/install.sh | bash`}
          />

          <InstallScript 
            title="Installation LXC (Proxmox)"
            description="Script optimisé pour créer un environnement léger sur Proxmox."
            icon={Box}
            script={`bash -c "$(wget -qLO - https://raw.githubusercontent.com/RouXx67/Self_up/main/install_lxc.sh)"`}
          />

          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4">
            <div className="p-2 bg-indigo-100 rounded-lg h-fit">
              <Terminal className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-900 mb-1">Dépôt GitHub</h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Retrouvez l'intégralité du code source et contribuez au projet sur : <br />
                <a href="https://github.com/RouXx67/Self_up" target="_blank" rel="noreferrer" className="font-mono font-bold underline">github.com/RouXx67/Self_up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}