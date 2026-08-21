import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneCall,
  ShieldAlert,
  MessageSquare,
  Scale,
  Building2,
  MapPin,
  Flame,
  HeartCrack,
  Wallet,
  MessageSquareWarning,
  Lock,
  Copy,
  Check,
  ExternalLink,
  Info,
  ChevronRight,
  AlertTriangle,
  Send,
  HelpCircle,
  Home,
  UserX,
  FileCheck,
  Stethoscope,
  KeyRound
} from 'lucide-react';

interface ComandoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  icone: React.ReactNode;
  corBotao: string;
  acaoTipo: 'ligar' | 'whatsapp' | 'navegar' | 'externo' | 'copiar' | 'modal';
  destino: string;
  badge?: string;
  categoria: 'emergencia' | 'juridico' | 'saude' | 'sigilo';
  detalhe?: string;
}

export default function BotoesComandoViolencia() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedComando, setSelectedComando] = useState<ComandoItem | null>(null);
  const [tipoAtivo, setTipoAtivo] = useState<'todos' | 'fisica' | 'psicologica' | 'sexual' | 'patrimonial' | 'moral'>('todos');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePanicExit = () => {
    try {
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.replace('https://www.google.com');
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-300 shadow-xl space-y-6">
      
      {/* HEADER: COMBATE À VIOLÊNCIA DOMÉSTICA */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-950 text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-red-700 animate-pulse" />
            <span>Combate à Violência Doméstica • Lei Maria da Penha</span>
          </div>

          <button
            onClick={handlePanicExit}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            title="Disfarçar e abrir o Google imediatamente"
          >
            <span>🚪 Saída Rápida (Google)</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight">
            Central de Botões de Comando em 1 Toque
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed mt-1">
            A Lei Maria da Penha reconhece <strong>cinco tipos de agressão (física, psicológica, sexual, patrimonial e moral)</strong>, que ocorrem frequentemente dentro do lar por parceiros ou ex-parceiros. Use os comandos abaixo para acionar proteção policial, amparo jurídico e redes de acolhimento.
          </p>
        </div>
      </div>

      {/* 8 BOTÕES DE COMANDO MASTER DE EMERGÊNCIA & PROTEÇÃO */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Comando 1: 190 PM */}
        <a
          href="tel:190"
          className="p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🚨</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              URGENTE
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">190 • Flagrante</div>
            <div className="text-[11px] text-red-100 leading-tight mt-0.5">Polícia Militar no lar</div>
          </div>
        </a>

        {/* Comando 2: 180 Mulher */}
        <a
          href="tel:180"
          className="p-4 rounded-2xl bg-[#9C27B0] hover:bg-[#8E24AA] text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">💜</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              SIGILOSO 24H
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">Ligue 180</div>
            <div className="text-[11px] text-purple-100 leading-tight mt-0.5">Central de Atendimento</div>
          </div>
        </a>

        {/* Comando 3: WhatsApp Silencioso */}
        <a
          href="https://api.whatsapp.com/send?phone=556196100180&text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20e%20orienta%C3%A7%C3%A3o%20sobre%20viol%C3%AAncia%20dom%C3%A9stica"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">💬</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              EM SILÊNCIO
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">WhatsApp 180</div>
            <div className="text-[11px] text-emerald-100 leading-tight mt-0.5">(61) 9610-0180</div>
          </div>
        </a>

        {/* Comando 4: Medida Protetiva Online */}
        <button
          onClick={() => navigate('/mitos-verdades')}
          className="p-4 rounded-2xl bg-zinc-900 hover:bg-black text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group text-left cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🛡️</span>
            <span className="text-[10px] font-black uppercase bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-md">
              LEGAL
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">Medida Protetiva</div>
            <div className="text-[11px] text-zinc-300 leading-tight mt-0.5">Pedir em até 48h</div>
          </div>
        </button>

        {/* Comando 5: Localizar DEAM / GPS */}
        <button
          onClick={() => navigate('/ajuda-emergencia')}
          className="p-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group text-left cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📍</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              GPS
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">DEAM Próxima</div>
            <div className="text-[11px] text-sky-100 leading-tight mt-0.5">Delegacia da Mulher</div>
          </div>
        </button>

        {/* Comando 6: Defensoria Gratuita */}
        <button
          onClick={() => navigate('/ajuda-emergencia')}
          className="p-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group text-left cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">⚖️</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              GRÁTIS
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">Defensoria NUDEM</div>
            <div className="text-[11px] text-teal-100 leading-tight mt-0.5">Pensão, Guarda & Divórcio</div>
          </div>
        </button>

        {/* Comando 7: Casas-Abrigo */}
        <button
          onClick={() => navigate('/ajuda-emergencia')}
          className="p-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group text-left cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🏠</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              SECRETO
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">Casas-Abrigo</div>
            <div className="text-[11px] text-amber-100 leading-tight mt-0.5">Acolhimento com filhos</div>
          </div>
        </button>

        {/* Comando 8: Guia Passo a Passo */}
        <button
          onClick={() => navigate('/mitos-verdades')}
          className="p-4 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:scale-102 group text-left cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📚</span>
            <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
              GUIA
            </span>
          </div>
          <div className="mt-3">
            <div className="font-black text-sm uppercase leading-tight">Passo a Passo</div>
            <div className="text-[11px] text-indigo-100 leading-tight mt-0.5">Como se defender</div>
          </div>
        </button>

      </div>

      {/* FILTRO E COMANDOS ESPECÍFICOS PARA OS 5 TIPOS DE AGRESSÃO POR PARCEIRO/EX-PARCEIRO */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-black text-sm text-zinc-900 uppercase flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-red-600" />
              Comandos por Tipo de Agressão do Parceiro ou Ex-Parceiro:
            </h3>
            <p className="text-xs text-zinc-500">Selecione uma categoria para executar os comandos específicos.</p>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTipoAtivo('todos')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'todos' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Todos (5)
            </button>
            <button
              onClick={() => setTipoAtivo('fisica')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'fisica' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800 hover:bg-red-100'
              }`}
            >
              1. Física
            </button>
            <button
              onClick={() => setTipoAtivo('psicologica')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'psicologica' ? 'bg-[#9C27B0] text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              2. Psicológica
            </button>
            <button
              onClick={() => setTipoAtivo('sexual')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'sexual' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              3. Sexual
            </button>
            <button
              onClick={() => setTipoAtivo('patrimonial')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'patrimonial' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              4. Patrimonial
            </button>
            <button
              onClick={() => setTipoAtivo('moral')}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                tipoAtivo === 'moral' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              5. Moral
            </button>
          </div>
        </div>

        {/* CARDS COM COMANDOS DIRETOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* Card 1: Física */}
          {(tipoAtivo === 'todos' || tipoAtivo === 'fisica') && (
            <div className="p-4 rounded-2xl bg-red-50/70 border-2 border-red-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-red-950 uppercase flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-600" />
                    Agressão Física
                  </span>
                  <span className="text-[10px] font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded-full">
                    Art. 7º, I
                  </span>
                </div>
                <p className="text-xs text-red-900 font-medium">
                  Bater, socar, empurrar, sufocar, atirar objetos ou ferir no lar.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href="tel:190"
                  className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl flex items-center justify-between shadow-xs transition-all cursor-pointer"
                >
                  <span>Ligar 190 (PM no Local)</span>
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleCopy('fisica-guia', 'Passo a passo agressão física: 1) Vá ao pronto-socorro mais próximo; 2) Exija o prontuário médico de atendimento; 3) Dirija-se à DEAM para requerer Exame de Corpo de Delito no IML; 4) Solicite Medida Protetiva de Afastamento Imediato do Agressor.')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl border border-red-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{copiedId === 'fisica-guia' ? 'Copiado!' : 'Copiar Protocolo Hospital/IML'}</span>
                  {copiedId === 'fisica-guia' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Psicológica */}
          {(tipoAtivo === 'todos' || tipoAtivo === 'psicologica') && (
            <div className="p-4 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-950 uppercase flex items-center gap-1.5">
                    <HeartCrack className="w-4 h-4 text-[#9C27B0]" />
                    Agressão Psicológica
                  </span>
                  <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                    Art. 147-B CP
                  </span>
                </div>
                <p className="text-xs text-purple-900 font-medium">
                  Ameaças, perseguição (stalking), controle de roupas, xingamentos e chantagem.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href="https://api.whatsapp.com/send?phone=556196100180&text=Quero%20denunciar%20amea%C3%A7as%20e%20viol%C3%AAncia%20psicol%C3%B3gica%20do%20meu%20parceiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#9C27B0] hover:bg-[#8E24AA] text-white font-black text-xs rounded-xl flex items-center justify-between shadow-xs transition-all cursor-pointer"
                >
                  <span>Denunciar no WhatsApp 180</span>
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleCopy('psico-guia', 'Como provar violência psicológica: 1) Salve prints de conversas, áudios e e-mails em e-mail ou nuvem segura; 2) Anote datas, horários e testemunhas de crises; 3) Busque laudo psicológico no SUS/CAPS para comprovar abalo emocional; 4) É crime previsto no Art. 147-B do Código Penal.')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl border border-purple-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{copiedId === 'psico-guia' ? 'Copiado!' : 'Como Provar Ameaças (Prints)'}</span>
                  {copiedId === 'psico-guia' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Sexual */}
          {(tipoAtivo === 'todos' || tipoAtivo === 'sexual') && (
            <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-950 uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Agressão Sexual
                  </span>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                    Art. 7º, III
                  </span>
                </div>
                <p className="text-xs text-rose-900 font-medium">
                  Estupro marital, forçar práticas indesejadas ou impedir anticoncepcional.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href="tel:180"
                  className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl flex items-center justify-between shadow-xs transition-all cursor-pointer"
                >
                  <span>Acionar Rede de Acolhimento 180</span>
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleCopy('sexual-guia', 'Urgência Médica Sexual: 1) Procure uma maternidade ou pronto-socorro público em até 72 horas para Profilaxia Pós-Exposição (PEP contra HIV e ISTs) e pílula do dia seguinte; 2) Não tome banho nem troque de roupa antes da perícia se desejar registrar prova forense; 3) Sexo não consentido no casamento é crime inafiançável.')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl border border-rose-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{copiedId === 'sexual-guia' ? 'Copiado!' : 'Atendimento SUS (PEP 72h)'}</span>
                  {copiedId === 'sexual-guia' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Patrimonial */}
          {(tipoAtivo === 'todos' || tipoAtivo === 'patrimonial') && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-amber-600" />
                    Agressão Patrimonial
                  </span>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                    Art. 7º, IV
                  </span>
                </div>
                <p className="text-xs text-amber-900 font-medium">
                  Quebrar celular, reter documentos, confiscar salário ou não pagar pensão.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => navigate('/ajuda-emergencia')}
                  className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl flex items-center justify-between shadow-xs transition-all cursor-pointer"
                >
                  <span>Bloquear Bens / Pedir Pensão</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCopy('patri-guia', 'Direitos contra Violência Patrimonial: 1) O juiz pode decretar bloqueio liminar de contas bancárias e partilha emergencial; 2) É garantida a 2ª via gratuita de documentos destruídos pelo agressor; 3) Bens de trabalho danificados devem ser ressarcidos; 4) O não pagamento de pensão alimentícia acarreta prisão civil imediata.')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl border border-amber-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{copiedId === 'patri-guia' ? 'Copiado!' : 'Guia de Proteção de Bens'}</span>
                  {copiedId === 'patri-guia' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Card 5: Moral */}
          {(tipoAtivo === 'todos' || tipoAtivo === 'moral') && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-950 uppercase flex items-center gap-1.5">
                    <MessageSquareWarning className="w-4 h-4 text-blue-600" />
                    Agressão Moral
                  </span>
                  <span className="text-[10px] font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                    Art. 7º, V
                  </span>
                </div>
                <p className="text-xs text-blue-900 font-medium">
                  Calúnias, fofocas mentirosas, difamação em redes sociais e xingamentos.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => navigate('/ajuda-emergencia')}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl flex items-center justify-between shadow-xs transition-all cursor-pointer"
                >
                  <span>Acionar Defensoria / Queixa-Crime</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCopy('moral-guia', 'Como agir em Violência Moral: 1) Tire prints com data, horário e URL se a difamação ocorreu em redes sociais; 2) Faça registro em cartório (Ata Notarial) ou registro policial digital; 3) Entre com ação de Queixa-Crime e pedido de Indenização por Danos Morais na Defensoria Pública ou Juizado Especial.')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl border border-blue-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{copiedId === 'moral-guia' ? 'Copiado!' : 'Como Processar Difamação'}</span>
                  {copiedId === 'moral-guia' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
