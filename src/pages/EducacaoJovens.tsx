import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ArrowLeft,
  Share2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Users,
  Scale
} from 'lucide-react';
import CincoTiposViolencia from '../components/CincoTiposViolencia';
const campanhaMulherImg = 'https://images.unsplash.com/photo-1590424744257-f50689b02bc3?auto=format&fit=crop&q=80&w=800';

interface EducationalQuote {
  id: number;
  frase: string;
  autor: string;
  contexto: string;
}

const FRASES_CONSCIENTIZACAO: EducationalQuote[] = [
  {
    id: 1,
    frase: '“Nenhuma pessoa — mulher, homem ou qualquer outra — é propriedade de ninguém. O corpo, a vida e as escolhas pertencem somente a si.”',
    autor: 'Manifesto Não é Sua Propriedade',
    contexto: 'Ideal para reflexão em sala de aula sobre limites e individualidade nos relacionamentos.'
  },
  {
    id: 2,
    frase: '“A violência contra a mulher é toda ação baseada no gênero que cause morte, dano ou sofrimento físico, sexual ou psicológico. No Brasil, a Lei Maria da Penha divide essa violência em 5 tipos: física, psicológica, sexual, patrimonial e moral.”',
    autor: 'Lei Maria da Penha (Lei 11.340/2006, Art. 7º)',
    contexto: 'Conceito oficial e jurídico para estudos, trabalhos escolares e debates sobre direitos humanos.'
  },
  {
    id: 3,
    frase: '“Quem mata por ciúme, por controle ou por vingança comete feminicídio. A culpa NUNCA é da vítima.”',
    autor: 'Campanha Oficial 180',
    contexto: 'Desconstrução direta da culpabilização da vítima em casos de violência.'
  },
  {
    id: 4,
    frase: '“A liberdade não é um crime, é um direito inalienável de todos os seres humanos.”',
    autor: 'Declaração Universal dos Direitos Humanos',
    contexto: 'Foco na autonomia individual e respeito à dignidade humana.'
  },
  {
    id: 5,
    frase: '“Amor não vigia celular, não proíbe amizades e não ameaça. Amor cuida e liberta.”',
    autor: 'Educação para Relações Saudáveis',
    contexto: 'Para jovens identificarem os primeiros sinais sutis de relacionamento tóxico e abusivo.'
  },
  {
    id: 6,
    frase: '“Traição machuca, mas NUNCA justifica violência ou morte. Ninguém tem o direito de punir a liberdade de outrem.”',
    autor: 'Direito & Convivência Ética',
    contexto: 'Diferenciação clara entre frustração emocional e conduta criminosa inaceitável.'
  }
];

interface QuizQuestion {
  id: number;
  pergunta: string;
  opcoes: {
    texto: string;
    correta: boolean;
    explicacao: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    pergunta: 'Seu parceiro exige sua senha do celular e quer ver todas as suas conversas privadas como "prova de confiança". Essa atitude é:',
    opcoes: [
      {
        texto: 'Uma demonstração natural de zelo e transparência no casal.',
        correta: false,
        explicacao: 'Exigir senhas e vasculhar conversas é uma violação de privacidade e uma forma de controle psicológico. Confiança se constrói com diálogo, não com vigilância constante.'
      },
      {
        texto: 'Um sinal claro de comportamento controlador e invasão de privacidade.',
        correta: true,
        explicacao: 'Exato! Todo indivíduo tem direito à privacidade, mesmo em um relacionamento. A necessidade de fiscalizar revela insegurança e desejo de dominação.'
      },
      {
        texto: 'Aceitável apenas se você não tiver nada a esconder.',
        correta: false,
        explicacao: 'Não ter nada a esconder não significa abrir mão da individualidade. Exigir provas sob chantagem é sinal de alerta (red flag).'
      }
    ]
  },
  {
    id: 2,
    pergunta: 'Em uma discussão de término, uma pessoa diz: "Se você não for minha, não vai ser de mais ninguém". Como encarar essa frase?',
    opcoes: [
      {
        texto: 'Como uma ameaça grave de morte que deve ser levada muito a sério e denunciada.',
        correta: true,
        explicacao: 'Perfeito! Essa é a frase clássica de quem enxerga o parceiro como posse. É um dos principais prenúncios de feminicídio e exige medidas protetivas urgentes.'
      },
      {
        texto: 'Apenas como um desabafo dramático da boca para fora no calor da emoção.',
        correta: false,
        explicacao: 'Nunca subestime ameaças verbais. A grande maioria dos agressores expressou ameaças claras antes de consumar a violência física.'
      }
    ]
  },
  {
    id: 3,
    pergunta: 'Amigos próximos percebem que uma pessoa está se afastando de todos porque o namorado não gosta dos seus amigos e familiares. O que isso significa?',
    opcoes: [
      {
        texto: 'Ela apenas está muito apaixonada e focada na nova relação.',
        correta: false,
        explicacao: 'O isolamento da rede de apoio familiar e de amigos é a primeira tática de relacionamentos abusivos para enfraquecer a vítima.'
      },
      {
        texto: 'Tática intencional de isolamento social para torná-la dependente do agressor.',
        correta: true,
        explicacao: 'Correto! O agressor afasta a vítima de quem pode ajudá-la a enxergar os abusos. Manter amizades e vínculos familiares é vital.'
      }
    ]
  }
];

