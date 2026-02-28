"use client";

import React from 'react';
import { Terminal, Download, Trash2, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AppLogs = () => {
  const logs = [
    { time: "2024-03-20 14:30:01", level: "INFO", msg: "Starting Nextcloud v28.0.1..." },
    { time: "2024-03-20 14:30:05", level: "INFO", msg: "PHP-FPM initialized successfully." },
    { time: "2024-03-20 14:30:08", level: "DEBUG", msg: "Connecting to PostgreSQL database..." },
    { time: "2024-03-20 14:30:12", level: "INFO", msg: "Database connection established." },
    { time: "2024-03-20 14:30:15", level: "WARN", msg: "Memory limit is low (512MB recommended)." },
    { time: "2024-03-20 14:31:00", level: "INFO", msg: "Web server listening on port 80." },
    { time: "2024-03-20 14:35:22", level: "INFO", msg: "Cron job 'cleanup' executed in 2.4s." },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900">Logs en temps réel</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-lg gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Actualiser
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg gap-2">
            <Download className="w-3.5 h-3.5" /> Exporter
          </Button>
        </div>
      </div>

      <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm overflow-hidden border border-slate-800 shadow-2xl">
        <div className="space-y-1.5">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 group">
              <span className="text-slate-500 shrink-0">{log.time}</span>
              <span className={log.level === 'WARN' ? 'text-amber-400' : log.level === 'DEBUG' ? 'text-indigo-400' : 'text-emerald-400'}>
                [{log.level}]
              </span>
              <span className="text-slate-300 group-hover:text-white transition-colors">{log.msg}</span>
            </div>
          ))}
          <div className="flex gap-4 animate-pulse">
            <span className="text-slate-500 shrink-0">2024-03-20 14:40:12</span>
            <span className="text-emerald-400">[INFO]</span>
            <span className="text-slate-300">Waiting for new events...</span>
            <span className="w-2 h-4 bg-indigo-500 inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogs;