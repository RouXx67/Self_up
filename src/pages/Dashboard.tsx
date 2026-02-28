"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Box, RefreshCw, AlertCircle, CheckCircle2, Github, Container } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Vue d'ensemble</h2>
          <p className="text-slate-500">Bienvenue sur SelfUp. Voici l'état actuel de vos services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Apps" 
            value="12" 
            icon={Box} 
            color="indigo" 
          />
          <StatCard 
            title="À jour" 
            value="9" 
            icon={CheckCircle2} 
            color="emerald" 
            trend="+2"
            trendUp={true}
          />
          <StatCard 
            title="Mises à jour" 
            value="3" 
            icon={RefreshCw} 
            color="amber" 
            trend="Action requise"
          />
          <StatCard 
            title="Erreurs" 
            value="0" 
            icon={AlertCircle} 
            color="rose" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Mises à jour récentes</h3>
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 font-semibold">Voir tout</Button>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {[
                { name: "Nextcloud", current: "27.1.2", latest: "28.0.1", provider: "Docker Hub", icon: Container },
                { name: "Home Assistant", current: "2023.12.1", latest: "2024.1.2", provider: "GitHub", icon: Github },
                { name: "Vaultwarden", current: "1.30.1", latest: "1.30.2", provider: "Docker Hub", icon: Container },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      <app.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{app.name}</h4>
                      <p className="text-sm text-slate-500">{app.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-400 uppercase">Version</p>
                      <p className="font-mono text-sm font-semibold text-slate-700">{app.current} → <span className="text-amber-600">{app.latest}</span></p>
                    </div>
                    <Button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-0 rounded-xl font-bold">
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Dernières activités</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              {[
                { time: "Il y a 5 min", msg: "Vérification automatique terminée", type: "info" },
                { time: "Il y a 2h", msg: "Nouvelle version détectée pour Nextcloud", type: "update" },
                { time: "Il y a 5h", msg: "Notification Gotify envoyée", type: "notif" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                    {i !== 2 && <div className="absolute top-4 left-1 w-px h-full bg-slate-100" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{log.msg}</p>
                    <p className="text-xs text-slate-400">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;