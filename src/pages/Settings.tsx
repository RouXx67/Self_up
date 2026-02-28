"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, Clock, Shield, Save, Terminal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

const Settings = () => {
  const handleSave = () => {
    showSuccess("Paramètres enregistrés avec succès !");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Paramètres</h2>
          <p className="text-slate-500">Configurez le comportement de SelfUp et vos notifications.</p>
        </div>

        <div className="grid gap-8">
          {/* Notifications Section */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Bell className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Notifications Gotify</h3>
            </div>
            
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activer les notifications</Label>
                  <p className="text-sm text-slate-500">Recevoir des alertes push lors des mises à jour.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gotify-url">URL du serveur Gotify</Label>
                <Input id="gotify-url" placeholder="https://gotify.example.com" className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gotify-token">Token d'application</Label>
                <Input id="gotify-token" type="password" placeholder="Axxxxxxxxxxxxxx" className="rounded-xl" />
              </div>
            </div>
          </section>

          {/* Automation Section */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Automatisation</h3>
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label>Fréquence de vérification</Label>
                <Select defaultValue="6h">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choisir un intervalle" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1h">Toutes les heures</SelectItem>
                    <SelectItem value="6h">Toutes les 6 heures</SelectItem>
                    <SelectItem value="12h">Toutes les 12 heures</SelectItem>
                    <SelectItem value="24h">Une fois par jour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-500">Définit à quelle fréquence SelfUp vérifie les nouvelles versions.</p>
              </div>
            </div>
          </section>

          {/* System Section */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Terminal className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Système</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-mono text-slate-600">Version de SelfUp: v1.0.0-stable</p>
              </div>
              <Button variant="outline" className="rounded-xl w-full border-slate-200">
                Vérifier les mises à jour de SelfUp
              </Button>
            </div>
          </section>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-6 text-lg font-bold shadow-lg shadow-indigo-100 gap-2">
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;