export default function EducacaoJovens() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [activeTab, setActiveTab] = useState<'frases' | '5tipos' | 'cartazes' | 'quiz' | 'roda'>('frases');

  const handleCopyFrase = (item: EducationalQuote) => {
    navigator.clipboard.writeText(`${item.frase}\n— ${item.autor}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintPoster = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-white flex items-center justify-center border border-amber-300/40">
              <GraduationCap className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                TELA 3 • EDUCAÇÃO, ESCOLAS & DIÁLOGO
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Educação & Material Pedagógico
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-medium">
            Material formatado para salas de aula, rodas de conversa com jovens e multiplicadores de conscientização.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
        <button
          onClick={() => setActiveTab('frases')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'frases'
              ? 'bg-amber-500 text-zinc-950 shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          💬 Frases com 1 Toque Copiar
        </button>
        <button
          onClick={() => setActiveTab('5tipos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === '5tipos'
              ? 'bg-amber-500 text-zinc-950 shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          ⚖️ Os 5 Tipos de Violência (Art. 7º)
        </button>
        <button
          onClick={() => setActiveTab('cartazes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'cartazes'
              ? 'bg-amber-500 text-zinc-950 shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          🖼️ Cartazes (Stories & A4)
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-amber-500 text-zinc-950 shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          🧠 Quiz Desafio da Consciência
        </button>
        <button
          onClick={() => setActiveTab('roda')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roda'
              ? 'bg-amber-500 text-zinc-950 shadow-xs'
              : 'text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          👥 Guia para Rodas de Conversa
        </button>
      </div>

      {/* TAB 1: FRASES PARA COPIAR */}
      {activeTab === 'frases' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-zinc-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Frases para Debates, Redes e Murais
            </h2>
            <span className="text-xs text-zinc-500">Toque em "Copiar" para usar</span>
          </div>

          <div className="space-y-4">
            {FRASES_CONSCIENTIZACAO.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                    {item.frase}
                  </p>
                  <button
                    onClick={() => handleCopyFrase(item)}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all shrink-0 cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-4 h-4 text-zinc-950" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Frase</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                  <span className="font-semibold text-amber-900">{item.autor}</span>
                  <span className="italic text-zinc-400">{item.contexto}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: OS 5 TIPOS DE VIOLÊNCIA (ART. 7º LEI 11.340) */}
      {activeTab === '5tipos' && (
        <CincoTiposViolencia />
      )}

      {/* TAB 2: CARTAZES (VERTICAL & A4 IMPRESSÃO) */}
      {activeTab === 'cartazes' && (
        <section className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                  Cartazes Oficiais da Campanha
                </h2>
                <p className="text-xs text-zinc-600">
                  Disponível em formato vertical (Instagram Stories / WhatsApp Status) e formato A4 para murais escolares.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPoster}
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-black text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir em Folha A4</span>
                </button>
              </div>
            </div>

            {/* Visualizer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Vertical Card */}
              <div className="bg-zinc-950 rounded-2xl p-4 flex flex-col items-center border border-zinc-800 text-center space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-[240px]">
                  <img
                    src={campanhaMulherImg}
                    alt="Cartaz Vertical"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-xs font-bold text-zinc-300">
                  📱 Versão Vertical (Stories, Reels & Status)
                </div>
              </div>

              {/* A4 Printable Layout Spec */}
              <div className="space-y-4 text-sm text-zinc-700 bg-amber-50/70 p-6 rounded-2xl border border-amber-200">
                <div className="font-black text-amber-950 uppercase text-xs">
                  📋 Orientações para Impressão e Fixação
                </div>
                <ul className="space-y-2 text-xs leading-relaxed">
                  <li>• <strong>Onde fixar:</strong> Banheiros públicos, murais de escolas, postos de saúde (UBS), academias e refeitórios.</li>
                  <li>• <strong>Formato recomendado:</strong> Folha A4 (210 x 297 mm) em papel couché ou sulfite 90g.</li>
                  <li>• <strong>Inclusão do 180:</strong> Certifique-se de que o número "Ligue 180" esteja legível a pelo menos 2 metros de distância.</li>
                </ul>

                <button
                  onClick={handlePrintPoster}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> ABRIR MODO DE IMPRESSÃO
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: QUIZ PEDAGÓGICO */}
      {activeTab === 'quiz' && (
        <section className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
            <div>
              <div className="inline-block bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase mb-2">
                Feedback Imediato & Acolhedor
              </div>
              <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">
                Quiz: Reconhecendo Sinais de Controle
              </h2>
              <p className="text-xs text-zinc-600 mt-1">
                Não é para julgar ninguém — o objetivo é refletir sobre atitudes que foram normalizadas pela sociedade, mas que são formas de controle e violência.
              </p>
            </div>

            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, qIndex) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4"
                >
                  <div className="font-bold text-sm text-zinc-900 flex items-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <span>{q.pergunta}</span>
                  </div>

                  <div className="space-y-2">
                    {q.opcoes.map((opcao, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      return (
                        <button
                          key={optIndex}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                          }
                          className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 border cursor-pointer ${
                            isSelected
                              ? opcao.correta
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                                : 'bg-red-50 border-red-400 text-red-950'
                              : 'bg-white border-zinc-200 hover:border-amber-300 text-zinc-800'
                          }`}
                        >
                          <span className="font-bold shrink-0">{String.fromCharCode(65 + optIndex)})</span>
                          <span>{opcao.texto}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box if Answered */}
                  {selectedAnswers[q.id] !== undefined && (
                    <div
                      className={`p-4 rounded-xl text-xs leading-relaxed border space-y-1 ${
                        q.opcoes[selectedAnswers[q.id]].correta
                          ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
                          : 'bg-amber-100/70 border-amber-300 text-amber-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {q.opcoes[selectedAnswers[q.id]].correta ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Explicação Construtiva:</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4 text-amber-800" />
                            <span>Vamos refletir juntos:</span>
                          </>
                        )}
                      </div>
                      <p>{q.opcoes[selectedAnswers[q.id]].explicacao}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: ROTEIRO DE RODA DE CONVERSA */}
      {activeTab === 'roda' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">
                Roteiro para Dinâmica & Rodas de Conversa
              </h2>
              <p className="text-xs text-zinc-600">
                Guia simples para educadores, psicólogos e líderes comunitários debaterem relacionamentos saudáveis.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <h3 className="font-black text-amber-900 uppercase text-xs">
                Etapa 1: Abertura e Contrato de Convivência (10 min)
              </h3>
              <p>Estabeleça um ambiente seguro: sem deboches, sem julgamentos pessoais. O que for compartilhado na sala fica na sala.</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <h3 className="font-black text-amber-900 uppercase text-xs">
                Etapa 2: Pergunta Provocadora (20 min)
              </h3>
              <p>Lance a questão: <em>"Até que ponto o ciúme é considerado normal pela nossa sociedade e em que momento ele vira crime e abuso de poder?"</em></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <h3 className="font-black text-amber-900 uppercase text-xs">
                Etapa 3: Leitura do Manifesto Coletivo (10 min)
              </h3>
              <p>Distribua cópias do manifesto <strong>"Não é Sua Propriedade"</strong> e peça para 3 jovens lerem trechos em voz alta.</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <h3 className="font-black text-amber-900 uppercase text-xs">
                Etapa 4: Fechamento com Canais de Ajuda (10 min)
              </h3>
              <p>Finalize gravando no quadro o número <strong>Ligue 180</strong> e explicando como a denúncia anônima pode salvar a vida de uma amiga ou familiar.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
