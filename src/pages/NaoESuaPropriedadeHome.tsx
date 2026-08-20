import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  PhoneCall,
  GraduationCap,
  Share2,
  Settings,
  AlertTriangle,
  Heart,
  Shield,
  ArrowRight,
  BookOpen,
  Quote,
  Copy,
  Check
} from 'lucide-react';
import campanhaMulherImg from '../assets/images/campanha_feminicidio_180_1787223865455.jpg';

export default function NaoESuaPropriedadeHome() {
  const navigate = useNavigate();
  const [copiedManifesto, setCopiedManifesto] = React.useState(false);

  const manifestoText = `Nenhuma pessoa — mulher, homem ou qualquer outra — deve ter sua vida ceifada por escolher ser livre, por existir como é, ou por ousar viver com dignidade. A liberdade não é um crime, é um direito inalienável de todos os seres humanos. E ninguém, em nenhuma circunstância, tem o poder ou a legitimidade de decidir sobre a vida de outrem.

Essas palavras carregam um grito contra a violência, contra o controle, contra a ideia cruel de que alguém "pertence" a outro, ou que pode punir com a morte quem não se deixa dominar. Que elas sejam sempre lembradas, repetidas e vividas — até que nenhuma vida mais se perca por causa de liberdade.`;

  const handleCopyManifesto = () => {
    navigator.clipboard.writeText(manifestoText);
    setCopiedManifesto(true);
    setTimeout(() => setCopiedManifesto(false), 2500);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* CABEÇALHO ROXO ESCURO (#4A148C / #3B0764) */}
      <header className="bg-gradient-to-r from-[#3B0764] via-[#4A148C] to-[#2E0854] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-purple-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#9C27B0]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-400/20 text-purple-200 text-xs font-black uppercase tracking-wider border border-purple-300/30">
              <span className="w-2 h-2 rounded-full bg-[#BA68C8] animate-ping" />
              <span>Conscientização & Proteção à Vida</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
              NÃO É SUA <span className="text-[#BA68C8]">PROPRIEDADE</span>
            </h1>

            <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-medium">
              A liberdade é inegociável. Nenhuma pessoa é posse de ninguém. Informação, educação e socorro emergencial para combater a posse e o feminicídio.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
            <Link
              to="/configuracoes"
              className="px-4 py-2.5 bg-purple-900/60 hover:bg-purple-900 text-purple-100 rounded-2xl text-xs font-bold flex items-center gap-2 border border-purple-400/30 shadow-xs transition-all"
            >
              <Settings className="w-4 h-4 text-purple-300" />
              <span>Configurações & Camuflagem</span>
            </Link>

            <a
              href="tel:180"
              className="px-5 py-3 bg-[#BA68C8] hover:bg-[#AB47BC] text-zinc-950 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>LIGAR 180 AGORA</span>
            </a>
          </div>
        </div>
      </header>

      {/* CAIXA DE DADOS E URGÊNCIA: VERMELHO ESCURO (#B71C1C) - DESTAQUE MÁXIMO */}
      <section className="bg-gradient-to-br from-[#B71C1C] via-[#8E0000] to-[#5F0000] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-500/60 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#B71C1C] flex items-center justify-center font-black text-2xl shadow-md shrink-0">
            <AlertTriangle className="w-7 h-7 text-[#B71C1C]" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-red-200">
              ALERTA MÁXIMO • URGÊNCIA SOCIAL
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              TRAIÇÃO NÃO JUSTIFICA MORTE
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 backdrop-blur-xs rounded-2xl p-4 border border-red-400/30 space-y-1">
            <div className="text-3xl font-black text-amber-300">1 a cada 6h</div>
            <div className="text-xs font-bold text-red-100 uppercase tracking-wide">Uma mulher é morta por feminicídio no Brasil</div>
            <div className="text-[11px] text-red-200/80">Na maioria dos casos, o agressor é o parceiro ou ex que não aceita o fim.</div>
          </div>

          <div className="bg-black/30 backdrop-blur-xs rounded-2xl p-4 border border-red-400/30 space-y-1">
            <div className="text-3xl font-black text-white">A Culpa NUNCA</div>
            <div className="text-xs font-bold text-red-100 uppercase tracking-wide">É da vítima</div>
            <div className="text-[11px] text-red-200/80">Quem mata por ciúme, posse ou vingança comete homicídio qualificado (Feminicídio).</div>
          </div>

          <div className="bg-black/30 backdrop-blur-xs rounded-2xl p-4 border border-red-400/30 space-y-1">
            <div className="text-3xl font-black text-emerald-300">Lei 13.104</div>
            <div className="text-xs font-bold text-red-100 uppercase tracking-wide">Crime Hediondo Inafiançável</div>
            <div className="text-[11px] text-red-200/80">Pena de até 30 anos de reclusão para crimes de ódio contra o gênero feminino.</div>
          </div>
        </div>

        <div className="p-4 bg-black/40 rounded-2xl border border-red-400/40 text-sm text-red-100 leading-relaxed">
          <strong className="text-white font-black uppercase">Você não está sozinha:</strong> Se você ou alguém que você conhece está sofrendo ameaças de morte, perseguição ou controle obsessivo, ligue imediatamente para o <strong>180 (Central da Mulher)</strong> ou <strong>190 (Polícia Militar)</strong>.
        </div>
      </section>

      {/* 4 BOTÕES DE NAVEGAÇÃO PRINCIPAIS: ROXO CLARO / DESTACADOS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#9C27B0]" />
            Navegação Principal do Aplicativo
          </h2>
          <span className="text-xs text-zinc-500 font-bold">4 Módulos de Conscientização</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* BOTÃO 1: MITOS & VERDADES */}
          <Link
            to="/mitos-verdades"
            className="p-6 bg-gradient-to-br from-purple-100 via-purple-50 to-white hover:from-purple-200 hover:to-purple-100 text-purple-950 rounded-3xl border-2 border-purple-300/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#9C27B0] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-black bg-purple-200 text-purple-900 px-3 py-1 rounded-full uppercase">
                Tela 1
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-purple-950 uppercase tracking-tight">
                Mitos & Verdades
              </h3>
              <p className="text-xs text-purple-800/80 mt-1 font-medium leading-relaxed">
                Desconstruindo ideias perigosas sobre ciúme, posse e violência de gênero.
              </p>
            </div>

            <div className="flex items-center text-xs font-black text-[#7B1FA2] group-hover:translate-x-1 transition-transform">
              <span>Acessar Desconstrução</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* BOTÃO 2: AJUDA & EMERGÊNCIA */}
          <Link
            to="/ajuda-emergencia"
            className="p-6 bg-gradient-to-br from-emerald-100 via-emerald-50 to-white hover:from-emerald-200 hover:to-emerald-100 text-emerald-950 rounded-3xl border-2 border-emerald-300/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-black bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full uppercase">
                Tela 2
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tight">
                Ajuda & Emergência
              </h3>
              <p className="text-xs text-emerald-800/80 mt-1 font-medium leading-relaxed">
                Botões de ligação em 1 toque (180, 190, 192), passo a passo simples e SOS GPS.
              </p>
            </div>

            <div className="flex items-center text-xs font-black text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Linhas de Socorro</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* BOTÃO 3: EDUCAÇÃO */}
          <Link
            to="/educacao"
            className="p-6 bg-gradient-to-br from-amber-100 via-yellow-50 to-white hover:from-amber-200 hover:to-amber-100 text-amber-950 rounded-3xl border-2 border-amber-300/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-zinc-950" />
              </div>
              <span className="text-xs font-black bg-amber-200 text-amber-950 px-3 py-1 rounded-full uppercase">
                Tela 3
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-amber-950 uppercase tracking-tight">
                Educação & Jovens
              </h3>
              <p className="text-xs text-amber-900/80 mt-1 font-medium leading-relaxed">
                Frases para copiar, cartazes A4/Stories para impressão e Quiz educativo.
              </p>
            </div>

            <div className="flex items-center text-xs font-black text-amber-900 group-hover:translate-x-1 transition-transform">
              <span>Material Pedagógico</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* BOTÃO 4: COMPARTILHE */}
          <Link
            to="/compartilhe"
            className="p-6 bg-gradient-to-br from-blue-100 via-blue-50 to-white hover:from-blue-200 hover:to-blue-100 text-blue-950 rounded-3xl border-2 border-blue-300/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-102"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-black bg-blue-200 text-blue-900 px-3 py-1 rounded-full uppercase">
                Tela 4
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight">
                Compartilhe
              </h3>
              <p className="text-xs text-blue-800/80 mt-1 font-medium leading-relaxed">
                Multiplicar a mensagem de liberdade no WhatsApp, Instagram e redes sociais.
              </p>
            </div>

            <div className="flex items-center text-xs font-black text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Multiplicar a Voz</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* MANIFESTO SOLENE DA LIBERDADE HUMANA */}
      <section className="bg-gradient-to-br from-zinc-900 via-purple-950 to-black text-white rounded-3xl p-6 sm:p-10 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#BA68C8] flex items-center justify-center border border-purple-400/40">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Manifesto: A Liberdade Não é um Crime
              </h2>
              <div className="text-xs text-purple-300">Declaração Inviolável da Dignidade e Liberdade Humana</div>
            </div>
          </div>

          <button
            onClick={handleCopyManifesto}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0 self-start sm:self-auto"
          >
            {copiedManifesto ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedManifesto ? 'Copiado com Sucesso!' : 'Copiar Manifesto'}</span>
          </button>
        </div>

        <blockquote className="space-y-4 text-base sm:text-lg text-purple-100 font-serif leading-relaxed italic">
          <p className="border-l-4 border-[#BA68C8] pl-4 sm:pl-6">
            “Nenhuma pessoa — mulher, homem ou qualquer outra — deve ter sua vida ceifada por escolher ser livre, por existir como é, ou por ousar viver com dignidade. A liberdade não é um crime, é um direito inalienável de todos os seres humanos. E ninguém, em nenhuma circunstância, tem o poder ou a legitimidade de decidir sobre a vida de outrem.”
          </p>
          <p className="text-sm sm:text-base text-zinc-300 font-sans not-italic leading-relaxed pl-4 sm:pl-6">
            Essas palavras carregam um grito contra a violência, contra o controle, contra a ideia cruel de que alguém "pertence" a outro, ou que pode punir com a morte quem não se deixa dominar. Que elas sejam sempre lembradas, repetidas e vividas — até que nenhuma vida mais se perca por causa de liberdade.
          </p>
        </blockquote>
      </section>

      {/* CARTAZ OFICIAL DA CAMPANHA */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/50 max-w-[240px] group">
              <img
                src={campanhaMulherImg}
                alt="Cartaz Campanha: Traição não justifica morte"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase">
              <span>💜</span> Cartaz Oficial da Campanha
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight">
              Nenhuma mulher é propriedade de ninguém.
            </h3>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-medium">
              “Meu corpo, minha vida, minhas escolhas pertencem só a mim. Quem mata por ciúme, por controle ou por vingança comete feminicídio. A culpa nunca é da vítima.”
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/educacao"
                className="px-5 py-3 bg-[#4A148C] hover:bg-[#3B0764] text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>VER CARTAZES PARA IMPRESSÃO A4</span>
              </Link>
              <Link
                to="/compartilhe"
                className="px-5 py-3 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>COMPARTILHAR NO WHATSAPP</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
