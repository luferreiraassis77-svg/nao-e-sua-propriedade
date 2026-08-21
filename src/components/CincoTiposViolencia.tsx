import React, { useState } from 'react';
import {
  ShieldAlert,
  HeartCrack,
  Flame,
  Wallet,
  MessageSquareWarning,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
  Check,
  Scale,
  PhoneCall,
  AlertTriangle,
  TrendingUp,
  Radio,
  Share2
} from 'lucide-react';
import GuiaDenunciaRedeApoio from './GuiaDenunciaRedeApoio';

export interface TipoViolencia {
  id: string;
  nome: string;
  resumoDireto: string;
  icone: React.ReactNode;
  corBg: string;
  corBorda: string;
  corTexto: string;
  corPill: string;
  definicaoLegal: string;
  exemplosPraticos: string[];
  sinaisDeAlerta: string;
  artigo: string;
}

export const TIPOS_VIOLENCIA: TipoViolencia[] = [
  {
    id: 'fisica',
    nome: '1. Violência Física',
    resumoDireto: 'Bater, empurrar, chutar, apertar ou usar qualquer força que machuque o corpo.',
    icone: <Flame className="w-5 h-5 text-red-600" />,
    corBg: 'bg-red-50',
    corBorda: 'border-red-300',
    corTexto: 'text-red-950',
    corPill: 'bg-red-600 text-white',
    definicaoLegal: 'Entendida como qualquer conduta que ofenda sua integridade ou saúde corporal.',
    exemplosPraticos: [
      'Bater, dar tapas, empurrões, socos, chutes e puxões de cabelo',
      'Apertar o pescoço (esganadura), sufocamento ou arremesso de objetos',
      'Queimaduras, cortes ou uso de armas/facas',
      'Tentativa de feminicídio e cárcere privado'
    ],
    sinaisDeAlerta: 'A violência física raramente começa com agressão grave. Quase sempre inicia com empurrões, puxões de braço "sem querer" ou arremesso de copos no chão.',
    artigo: 'Art. 7º, Inciso I da Lei 11.340/2006'
  },
  {
    id: 'psicologica',
    nome: '2. Violência Psicológica',
    resumoDireto: 'Ameaçar, humilhar, xingar, controlar roupas ou isolar de amigos e família.',
    icone: <HeartCrack className="w-5 h-5 text-purple-600" />,
    corBg: 'bg-purple-50',
    corBorda: 'border-purple-300',
    corTexto: 'text-purple-950',
    corPill: 'bg-[#9C27B0] text-white',
    definicaoLegal: 'Qualquer conduta que cause dano emocional, diminuição da autoestima, perturbação do desenvolvimento ou que vise degradar ou controlar suas ações, comportamentos, crenças e decisões.',
    exemplosPraticos: [
      'Ameaças diretas ou veladas ("se você me deixar, acabo com sua vida")',
      'Humilhações públicas, desvalorização e xingamentos diários',
      'Controlar roupas, proibir maquiagem e vigiar celular/conversas',
      'Isolar de familiares, amigos e impedir de trabalhar ou estudar',
      'Gaslighting: distorcer fatos para fazer a mulher duvidar da própria sanidade'
    ],
    sinaisDeAlerta: 'É a violência que precede quase todos os feminicídios. Se você sente medo constante das reações do parceiro, você está sofrendo violência psicológica.',
    artigo: 'Art. 7º, Inciso II da Lei 11.340/2006 & Art. 147-B do CP'
  },
  {
    id: 'sexual',
    nome: '3. Violência Sexual',
    resumoDireto: 'Forçar atos sexuais, impedir o uso de métodos contraceptivos ou obrigar ao aborto.',
    icone: <ShieldAlert className="w-5 h-5 text-rose-600" />,
    corBg: 'bg-rose-50',
    corBorda: 'border-rose-300',
    corTexto: 'text-rose-950',
    corPill: 'bg-rose-600 text-white',
    definicaoLegal: 'Qualquer conduta que a constranja a presenciar, a manter ou a participar de relação sexual não desejada, mediante intimidação, ameaça, coação ou uso da força.',
    exemplosPraticos: [
      'Estupro marital: forçar sexo contra a vontade, mesmo casados ou em união estável',
      'Obrigar a práticas sexuais desconfortáveis, dolorosas ou sem consentimento',
      'Impedir o uso de camisinha ou pílula anticoncepcional',
      'Forçar a mulher a abortar ou obrigar gravidez não planejada',
      'Gravar ou divulgar vídeos/fotos íntimas sem autorização (nudes/revenge porn)'
    ],
    sinaisDeAlerta: 'Estar em um relacionamento NÃO retira seu direito ao consentimento. Sexo sem vontade livre e espontânea é crime.',
    artigo: 'Art. 7º, Inciso III da Lei 11.340/2006'
  },
  {
    id: 'patrimonial',
    nome: '4. Violência Patrimonial',
    resumoDireto: 'Quebrar objetos pessoais, reter dinheiro ou controlar salários e documentos.',
    icone: <Wallet className="w-5 h-5 text-amber-600" />,
    corBg: 'bg-amber-50',
    corBorda: 'border-amber-300',
    corTexto: 'text-amber-950',
    corPill: 'bg-amber-600 text-white',
    definicaoLegal: 'Qualquer conduta que configure retenção, subtração, destruição parcial ou total de seus objetos, instrumentos de trabalho, documentos pessoais, bens, valores e direitos ou recursos econômicos.',
    exemplosPraticos: [
      'Quebrar o celular da mulher, computador ou ferramentas de trabalho',
      'Rasgar ou esconder documentos pessoais (RG, CPF, carteira de trabalho, certidões)',
      'Reter salário, confiscar cartões de crédito e controlar cada centavo gasto',
      'Destruir roupas, maquiagens, livros ou objetos de estimação',
      'Não pagar pensão alimentícia de propósito para chantagear ou punir'
    ],
    sinaisDeAlerta: 'O agressor utiliza a dependência financeira e o isolamento de bens para impedir que a mulher consiga sair do relacionamento ou trabalhar.',
    artigo: 'Art. 7º, Inciso IV da Lei 11.340/2006'
  },
  {
    id: 'moral',
    nome: '5. Violência Moral',
    resumoDireto: 'Fazer calúnias, difamações ou xingamentos que atinjam a honra e a reputação.',
    icone: <MessageSquareWarning className="w-5 h-5 text-blue-600" />,
    corBg: 'bg-blue-50',
    corBorda: 'border-blue-300',
    corTexto: 'text-blue-950',
    corPill: 'bg-blue-600 text-white',
    definicaoLegal: 'Qualquer conduta que configure calúnia, difamação ou injúria contra a mulher.',
    exemplosPraticos: [
      'Calúnia: acusar falsamente a mulher de ter cometido um crime (ex: furto, fraude)',
      'Difamação: espalhar boatos, mentiras e fofocas sobre a sua vida pessoal para terceiros',
      'Injúria: xingamentos ofensivos direcionados à dignidade e honra da mulher',
      'Difamar a vítima para vizinhos, familiares ou em grupos de WhatsApp após o término'
    ],
    sinaisDeAlerta: 'O objetivo da violência moral é desmoralizar a mulher perante a sociedade para que ela perca o crédito e o apoio das pessoas ao redor.',
    artigo: 'Art. 7º, Inciso V da Lei 11.340/2006'
  }
];

