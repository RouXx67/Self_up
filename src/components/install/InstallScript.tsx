"use client";

import React from 'react';
import { Copy, Check, type LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { showSuccess } from '@/utils/toast';

interface InstallScriptProps {
  title: string;
  description: string;
  script: string;
  icon: LucideIcon;
}

export const InstallScript = ({ title, description, script, icon: Icon }: InstallScriptProps) => {
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
};