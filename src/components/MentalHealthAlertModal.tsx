import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  PhoneCall, 
  AlertTriangle, 
  MessageSquare, 
  X, 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  LifeBuoy, 
  CheckCheck, 
  Compass, 
  Send,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'emergency' | 'calm' | 'resources';
}

export const MentalHealthAlertModal: React.FC<Props> = ({ isOpen, onClose, defaultMode = 'emergency' }) => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<'emergency' | 'calm' | 'resources'>(defaultMode);
  
  // Breathing Tool State (4-7-8)
  const [breathingPhase, setBreathingPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // GPS Alert State
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    if (defaultMode) {
      setActiveMode(defaultMode);
    }
  }, [defaultMode]);

  // Breathing Loop timer
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

  if (!isOpen) return null;

  const handleShareGpsSOS = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setGpsCoords(coords);
          const mapsUrl = `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
          const sosText = encodeURIComponent(
            `🚨 *ALERTA SOS - APOIO EMOCIONAL / PREVENÇÃO*: Estou passando por um momento de sofrimento intenso e preciso de ajuda e acolhimento agora.\n\n📍 Minha localização atual: ${mapsUrl}\n\n💛 Se for urgente, ligue 188 (CVV) ou 192 (SAMU).`
          );
          window.open(`https://wa.me/?text=${sosText}`, '_blank');
          setSosSent(true);
        },
        () => {
          setGpsLoading(false);
          const sosText = encodeURIComponent(
            `🚨 *ALERTA SOS - APOIO EMOCIONAL / PREVENÇÃO*: Estou passando por um momento de sofrimento intenso e preciso de apoio e acolhimento agora.\n\n💛 Se for urgente, ligue 188 (CVV) ou 192 (SAMU).`
          );
          window.open(`https://wa.me/?text=${sosText}`, '_blank');
          setSosSent(true);
        }
      );
    } else {
      setGpsLoading(false);
      window.open(`https://wa.me/?text=🚨%20ALERTA%20SOS%20de%20Apoio%20Emocional%20e%20Prevenção.%20Ligue%20188%20(CVV)`, '_blank');
      setSosSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-amber-500/40 text-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Top Emergency Strip */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 p-4 sm:p-5 rounded-t-3xl text-zinc-950 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-amber-400 flex items-center justify-center font-black text-xl shadow-md">
              💛
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Acolhimento Imediato & Prevenção à Vida
              </div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight">
                Você Não Está Sozinho • Ajuda 24 Horas
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-950/20 hover:bg-zinc-950/40 text-zinc-950 flex items-center justify-center transition-all cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60 px-4 pt-3 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveMode('emergency')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeMode === 'emergency'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Ligar Imediato (188 / 192)
          </button>

          <button
            onClick={() => {
              setActiveMode('calm');
              setIsBreathingActive(true);
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeMode === 'calm'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Desarmar Crise & Respiração
          </button>

          <button
            onClick={() => setActiveMode('resources')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeMode === 'resources'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            Rede CAPS & Postos 24h
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          
          {/* ============ MODE 1: EMERGENCY CALLS & WHATSAPP ============ */}
          {activeMode === 'emergency' && (
            <div className="space-y-5">
              
              {/* Primary Call CVV 188 */}
              <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 bg-amber-400 text-zinc-950 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                      ✓ LIGAÇÃO 100% GRATUITA & SIGILOSA
                    </div>
                    <h3 className="text-xl font-black text-amber-300">
                      CVV - Centro de Valorização da Vida
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Atendimento 24h por voluntários treinados em acolhimento emocional e prevenção ao suicídio.
                    </p>
                  </div>

                  <a
                    href="tel:188"
                    className="bg-amber-500 hover:bg-amber-400 text-zinc-950 text-base font-black px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-center shrink-0 cursor-pointer"
                  >
                    <PhoneCall className="w-6 h-6 animate-bounce" />
                    LIGAR 188 AGORA
                  </a>
                </div>

                <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200/90">
                  <span>📱 Funciona de qualquer celular ou telefone fixo sem custo</span>
                  <a
                    href="https://cvv.org.br/chat/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 hover:text-white underline font-bold flex items-center gap-1"
                  >
                    Abrir Chat Online do CVV 24h <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Secondary Critical Emergency Matrix (SAMU 192 & Bombeiros 193) */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  🚨 Em caso de tentativa em andamento, ferimentos ou risco iminente:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:192"
                    className="p-4 bg-red-950/60 hover:bg-red-900 border border-red-500/50 rounded-2xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg">
                        🚑
                      </div>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-red-200">
                          SAMU 192 (Socorro Médico)
                        </div>
                        <div className="text-[11px] text-red-300/80">
                          Overdose, intoxicação e emergência médica
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-red-600 text-white px-3 py-1.5 rounded-xl">
                      Ligar 192
                    </span>
                  </a>

                  <a
                    href="tel:193"
                    className="p-4 bg-orange-950/60 hover:bg-orange-900 border border-orange-500/50 rounded-2xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-lg">
                        🚒
                      </div>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-orange-200">
                          Bombeiros 193 (Resgate)
                        </div>
                        <div className="text-[11px] text-orange-300/80">
                          Risco em altura, pontes ou perigo físico
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-orange-600 text-white px-3 py-1.5 rounded-xl">
                      Ligar 193
                    </span>
                  </a>
                </div>
              </div>

              {/* SOS WhatsApp Emergency Trigger */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                    Enviar Alerta com GPS para Rede de Apoio ou Familiar
                  </div>
                  {sosSent && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Mensagem gerada!
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gera uma mensagem pronta no WhatsApp com sua localização exata para que amigos ou familiares possam ir até você ou chamar socorro.
                </p>

                <button
                  onClick={handleShareGpsSOS}
                  disabled={gpsLoading}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1ebd5a] text-zinc-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {gpsLoading ? 'Obtendo GPS...' : 'Disparar Alerta SOS no WhatsApp'}
                </button>
              </div>
            </div>
          )}

          {/* ============ MODE 2: CALM DOWN & FIRST AID ============ */}
          {activeMode === 'calm' && (
            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-amber-300">
                  Exercício de Respiração Anti-Pânico 4-7-8
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Siga o círculo. Esta técnica reduz os batimentos cardíacos e acalma a mente em momentos de pico de angústia.
                </p>
              </div>

              {/* Interactive Breathing Visual */}
              <div className="flex flex-col items-center justify-center py-4">
                <div
                  className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl relative ${
                    breathingPhase === 'inspire'
                      ? 'border-amber-400 bg-amber-500/20 scale-110'
                      : breathingPhase === 'hold'
                      ? 'border-yellow-300 bg-yellow-500/30 scale-105'
                      : 'border-emerald-400 bg-emerald-500/10 scale-95'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-1">
                    {breathingPhase === 'inspire' ? '🌬️ INSPIRE' : breathingPhase === 'hold' ? '⏸️ SEGURE' : '💨 EXPIRE LENTAMENTE'}
                  </span>
                  <span className="text-4xl font-black text-white font-mono">
                    {breathCount}s
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1">
                    {breathingPhase === 'inspire' ? 'Pelo nariz' : breathingPhase === 'hold' ? 'Mantenha o ar' : 'Pela boca'}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setIsBreathingActive(!isBreathingActive);
                      setBreathCount(4);
                      setBreathingPhase('inspire');
                    }}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {isBreathingActive ? 'Pausar Respiração' : 'Reiniciar Respiração'}
                  </button>
                </div>
              </div>

              {/* Grounding 5-4-3-2-1 Technique */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Compass className="w-4 h-4" />
                  Técnica de Aterramento (Grounding 5-4-3-2-1)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div className="p-2 bg-zinc-900 rounded-xl">👀 <strong>5 coisas</strong> que você pode ver agora</div>
                  <div className="p-2 bg-zinc-900 rounded-xl">🖐️ <strong>4 coisas</strong> que você pode tocar</div>
                  <div className="p-2 bg-zinc-900 rounded-xl">👂 <strong>3 coisas</strong> que você pode ouvir</div>
                  <div className="p-2 bg-zinc-900 rounded-xl">👃 <strong>2 coisas</strong> que você pode cheirar</div>
                  <div className="p-2 bg-zinc-900 rounded-xl sm:col-span-2">👅 <strong>1 coisa</strong> que você pode saborear</div>
                </div>
              </div>

              {/* Affirmations */}
              <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-4 rounded-2xl border border-amber-500/20 text-xs text-amber-200 leading-relaxed italic">
                "Esta tempestade vai passar. Sua dor é real, mas você não precisa passar por ela sozinho. Dê a si mesmo a chance de falar com alguém no <strong>188</strong>."
              </div>
            </div>
          )}

          {/* ============ MODE 3: CAPS & LOCAL PUBLIC NETWORK ============ */}
          {activeMode === 'resources' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-black text-amber-300">
                  Rede de Atenção Psicossocial (CAPS) & SUS
                </h3>
                <p className="text-xs text-zinc-400">
                  Os CAPS são unidades públicas e gratuitas do SUS especializadas em saúde mental, depressão, crises e dependência.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">CAPS III (24 Horas)</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">24H / Noite</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Acolhimento diurno e noturno com leitos de repouso para crises agudas de sofrimento mental.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">CAPS AD (Álcool & Drogas)</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">Especializado</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Suporte médico e psicológico para crises associadas a substâncias e dependência.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">CAPSi (Infanto-Juvenil)</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">Até 18 anos</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Crianças e adolescentes com depressão, automutilação, autismo e sofrimento psíquico.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">UPA 24h & Pronto-Socorro</span>
                    <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-bold">Urgência</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Atendimento imediato para tentativas, intoxicação exógena e estabilização física/psiquiátrica.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/saude-mental');
                  }}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <LifeBuoy className="w-4 h-4" />
                  Abrir Página Completa de Saúde Mental & Notificação
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-zinc-950 p-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
            Sua vida importa. Ligue 188 a qualquer momento.
          </span>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xs underline cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
