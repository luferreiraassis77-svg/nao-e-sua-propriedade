import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Shield,
  Calculator,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Info,
  Lock
} from 'lucide-react';

interface ConfiguracoesProps {
  onTriggerCamouflage?: () => void;
}

export default function Configuracoes({ onTriggerCamouflage }: ConfiguracoesProps) {
  const [splashEnabled, setSplashEnabled] = useState(() => {
    return localStorage.getItem('splash_enabled') !== 'false';
  });
  const [cleared, setCleared] = useState(false);

  const toggleSplash = () => {
    const next = !splashEnabled;
    setSplashEnabled(next);
    localStorage.setItem('splash_enabled', String(next));
  };

  const handleClearHistory = () => {
    sessionStorage.clear();
    localStorage.removeItem('active_section');
    setCleared(true);
    setTimeout(() => setCleared(false), 2500);
  };

  return (
    <div className="space-y-8 pb-20 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-400/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 text-white flex items-center justify-center border border-purple-300/40">
              <Settings className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <span className="text-xs font-black text-purple-300 uppercase tracking-wider">
                SISTEMA & PRIVACIDADE
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Configurações do Aplicativo
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-medium">
            Gerencie recursos de camuflagem rápida, segurança de dados e preferências de exibição.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
        
        {/* Camouflage Mode Trigger */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>Modo Camuflagem Imediata</span>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Transforma a tela em uma calculadora funcional realista. Para voltar, basta digitar <span className="font-bold">180</span> e apertar <span className="font-bold">=</span>.
            </p>
          </div>

          {onTriggerCamouflage && (
            <button
              onClick={onTriggerCamouflage}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow-xs shrink-0 cursor-pointer"
            >
              TESTAR CAMUFLAGEM
            </button>
          )}
        </div>

        {/* Splash Screen Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-zinc-100">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-zinc-900">Tela de Abertura (Splash Screen 2s)</div>
            <div className="text-xs text-zinc-500">Exibir animação do manifesto com fundo preto ao iniciar</div>
          </div>

          <button
            onClick={toggleSplash}
            className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
              splashEnabled ? 'bg-purple-600 justify-end' : 'bg-zinc-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {/* Clear Temporary History */}
        <div className="flex items-center justify-between py-3 border-b border-zinc-100">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-zinc-900">Limpeza de Histórico da Sessão</div>
            <div className="text-xs text-zinc-500">Apagar dados em memória e rotas acessadas</div>
          </div>

          <button
            onClick={handleClearHistory}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {cleared ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Limpo!</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Limpar Rastros</span>
              </>
            )}
          </button>
        </div>

        {/* App Info & Rights */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-2">
          <div className="font-black uppercase text-zinc-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-purple-700" />
            <span>Sobre o Aplicativo Não é Sua Propriedade</span>
          </div>
          <p className="leading-relaxed">
            Plataforma cívica e educativa criada para desconstruir o machismo estrutural, combater o feminicídio e oferecer socorro rápido em situações de violência doméstica.
          </p>
          <div className="pt-2 text-[11px] text-zinc-400 font-mono">
            Versão 2.0 • Ligue 180 • Proteja Vidas
          </div>
        </div>

      </div>
    </div>
  );
}
