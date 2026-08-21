import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Shield, CheckCircle2, User, AlertCircle, Heart } from 'lucide-react';

interface Relato {
  id: string;
  nome: string;
  anonimo: boolean;
  avaliacao: number;
  mensagem: string;
  data: string;
}

export default function RelatosAvaliacoes() {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [nome, setNome] = useState('');
  const [anonimo, setAnonimo] = useState(true);
  const [avaliacao, setAvaliacao] = useState(5);
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('relatos_violencia');
    if (saved) {
      try {
        setRelatos(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    } else {
      // Relatos iniciais simulados
      const iniciais: Relato[] = [
        {
          id: '1',
          nome: 'Anônima',
          anonimo: true,
          avaliacao: 5,
          mensagem: 'Este guia me ajudou a entender que o que eu estava passando não era normal. Consegui ligar para o 180 e recebi orientação. Muito obrigada por essa iniciativa, salva vidas.',
          data: new Date(Date.now() - 86400000 * 2).toLocaleDateString('pt-BR')
        },
        {
          id: '2',
          nome: 'Maria Silva',
          anonimo: false,
          avaliacao: 5,
          mensagem: 'Os botões de comando rápido são essenciais. É muito difícil pensar com clareza no momento do pânico. Agora sei exatamente onde clicar se precisar acionar a polícia.',
          data: new Date(Date.now() - 86400000 * 5).toLocaleDateString('pt-BR')
        }
      ];
      setRelatos(iniciais);
      localStorage.setItem('relatos_violencia', JSON.stringify(iniciais));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novoRelato: Relato = {
      id: Date.now().toString(),
      nome: anonimo || !nome.trim() ? 'Anônima' : nome,
      anonimo,
      avaliacao,
      mensagem,
      data: new Date().toLocaleDateString('pt-BR')
    };

    const novosRelatos = [novoRelato, ...relatos];
    setRelatos(novosRelatos);
    localStorage.setItem('relatos_violencia', JSON.stringify(novosRelatos));
    
    setMensagem('');
    setNome('');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xl space-y-8">
      
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black uppercase tracking-wider">
          <Heart className="w-4 h-4 text-rose-600" />
          <span>Espaço de Acolhimento</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight">
          Relatos e Avaliações
        </h2>
        <p className="text-sm text-zinc-600 font-medium">
          Sua voz importa. Compartilhe sua experiência (de forma anônima e segura) para encorajar outras mulheres e nos ajude a melhorar esta plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORMULÁRIO DE RELATO */}
        <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-5 border border-zinc-200 shadow-sm">
          <div className="mb-4">
            <h3 className="font-black text-lg text-zinc-900 uppercase">Deixe seu relato</h3>
            <p className="text-xs text-zinc-500 font-medium mt-1">Este é um espaço seguro. Você pode optar por não se identificar.</p>
          </div>
          
          {enviado ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-black text-emerald-950 text-lg">Relato Recebido!</div>
                <div className="text-sm text-emerald-800 mt-1">Sua voz fortalece a nossa rede de apoio. Muito obrigada por compartilhar.</div>
              </div>
              <button 
                onClick={() => setEnviado(false)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Escrever outro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Avaliação em Estrelas */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 uppercase">Como você avalia este guia?</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setAvaliacao(star)}
                      className={`p-1.5 rounded-lg transition-colors ${avaliacao >= star ? 'text-amber-500 hover:text-amber-600' : 'text-zinc-300 hover:text-zinc-400'}`}
                    >
                      <Star className="w-6 h-6" fill={avaliacao >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    id="anonimo"
                    checked={anonimo}
                    onChange={(e) => setAnonimo(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-zinc-300 cursor-pointer"
                  />
                  <label htmlFor="anonimo" className="text-sm font-bold text-zinc-700 cursor-pointer">
                    Manter meu relato anônimo (Recomendado)
                  </label>
                </div>

                {!anonimo && (
                  <div>
                    <label className="text-xs font-bold text-zinc-700 uppercase mb-1 block">Seu Nome (Opcional)</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Como gostaria de ser chamada?"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 uppercase mb-1 block">Seu Relato / Mensagem</label>
                <textarea
                  required
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Compartilhe sua experiência, ou deixe uma avaliação sobre como essa plataforma te ajudou..."
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-y"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-xl flex items-start gap-2 border border-blue-100">
                <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-900 font-medium leading-relaxed">
                  Seu relato é salvo localmente de forma segura. Lembre-se: em caso de emergência imediata, use os botões rápidos para ligar 190.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Publicar Relato</span>
              </button>
            </form>
          )}
        </div>

        {/* LISTA DE RELATOS */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="font-black text-lg text-zinc-900 uppercase">Relatos Recentes</h3>
            <span className="text-xs font-bold bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full">
              {relatos.length} publicações
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
            {relatos.length === 0 ? (
              <div className="text-center py-10 bg-zinc-50 rounded-2xl border border-dashed border-zinc-300">
                <MessageSquare className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-zinc-500">Nenhum relato publicado ainda.</p>
                <p className="text-xs text-zinc-400">Seja a primeira a compartilhar sua experiência.</p>
              </div>
            ) : (
              relatos.map((relato) => (
                <div key={relato.id} className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <div className="font-black text-sm text-zinc-900 flex items-center gap-1.5">
                          {relato.nome}
                          {relato.anonimo && (
                            <span className="text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded-md uppercase font-bold tracking-wider">
                              Anônimo
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500">{relato.data}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-3.5 h-3.5" 
                          fill={relato.avaliacao >= star ? "#F59E0B" : "none"} 
                          color={relato.avaliacao >= star ? "#F59E0B" : "#D4D4D8"} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                    "{relato.mensagem}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
