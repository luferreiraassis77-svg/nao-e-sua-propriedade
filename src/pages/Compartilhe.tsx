import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Send,
  MessageCircle,
  Sparkles,
  Heart,
  Quote
} from 'lucide-react';
const campanhaMulherImg = 'https://images.unsplash.com/photo-1590424744257-f50689b02bc3?auto=format&fit=crop&q=80&w=800';

export default function Compartilhe() {
  const [copied, setCopied] = useState(false);

  const shareMessage = `🟣 *NÃO É SUA PROPRIEDADE* 🟣

"Nenhuma pessoa — mulher, homem ou qualquer outra — deve ter sua vida ceifada por escolher ser livre, por existir como é, ou por ousar viver com dignidade. A liberdade não é um crime, é um direito inalienável."

Traição NÃO justifica morte. Quem mata por ciúme comete feminicídio. A culpa NUNCA é da vítima.

📞 *Ligue 180* (Central de Atendimento à Mulher - Grátis e Sigiloso 24h)
🚨 *Ligue 190* (Polícia Militar em caso de emergência)

Compartilhe essa mensagem e ajude a salvar vidas!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleShareTelegram = () => {
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encoded}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent('Nenhuma pessoa é propriedade de ninguém. Traição não justifica morte. A culpa nunca é da vítima. Ligue 180. #NaoESuaPropriedade #Ligue180');
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-400/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 text-white flex items-center justify-center border border-blue-300/40">
              <Share2 className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <span className="text-xs font-black text-blue-300 uppercase tracking-wider">
                TELA 4 • MULTIPLICAR A VOZ
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Compartilhe & Salve Vidas
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
            A informação salva vidas. Faça essa mensagem de liberdade e proteção chegar a quem mais precisa.
          </p>
        </div>
      </div>

      {/* QUICK SHARE ACTIONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
        <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">
          Canais de Compartilhamento Imediato
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleShareWhatsApp}
            className="p-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <MessageCircle className="w-8 h-8" />
            <span>ENVIAR NO WHATSAPP</span>
          </button>

          <button
            onClick={handleShareTelegram}
            className="p-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <Send className="w-8 h-8" />
            <span>ENVIAR NO TELEGRAM</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="p-5 bg-zinc-900 hover:bg-black text-white rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <span className="text-2xl font-bold">𝕏</span>
            <span>POSTAR NO TWITTER / X</span>
          </button>
        </div>
      </section>

      {/* TEXTO FORMATADO PRONTO PARA COPIAR */}
      <section className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-purple-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-purple-400" />
            <h3 className="font-black text-sm sm:text-base uppercase text-white">
              Texto Pronto para Redes e Grupos de Família
            </h3>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#9C27B0] hover:bg-[#8E24AA] text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensagem Inteira</span>
              </>
            )}
          </button>
        </div>

        <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-zinc-300 bg-black/50 p-5 rounded-2xl border border-zinc-800 leading-relaxed">
          {shareMessage}
        </pre>
      </section>
    </div>
  );
}
