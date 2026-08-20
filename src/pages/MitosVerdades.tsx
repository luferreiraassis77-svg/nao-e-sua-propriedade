import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  XCircle,
  CheckCircle2,
  Scale,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  ShieldAlert,
  Info
} from 'lucide-react';

interface MythFact {
  id: number;
  mito: string;
  verdade: string;
  explicacao: string;
  artigoLegal?: string;
}

const MITOS_VERDADES: MythFact[] = [
  {
    id: 1,
    mito: '“Ele matou porque estava cego de ciúmes / Foi um crime passional por amor.”',
    verdade: 'Ciúme e posse não são amor — são controle. Crime passional NÃO existe no Código Penal.',
    explicacao: 'O STF já sepultou a tese da "legítima defesa da honra", declarando-a inconstitucional. Quem mata companheira por não aceitar a separação ou por ciúmes comete homicídio qualificado por motivo fútil/torpe e feminicídio (Lei 13.104/15). Amor preserva e respeita a autonomia; posse destrói.',
    artigoLegal: 'STF ADPF 779 (Inconstitucionalidade da legítima defesa da honra) & Art. 121, § 2º, VI do CP.'
  },
  {
    id: 2,
    mito: '“Traição justifica agressão física ou morte.”',
    verdade: 'Traição NÃO justifica morte. Nenhuma traição é crime capital nem retira a dignidade humana de ninguém.',
    explicacao: 'A infidelidade pode ser motivo para o término de uma relação civil, mas jamais para qualquer tipo de violência física, verbal ou letal. Nenhuma pessoa é propriedade privada de outra. A vida e a integridade física são bens jurídicos absolutos e inegociáveis.',
    artigoLegal: 'Constituição Federal, Art. 5º (Direito Inviolável à Vida e Dignidade).'
  },
  {
    id: 3,
    mito: '“Em briga de marido e mulher não se mete a colher.”',
    verdade: 'Em briga de casal se mete a colher SIM — para salvar vidas. Denunciar é dever cívico.',
    explicacao: 'A violência doméstica é uma questão de segurança pública e violação de direitos humanos, não mero conflito privado. A ação penal na Lei Maria da Penha é pública incondicionada em casos de lesão corporal. Ligar 190 ao ouvir gritos ou agressões pode evitar um feminicídio iminente.',
    artigoLegal: 'STF ADI 4424 (Ação penal pública incondicionada na Lei Maria da Penha).'
  },
  {
    id: 4,
    mito: '“A mulher provocou o agressor com suas roupas, atitudes ou palavras.”',
    verdade: 'A culpa NUNCA é da vítima. A responsabilidade é 100% exclusiva de quem agride.',
    explicacao: 'Transferir a culpa para a vítima (victim blaming) é uma estratégia machista para justificar o injustificável. Nenhuma roupa, comportamento, opinião ou decisão de sair justifica violência. Cada indivíduo é integralmente responsável por seus próprios atos e autocontrole.',
    artigoLegal: 'Convenção Interamericana para Prevenir, Punir e Erradicar a Violência contra a Mulher (Convenção de Belém do Pará).'
  },
  {
    id: 5,
    mito: '“Ela só não vai embora porque gosta de apanhar ou porque não quer.”',
    verdade: 'O rompimento é a fase mais perigosa. A vítima enfrenta ciclo de violência, dependência e ameaça à vida.',
    explicacao: 'A violência doméstica opera em ciclo (tensão, explosão e "lua de mel"). A vítima costuma sofrer isolamento social proposital, dependência financeira, destruição da autoestima e ameaças diretas contra sua vida e a de seus filhos. Mais de 60% dos feminicídios ocorrem exatamente quando a mulher tenta terminar.',
    artigoLegal: 'Art. 7º da Lei 11.340/2006 (Formas de Violência Psicológica, Patrimonial e Moral).'
  },
  {
    id: 6,
    mito: '“Homens são naturalmente violentos e perdem a cabeça sob estresse ou bebida.”',
    verdade: 'Violência é comportamento aprendido e escolha moral, não biologia incontrolável.',
    explicacao: 'O agressor raramente "perde a cabeça" com o chefe no trabalho ou com policiais armados na rua; ele escolhe descarregar sua violência na mulher dentro do ambiente doméstico onde acredita ter impunidade. O álcool pode ser desinibidor, mas não é a causa do machismo estrutural.',
    artigoLegal: 'Código Penal, Art. 28, II (A embriaguez não exclui a imputabilidade penal).'
  }
];

