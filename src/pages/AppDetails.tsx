"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ArrowLeft, 
  Container, 
  Activity, 
  Settings as SettingsIcon, 
  History as HistoryIcon,
  ExternalLink,
  RefreshCw,
  Shield,
  Cpu,
  HardDrive
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AppLogs from '@/components/apps/AppLogs';
import StatCard from '@/components/dashboard/StatCard';

const AppDetails = () => {
  const { id } = useParams();
  
  // Simulation de données
  const app = {
    name: "Nextcloud",
    version: "27.1.2",
    latest: "28.0.1",
    status: "update",
    uptime: "12 jours, 4h",
    cpu: "1.2%",
    ram: "452 MB",
    storage: "12.4 GB",
    provider: "Docker Hub",
    image: "linuxserver/nextcloud:latest"
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link to="/apps">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-bold text-slate-900">{app.name}</h2>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 rounded-lg">Mise à jour disponible</Badge>
            </div>
            <p className="text-slate-500 flex items-center gap-2">
              <Container className="w-4 h-4" /> {app.image}
            </p>
          </div>
          <div className="ml-auto flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <ExternalLink className="w-4 h-4" /> Ouvrir l'app
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 shadow-lg shadow-indigo-100">
              <RefreshCw className="w-4 h-4" /> Mettre à jour vers {app.latest}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Utilisation CPU" value={app.cpu} icon={Cpu} color="indigo" />
          <StatCard title="Mémoire RAM" value={app.ram} icon={Activity} color="emerald" />
          <StatCard title="Stockage" value={app.storage} icon={HardDrive} color="amber" />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl border border-slate-100 shadow-sm h-auto">
            <TabsTrigger value="overview" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="logs" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">Logs</TabsTrigger>
            <TabsTrigger value="config" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Informations Système</h3>
                <div className="space-y-4">
                  {[
                    { label: "Version actuelle", value: app.version, mono: true },
                    { label: "Dernière version", value: app.latest, mono: true, highlight: true },
                    { label: "Uptime", value: app.uptime },
                    { label: "Provider", value: app.provider },
                    { label: "Dernière vérification", value: "Il y a 12 minutes" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                      <span className="text-slate-500 font-medium">{item.label}</span>
                      <span className={item.mono ? "font-mono text-sm bg-slate-50 px-2 py-1 rounded" : "font-semibold text-slate-900"}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Sécurité & Santé</h3>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg h-fit">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">Certificat SSL Valide</h4>
                    <p className="text-sm text-emerald-700">Expire dans 45 jours (Let's Encrypt).</p>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg h-fit">
                    <Activity className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">Healthcheck OK</h4>
                    <p className="text-sm text-indigo-700">L'application répond correctement sur le port 80.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <AppLogs />
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 italic">Les options de configuration spécifiques à l'image Docker seront affichées ici.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AppDetails;