import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Baby, 
  Shield, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Utensils, 
  Home as HomeIcon, 
  Users, 
  Heart, 
  Flame, 
  Navigation,
  ArrowRight,
  LifeBuoy,
  FileText,
  Lock,
  Building2
} from 'lucide-react';
import { EMERGENCY_COMMANDS } from '../types';
import campanhaMulherImg from '../assets/images/campanha_feminicidio_180_1787223865455.jpg';

export default function SocialProtection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'todos' | 'saude-mental' | 'animal' | 'idoso' | 'mulher' | 'infancia' | 'rua' | 'cras'>('todos');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState<string | null>(null);

  // Quick Panic Exit for Women's Safety
  const handlePanicExit = () => {
    window.location.href = 'https://www.google.com';
  };

  // Instant GPS dispatch for Social Approach (SEAS)
  const handleInstantSEAS = () => {
    if (!navigator.geolocation) {
      navigate('/report?category=Abordagem Social / População em Situação de Rua');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        setGpsSuccess(`GPS fixado: Lat ${pos.coords.latitude.toFixed(4)}, Long ${pos.coords.longitude.toFixed(4)}`);
        setTimeout(() => {
          navigate(`/report?category=Abordagem Social / População em Situação de Rua`);
        }, 800);
      },
      () => {
        setGpsLoading(false);
        navigate(`/report?category=Abordagem Social / População em Situação de Rua`);
      }
    );
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner & Header */}
      <section className="bg-gradient-to-r from-emerald-800 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-rose-200 text-xs font-semibold backdrop-blur-md">
              <HeartHandshake className="w-4 h-4 text-rose-300" />
              Rede de Proteção Animal, Social & Cuidado Humanizado
            </div>

            <button
              onClick={handlePanicExit}
              title="Sair imediatamente para o Google (Segurança da Vítima)"
              className="px-3.5 py-1.5 bg-zinc-900/90 hover:bg-black text-white text-xs font-bold rounded-xl border border-rose-300/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              🚪 Sair Rápido da Página
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Cuidado com Animais, Idosos, Mulheres e Crianças
          </h1>

          <p className="text-rose-100/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Acesso direto e instantâneo a canais de acolhimento, proteção aos animais, idosos, jovens e famílias vulneráveis. <strong>Todos os comandos públicos a 1 clique no botão.</strong>
          </p>

          {/* Direct Emergency Call Bar */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <Link
              to="/saude-mental"
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black px-4 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center gap-2 hover:scale-105"
            >
              <span className="text-sm">💛</span>
              SOS Suicídio & Saúde Mental (188)
            </Link>
            <a
              href="tel:190"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center gap-2"
            >
              <span className="text-sm">🐾</span>
              Disque Animal (190 / CCZ)
            </a>
            <a
              href="tel:100"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center gap-2"
            >
              <span className="text-sm">👵</span>
              Disque 100 (Idosos)
            </a>
            <a
              href="tel:180"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Ligue 180 (Mulher)
            </a>
            <a
              href="tel:100"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center gap-2"
            >
              <Baby className="w-4 h-4 text-zinc-950" />
              Disque 100 (Crianças/Jovens)
            </a>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-zinc-200 shadow-2xs">
        <button
          onClick={() => setActiveTab('todos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'todos' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          ✨ Todos os Cuidados & Comandos
        </button>
        <button
          onClick={() => setActiveTab('saude-mental')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'saude-mental' ? 'bg-amber-500 text-zinc-950 shadow-xs' : 'text-amber-900 hover:bg-amber-50'
          }`}
        >
          💛 Saúde Mental & Suicídio (188)
        </button>
        <button
          onClick={() => setActiveTab('animal')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'animal' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          🐾 Proteção & Bem-Estar Animal
        </button>
        <button
          onClick={() => setActiveTab('idoso')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'idoso' ? 'bg-purple-700 text-white shadow-xs' : 'text-purple-800 hover:bg-purple-50'
          }`}
        >
          👵 Proteção & Direitos do Idoso
        </button>
        <button
          onClick={() => setActiveTab('mulher')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'mulher' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-50'
          }`}
        >
          🛡️ Proteção à Mulher
        </button>
        <button
          onClick={() => setActiveTab('infancia')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'infancia' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-800 hover:bg-amber-50'
          }`}
        >
          🧒 Crianças e Adolescentes
        </button>
        <button
          onClick={() => setActiveTab('rua')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rua' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-800 hover:bg-sky-50'
          }`}
        >
          🤝 População de Rua / SEAS
        </button>
        <button
          onClick={() => setActiveTab('cras')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cras' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-800 hover:bg-indigo-50'
          }`}
        >
          🍲 CRAS / Alimentos & Benefícios
        </button>
      </section>

      {/* SECTION -1: SAÚDE MENTAL, DEPRESSÃO & PREVENÇÃO AO SUICÍDIO */}
      {(activeTab === 'todos' || activeTab === 'saude-mental') && (
        <section className="bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-zinc-900/5 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-300/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-2xl shadow-sm">
                💛
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-zinc-900">
                    Apoio Emocional, Depressão & Prevenção ao Suicídio
                  </h2>
                  <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full uppercase">
                    SOS 24h
                  </span>
                </div>
                <p className="text-xs text-zinc-600">
                  Acolhimento humanizado, gratuito e anônimo pelo CVV 188, CAPS municipal e equipe de urgência médica.
                </p>
              </div>
            </div>

            <Link
              to="/saude-mental"
              className="px-4 py-2 bg-zinc-950 hover:bg-black text-amber-300 text-xs font-black rounded-xl border border-amber-400/40 shadow-xs flex items-center gap-1.5 shrink-0"
            >
              Abrir Hub Completo de Saúde Mental &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: CVV 188 */}
            <div className="bg-white rounded-2xl p-5 border border-amber-300 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">💛</span>
                  <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    Ligue 188
                  </span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900">CVV - Apoio Emocional 24h</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Ligação gratuita de qualquer telefone para conversar com voluntários treinados em acolhimento sem julgamentos.
                </p>
              </div>
              <a
                href="tel:188"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 188 AGORA
              </a>
            </div>

            {/* Card 2: SAMU 192 */}
            <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">🚑</span>
                  <span className="text-[10px] font-black bg-red-100 text-red-900 px-2 py-0.5 rounded-full">
                    Emergência
                  </span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900">SAMU 192 (Urgência & Tentativa)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Socorro médico emergencial para tentativa em andamento, intoxicação ou crise psiquiátrica aguda.
                </p>
              </div>
              <a
                href="tel:192"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 192 (SAMU)
              </a>
            </div>

            {/* Card 3: Rede CAPS */}
            <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">🏥</span>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                    SUS • Porta Aberta
                  </span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900">Rede CAPS & Psicossocial</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Centros de Atenção Psicossocial (CAPS II, III 24h, CAPSi e AD). Sem agendamento prévio.
                </p>
              </div>
              <Link
                to="/saude-mental"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" /> VER UNIDADES CAPS
              </Link>
            </div>

            {/* Card 4: Solicitação Sigilosa */}
            <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">🤝</span>
                  <span className="text-[10px] font-black bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                    Visita Domiciliar
                  </span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900">Solicitar Acolhimento Municipal</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Notificação sigilosa para equipe de Saúde da Família e CAPS acolher você ou alguém em sofrimento.
                </p>
              </div>
              <Link
                to="/saude-mental"
                className="w-full bg-zinc-900 hover:bg-black text-amber-300 font-black py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> PREENCHER ALERTA
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 0: PROTEÇÃO E BEM-ESTAR ANIMAL */}
      {(activeTab === 'todos' || activeTab === 'animal') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
                🐾
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Proteção, Resgate & Bem-Estar Animal
                </h2>
                <p className="text-xs text-zinc-500">
                  Denúncias de maus-tratos (Lei Sansão), abandono, atropelamento, vacinação e castração pública gratuita.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                🐕 Lei Sansão (Nº 14.064)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🚨</span>
                <h3 className="font-bold text-sm text-zinc-900">Flagrante de Maus-Tratos (190 / Guarda)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Animal sendo espancado, sem água/comida, acorrentado ao sol ou em risco iminente de morte.
                </p>
              </div>
              <a
                href="tel:190"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 190 (POLÍCIA AMBIENTAL)
              </a>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🏥</span>
                <h3 className="font-bold text-sm text-zinc-900">Resgate & Centro de Zoonoses (CCZ)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Animal de rua atropelado, ferido, suspeita de zoonoses graves (raiva/leishmaniose) ou abandono em via pública.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção e Bem-Estar Animal')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> ACIONAR RESGATE ANIMAL
              </button>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">💉</span>
                <h3 className="font-bold text-sm text-zinc-900">Castração Gratuita & Vacinação</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Agendamento no Castramóvel público municipal e campanhas de vacinação antirrábica para cães e gatos.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção e Bem-Estar Animal')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> SOLICITAR CASTRAÇÃO / CCZ
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 0.5: PROTEÇÃO E DIREITOS DO IDOSO */}
      {(activeTab === 'todos' || activeTab === 'idoso') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-2xl">
                👵
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Proteção Integral & Direitos da Pessoa Idosa
                </h2>
                <p className="text-xs text-zinc-500">
                  Garantia do Estatuto do Idoso, combate à violência financeira/patrimonial, abandono e vagas em ILPI.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
              Estatuto do Idoso (Lei Nº 10.741)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📞</span>
                <h3 className="font-bold text-sm text-zinc-900">Disque 100 (Direitos do Idoso)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Denúncias de retenção de cartão de benefício, apropriação indevida de bens, maus-tratos psicológicos ou físicos.
                </p>
              </div>
              <a
                href="tel:100"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR DISQUE 100 (IDOSO)
              </a>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🛡️</span>
                <h3 className="font-bold text-sm text-zinc-900">CREAS / Delegacia do Idoso</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Acionamento do Centro de Referência Especializado de Assistência Social para suporte a idosos em risco severo.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção e Direitos do Idoso')}
                className="w-full bg-purple-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> REGISTRAR OCORRÊNCIA DO IDOSO
              </button>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🏡</span>
                <h3 className="font-bold text-sm text-zinc-900">Acolhimento em ILPI & Centro Dia</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Solicitação de vagas em Instituições de Longa Permanência municipais, Centro Dia do Idoso e cuidados diários.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção e Direitos do Idoso')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" /> SOLICITAR ACOLHIMENTO
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1: PROTEÇÃO À MULHER */}
      {(activeTab === 'todos' || activeTab === 'mulher') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-2xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Proteção e Acolhimento Integral à Mulher
                </h2>
                <p className="text-xs text-zinc-500">
                  Canais de socorro, apoio psicológico, orientação jurídica e abrigo sigiloso.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                🔒 Atendimento Sigiloso
              </span>
            </div>
          </div>

          {/* Campaign Poster & Message Banner */}
          <div className="bg-gradient-to-br from-purple-950 via-zinc-950 to-purple-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-purple-500/50 shadow-lg overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Poster Image */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-400/30 max-w-[280px] group">
                  <img
                    src={campanhaMulherImg}
                    alt="Campanha: Traição não justifica morte - Ligue 180"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-purple-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    Campanha Oficial
                  </div>
                </div>
              </div>

              {/* Campaign Manifesto & Action Directives */}
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-400/30 uppercase tracking-wide">
                  <span>💜</span> Combate ao Feminicídio & Violência de Gênero
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                    TRAIÇÃO NÃO JUSTIFICA MORTE
                  </h3>
                  <p className="text-base sm:text-lg text-purple-200 font-bold leading-snug">
                    “Nenhuma mulher é propriedade de ninguém. Meu corpo, minha vida, minhas escolhas pertencem só a mim.”
                  </p>
                </div>

                <div className="bg-purple-900/40 border border-purple-500/30 rounded-2xl p-4 text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                  Quem mata por ciúme, por controle ou por vingança comete <strong>feminicídio</strong>. <strong>A culpa nunca é da vítima.</strong>
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center">
                  <a
                    href="tel:180"
                    className="px-5 py-3 bg-purple-500 hover:bg-purple-400 text-zinc-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
                  >
                    <PhoneCall className="w-4 h-4" /> LIGUE 180 (CENTRAL DA MULHER)
                  </a>
                  <a
                    href="tel:190"
                    className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                  >
                    <PhoneCall className="w-4 h-4" /> POLÍCIA MILITAR 190
                  </a>
                  <button
                    onClick={() => navigate('/report?category=Proteção à Mulher e Acolhimento SOS')}
                    className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-purple-200 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-purple-400/30 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> PEDIR MEDIDA / ACOLHIMENTO
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Command Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📞</span>
                <h3 className="font-bold text-sm text-zinc-900">Central de Atendimento à Mulher</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Ligue 180 para denúncias de violência física, psicológica, sexual, patrimonial e moral. Gratuito e 24h.
                </p>
              </div>
              <a
                href="tel:180"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 180 AGORA
              </a>
            </div>

            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🚓</span>
                <h3 className="font-bold text-sm text-zinc-900">Patrulha Maria da Penha / Guarda</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Acione a ronda especializada da Guarda Municipal para fiscalização de medidas protetivas e emergência imediata.
                </p>
              </div>
              <a
                href="tel:153"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 153 (GUARDA)
              </a>
            </div>

            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📝</span>
                <h3 className="font-bold text-sm text-zinc-900">Registrar Solicitação de Acolhimento</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Cadastre uma solicitação direta para a Secretaria da Mulher e receba contato de assistente social ou psicóloga.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção à Mulher e Acolhimento SOS')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" /> REGISTRAR NO SISTEMA
              </button>
            </div>
          </div>

          <div className="bg-rose-100/40 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-3">
            <Lock className="w-4 h-4 shrink-0 text-rose-700 mt-0.5" />
            <p>
              <strong>Garantia de Sigilo e Segurança:</strong> Suas informações são protegidas pela Lei Geral de Proteção de Dados e encaminhadas com exclusividade para equipes técnicas de assistência social e segurança da mulher.
            </p>
          </div>
        </section>
      )}

      {/* SECTION 2: PROTEÇÃO À CRIANÇA E ADOLESCENTE */}
      {(activeTab === 'todos' || activeTab === 'infancia') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl">
                🧒
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Proteção à Criança e Adolescente
                </h2>
                <p className="text-xs text-zinc-500">
                  Combate ao trabalho infantil, maus-tratos, abandono de incapaz e defesa dos direitos do ECA.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              Estatuto da Criança e Adolescente (ECA)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📞</span>
                <h3 className="font-bold text-sm text-zinc-900">Disque 100 (Direitos Humanos)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Canal nacional para denúncias de abuso, negligência, violência doméstica contra crianças e exploração de menores.
                </p>
              </div>
              <a
                href="tel:100"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR DISQUE 100
              </a>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🏛️</span>
                <h3 className="font-bold text-sm text-zinc-900">Conselho Tutelar Municipal</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Órgão permanente e autônomo encarregado pela sociedade de zelar pelo cumprimento dos direitos da criança e adolescente.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Proteção à Criança e Adolescente')}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> ACIONAR CONSELHO TUTELAR
              </button>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🎒</span>
                <h3 className="font-bold text-sm text-zinc-900">Vaga em Creche & Apoio Escolar</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Solicitação de apoio socioeducativo para famílias em vulnerabilidade extrema, falta de vaga em creche ou evasão escolar.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Assistência Social e Alimentar (CRAS / CREAS)')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" /> SOLICITAR SUPORTE
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: POPULAÇÃO EM SITUAÇÃO DE RUA E RESGATE */}
      {(activeTab === 'todos' || activeTab === 'rua') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-2xl">
                🤝
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Abordagem Social & População em Situação de Rua
                </h2>
                <p className="text-xs text-zinc-500">
                  Acione a equipe do SEAS, encaminhe para acolhimento institucional, albergues e resgate no frio/chuva.
                </p>
              </div>
            </div>

            {gpsSuccess && (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {gpsSuccess}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📍</span>
                <h3 className="font-bold text-sm text-zinc-900">Acionar SEAS com meu GPS</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Viu alguém desabrigado ou passando mal no frio/chuva? Envie a localização instantânea para a equipe de resgate social.
                </p>
              </div>
              <button
                onClick={handleInstantSEAS}
                disabled={gpsLoading}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
                {gpsLoading ? 'Obtendo GPS...' : 'ACIONAR RESGATE SOCIAL (GPS)'}
              </button>
            </div>

            <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🧣</span>
                <h3 className="font-bold text-sm text-zinc-900">Operação Inverno / Agasalho</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Solicitação de cobertores, agasalhos e sopa quente para pontos com pessoas em extrema vulnerabilidade climática.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Abordagem Social / População em Situação de Rua')}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" /> SOLICITAR COBERTORES
              </button>
            </div>

            <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🏠</span>
                <h3 className="font-bold text-sm text-zinc-900">Centro POP e Albergues</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Espaço público para higiene pessoal, guarda de pertences, alimentação e emissão de documentos civis básicos.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Abordagem Social / População em Situação de Rua')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <HomeIcon className="w-3.5 h-3.5" /> ENCAMINHAR PARA ALBERGUE
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: CRAS, CREAS & CESTA BÁSICA */}
      {(activeTab === 'todos' || activeTab === 'cras') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
                🍲
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Assistência Social, Alimentos & CRAS / CREAS
                </h2>
                <p className="text-xs text-zinc-500">
                  Cesta básica emergencial, Cadastro Único, aluguel social e auxílios de vulnerabilidade temporária.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Segurança Alimentar & SUAS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📦</span>
                <h3 className="font-bold text-sm text-zinc-900">Cesta Básica Emergencial</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Famílias em situação de vulnerabilidade nutricional ou desemprego severo podem solicitar auxílio de alimentos.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Assistência Social e Alimentar (CRAS / CREAS)')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5" /> PEDIR CESTA DE ALIMENTOS
              </button>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">📋</span>
                <h3 className="font-bold text-sm text-zinc-900">Agendamento no CRAS / CadÚnico</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Inscrição e atualização no Cadastro Único para Bolsa Família, BPC/LOAS, Tarifa Social de Energia e outros programas.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Assistência Social e Alimentar (CRAS / CREAS)')}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> AGENDAR NO CRAS
              </button>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-2xl mb-2 block">🦯</span>
                <h3 className="font-bold text-sm text-zinc-900">Acessibilidade, Idosos & PCD</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Solicitação de rampas, transporte adaptado municipal e denúncias de violação dos direitos da pessoa com deficiência e idosos.
                </p>
              </div>
              <button
                onClick={() => navigate('/report?category=Acessibilidade, Idosos e PCD')}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" /> ACIONAR ATENDIMENTO
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ALL COMMAND BUTTONS MATRIX (Todos Comandos no Botão) */}
      <section className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Painel de Comandos em 1 Botão
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              Todos os Comandos Públicos e Emergenciais Disponíveis
            </h2>
          </div>
          <span className="text-xs text-zinc-400">
            Clique no botão desejado para acionamento direto
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EMERGENCY_COMMANDS.map((cmd) => (
            <a
              key={cmd.id}
              href={`tel:${cmd.number}`}
              className="p-4 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 transition-all text-center flex flex-col items-center justify-between group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cmd.icon}
              </span>
              <div>
                <p className="text-base font-black text-white">{cmd.badge}</p>
                <p className="text-xs text-zinc-300 font-medium mt-0.5">{cmd.title}</p>
                <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">{cmd.category}</p>
              </div>
              <div className="mt-3 w-full py-1.5 bg-blue-600 group-hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg transition-colors">
                DISCAR AGORA
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
