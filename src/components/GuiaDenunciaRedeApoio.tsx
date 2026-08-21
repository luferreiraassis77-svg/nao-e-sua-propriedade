import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  FileText,
  Building2,
  Scale,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Lock,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export default function GuiaDenunciaRedeApoio() {
  const [activeTab, setActiveTab] = useState<'denuncia' | 'redes' | 'mpu'>('denuncia');

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-xl space-y-6">
      {/* Header with 190 Emergency Callout */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>Guia Prático de Orientação & Direitos</span>
          </div>

          <a
            href="tel:190"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-xs transition-all animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>PERIGO IMEDIATO? LIGUE 190</span>
          </a>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight">
          Como Registrar Denúncia & Redes de Apoio Locais
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
          Se você ou alguém que você conhece está vivenciando qualquer forma de violência, saiba exatamente o que fazer, onde buscar proteção jurídica e como acionar serviços públicos gratuitos.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
        <button
          onClick={() => setActiveTab('denuncia')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'denuncia'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          📝 Como Registrar a Denúncia (B.O.)
        </button>
        <button
          onClick={() => setActiveTab('mpu')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'mpu'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          🛡️ Medida Protetiva de Urgência (MPU)
        </button>
        <button
          onClick={() => setActiveTab('redes')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'redes'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          🏛️ Redes de Apoio & Serviços Locais
        </button>
      </div>

      {/* TAB 1: COMO REGISTRAR O B.O. */}
      {activeTab === 'denuncia' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Opção 1: Presencial */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-zinc-900 uppercase">
                    1. Presencial: Delegacia da Mulher (DEAM)
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-medium">Ou qualquer delegacia de polícia civil</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Atendimento especializado:</strong> A DEAM conta com policiais capacitados para acolher a vítima sem julgamentos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sem DEAM na sua cidade?</strong> Vá a qualquer delegacia comum. Por lei, o atendimento a mulheres em situação de violência é prioritário.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Exame de Corpo de Delito:</strong> Se houve agressão física, a polícia encaminhará para o IML para formalizar as provas periciais.</span>
                </li>
              </ul>
            </div>

            {/* Opção 2: Online */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#9C27B0] text-white flex items-center justify-center font-black">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-zinc-900 uppercase">
                    2. Online: Delegacia Eletrônica
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-medium">Pela internet, no celular ou computador</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Registro Imediato:</strong> Acesse o site da Polícia Civil do seu estado (ex: Delegacia Eletrônica) e selecione "Violência Doméstica".</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Anexo de Provas:</strong> É possível anexar prints de conversas, fotos de ferimentos, áudios e dados de testemunhas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Pedido de Medida Protetiva:</strong> A maioria dos estados permite solicitar a proteção urgente no próprio formulário online.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* WhatsApp Oficial 180 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-xs uppercase text-emerald-950">
                  WhatsApp Oficial do Ligue 180 (Ministério das Mulheres)
                </div>
                <div className="text-xs text-emerald-900">
                  Converse com a atendente virtual e receba acolhimento sigiloso pelo número <strong>(61) 9610-0180</strong>.
                </div>
              </div>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=556196100180&text=Ol%C3%A1%2C%20preciso%20de%20informa%C3%A7%C3%B5es%20e%20ajuda%20sobre%20viol%C3%AAncia%20contra%20a%20mulher"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>CHAMAR NO WHATSAPP 180</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* TAB 2: MEDIDA PROTETIVA DE URGÊNCIA */}
      {activeTab === 'mpu' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-700" />
              <h3 className="font-black text-sm text-purple-950 uppercase">
                O que é e como funciona a Medida Protetiva de Urgência?
              </h3>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              A Medida Protetiva é uma ordem judicial expressa prevista na Lei Maria da Penha para impedir que o agressor continue ameaçando ou se aproximando da vítima.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-900">⏱️ Prazo Máximo</span>
                <p className="text-xs font-bold text-zinc-900">Decisão em até 48 Horas</p>
                <p className="text-[11px] text-zinc-500">O juiz é obrigado por lei a julgar o pedido com urgência absoluta.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-900">🆓 100% Gratuito</span>
                <p className="text-xs font-bold text-zinc-900">Sem Custas ou Advogado</p>
                <p className="text-[11px] text-zinc-500">Você não precisa pagar nada nem contratar advogado particular para pedir.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-900">🚫 Principais Ordens</span>
                <p className="text-xs font-bold text-zinc-900">Afastamento Imediato</p>
                <p className="text-[11px] text-zinc-500">Proibição de aproximação, de contato telefônico e expulsão do lar.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Descumprimento de Medida Protetiva é Crime Inafiançável!</span>
            </div>
            <p className="leading-relaxed">
              Se o agressor mandar uma mensagem sequer, ligar ou aparecer perto da vítima após a concessão da medida, a polícia pode prendê-lo <strong>em flagrante delito imediato</strong> (Art. 24-A da Lei 11.340/2006). Ligue 190 na hora.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: REDES DE APOIO E SERVIÇOS LOCAIS */}
      {activeTab === 'redes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Defensoria Pública */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-zinc-900">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Defensoria Pública (NUDEM)</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Advogados públicos gratuitos para ingressar com pedidos de divórcio, guarda dos filhos, pensão alimentícia e medidas de segurança.
              </p>
            </div>

            {/* CREAS / CRAS */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-zinc-900">
                <Users className="w-4 h-4 text-purple-600" />
                <span>CREAS & CRAS (Assistência Social)</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Acompanhamento psicológico e social gratuito, auxílios governamentais e encaminhamento para programas de autonomia financeira.
              </p>
            </div>

            {/* Casa da Mulher Brasileira */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-zinc-900">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Casa da Mulher Brasileira</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Centro integrado que reúne Delegacia, Juizado Especial, Ministério Público, Defensoria e alojamento de passagem em um único local.
              </p>
            </div>

            {/* Casas-Abrigo */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs uppercase text-zinc-900">
                <Lock className="w-4 h-4 text-rose-600" />
                <span>Casas-Abrigo com Endereço Sigiloso</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Acolhimento temporário seguro para mulheres e filhos em risco iminente de morte, com alimentação, segurança 24h e proteção judicial.
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
