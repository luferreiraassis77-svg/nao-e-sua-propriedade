import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  Eye, 
  Zap, 
  Users,
  HeartHandshake,
  Shield,
  Baby,
  PhoneCall,
  ShieldAlert,
  Wrench,
  MessageSquare,
  Calendar,
  Clock
} from 'lucide-react';
import { SYSTEM_CATEGORIES, EMERGENCY_COMMANDS } from '../types';
const campanhaMulherImg = 'https://images.unsplash.com/photo-1590424744257-f50689b02bc3?auto=format&fit=crop&q=80&w=800';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section (Tela 1 — Abertura) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-900 via-indigo-950 to-zinc-950 text-white p-8 sm:p-12 md:p-16 text-center shadow-xl border border-blue-800/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Plataforma de Gestão Urbana Inteligente
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            RESOLVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">AÍ</span>
          </h1>

          <p className="text-xl sm:text-2xl font-light text-blue-100/90 max-w-xl mx-auto tracking-wide">
            Registre. Acompanhe. Resolva.
          </p>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Conecte você e a sua comunidade diretamente aos órgãos públicos responsáveis. Relate buracos, iluminação, vazamentos e riscos com apoio de Inteligência Artificial e acompanhe cada etapa em tempo real.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link
                to="/home"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
              >
                Acessar Minha Área <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all text-center"
                >
                  Entrar
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl border border-white/20 backdrop-blur-sm transition-all text-center"
                >
                  Criar Minha Conta
                </Link>
              </>
            )}
            <Link
              to="/social"
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5" /> Acolhimento & Vulnerabilidade
            </Link>

            <Link
              to="/map"
              className="w-full sm:w-auto text-zinc-300 hover:text-white text-sm font-medium px-4 py-3 transition-colors flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-blue-400" /> Ver Mapa da Cidade
            </Link>
          </div>
        </div>
      </section>

      {/* ALERTA SOS: SAÚDE MENTAL, DEPRESSÃO & PREVENÇÃO AO SUICÍDIO (CVV 188 / SAMU 192) */}
      <section className="bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-zinc-900/10 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-2xl shadow-md">
              💛
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                  SOS Saúde Mental, Depressão & Prevenção ao Suicídio
                </h2>
                <span className="text-xs bg-red-600 text-white font-black px-2.5 py-0.5 rounded-full animate-pulse">
                  24 HORAS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700">
                Você não está sozinho. Acolhimento emocional gratuito, sigiloso e imediato pelo <strong>CVV 188</strong> e rede <strong>SUS / CAPS</strong>.
              </p>
            </div>
          </div>

          <Link
            to="/saude-mental"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-black text-amber-300 text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 self-start sm:self-auto border border-amber-400/40 hover:scale-105"
          >
            Abrir Central SOS 188 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Emergency Command Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:188"
            className="p-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-2xl font-black shadow-md hover:shadow-lg transition-all flex flex-col justify-between group hover:scale-102"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💛</span>
              <span className="text-xs bg-zinc-950 text-amber-300 font-black px-2 py-0.5 rounded-md">
                GRÁTIS 188
              </span>
            </div>
            <div className="font-black text-sm">Ligue 188 (CVV)</div>
            <div className="text-[11px] text-zinc-900 font-bold mt-1">Apoio emocional 24h anônimo</div>
          </a>

          <a
            href="tel:192"
            className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black shadow-md hover:shadow-lg transition-all flex flex-col justify-between group hover:scale-102"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🚑</span>
              <span className="text-xs bg-white text-red-700 font-black px-2 py-0.5 rounded-md">
                192
              </span>
            </div>
            <div className="font-black text-sm">SAMU 192</div>
            <div className="text-[11px] text-red-100 mt-1">Urgência & risco à vida</div>
          </a>

          <a
            href="https://cvv.org.br/chat/"
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-white hover:bg-amber-50 text-amber-950 rounded-2xl border border-amber-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💬</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                ONLINE
              </span>
            </div>
            <div className="font-bold text-sm">Chat CVV 24 Horas</div>
            <div className="text-[11px] text-zinc-500 mt-1">Conversar por mensagem de texto</div>
          </a>

          <Link
            to="/saude-mental"
            className="p-4 bg-zinc-900 hover:bg-black text-amber-300 rounded-2xl shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🧘</span>
              <span className="text-xs bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded-md">
                TÉCNICAS
              </span>
            </div>
            <div className="font-bold text-sm">Desarmar Crise & CAPS</div>
            <div className="text-[11px] text-zinc-400 mt-1">Exercício 4-7-8 e unidades SUS</div>
          </Link>
        </div>
      </section>

      {/* QUICK COMMANDS & SOCIAL PROTECTION (Animais, Idosos, Mulheres e Crianças em 1 Botão) */}
      <section className="bg-gradient-to-r from-emerald-50 via-purple-50 to-rose-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 flex items-center gap-2">
                Rede de Proteção Animal & Cuidado Social
                <span className="text-xs bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded-full">
                  1 Toque
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                Atendimento humanizado, socorro animal, canais 24h e apoio para idosos, jovens e vulnerabilidade.
              </p>
            </div>
          </div>

          <Link
            to="/social"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 self-start sm:self-auto"
          >
            Acessar Central Completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1-Click Command Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <a
            href="tel:190"
            className="p-4 bg-white hover:bg-emerald-700 text-emerald-950 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xs bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-black px-2 py-0.5 rounded-md">
                190
              </span>
            </div>
            <div className="font-bold text-sm">Proteção Animal</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-emerald-100 mt-1">Maus-tratos e resgate CCZ</div>
          </a>

          <a
            href="tel:100"
            className="p-4 bg-white hover:bg-purple-700 text-purple-950 hover:text-white rounded-2xl border border-purple-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">👵</span>
              <span className="text-xs bg-purple-100 group-hover:bg-white group-hover:text-purple-800 text-purple-900 font-black px-2 py-0.5 rounded-md">
                100
              </span>
            </div>
            <div className="font-bold text-sm">Direitos do Idoso</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-purple-100 mt-1">Estatuto do Idoso & CREAS</div>
          </a>

          <a
            href="tel:180"
            className="p-4 bg-white hover:bg-rose-600 text-rose-950 hover:text-white rounded-2xl border border-rose-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-xs bg-rose-100 group-hover:bg-white group-hover:text-rose-800 text-rose-800 font-black px-2 py-0.5 rounded-md">
                180
              </span>
            </div>
            <div className="font-bold text-sm">Mulher em Risco</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-rose-100 mt-1">Disque 180 24h sigiloso</div>
          </a>

          <a
            href="tel:100"
            className="p-4 bg-white hover:bg-amber-600 text-amber-950 hover:text-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🧒</span>
              <span className="text-xs bg-amber-100 group-hover:bg-white group-hover:text-amber-800 text-amber-900 font-black px-2 py-0.5 rounded-md">
                100
              </span>
            </div>
            <div className="font-bold text-sm">Jovens & Crianças</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-amber-100 mt-1">Conselho Tutelar & ECA</div>
          </a>

          <Link
            to={user ? "/report?category=Abordagem Social / População em Situação de Rua" : "/login?redirect=/report"}
            className="p-4 bg-white hover:bg-sky-600 text-sky-950 hover:text-white rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🤝</span>
              <span className="text-xs bg-sky-100 group-hover:bg-white group-hover:text-sky-800 text-sky-900 font-black px-2 py-0.5 rounded-md">
                SEAS
              </span>
            </div>
            <div className="font-bold text-sm">Abordagem de Rua</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-sky-100 mt-1">Albergamento e apoio no frio</div>
          </Link>

          <Link
            to={user ? "/report?category=Assistência Social e Alimentar (CRAS / CREAS)" : "/login?redirect=/report"}
            className="p-4 bg-white hover:bg-indigo-600 text-indigo-950 hover:text-white rounded-2xl border border-indigo-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🍲</span>
              <span className="text-xs bg-indigo-100 group-hover:bg-white group-hover:text-indigo-800 text-indigo-900 font-black px-2 py-0.5 rounded-md">
                CRAS
              </span>
            </div>
            <div className="font-bold text-sm">Cesta Básica</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-indigo-100 mt-1">CadÚnico & Alimentação</div>
          </Link>
        </div>
      </section>

      {/* MANIFESTO / CAMPANHA OFICIAL: COMBATE AO FEMINICÍDIO & LIGUE 180 */}
      <section className="bg-gradient-to-br from-purple-950 via-zinc-950 to-purple-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-purple-500/50 shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Poster Image Preview */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/40 max-w-[280px] group">
              <img
                src={campanhaMulherImg}
                alt="Campanha: Traição não justifica morte - Ligue 180"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2.5 right-2.5 bg-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Ligue 180
              </div>
            </div>
          </div>

          {/* Campaign Copy & Direct CTAs */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-400/30 uppercase tracking-wide">
              <span>💜</span> Campanha Permanente de Proteção à Mulher
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              TRAIÇÃO NÃO JUSTIFICA MORTE
            </h2>

            <p className="text-lg sm:text-xl text-purple-200 font-bold leading-snug">
              “Nenhuma mulher é propriedade de ninguém. Meu corpo, minha vida, minhas escolhas pertencem só a mim.”
            </p>

            <div className="bg-purple-900/50 border border-purple-500/40 rounded-2xl p-4 text-xs sm:text-sm text-purple-100 leading-relaxed">
              Quem mata por ciúme, por controle ou por vingança comete <strong>feminicídio</strong>. <strong>A culpa nunca é da vítima.</strong>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <a
                href="tel:180"
                className="px-5 py-3.5 bg-purple-500 hover:bg-purple-400 text-zinc-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" /> LIGAR 180 (DENUNCIE & PROTEJA)
              </a>
              <Link
                to="/social"
                className="px-5 py-3.5 bg-zinc-900 hover:bg-black text-purple-200 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-purple-400/40 transition-all"
              >
                <Shield className="w-4 h-4 text-purple-400" /> Rede de Apoio e Abrigo Sigiloso &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REPAROS NO BAIRRO & PROFISSIONAIS (Chaveiro, Eletricista, Encanador, Marido de Aluguel) */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
                Reparos no Bairro & Profissionais Verificados
                <span className="text-xs bg-amber-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                  1 Toque
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                Chaveiro 24h, eletricistas para pane elétrica, encanador de emergência e ajuda comunitária.
              </p>
            </div>
          </div>

          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 self-start sm:self-auto"
          >
            Acessar Rede de Profissionais <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1-Click Command Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/servicos"
            className="p-4 bg-white hover:bg-amber-600 text-zinc-900 hover:text-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔑</span>
              <span className="text-xs bg-amber-100 group-hover:bg-white group-hover:text-amber-800 text-amber-900 font-black px-2 py-0.5 rounded-md">
                24H
              </span>
            </div>
            <div className="font-bold text-sm">Chaveiro Urgente</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-amber-100 mt-1">Abertura de portas e autos</div>
          </Link>

          <Link
            to="/servicos"
            className="p-4 bg-white hover:bg-yellow-500 text-zinc-900 hover:text-white rounded-2xl border border-yellow-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xs bg-yellow-100 group-hover:bg-white group-hover:text-yellow-800 text-yellow-900 font-black px-2 py-0.5 rounded-md">
                SOS
              </span>
            </div>
            <div className="font-bold text-sm">Eletricista de Emergência</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-yellow-100 mt-1">Pane, disjuntor e chuveiro</div>
          </Link>

          <Link
            to="/servicos"
            className="p-4 bg-white hover:bg-sky-600 text-zinc-900 hover:text-white rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🚰</span>
              <span className="text-xs bg-sky-100 group-hover:bg-white group-hover:text-sky-800 text-sky-900 font-black px-2 py-0.5 rounded-md">
                SOS
              </span>
            </div>
            <div className="font-bold text-sm">Encanador & Esgoto</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-sky-100 mt-1">Caça vazamentos urgente</div>
          </Link>

          <Link
            to="/servicos"
            className="p-4 bg-white hover:bg-zinc-800 text-zinc-900 hover:text-white rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🛠️</span>
              <span className="text-xs bg-zinc-100 group-hover:bg-white group-hover:text-zinc-900 text-zinc-900 font-black px-2 py-0.5 rounded-md">
                GERAL
              </span>
            </div>
            <div className="font-bold text-sm">Marido de Aluguel</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-zinc-300 mt-1">Instalações e manutenção</div>
          </Link>

          <Link
            to="/servicos"
            className="p-4 bg-white hover:bg-emerald-600 text-zinc-900 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🚗</span>
              <span className="text-xs bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-black px-2 py-0.5 rounded-md">
                AUTO
              </span>
            </div>
            <div className="font-bold text-sm">Socorro Mecânico</div>
            <div className="text-[11px] text-zinc-500 group-hover:text-emerald-100 mt-1">Carga de bateria e guincho</div>
          </Link>
        </div>
      </section>

      {/* WHATSAPP 24H & INTEGRATED AGENDA AUTOMATION SECTION */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-zinc-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Atendimento Inteligente no WhatsApp 24h
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Tira Dúvidas, Remarca, Cancela e Envia Lembretes 24h
            </h2>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Tudo integrado à sua agenda e direto no seu WhatsApp. Nossa IA responde a população dia e noite, gerencia horários e avisa 24h e 2h antes de cada atendimento.
            </p>
          </div>

          <Link
            to="/whatsapp"
            className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-6 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Acessar WhatsApp & Agenda IA &rarr;
          </Link>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Link
            to="/whatsapp"
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-2xl mb-1">❓</div>
            <div className="font-bold text-sm text-white">Tira Dúvidas 24h</div>
            <div className="text-xs text-emerald-200">Respostas sobre serviços, documentos e órgãos</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-2xl mb-1">🔄</div>
            <div className="font-bold text-sm text-white">Remarcação Fácil</div>
            <div className="text-xs text-emerald-200">Mude data e hora direto pelo WhatsApp</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-2xl mb-1">❌</div>
            <div className="font-bold text-sm text-white">Cancelamento Ágil</div>
            <div className="text-xs text-emerald-200">Libera o horário na agenda na mesma hora</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-2xl mb-1">🔔</div>
            <div className="font-bold text-sm text-white">Lembretes 24h & 2h</div>
            <div className="text-xs text-emerald-200">Disparos preventivos com confirmação 1/2/3</div>
          </Link>
        </div>
      </section>

      {/* Quick Problem Categories Preview */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-900">O que você pode registrar?</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Selecione uma das categorias municipais para direcionar automaticamente ao órgão competente.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SYSTEM_CATEGORIES.map((cat) => {
            const isSocial = cat.isSocialProtection;
            return (
              <Link
                key={cat.id}
                to={user ? `/report?category=${encodeURIComponent(cat.name)}` : `/login?redirect=/report`}
                className={`p-5 rounded-2xl border shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group ${
                  isSocial 
                    ? 'bg-rose-50/50 border-rose-200/90 hover:border-rose-400 hover:bg-rose-50' 
                    : 'bg-white border-zinc-200/80 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl block group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  {isSocial && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                      Cuidado Social
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-sm transition-colors ${
                    isSocial ? 'text-rose-950 group-hover:text-rose-700' : 'text-zinc-900 group-hover:text-blue-600'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Highlights & Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Assistente com IA</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Escreva o problema com suas próprias palavras. O <strong>Assistente Resolve Aí</strong> analisa e sugere a categoria, o órgão responsável e a prioridade em segundos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Protocolo e Linha do Tempo</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Receba um número de protocolo oficial (ex: <code>RA-2026-0820-0045</code>) e acompanhe os 5 estágios de atendimento do registro à resolução completa.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Mapa Urbano Transparente</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Visualize os pontos da cidade no mapa interativo com pins coloridos para ocorrências urgentes (🔴), em análise (🟠) e solucionadas (🟢).
          </p>
        </div>
      </section>

      {/* Academic Architecture Banner */}
      <section className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Arquitetura de Engenharia de Software
            </span>
            <h3 className="text-xl font-bold">Tecnologia Integrada de Ponta a Ponta</h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              <strong>Google AI Studio</strong> (Desenvolvimento & IA) → <strong>GitHub</strong> (Versionamento) → <strong>Firebase</strong> (Banco de Dados Cloud Firestore & Autenticação) → <strong>Vercel</strong> (Deploy e Publicação Online).
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-blue-300">
              Firebase Firestore
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-indigo-300">
              Gemini AI
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-emerald-300">
              OpenStreetMap
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