export default function CincoTiposViolencia() {
  const [expandedId, setExpandedId] = useState<string | null>('psicologica');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopyTipo = (tipo: TipoViolencia) => {
    const text = `⚖️ ${tipo.nome.toUpperCase()} (Lei Maria da Penha)\n\n📌 RESUMO: ${tipo.resumoDireto}\n\n📌 DEFINIÇÃO LEGAL: ${tipo.definicaoLegal}\n\n🚨 EXEMPLOS:\n${tipo.exemplosPraticos.map(e => `• ${e}`).join('\n')}\n\n⚠️ SINAL DE ALERTA: ${tipo.sinaisDeAlerta}\n\n📜 Base Legal: ${tipo.artigo}\n\n📞 Ligue 180 para acolhimento sigiloso | Em perigo imediato ligue 190.`;
    navigator.clipboard.writeText(text);
    setCopiedId(tipo.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* PAINEL AGOSTO LILÁS: ENTENDER PARA PREVENIR & DADOS OFICIAIS */}
      <section className="bg-gradient-to-br from-zinc-950 via-[#3B0764] to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-purple-400/50 shadow-2xl space-y-6">
        
        {/* Campaign Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/30 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎗️</span>
            <div>
              <div className="text-xs font-black uppercase text-purple-300 tracking-wider">
                AGOSTO LILÁS • CONSCIENTIZAÇÃO NACIONAL
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Entender para PREVENIR
              </h2>
            </div>
          </div>

          <a
            href="tel:190"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-1.5 animate-pulse cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>PERIGO IMEDIATO? LIGUE 190</span>
          </a>
        </div>

        {/* 5 Types Visual Quick Strip */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-purple-200">
            Conheça as 5 Formas de Violência Contra a Mulher:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TIPOS_VIOLENCIA.map((t) => (
              <button
                key={t.id}
                onClick={() => setExpandedId(t.id)}
                className="p-3.5 rounded-2xl bg-zinc-900/90 border border-purple-400/30 hover:border-purple-300 text-left transition-all hover:scale-102 flex flex-col justify-between space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white group-hover:text-purple-300">
                    {t.nome.replace(/^\d+\.\s*/, '')}
                  </span>
                  {t.icone}
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug font-medium">
                  {t.resumoDireto}
                </p>
                <span className="text-[10px] text-purple-300 font-bold underline">
                  Ver detalhes &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* OFICIAL STATS: ANUÁRIO BRASILEIRO DE SEGURANÇA PÚBLICA 2025 */}
        <div className="bg-black/50 rounded-2xl p-5 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Estatísticas Reais no Brasil (Anuário de Segurança Pública 2025)
            </span>
            <span className="text-[10px] text-zinc-400">Dados Consolidados</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-red-400">1.492</div>
              <div className="text-[11px] font-bold text-red-200 uppercase">Feminicídios consumados</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">3.870</div>
              <div className="text-[11px] font-bold text-amber-200 uppercase">Tentativas de feminicídio</div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-purple-300">51.866</div>
              <div className="text-[11px] font-bold text-purple-200 uppercase">Violência psicológica</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">1.067.556</div>
              <div className="text-[11px] font-bold text-emerald-200 uppercase">
                Acionamentos do 190 <span className="bg-emerald-500 text-zinc-950 px-1.5 py-0.5 rounded font-black text-[9px] block sm:inline">2 CHAMADAS / MINUTO</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* DETALHAMENTO EXPANSÍVEL DOS 5 TIPOS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-purple-900 bg-purple-100 px-3 py-1.5 rounded-full w-fit uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#9C27B0]" />
            <span>Artigo 7º da Lei Maria da Penha (Lei 11.340/2006)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
            Guia Completo dos 5 Tipos de Violência
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Clique em cada tipo para abrir os exemplos práticos, sinais de alerta e base legal correspondente.
          </p>
        </div>

        <div className="space-y-3">
          {TIPOS_VIOLENCIA.map((tipo) => {
            const isExpanded = expandedId === tipo.id;
            return (
              <div
                key={tipo.id}
                className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isExpanded ? `${tipo.corBorda} shadow-md` : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50'
                }`}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleExpand(tipo.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${tipo.corBg} flex items-center justify-center shrink-0 border border-zinc-200`}>
                      {tipo.icone}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-zinc-900 leading-tight">
                        {tipo.nome}
                      </h3>
                      <p className="text-xs font-bold text-zinc-700 mt-0.5">
                        {tipo.resumoDireto}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full hidden sm:inline-block ${tipo.corPill}`}>
                      Lei 11.340
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-zinc-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`p-5 pt-0 space-y-4 border-t ${tipo.corBorda} ${tipo.corBg}`}>
                    {/* Legal Definition */}
                    <div className="mt-4 space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                        Definição Jurídica Oficial
                      </span>
                      <p className={`text-sm font-bold ${tipo.corTexto} leading-relaxed`}>
                        {tipo.definicaoLegal}
                      </p>
                    </div>

                    {/* Practical Examples */}
                    <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-zinc-200/80 space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        Como se manifesta no cotidiano:
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed">
                        {tipo.exemplosPraticos.map((exemplo, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold shrink-0">•</span>
                            <span>{exemplo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Warning / Alert Sign */}
                    <div className="p-3 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-700 space-y-1">
                      <strong className="text-zinc-900 flex items-center gap-1">
                        ⚠️ Sinal de Alerta:
                      </strong>
                      <p>{tipo.sinaisDeAlerta}</p>
                    </div>

                    {/* Footer with Legal Ref & Copy */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                        📜 {tipo.artigo}
                      </span>

                      <button
                        onClick={() => handleCopyTipo(tipo)}
                        className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        {copiedId === tipo.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado com Sucesso!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Definição Completa</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* GUIA DE DENÚNCIA E REDES DE APOIO LOCAIS */}
      <GuiaDenunciaRedeApoio />
    </div>
  );
}
