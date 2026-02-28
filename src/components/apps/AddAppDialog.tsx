"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Container, Github, Globe, Plus } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface AddAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAppDialog = ({ open, onOpenChange }: AddAppDialogProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'ajout
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      showSuccess("Application ajoutée avec succès !");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Ajouter une application</DialogTitle>
          <DialogDescription>
            Configurez une nouvelle application pour surveiller ses mises à jour.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'application</Label>
            <Input id="name" placeholder="ex: Nextcloud, Home Assistant..." className="rounded-xl" required />
          </div>

          <div className="space-y-2">
            <Label>Provider (Source)</Label>
            <Select defaultValue="docker">
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Choisir une source" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="docker">
                  <div className="flex items-center gap-2">
                    <Container className="w-4 h-4 text-blue-500" />
                    <span>Docker Hub</span>
                  </div>
                </SelectItem>
                <SelectItem value="github">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-900" />
                    <span>GitHub Releases</span>
                  </div>
                </SelectItem>
                <SelectItem value="generic">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span>API Générique / Web</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repo">Répertoire / Image</Label>
            <Input id="repo" placeholder="ex: linuxserver/nextcloud ou home-assistant/core" className="rounded-xl" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-version">Version actuelle</Label>
              <Input id="current-version" placeholder="ex: 1.0.0" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag">Tag / Branche</Label>
              <Input id="tag" placeholder="ex: latest, stable" className="rounded-xl" />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Ajout..." : <><Plus className="w-4 h-4" /> Ajouter l'application</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppDialog;