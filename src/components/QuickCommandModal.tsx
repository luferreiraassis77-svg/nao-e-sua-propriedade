import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartHandshake, 
  Baby, 
  Shield, 
  Sparkles, 
  X, 
  Navigation, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Flame,
  LifeBuoy,
  Wrench,
  Key,
  Zap,
  Droplets,
  Car,
  Hammer,
  MessageSquare,
  Calendar,
  Clock,
  RefreshCw
} from 'lucide-react';
import { EMERGENCY_COMMANDS } from '../types';
const campanhaMulherImg = 'https://images.unsplash.com/photo-1590424744257-f50689b02bc3?auto=format&fit=crop&q=80&w=800'; // Placeholder

interface QuickCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickCommandModal({ isOpen, onClose }: QuickCommandModalProps) {
  const navigate = useNavigate();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyOrCall = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  // Quick Panic / Safety Exit (leaves the page immediately to a safe neutral site if in danger)
  const handleQuickPanicExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Panic Exit Button */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                Central de Comandos em 1 Botão & SOS
              </h2>
              <p className="text-xs text-rose-100 font-light">
                Linhas diretas de emergência, proteção a mulheres, crianças e apoio social.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickPanicExit}
              title="Sair imediatamente para o Google (Segurança)"
              className="px-3 py-1.5 bg-zinc-900/80 hover:bg-black text-[11px] font-bold text-white rounded-xl transition-all cursor-pointer border border-white/20 shadow-xs"
            >
              🚪 Sair Rápido (Google)
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* ============ TOP EMERGENCY: SAÚDE MENTAL & PREVENÇÃO AO SUICÍDIO 188 ============ */}
          <div className="bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-zinc-900/10 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-base shadow-sm">
                  💛
                </span>
                <div>
                  <div className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    ALERTA SOS: Prevenção ao Suicídio, Depressão & Crise
                  </div>
                  <div className="text-xs text-zinc-700 font-medium">Acolhimento imediato, anônimo e gratuito 24h</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate('/saude-mental');
                }}
                className="text-xs font-black text-amber-900 hover:text-black underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                Abrir Hub Completo &rarr;
              </button>
            </div>

            {/* 4 Action Command Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="tel:188"
                className="p-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-2xl font-black text-xs flex flex-col justify-between items-center text-center shadow-md transition-all group hover:scale-102"
              >
                <span className="text-2xl mb-1">💛</span>
                <span className="text-xs font-black">Ligue 188 (CVV)</span>
                <span className="text-[10px] text-zinc-900 font-bold">Grátis 24h • Celular/Fixo</span>
              </a>

              <a
                href="tel:192"
                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs flex flex-col justify-between items-center text-center shadow-md transition-all group hover:scale-102"
              >
                <span className="text-2xl mb-1">🚑</span>
                <span className="text-xs font-black">SAMU 192</span>
                <span className="text-[10px] text-red-100">Urgência & Tentativa</span>
              </a>

              <a
                href="https://cvv.org.br/chat/"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 rounded-2xl font-bold text-xs flex flex-col justify-between items-center text-center shadow-2xs transition-all group"
              >
                <span className="text-2xl mb-1">💬</span>
                <span className="text-xs font-bold">Chat CVV 24h</span>
                <span className="text-[10px] text-zinc-500">Conversar por texto</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  navigate('/saude-mental');
                }}
                className="p-3 bg-zinc-900 hover:bg-black text-amber-300 rounded-2xl font-bold text-xs flex flex-col justify-between items-center text-center shadow-md transition-all group cursor-pointer"
              >
                <span className="text-2xl mb-1">🧘</span>
                <span className="text-xs font-bold">Desarmar Crise</span>
                <span className="text-[10px] text-amber-200/80">Respiração 4-7-8 & CAPS</span>
              </button>
            </div>
          </div>

          {/* Priority Social Care Highlight */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-rose-900 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-rose-600" />
                Cuidado com a Mulher, Criança & Vulnerabilidade
              </div>
              <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full">
                Gratuito e Sigiloso
              </span>
            </div>

            {/* 1-Click Priority SOS Protection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <a
                href="tel:180"
                className="flex flex-col justify-between p-3 bg-white hover:bg-rose-600 text-rose-900 hover:text-white rounded-2xl border border-rose-200 shadow-2xs hover:shadow-md transition-all group font-semibold text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🛡️</span>
                  <span className="px-2 py-0.5 bg-rose-100 group-hover:bg-white group-hover:text-rose-700 text-rose-800 text-[10px] font-black rounded-md">
                    LIGUE 180
                  </span>
                </div>
                <div>
                  <div className="font-bold">Mulheres em Risco</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-rose-100">Central Sigilosa 24h</div>
                </div>
              </a>

              <a
                href="tel:190"
                className="flex flex-col justify-between p-3 bg-white hover:bg-red-600 text-red-950 hover:text-white rounded-2xl border border-red-200 shadow-2xs hover:shadow-md transition-all group font-semibold text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🚨</span>
                  <span className="px-2 py-0.5 bg-red-100 group-hover:bg-white group-hover:text-red-800 text-red-900 text-[10px] font-black rounded-md">
                    LIGUE 190
                  </span>
                </div>
                <div>
                  <div className="font-bold">Flagrante no Lar</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-red-100">Polícia Militar Imediata</div>
                </div>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=556196100180&text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20e%20orienta%C3%A7%C3%A3o%20sobre%20viol%C3%AAncia%20dom%C3%A9stica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-3 bg-white hover:bg-emerald-600 text-emerald-950 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all group font-semibold text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">💬</span>
                  <span className="px-2 py-0.5 bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 text-[10px] font-black rounded-md">
                    WHATSAPP 180
                  </span>
                </div>
                <div>
                  <div className="font-bold">Chat Silencioso</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-emerald-100">(61) 9610-0180</div>
                </div>
              </a>

              <button
                onClick={() => {
                  onClose();
                  navigate('/mitos-verdades');
                }}
                className="flex flex-col justify-between p-3 bg-white hover:bg-purple-700 text-purple-950 hover:text-white rounded-2xl border border-purple-200 shadow-2xs hover:shadow-md transition-all group font-semibold text-xs text-left cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">⚖️</span>
                  <span className="px-2 py-0.5 bg-purple-100 group-hover:bg-white group-hover:text-purple-800 text-purple-900 text-[10px] font-black rounded-md">
                    PROTEÇÃO
                  </span>
                </div>
                <div>
                  <div className="font-bold">Medida Protetiva</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-purple-100">Pedir em até 48h</div>
                </div>
              </button>
            </div>

            {/* 5 Botões de Comando por Tipo de Agressão da Lei Maria da Penha */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-rose-300/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-rose-950 uppercase tracking-wide flex items-center gap-1.5">
                  <span>⚖️</span> 5 Comandos Diretos da Lei Maria da Penha (Art. 7º):
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">Toque para agir</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center">
                <a
                  href="tel:190"
                  className="p-2 bg-red-100 hover:bg-red-600 text-red-900 hover:text-white rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5"
                >
                  <span>🥊 1. Física</span>
                  <span className="text-[9px] font-normal opacity-90">Ligar 190</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=556196100180&text=Quero%20denunciar%20amea%C3%A7as%20e%20viol%C3%AAncia%20psicol%C3%B3gica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-purple-100 hover:bg-[#9C27B0] text-purple-900 hover:text-white rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5"
                >
                  <span>🧠 2. Psicológica</span>
                  <span className="text-[9px] font-normal opacity-90">Prints/WhatsApp</span>
                </a>
                <a
                  href="tel:180"
                  className="p-2 bg-rose-100 hover:bg-rose-600 text-rose-900 hover:text-white rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5"
                >
                  <span>🛑 3. Sexual</span>
                  <span className="text-[9px] font-normal opacity-90">PEP SUS 72h</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/ajuda-emergencia');
                  }}
                  className="p-2 bg-amber-100 hover:bg-amber-600 text-amber-900 hover:text-white rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                >
                  <span>🪙 4. Patrimonial</span>
                  <span className="text-[9px] font-normal opacity-90">Bloqueio Bens</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/ajuda-emergencia');
                  }}
                  className="p-2 bg-blue-100 hover:bg-blue-600 text-blue-900 hover:text-white rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer col-span-2 sm:col-span-1"
                >
                  <span>💬 5. Moral</span>
                  <span className="text-[9px] font-normal opacity-90">Queixa-Crime</span>
                </button>
              </div>
            </div>

            {/* Campaign Highlight */}
            <div className="bg-gradient-to-r from-purple-950 via-zinc-950 to-purple-900 rounded-2xl p-3 sm:p-4 text-white border border-purple-400/40 flex flex-col sm:flex-row items-center gap-3.5 shadow-md">
              <div className="w-14 h-18 sm:w-16 sm:h-20 shrink-0 rounded-xl overflow-hidden shadow-md border border-purple-400/30">
                <img
                  src={campanhaMulherImg}
                  alt="Campanha: Traição não justifica morte - Ligue 180"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="text-[10px] font-black text-purple-300 uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1">
                  <span>💜</span> CAMPANHA: TRAIÇÃO NÃO JUSTIFICA MORTE
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  “Nenhuma mulher é propriedade de ninguém. A culpa nunca é da vítima.”
                </div>
                <div className="text-[11px] text-purple-200">
                  Ligue 180 • Denuncie • Proteja vidas
                </div>
              </div>
              <a
                href="tel:180"
                className="px-3.5 py-2 bg-purple-500 hover:bg-purple-400 text-zinc-950 font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 hover:scale-105 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 180
              </a>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  onClose();
                  navigate('/social');
                }}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-rose-600" />
                Ver Central Completa de Proteção Social & Cidadania &rarr;
              </button>
            </div>
          </div>

          {/* WhatsApp 24h & AI Scheduling Matrix */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Secretaria WhatsApp 24h & Agenda Automática
              </div>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                IA 24/7 Ativa
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/whatsapp');
                }}
                className="p-3 bg-white hover:bg-emerald-600 text-zinc-900 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">📅</span>
                  <span className="text-[9px] bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                    1-Toque
                  </span>
                </div>
                <div className="font-bold text-xs">Agendar Visita</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-emerald-100">Castração, CRAS, Obras</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/whatsapp');
                }}
                className="p-3 bg-white hover:bg-blue-600 text-zinc-900 hover:text-white rounded-2xl border border-blue-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🔄</span>
                  <span className="text-[9px] bg-blue-100 group-hover:bg-white group-hover:text-blue-800 text-blue-900 font-bold px-1.5 py-0.5 rounded">
                    Auto
                  </span>
                </div>
                <div className="font-bold text-xs">Remarcar Horário</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-blue-100">Mudar data pelo WhatsApp</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/whatsapp');
                }}
                className="p-3 bg-white hover:bg-red-600 text-zinc-900 hover:text-white rounded-2xl border border-red-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">❌</span>
                  <span className="text-[9px] bg-red-100 group-hover:bg-white group-hover:text-red-800 text-red-900 font-bold px-1.5 py-0.5 rounded">
                    Livre
                  </span>
                </div>
                <div className="font-bold text-xs">Cancelar Visita</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-red-100">Libera a agenda na hora</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/whatsapp');
                }}
                className="p-3 bg-white hover:bg-purple-600 text-zinc-900 hover:text-white rounded-2xl border border-purple-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🔔</span>
                  <span className="text-[9px] bg-purple-100 group-hover:bg-white group-hover:text-purple-800 text-purple-900 font-bold px-1.5 py-0.5 rounded">
                    24h/2h
                  </span>
                </div>
                <div className="font-bold text-xs">Lembretes & Agenda</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-purple-100">Confirmação automática</div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  onClose();
                  navigate('/whatsapp');
                }}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                Abrir Simulador WhatsApp 24h & Painel da Agenda &rarr;
              </button>
            </div>
          </div>

          {/* Neighborhood Repairs & Tradespeople SOS (Chaveiro, Eletricista, Encanador) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-amber-600" />
                Reparos Rápidos & Profissionais do Bairro (1 Toque)
              </div>
              <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">
                Atendimento 24h
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/servicos');
                }}
                className="p-3 bg-white hover:bg-amber-600 text-zinc-900 hover:text-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🔑</span>
                  <span className="text-[9px] bg-amber-100 group-hover:bg-white group-hover:text-amber-800 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                    24h
                  </span>
                </div>
                <div className="font-bold text-xs">Chaveiro Urgente</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-amber-100">Abertura de portas</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/servicos');
                }}
                className="p-3 bg-white hover:bg-yellow-500 text-zinc-900 hover:text-white rounded-2xl border border-yellow-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">⚡</span>
                  <span className="text-[9px] bg-yellow-100 group-hover:bg-white group-hover:text-yellow-800 text-yellow-900 font-bold px-1.5 py-0.5 rounded">
                    SOS
                  </span>
                </div>
                <div className="font-bold text-xs">Eletricista / Pane</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-yellow-100">Curto & disjuntor</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/servicos');
                }}
                className="p-3 bg-white hover:bg-sky-600 text-zinc-900 hover:text-white rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🚰</span>
                  <span className="text-[9px] bg-sky-100 group-hover:bg-white group-hover:text-sky-800 text-sky-900 font-bold px-1.5 py-0.5 rounded">
                    SOS
                  </span>
                </div>
                <div className="font-bold text-xs">Encanador / Cano</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-sky-100">Vazamento e esgoto</div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/servicos');
                }}
                className="p-3 bg-white hover:bg-emerald-600 text-zinc-900 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🚗</span>
                  <span className="text-[9px] bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                    Auto
                  </span>
                </div>
                <div className="font-bold text-xs">Socorro Mecânico</div>
                <div className="text-[10px] text-zinc-500 group-hover:text-emerald-100">Bateria & Guincho</div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  onClose();
                  navigate('/servicos');
                }}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                Ver Todos os Profissionais & Pedir Ajuda Comunitária &rarr;
              </button>
            </div>
          </div>

          {/* All Phone Direct Emergency Lines (1-Click) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                Comandos de Discagem Rápida Telefônica (24 Horas)
              </h3>
              {copiedNumber && (
                <span className="text-[11px] text-emerald-600 font-bold animate-pulse">
                  Número {copiedNumber} copiado!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EMERGENCY_COMMANDS.map((cmd) => (
                <a
                  key={cmd.id}
                  href={`tel:${cmd.number}`}
                  onClick={() => handleCopyOrCall(cmd.number)}
                  className="p-3 rounded-2xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-between group"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {cmd.icon}
                  </span>
                  <span className="text-sm font-black text-zinc-900">
                    {cmd.badge}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium line-clamp-1">
                    {cmd.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Issue Reporting in 1-Click */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Atalhos de Registro Rápido no Sistema Resolve Aí
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Proteção e Bem-Estar Animal');
                }}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-xl border border-emerald-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🐾</span>
                  <span className="text-xs font-bold">Maus-Tratos / Resgate Animal</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Proteção e Direitos do Idoso');
                }}
                className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-950 rounded-xl border border-purple-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">👵</span>
                  <span className="text-xs font-bold">Proteção & Direitos do Idoso</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-600" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Proteção à Mulher e Acolhimento SOS');
                }}
                className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-xl border border-rose-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <span className="text-xs font-bold">Acolhimento à Mulher</span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-500" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Proteção à Criança e Adolescente');
                }}
                className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-xl border border-amber-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧒</span>
                  <span className="text-xs font-bold">Infância, Juventude & Conselho</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Abordagem Social / População em Situação de Rua');
                }}
                className="p-3 bg-sky-50 hover:bg-sky-100 text-sky-950 rounded-xl border border-sky-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤝</span>
                  <span className="text-xs font-bold">Abordagem Social / Frio Extremo</span>
                </div>
                <ChevronRight className="w-4 h-4 text-sky-600" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/report?category=Assistência Social e Alimentar (CRAS / CREAS)');
                }}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 rounded-xl border border-indigo-200 text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍲</span>
                  <span className="text-xs font-bold">Cesta Básica / CRAS / CadÚnico</span>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
          <span>Serviço público integrado e sigiloso</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
