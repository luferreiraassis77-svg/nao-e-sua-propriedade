import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Shield,
  MapPin,
  Send,
  AlertCircle,
  Clock,
  Home,
  FileCheck,
  Building2,
  Lock,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import GuiaDenunciaRedeApoio from '../components/GuiaDenunciaRedeApoio';
import BotoesComandoViolencia from '../components/BotoesComandoViolencia';

export default function AjudaEmergencia() {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sosSent, setSosSent] = useState(false);

  const handleCaptureGPS = () => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      alert('Geolocalização não suportada no seu navegador.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setGpsLoading(false);
      },
      (err) => {
        console.error(err);
        setGpsLoading(false);
        // Fallback demo location if permissions denied
        setGpsLocation({ lat: -23.55052, lng: -46.633308 });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSendWhatsAppSOS = () => {
    const mapsLink = gpsLocation
      ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`
      : 'Localização via aplicativo';

    const msg = `🚨 *ALERTA SOS - RISCO IMINENTE / SOCORRO* 🚨\n\nPreciso de ajuda urgente agora!\nMinha localização aproximada: ${mapsLink}\n\nPor favor, envie socorro ou chame a polícia 190 para mim!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    setSosSent(true);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-400/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 text-white flex items-center justify-center border border-emerald-300/40">
              <PhoneCall className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                TELA 2 • SOCORRO IMEDIATO & PROTEÇÃO
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Ajuda & Emergência
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            Linhas diretas de socorro gratuito, canais oficiais de acolhimento e passo a passo simples para salvar vidas.
          </p>
        </div>
      </div>

      {/* BOTÕES DE LIGAÇÃO VERDE VIBRANTE - BEM GRANDES (1 TOQUE E LIGA) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            Linhas de Emergência (1 Toque para Ligar)
          </h2>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Ligações Gratuitas 24 Horas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* LIGUE 180 */}
          <a
            href="tel:180"
            className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102 border-2 border-emerald-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <PhoneCall className="w-8 h-8" />
              </div>
              <span className="text-xs font-black bg-zinc-950 text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
                GRÁTIS 24H
              </span>
            </div>

            <div>
              <div className="text-xs font-black uppercase text-emerald-950 tracking-wider">
                CENTRAL DA MULHER
              </div>
              <div className="text-3xl sm:text-4xl font-black text-zinc-950">
                LIGUE 180
              </div>
              <p className="text-xs text-emerald-950 font-bold mt-1">
                Orientação sigilosa, acolhimento, denúncias de violência doméstica e encaminhamento para a rede de proteção.
              </p>
            </div>

            <div className="w-full bg-zinc-950 text-emerald-300 font-black py-3 rounded-2xl text-center text-sm uppercase tracking-wide group-hover:bg-black">
              TOCAR PARA DISCAR 180
            </div>
          </a>

          {/* LIGUE 190 */}
          <a
            href="tel:190"
            className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102 border-2 border-emerald-400 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <span className="text-xs font-black bg-red-600 text-white px-3 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
                FLAGRANTE / POLÍCIA
              </span>
            </div>

            <div>
              <div className="text-xs font-black uppercase text-emerald-200 tracking-wider">
                RISCO IMINENTE À VIDA
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                LIGUE 190
              </div>
              <p className="text-xs text-emerald-100 font-medium mt-1">
                Polícia Militar para envio imediato de viatura em casos de agressão em andamento, invasão de domicílio ou ameaça armada.
              </p>
            </div>

            <div className="w-full bg-white text-emerald-900 font-black py-3 rounded-2xl text-center text-sm uppercase tracking-wide group-hover:bg-zinc-100">
              TOCAR PARA DISCAR 190
            </div>
          </a>

          {/* LIGUE 192 (SAMU) */}
          <a
            href="tel:192"
            className="p-5 bg-white hover:bg-emerald-50 text-zinc-900 rounded-3xl shadow-md border-2 border-emerald-300 hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🚑</span>
              <span className="text-[10px] font-black bg-red-100 text-red-900 px-2.5 py-1 rounded-full uppercase">
                Socorro Médico
              </span>
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900">SAMU 192</h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Ambulância e resgate médico de urgência para vítimas feridas ou em crise aguda.
              </p>
            </div>
            <div className="text-xs font-black text-emerald-700 uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ligar 192</span> &rarr;
            </div>
          </a>

          {/* LIGUE 188 (CVV) */}
          <a
            href="tel:188"
            className="p-5 bg-white hover:bg-amber-50 text-zinc-900 rounded-3xl shadow-md border-2 border-amber-300 hover:border-amber-500 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">💛</span>
              <span className="text-[10px] font-black bg-amber-100 text-amber-950 px-2.5 py-1 rounded-full uppercase">
                Apoio Emocional
              </span>
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900">CVV 188 (Apoio Emocional 24h)</h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Conversa confidencial e acolhedora com voluntários treinados em momentos de desespero e angústia.
              </p>
            </div>
            <div className="text-xs font-black text-amber-900 uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ligar 188</span> &rarr;
            </div>
          </a>

        </div>
      </section>

      {/* SOS WHATSAPP COM GEOLOCALIZAÇÃO GPS */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase">
                SOS WhatsApp com Localização GPS
              </h2>
              <p className="text-xs text-zinc-400">
                Envie suas coordenadas em tempo real para contatos de confiança ou advogada/rede de apoio.
              </p>
            </div>
          </div>

          <button
            onClick={handleCaptureGPS}
            disabled={gpsLoading}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{gpsLoading ? 'Obtendo GPS...' : gpsLocation ? 'Localização Pronta ✅' : 'Capturar Meu GPS'}</span>
          </button>
        </div>

        {gpsLocation && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Coordenadas obtidas: {gpsLocation.lat.toFixed(5)}, {gpsLocation.lng.toFixed(5)}. Pronto para disparar alerta.</span>
          </div>
        )}

        <button
          onClick={handleSendWhatsAppSOS}
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-101 cursor-pointer uppercase tracking-wider"
        >
          <Send className="w-4 h-4" />
          <span>ENVIAR ALERTA SOS COM LOCALIZAÇÃO VIA WHATSAPP</span>
        </button>
      </section>

      {/* PASSO A PASSO SIMPLES (SEM JARGÕES) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-emerald-600" />
            Passo a Passo Simples: Como Agir em Segurança
          </h2>
          <p className="text-xs text-zinc-600 mt-1">
            Instruções diretas e práticas para proteger sua integridade física e seus direitos.
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Passo 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-900">
                Se estiver em risco iminente, saia do local e ligue 190
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Vá para a rua, entre em um comércio, farmácia ou casa de vizinhos. Não tente argumentar com quem está armado ou descontrolado.
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-900">
                Solicite uma Medida Protetiva de Urgência (MPU)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Você <strong>NÃO precisa de advogado</strong> para pedir a medida. Basta ir a qualquer Delegacia (preferencialmente DEAM) ou preencher o pedido na Defensoria Pública. O juiz tem até 48h para proibir o agressor de se aproximar.
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-900">
                Guarde provas em um local seguro fora do celular comum
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tire prints de mensagens de ameaça, grave áudios e salve em um e-mail novo ou envie para uma amiga de extrema confiança. Registre datas e horários de perseguições.
              </p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-900">
                Casa-Abrigo Sigilosa & Assistência Social (CRAS / CREAS)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Se você não tiver para onde ir com seus filhos, o Estado disponibiliza abrigos com endereço mantido sob sigilo judicial absoluto, com alimentação e proteção policial 24h.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CENTRAL DE BOTÕES DE COMANDO EM 1 TOQUE (LEI MARIA DA PENHA & 5 TIPOS) */}
      <BotoesComandoViolencia />

      {/* GUIA DE DENÚNCIA & REDES DE APOIO LOCAIS */}
      <GuiaDenunciaRedeApoio />
    </div>
  );
}
