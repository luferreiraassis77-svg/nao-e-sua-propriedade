import React from 'react';
import { ShieldAlert, LogOut, Calculator } from 'lucide-react';

interface SafeModeBottomBarProps {
  onTriggerCamouflage?: () => void;
}

export default function SafeModeBottomBar({ onTriggerCamouflage }: SafeModeBottomBarProps) {
  const handleInstantExit = () => {
    // Clear session and redirect to safe neutral page (Google Search or Weather)
    try {
      sessionStorage.clear();
      localStorage.removeItem('active_section');
    } catch {
      // ignore
    }
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#B71C1C] text-white shadow-2xl border-t-2 border-red-500/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left Info & Warning */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-red-900 flex items-center justify-center shrink-0 border border-red-400">
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="truncate">
            <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span>MODO SEGURO</span>
              <span className="hidden sm:inline text-[10px] bg-red-950 text-red-200 px-1.5 py-0.2 rounded font-mono">
                SAÍDA RÁPIDA
              </span>
            </div>
            <div className="text-[10px] text-red-100 hidden sm:block truncate">
              Toque para fechar o app imediatamente e apagar rastros
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onTriggerCamouflage && (
            <button
              onClick={onTriggerCamouflage}
              className="px-3 py-1.5 bg-red-900/80 hover:bg-red-950 text-red-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-red-400/40 cursor-pointer"
              title="Disfarçar aplicativo como calculadora"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">Camuflar</span>
            </button>
          )}

          <button
            onClick={handleInstantExit}
            className="px-4 py-1.5 bg-white hover:bg-zinc-100 text-[#B71C1C] rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
            title="Sair imediatamente para o Google"
          >
            <LogOut className="w-3.5 h-3.5 text-[#B71C1C]" />
            <span>SAIR AGORA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
