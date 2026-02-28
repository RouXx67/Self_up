"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  History, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Search,
  Plus,
  ShieldCheck,
  Download
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AddAppDialog from '@/components/apps/AddAppDialog';

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
  <Link to={to}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}>
      <Icon className={cn("w-5 h-5", active ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">SelfUp</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Tableau de bord" 
            to="/" 
            active={location.pathname === "/"} 
          />
          <SidebarItem 
            icon={Box} 
            label="Applications" 
            to="/apps" 
            active={location.pathname === "/apps"} 
          />
          <SidebarItem 
            icon={History} 
            label="Historique" 
            to="/history" 
            active={location.pathname === "/history"} 
          />
          <SidebarItem 
            icon={Download} 
            label="Installation" 
            to="/install" 
            active={location.pathname === "/install"} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Paramètres" 
            to="/settings" 
            active={location.pathname === "/settings"} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Statut Système</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Vérificateur actif</span>
            </div>
          </div>
          <MadeWithDyad />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <header className="flex items-center justify-between mb-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Rechercher une application..." 
              className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl border-slate-200 dark:border-slate-800 dark:text-white" 
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-800 dark:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </Button>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 px-6 shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <AddAppDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};

export default DashboardLayout;