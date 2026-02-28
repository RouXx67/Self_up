"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { History as HistoryIcon, Search, Download, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const historyEvents = [
  { id: 1, date: "2024-03-20 14:30", app: "Nextcloud", event: "Mise à jour détectée", version: "28.0.1", type: "update" },
  { id: 2, date: "2024-03-20 12:00", app: "Système", event: "Vérification automatique terminée", version: "-", type: "info" },
  { id: 3, date: "2024-03-19 22:15", app: "Vaultwarden", event: "Mise à jour détectée", version: "1.30.2", type: "update" },
  { id: 4, date: "2024-03-19 18:00", app: "Système", event: "Vérification automatique terminée", version: "-", type: "info" },
  { id: 5, date: "2024-03-19 15:45", app: "Gotify", event: "Notification envoyée avec succès", version: "-", type: "success" },
  { id: 6, date: "2024-03-18 09:30", app: "Home Assistant", event: "Mise à jour détectée", version: "2024.1.2", type: "update" },
];

const History = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Historique</h2>
            <p className="text-slate-500">Suivez l'activité de vos services et les mises à jour passées.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
            <Button variant="outline" className="rounded-xl gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-slate-200">
              <Trash2 className="w-4 h-4" />
              Effacer
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/30">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Rechercher dans l'historique..." className="pl-10 bg-white border-slate-200 rounded-xl" />
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {historyEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="text-sm font-mono text-slate-400 w-32">
                    {event.date}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900">{event.app}</span>
                      <Badge variant="outline" className={cn(
                        "text-[10px] uppercase tracking-wider font-bold px-1.5 py-0 rounded-md",
                        event.type === 'update' ? "border-amber-200 text-amber-600 bg-amber-50" :
                        event.type === 'success' ? "border-emerald-200 text-emerald-600 bg-emerald-50" :
                        "border-slate-200 text-slate-500 bg-slate-50"
                      )}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{event.event}</p>
                  </div>
                </div>
                {event.version !== "-" && (
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase mb-1">Version</p>
                    <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">{event.version}</code>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50">
              Charger plus d'événements
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;