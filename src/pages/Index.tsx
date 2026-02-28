"use client";

import React from 'react';
import { Rocket, Layout, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 animate-bounce">
            <Rocket className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            Nouveau Projet
          </h1>
          <p className="text-xl text-slate-600 max-w-lg mx-auto">
            Ta toile est prête. Dis-moi ce que tu veux construire et nous allons le réaliser ensemble, étape par étape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-left">
            <Layout className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="font-bold text-slate-800">Structure Propre</h3>
            <p className="text-sm text-slate-500">Prêt pour React, Tailwind CSS et Shadcn/UI.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-left">
            <Sparkles className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="font-bold text-slate-800">Design Moderne</h3>
            <p className="text-sm text-slate-500">Composants élégants et réactifs par défaut.</p>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">
            En attente de tes instructions...
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;