export default function MitosVerdades() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (item: MythFact) => {
    const text = `❌ MITO: ${item.mito}\n✅ VERDADE: ${item.verdade}\n💡 EXPLICAÇÃO: ${item.explicacao}\n#NaoESuaPropriedade #Ligue180`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        <div className="bg-gradient-to-r from-purple-900 via-[#4A148C] to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-400/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 text-white flex items-center justify-center border border-purple-300/40">
              <HelpCircle className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <span className="text-xs font-black text-purple-300 uppercase tracking-wider">
                TELA 1 • DESCONSTRUÇÃO SOCIAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Mitos & Verdades
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-medium">
            Combate direto às ideias perigosas e desculpas culturais usadas para justificar controle, agressão e assassinatos.
          </p>
        </div>
      </div>

      {/* BLOCOS SEPARADOS COM MITO (VERMELHO CLARO) E VERDADE (VERDE CLARO) */}
      <div className="space-y-6">
        {MITOS_VERDADES.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-md space-y-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs font-black text-purple-900 bg-purple-100 px-3 py-1 rounded-full uppercase">
                Tópico #{idx + 1}
              </span>
              <button
                onClick={() => handleCopy(item)}
                className="text-xs font-bold text-zinc-600 hover:text-purple-700 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-50 hover:bg-purple-50 border border-zinc-200 transition-all cursor-pointer"
                title="Copiar este item para compartilhar"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* ❌ MITO (VERMELHO CLARO) */}
            <div className="bg-red-50/90 border-2 border-red-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-red-800">
                  ❌ MITO PERIGOSO
                </div>
                <div className="text-base sm:text-lg font-bold text-red-950 leading-snug">
                  {item.mito}
                </div>
              </div>
            </div>

            {/* ✅ VERDADE (VERDE CLARO) */}
            <div className="bg-emerald-50/90 border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  ✅ VERDADE & REALIDADE
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-950 leading-snug">
                  {item.verdade}
                </div>
              </div>
            </div>

            {/* EXPLICAÇÃO APROFUNDADA */}
            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 text-sm text-zinc-800 leading-relaxed space-y-2">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                <Info className="w-4 h-4 text-purple-700" /> Por que isso é verdade?
              </div>
              <p>{item.explicacao}</p>
              {item.artigoLegal && (
                <div className="text-xs font-semibold text-purple-900 pt-1 border-t border-zinc-200/80">
                  ⚖️ Base Legal: {item.artigoLegal}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SEÇÃO FINAL: LEIS FUNDAMENTAIS BRASILEIRAS (LEI 13.104 & LEI 11.340) */}
      <section className="bg-gradient-to-br from-zinc-900 via-purple-950 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-500/40 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#9C27B0] text-white flex items-center justify-center font-black shadow-md shrink-0">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Legislação Brasileira de Proteção
            </h2>
            <p className="text-xs sm:text-sm text-purple-200">
              Conheça as leis federais que garantem a punição rigorosa de agressores e protegem a vida da mulher.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Lei do Feminicídio */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-purple-400/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-block bg-purple-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Lei Federal 13.104 / 2015
              </div>
              <h3 className="text-lg font-bold text-white">Lei do Feminicídio</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Classifica o assassinato de mulheres motivado por violência doméstica ou menosprezo à condição de mulher como <strong>homicídio qualificado e crime hediondo</strong>, com penas de 12 a 30 anos de reclusão.
              </p>
            </div>
            <a
              href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13104.htm"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#BA68C8] hover:bg-[#AB47BC] text-zinc-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>LER LEI 13.104 NA ÍNTEGRA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Lei Maria da Penha */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-purple-400/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-block bg-purple-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Lei Federal 11.340 / 2006
              </div>
              <h3 className="text-lg font-bold text-white">Lei Maria da Penha</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Cria mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher, definindo 5 formas de violência: <strong>física, psicológica, sexual, patrimonial e moral</strong>, e estabelece Medidas Protetivas de Urgência (MPU).
              </p>
            </div>
            <a
              href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#BA68C8] hover:bg-[#AB47BC] text-zinc-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>LER LEI 11.340 NA ÍNTEGRA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
