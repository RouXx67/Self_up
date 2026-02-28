"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Terminal, Copy, Check, Server, Box, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { showSuccess } from '@/utils/toast';

interface InstallScriptProps {
  title: string;
  description: string;
  script: string;
  icon: LucideIcon;
}

function InstallScript({ title, description, script, icon: Icon }: InstallScriptProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    showSuccess("Script copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="relative group">
        <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-slate-800">
          <code>{script}</code>
        </pre>
        <Button 
          size="icon" 
          variant="secondary" 
          className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white border-0"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function Install() {
  return (
    <DashboardLayout>
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
            script="curl -sSL https://install.selfup.sh | bash"
          />

          <InstallScript 
            title="Installation LXC (Proxmox)"
            description="Créez automatiquement un conteneur LXC optimisé pour SelfUp."
            icon={Box}
            script="bash -c \"$(wget -qLO - https://github.com/selfup/scripts/raw/main/lxc_install.sh)\""
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
    </DashboardLayout>
  );
}