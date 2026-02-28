"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Plus, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  RefreshCw,
  Github,
  Container,
  Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const apps = [
  { id: 1, name: "Nextcloud", current: "27.1.2", latest: "28.0.1", provider: "Docker Hub", status: "update", icon: Container },
  { id: 2, name: "Home Assistant", current: "2024.1.2", latest: "2024.1.2", provider: "GitHub", status: "up-to-date", icon: Github },
  { id: 3, name: "Vaultwarden", current: "1.30.1", latest: "1.30.2", provider: "Docker Hub", status: "update", icon: Container },
  { id: 4, name: "Plex", current: "1.32.8", latest: "1.32.8", provider: "Docker Hub", status: "up-to-date", icon: Container },
  { id: 5, name: "Uptime Kuma", current: "1.23.1", latest: "1.23.3", provider: "GitHub", status: "update", icon: Github },
  { id: 6, name: "Portainer", current: "2.19.4", latest: "2.19.4", provider: "Docker Hub", status: "up-to-date", icon: Container },
];

const Applications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Applications</h2>
            <p className="text-slate-500">Gérez et surveillez vos services auto-hébergés.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Filter className="w-4 h-4" />
              Filtrer
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une app
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Application</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Version Actuelle</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Dernière Version</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                        <app.icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="font-bold text-slate-900">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{app.provider}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">{app.current}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className={cn(
                      "text-xs font-mono px-2 py-1 rounded",
                      app.status === 'update' ? "bg-amber-50 text-amber-700 font-bold" : "bg-slate-100 text-slate-700"
                    )}>
                      {app.latest}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {app.status === 'update' ? (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 rounded-lg">Mise à jour</Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 rounded-lg">À jour</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="w-4 h-4" /> Voir la source
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-rose-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;