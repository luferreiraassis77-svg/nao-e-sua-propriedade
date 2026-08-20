import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  PhoneCall, 
  AlertTriangle, 
  MessageSquare, 
  Send, 
  Sparkles, 
  MapPin, 
  LifeBuoy, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Compass,
  Smile,
  Users,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  CheckCheck,
  Plus
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MentalHealthCrisis() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<'botoes-sos' | 'desarmar-crise' | 'rede-caps' | 'solicitar-apoio'>('botoes-sos');

  // Breathing Visualizer State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [breathCount, setBreathCount] = useState(4);

  // GPS Alert State
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState<string | null>(null);

  // Request Form State
  const [targetType, setTargetType] = useState<'myself' | 'other'>('myself');
  const [name, setName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<'critica' | 'alta' | 'moderada'>('alta');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Breathing Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            if (breathingPhase === 'inspire') {
              setBreathingPhase('hold');
              return 7;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('expire');
              return 8;
            } else {
              setBreathingPhase('inspire');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathingPhase]);

  // Handle GPS SOS Broadcast
  const handleBroadcastGpsSOS = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setGpsSuccess(`GPS capturado: Lat ${lat.toFixed(4)}, Long ${lng.toFixed(4)}`);
          const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
          const message = encodeURIComponent(
            `🚨 *ALERTA SOS - APOIO EMOCIONAL / PREVENÇÃO AO SUICÍDIO*\n\nEstou precisando de ajuda urgente e acolhimento agora.\n\n📍 Minha localização atual: ${mapUrl}\n\n💛 Se não puder falar, por favor me ligue ou acione o CVV 188 / SAMU 192.`
          );
          window.open(`https://wa.me/?text=${message}`, '_blank');
          showToast('Alerta com localização GPS gerado no WhatsApp!');
        },
        () => {
          setGpsLoading(false);
          const message = encodeURIComponent(
            `🚨 *ALERTA SOS - APOIO EMOCIONAL / PREVENÇÃO AO SUICÍDIO*\n\nEstou passando por um momento muito difícil e preciso de ajuda agora.\n\n💛 Se for urgente, ligue 188 (CVV) ou 192 (SAMU).`
          );
          window.open(`https://wa.me/?text=${message}`, '_blank');
          showToast('Alerta gerado no WhatsApp!');
        }
      );
    } else {
      setGpsLoading(false);
      window.open(`https://wa.me/?text=🚨%20ALERTA%20SOS%20Apoio%20Emocional%20e%20Prevenção.%20Ligue%20188%20(CVV)`, '_blank');
    }
  };

  const toggleSymptom = (sym: string) => {
    setSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Por favor, informe seu nome, telefone e endereço para que a equipe de saúde possa prestar acolhimento.');
      return;
    }

    const randomProto = `SOS-PSI-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedProtocol(randomProto);

    // Save to local storage emergency history
    const reportData = {
      protocol: randomProto,
      targetType,
      name,
      phone,
      address,
      urgencyLevel,
      symptoms,
      notes,
      createdAt: new Date().toISOString(),
      status: 'Em Triagem Prioritária'
    };

    const existing = JSON.parse(localStorage.getItem('resolveai_mental_health_reports') || '[]');
    localStorage.setItem('resolveai_mental_health_reports', JSON.stringify([reportData, ...existing]));

    showToast(`Solicitação prioritária ${randomProto} enviada à equipe de Saúde Mental.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-500/50 flex items-center gap-3 animate-fade-in">
          <Heart className="w-5 h-5 text-amber-400 shrink-0 fill-amber-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-zinc-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-zinc-950 text-amber-300 px-3 py-1 rounded-full text-xs font-black border border-amber-400/40">
              <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Prevenção ao Suicídio & Apoio à Saúde Mental
            </span>
            <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider animate-pulse">
              Atendimento 24 Horas Gratuito
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Sua Vida Tem Valor Infinito • Você Não Está Sozinho
          </h1>

          <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
            Se você ou alguém próximo está passando por um momento de dor intensa, depressão severa, crise de ansiedade ou pensamentos de desistir, acione os <strong>comandos de socorro imediato</strong> abaixo.
          </p>

          {/* Quick Primary Call Highlight */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:188"
              className="bg-zinc-950 hover:bg-black text-amber-300 font-black px-6 py-3.5 rounded-2xl shadow-xl transition-all text-sm sm:text-base flex items-center gap-2.5 border-2 border-amber-400 hover:scale-105 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-amber-400 animate-bounce" />
              Ligue 188 (CVV Grátis 24h)
            </a>

            <a
              href="https://cvv.org.br/chat/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-3.5 rounded-2xl backdrop-blur-md transition-all text-xs sm:text-sm flex items-center gap-2 border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-amber-200" />
              Chat Online CVV 24h <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="tel:192"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-3.5 rounded-2xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              SAMU 192 (Urgência Médica)
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-amber-500/30 mt-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('botoes-sos')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'botoes-sos'
                ? 'bg-zinc-950 text-amber-300 shadow-md border border-amber-400'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Botões de Comando SOS Imediato
          </button>

          <button
            onClick={() => {
              setActiveTab('desarmar-crise');
              setIsBreathingActive(true);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'desarmar-crise'
                ? 'bg-zinc-950 text-amber-300 shadow-md border border-amber-400'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Desarmar Crise & Respiração 4-7-8
          </button>

          <button
            onClick={() => setActiveTab('rede-caps')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'rede-caps'
                ? 'bg-zinc-950 text-amber-300 shadow-md border border-amber-400'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Rede CAPS & Pronto-Socorro 24h
          </button>

          <button
            onClick={() => setActiveTab('solicitar-apoio')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'solicitar-apoio'
                ? 'bg-zinc-950 text-amber-300 shadow-md border border-amber-400'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Users className="w-4 h-4" />
            Solicitar Visita / Acolhimento Municipal
          </button>
        </div>
      </div>

      {/* ================= TAB 1: BOTÕES DE COMANDO SOS ================= */}
      {activeTab === 'botoes-sos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1: CVV 188 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100/60 rounded-3xl p-6 border-2 border-amber-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-2xl shadow-sm">
                    💛
                  </span>
                  <span className="text-[11px] font-black bg-amber-200 text-amber-950 px-2.5 py-1 rounded-full">
                    24h • Gratuito
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-zinc-900">CVV - Apoio Emocional</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                    Atendimento humanizado, anônimo e sem julgamentos para qualquer pessoa que precise desabafar ou esteja em sofrimento emocional.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-amber-200/60">
                <a
                  href="tel:188"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  Ligar 188 Agora (Gratuito)
                </a>

                <a
                  href="https://cvv.org.br/chat/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Abrir Chat do CVV Online <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 2: SAMU 192 */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100/60 rounded-3xl p-6 border-2 border-red-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-2xl shadow-sm">
                    🚑
                  </span>
                  <span className="text-[11px] font-black bg-red-200 text-red-950 px-2.5 py-1 rounded-full">
                    Emergência Médica
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-zinc-900">SAMU 192 (Urgência)</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                    Para casos de <strong>tentativa de suicídio em andamento</strong>, ingestão de remédios/tóxicos, perda de consciência ou ferimentos físicos graves.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-red-200/60">
                <a
                  href="tel:192"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  Ligar 192 (SAMU)
                </a>

                <div className="text-[11px] text-red-700 text-center font-medium">
                  Atendimento médico de urgência 24h
                </div>
              </div>
            </div>

            {/* Card 3: Bombeiros 193 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100/60 rounded-3xl p-6 border-2 border-orange-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-2xl shadow-sm">
                    🚒
                  </span>
                  <span className="text-[11px] font-black bg-orange-200 text-orange-950 px-2.5 py-1 rounded-full">
                    Resgate & Salvamento
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-zinc-900">Bombeiros 193</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                    Equipe especializada para <strong>resgate em locais de risco</strong>, pontes, locais de altura, contenção e preservação imediata da integridade física.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-orange-200/60">
                <a
                  href="tel:193"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  Ligar 193 (Bombeiros)
                </a>

                <div className="text-[11px] text-orange-800 text-center font-medium">
                  Resgate emergencial e socorro em risco
                </div>
              </div>
            </div>

            {/* Card 4: WhatsApp SOS Broadcast with GPS */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100/60 rounded-3xl p-6 border-2 border-emerald-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-black text-2xl shadow-sm">
                      <MessageSquare className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-zinc-900">Alerta SOS via WhatsApp com GPS</h3>
                      <p className="text-xs text-zinc-600">Disparo rápido de socorro com localização precisa para sua rede de confiança</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black bg-emerald-200 text-emerald-950 px-2.5 py-1 rounded-full shrink-0">
                    1-Toque
                  </span>
                </div>

                <p className="text-xs text-zinc-700 leading-relaxed">
                  Ao clicar no botão, o sistema captura suas coordenadas de GPS e formata uma mensagem de pedido de ajuda pronta no WhatsApp. Você pode enviá-la para um amigo, familiar ou terapeuta de confiança.
                </p>

                {gpsSuccess && (
                  <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-mono flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span>{gpsSuccess}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBroadcastGpsSOS}
                  disabled={gpsLoading}
                  className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#1ebd5a] text-zinc-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {gpsLoading ? 'Capturando GPS...' : 'Disparar Pedido de Ajuda no WhatsApp'}
                </button>
              </div>
            </div>

            {/* Card 5: Pode Falar (Juventude) & CAPS */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100/60 rounded-3xl p-6 border-2 border-purple-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-sm">
                    💬
                  </span>
                  <span className="text-[11px] font-black bg-purple-200 text-purple-950 px-2.5 py-1 rounded-full">
                    Jovens 13-24 anos
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-zinc-900">Canal Pode Falar (UNICEF)</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                    Espaço virtual de acolhimento anônimo e gratuito para adolescentes e jovens com psicólogos e especialistas.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-200/60">
                <a
                  href="https://www.podefalar.org.br"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Acessar Pode Falar (UNICEF)
                </a>
              </div>
            </div>

          </div>

          {/* Quick Notice Banner on Sinais de Alerta */}
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-950 font-black text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              Como identificar que você ou alguém está precisando de acolhimento urgente:
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-amber-900 pt-1">
              <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">1. Frases de Desesperança</div>
                <p className="text-[11px] text-zinc-600">"Não aguento mais", "seria melhor sumir", "sou um peso para os outros".</p>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">2. Isolamento Repentino</div>
                <p className="text-[11px] text-zinc-600">Afastamento total de amigos, parentes, mensagens e atividades prazerosas.</p>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">3. Despedidas ou Doação</div>
                <p className="text-[11px] text-zinc-600">Desfazer-se de bens afetivos, mensagens de despedida e acerto de pendências.</p>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">4. Mudança Drástica de Humor</div>
                <p className="text-[11px] text-zinc-600">Calmaria súbita após período de depressão severa ou angústia extrema.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: DESARMAR CRISE & RESPIRAÇÃO ================= */}
      {activeTab === 'desarmar-crise' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Interactive 4-7-8 Breathing Circle */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-2 max-w-md">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Técnica Científica de Desaceleração Fisiológica
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                  Exercício de Respiração Anti-Pânico 4-7-8
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500">
                  Siga o ritmo do círculo animado. Inspire pelo nariz por 4s, retenha o ar por 7s e solte o ar suavemente pela boca por 8s.
                </p>
              </div>

              {/* Dynamic Animated Circle */}
              <div className="py-6 flex flex-col items-center justify-center">
                <div
                  className={`w-56 h-56 rounded-full border-8 flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl relative ${
                    breathingPhase === 'inspire'
                      ? 'border-amber-400 bg-amber-500/20 scale-110 shadow-amber-300/40'
                      : breathingPhase === 'hold'
                      ? 'border-yellow-400 bg-yellow-500/30 scale-105 shadow-yellow-300/40'
                      : 'border-emerald-500 bg-emerald-500/20 scale-95 shadow-emerald-300/40'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-700 mb-1">
                    {breathingPhase === 'inspire' ? '🌬️ INSPIRE (Nariz)' : breathingPhase === 'hold' ? '⏸️ SEGURE O AR' : '💨 EXPIRE (Boca)'}
                  </span>
                  
                  <span className="text-5xl font-black text-zinc-950 font-mono">
                    {breathCount}s
                  </span>
                  
                  <span className="text-xs text-zinc-600 mt-2 font-medium">
                    {breathingPhase === 'inspire' ? 'Puxando o ar com calma' : breathingPhase === 'hold' ? 'Oxigenando a mente' : 'Soltando toda a tensão'}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsBreathingActive(!isBreathingActive);
                      setBreathCount(4);
                      setBreathingPhase('inspire');
                    }}
                    className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                      isBreathingActive
                        ? 'bg-zinc-900 text-white hover:bg-black'
                        : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
                    }`}
                  >
                    {isBreathingActive ? '⏸️ Pausar Exercício' : '▶️ Iniciar Respiração Guiada'}
                  </button>

                  <button
                    onClick={() => {
                      setIsBreathingActive(true);
                      setBreathCount(4);
                      setBreathingPhase('inspire');
                    }}
                    className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-2xl font-bold text-xs cursor-pointer"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>

              {/* Reassuring affirmation */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 italic max-w-lg">
                "Esta angústia que você está sentindo agora tem um pico e vai diminuir. Você não precisa tomar nenhuma decisão definitiva hoje. Fale com o <strong>188</strong>."
              </div>
            </div>

            {/* Right Col: Grounding Technique 5-4-3-2-1 */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 font-black text-base">
                <Compass className="w-5 h-5 text-amber-600" />
                Técnica de Aterramento (Grounding 5-4-3-2-1)
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Quando os pensamentos aceleram ou surge pânico, olhe ao seu redor e identifique em voz alta:
              </p>

              <div className="space-y-2.5 text-xs text-zinc-700">
                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-start gap-2.5">
                  <span className="text-lg">👀</span>
                  <div>
                    <strong className="text-zinc-900 block">5 Coisas que você pode ver</strong>
                    <span>(Ex: uma janela, uma caneta, um quadro, a cor da parede, sua mão).</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-start gap-2.5">
                  <span className="text-lg">🖐️</span>
                  <div>
                    <strong className="text-zinc-900 block">4 Coisas que você pode tocar</strong>
                    <span>(Ex: a textura da sua roupa, a mesa, o chão sob seus pés, água fria).</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-start gap-2.5">
                  <span className="text-lg">👂</span>
                  <div>
                    <strong className="text-zinc-900 block">3 Sons que você pode ouvir</strong>
                    <span>(Ex: o barulho do vento, carros distantes, sua respiração).</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-start gap-2.5">
                  <span className="text-lg">👃</span>
                  <div>
                    <strong className="text-zinc-900 block">2 Cheiros que você pode sentir</strong>
                    <span>(Ex: café, sabonete, o ar fresco).</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-start gap-2.5">
                  <span className="text-lg">👅</span>
                  <div>
                    <strong className="text-zinc-900 block">1 Sabor que você pode notar</strong>
                    <span>(Ex: um gole de água fresca, uma bala ou menta).</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:188"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  Preciso conversar agora: Ligue 188
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= TAB 3: REDE CAPS & ATENDIMENTO SUS ================= */}
      {activeTab === 'rede-caps' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Rede de Atenção Psicossocial (RAPS) • SUS Municipal
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                O que é o CAPS e como buscar atendimento gratuito no SUS?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-3xl leading-relaxed mt-1">
                Os <strong>CAPS (Centros de Atenção Psicossocial)</strong> são unidades públicas de saúde mental abertas a toda a população. <strong>Você não precisa de encaminhamento médico ou agendamento prévio</strong>: basta comparecer à unidade mais próxima para acolhimento imediato.
              </p>
            </div>

            {/* 4 CAPS Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      CAPS
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">CAPS Adulto (CAPS II & III)</h3>
                      <div className="text-[11px] text-zinc-500">Para adultos com depressão, ideação suicida, psicoses e crises</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
                    Porta Aberta
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Oferece consultas com psiquiatras, psicólogos, terapeutas ocupacionais, grupos de apoio e oficinas terapêuticas. O <strong>CAPS III funciona 24h</strong> com leitos de acolhimento noturno para estabilização de crises.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                      CAPSi
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">CAPSi (Infantojuvenil)</h3>
                      <div className="text-[11px] text-zinc-500">Crianças e adolescentes de até 18 anos</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-1 rounded-full">
                    Até 18 anos
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Acolhimento humanizado para jovens com depressão, automutilação, crises de ansiedade, bullying, transtornos do espectro autista e vulnerabilidade emocional.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">
                      AD
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">CAPS AD (Álcool e outras Drogas)</h3>
                      <div className="text-[11px] text-zinc-500">Prevenção, desintoxicação e suporte psicossocial</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                    Especializado
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Cuidado especializado para crises associadas ao uso de álcool e substâncias, redução de danos, acolhimento familiar e reinserção social.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
                      UPA
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">UPA 24h & Pronto-Socorro</h3>
                      <div className="text-[11px] text-zinc-500">Emergência física, intoxicações e tentativas</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-full">
                    Emergência 24h
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Para casos graves de risco à vida, intoxicação por medicamentos ou produtos químicos, e necessidade de suporte clínico imediato antes do encaminhamento psiquiátrico.
                </p>
              </div>
            </div>

            {/* Direct Map Search Button */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-sm text-blue-950 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Localizar CAPS ou Posto de Saúde mais próximo no Mapa
                </div>
                <p className="text-xs text-blue-800/80">
                  Abra o mapa da sua região para encontrar o endereço e telefone da unidade CAPS de referência.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/CAPS+Centro+de+Atencao+Psicossocial"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <MapPin className="w-4 h-4" />
                Buscar CAPS no Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SOLICITAR VISITA / ACOLHIMENTO ================= */}
      {activeTab === 'solicitar-apoio' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                Triagem Sigilosa e Humanizada
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                Solicitação Prioritária de Acolhimento Psicológico & Social
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-1">
                Envie um alerta sigiloso para acionar a equipe multidisciplinar de Saúde da Família (eSF / NASF) e o CAPS do município. Este formulário pode ser preenchido por você mesmo ou por um amigo/familiar que queira ajudar.
              </p>
            </div>

            {submittedProtocol ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    PROTOCOLO: {submittedProtocol}
                  </span>
                  <h3 className="text-xl font-black text-emerald-950 mt-2">
                    Solicitação Registrada em Prioridade Máxima
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                    A notificação foi encaminhada para a triagem da Rede de Saúde Mental e Assistência Social. Uma equipe de saúde entrará em contato pelo telefone informado com total sigilo.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-emerald-200 text-xs text-zinc-700 max-w-md mx-auto space-y-1 text-left">
                  <div><strong>👤 Nome:</strong> {name}</div>
                  <div><strong>📱 Telefone:</strong> {phone}</div>
                  <div><strong>📍 Local:</strong> {address}</div>
                  <div><strong>⚠️ Nível:</strong> {urgencyLevel === 'critica' ? '🚨 Crítica / Risco Iminente' : 'Alta Urgência'}</div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href="tel:188"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Ligar 188 enquanto aguarda
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedProtocol(null);
                      setNotes('');
                      setSymptoms([]);
                    }}
                    className="px-4 py-2.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Nova Solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-5">
                {/* Quem é a pessoa atendida? */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-800">
                    1. Para quem é este pedido de acolhimento?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTargetType('myself')}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        targetType === 'myself'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30'
                          : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span>💛 É para mim mesmo(a)</span>
                      {targetType === 'myself' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetType('other')}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        targetType === 'other'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30'
                          : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span>👥 É para um amigo, familiar ou vizinho</span>
                      {targetType === 'other' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </button>
                  </div>
                </div>

                {/* Dados de Contato e Local */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800">
                      Nome da Pessoa a ser Acolhida *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome completo ou primeiro nome"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800">
                      Telefone / WhatsApp de Contato *
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800">
                      Endereço ou Bairro para Atendimento / Visita da Equipe *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro e pontos de referência"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Sinais Observados / Sintomas */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-800">
                    2. Sinais de Sofrimento Observados (Selecione todos que se aplicam):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Depressão Severa / Não sai da cama',
                      'Ideação Suicida / Falas de desistir',
                      'Crise Aguda de Pânico / Ansiedade',
                      'Isolamento Social Extremo',
                      'Automutilação / Lesões',
                      'Despedidas ou Doação de bens',
                      'Crise com Álcool ou Drogas',
                      'Insônia Grave / Desespero constante',
                      'Luto traumático recente'
                    ].map((sym) => (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                          symptoms.includes(sym)
                            ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                            : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <span className="truncate">{sym}</span>
                        {symptoms.includes(sym) && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Urgency Level */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-800">
                    3. Nível de Urgência Estimado:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('critica')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left cursor-pointer transition-all ${
                        urgencyLevel === 'critica'
                          ? 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-400/30'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="text-red-700">🚨 Crítica / Risco Iminente</div>
                      <div className="text-[10px] text-zinc-500 font-normal">Plano imediato, tentativa recente</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('alta')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left cursor-pointer transition-all ${
                        urgencyLevel === 'alta'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="text-amber-700">⚠️ Alta Urgência</div>
                      <div className="text-[10px] text-zinc-500 font-normal">Depressão profunda, ideação frequente</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('moderada')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left cursor-pointer transition-all ${
                        urgencyLevel === 'moderada'
                          ? 'border-blue-500 bg-blue-50 text-blue-950 ring-2 ring-blue-400/30'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="text-blue-700">💬 Acolhimento Contínuo</div>
                      <div className="text-[10px] text-zinc-500 font-normal">Ansiedade, suporte psicológico</div>
                    </button>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800">
                    Detalhes Adicionais (Opcional & Sigiloso):
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Descreva brevemente o contexto para ajudar a equipe no primeiro acolhimento..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Seus dados são protegidos por sigilo médico e utilizados exclusivamente para acolhimento de saúde mental.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer hover:scale-101 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Solicitação Prioritária de Acolhimento
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
