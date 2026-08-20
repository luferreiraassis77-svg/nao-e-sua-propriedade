import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wrench, 
  Search, 
  PhoneCall, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Key, 
  Droplets, 
  Hammer, 
  Car, 
  Paintbrush, 
  Send, 
  HeartHandshake,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { 
  NeighborhoodProfessional, 
  CommunityHelpRequest, 
  INITIAL_PROFESSIONALS 
} from '../types';

export default function NeighborhoodServices() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for directory & filters
  const [professionals, setProfessionals] = useState<NeighborhoodProfessional[]>(() => {
    const saved = localStorage.getItem('resolve_ai_professionals');
    return saved ? JSON.parse(saved) : INITIAL_PROFESSIONALS;
  });

  const [communityRequests, setCommunityRequests] = useState<CommunityHelpRequest[]>(() => {
    const saved = localStorage.getItem('resolve_ai_community_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'req-1',
        citizenName: 'Dona Maria S.',
        citizenPhone: '(11) 99123-4567',
        title: 'Chuveiro queimou e desarmou disjuntor principal',
        category: 'Eletricista',
        neighborhood: 'Vila Mariana',
        urgency: 'Emergência',
        description: 'Moro sozinha, sou idosa e fiquei sem energia no banheiro. Preciso de troca do chuveiro e revisão do disjuntor.',
        createdAt: 'Hoje às 08:30',
        status: 'Aberto'
      },
      {
        id: 'req-2',
        citizenName: 'Carlos Mendonça',
        citizenPhone: '(11) 98234-5678',
        title: 'Chave quebrou dentro do tambor da porta da frente',
        category: 'Chaveiro',
        neighborhood: 'Centro Histórico',
        urgency: 'Emergência',
        description: 'A chave partiu ao meio e não consigo entrar em casa. Preciso de chaveiro urgente.',
        createdAt: 'Hoje às 09:15',
        status: 'Em Atendimento'
      },
      {
        id: 'req-3',
        citizenName: 'Juliana Costa',
        citizenPhone: '(11) 97345-6789',
        title: 'Vazamento embaixo da pia da cozinha inundando o piso',
        category: 'Encanador',
        neighborhood: 'Jardins',
        urgency: 'Alta',
        description: 'Registro já fechado mas preciso de reparo no sifão e cano que estourou.',
        createdAt: 'Ontem às 17:00',
        status: 'Aberto'
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<'directory' | 'request-help' | 'register-pro'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('Todos');
  const [only24h, setOnly24h] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // New Request Form State
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState('Eletricista');
  const [reqNeighborhood, setReqNeighborhood] = useState('');
  const [reqUrgency, setReqUrgency] = useState<'Normal' | 'Alta' | 'Emergência'>('Emergência');
  const [reqPhone, setReqPhone] = useState(user?.phone || '');
  const [reqName, setReqName] = useState(user?.name || '');
  const [reqDescription, setReqDescription] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // New Professional Form State
  const [proName, setProName] = useState('');
  const [proTrade, setProTrade] = useState('Eletricista de Emergência');
  const [proIcon, setProIcon] = useState('⚡');
  const [proPhone, setProPhone] = useState('');
  const [proNeighborhood, setProNeighborhood] = useState('');
  const [proDescription, setProDescription] = useState('');
  const [proSkills, setProSkills] = useState('');
  const [pro24h, setPro24h] = useState(true);
  const [proRegistered, setProRegistered] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('resolve_ai_professionals', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('resolve_ai_community_requests', JSON.stringify(communityRequests));
  }, [communityRequests]);

  // Filter professionals
  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTrade = selectedTrade === 'Todos' || p.trade.toLowerCase().includes(selectedTrade.toLowerCase());
    const matches24h = !only24h || p.is24Hours;
    const matchesVerified = !onlyVerified || p.isVerified;

    return matchesSearch && matchesTrade && matches24h && matchesVerified;
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle || !reqDescription || !reqNeighborhood || !reqPhone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newReq: CommunityHelpRequest = {
      id: `req-${Date.now()}`,
      citizenName: reqName || 'Morador do Bairro',
      citizenPhone: reqPhone,
      title: reqTitle,
      category: reqCategory,
      neighborhood: reqNeighborhood,
      urgency: reqUrgency,
      description: reqDescription,
      createdAt: 'Agora',
      status: 'Aberto'
    };

    setCommunityRequests([newReq, ...communityRequests]);
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setReqTitle('');
      setReqDescription('');
    }, 4000);
  };

  const handleRegisterPro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proName || !proPhone || !proNeighborhood || !proDescription) {
      alert('Por favor, preencha todos os dados do profissional.');
      return;
    }

    const cleanPhone = proPhone.replace(/\D/g, '');
    const newPro: NeighborhoodProfessional = {
      id: `prof-${Date.now()}`,
      name: proName,
      trade: proTrade,
      icon: proIcon,
      phone: proPhone,
      whatsapp: `55${cleanPhone}`,
      neighborhood: proNeighborhood,
      rating: 5.0,
      totalReviews: 1,
      isVerified: true,
      is24Hours: pro24h,
      isAvailableNow: true,
      description: proDescription,
      skills: proSkills.split(',').map(s => s.trim()).filter(Boolean),
      responseTimeMinutes: 30
    };

    setProfessionals([newPro, ...professionals]);
    setProRegistered(true);
    setTimeout(() => {
      setProRegistered(false);
      setProName('');
      setProPhone('');
      setProNeighborhood('');
      setProDescription('');
      setProSkills('');
      setActiveTab('directory');
    }, 3000);
  };

  const openWhatsApp = (whatsappNumber: string, proName: string, trade: string) => {
    const text = encodeURIComponent(
      `Olá ${proName}! Encontrei seu contato no aplicativo *Resolve Aí* para serviços de *${trade}*. Gostaria de um orçamento / atendimento no meu bairro.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner & Quick Command Hero */}
      <section className="bg-gradient-to-r from-amber-700 via-zinc-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-amber-200 text-xs font-semibold backdrop-blur-md">
            <Wrench className="w-4 h-4 text-amber-300" />
            Rede de Apoio & Profissionais do Bairro
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Reparos Rápidos, Chaveiro & Eletricistas no seu Bairro
          </h1>

          <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Precisa de socorro imediato para a casa ou comércio? <strong>Acesse comandos diretos em 1 clique</strong> para ligar ou chamar no WhatsApp profissionais verificados e pedir ajuda à comunidade.
          </p>

          {/* 1-Click SOS Repairs Action Matrix */}
          <div className="pt-3">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Botões de Comando Imediato (Emergências 24h)
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              <button
                onClick={() => {
                  setSelectedTrade('Chaveiro');
                  setActiveTab('directory');
                }}
                className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black p-3 rounded-2xl shadow-md transition-all text-xs flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">🔑</span>
                  <span className="text-[10px] bg-zinc-950 text-amber-400 px-2 py-0.5 rounded-md">24H</span>
                </div>
                <div className="font-bold text-xs mt-1.5">Chaveiro Urgente</div>
                <div className="text-[10px] font-normal text-zinc-800">Porta & Fechadura</div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrade('Eletricista');
                  setActiveTab('directory');
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-black p-3 rounded-2xl shadow-md transition-all text-xs flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">⚡</span>
                  <span className="text-[10px] bg-zinc-950 text-yellow-300 px-2 py-0.5 rounded-md">SOS</span>
                </div>
                <div className="font-bold text-xs mt-1.5">Eletricista / Pane</div>
                <div className="text-[10px] font-normal text-zinc-800">Curto & Disjuntor</div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrade('Encanador');
                  setActiveTab('directory');
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white font-black p-3 rounded-2xl shadow-md transition-all text-xs flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">🚰</span>
                  <span className="text-[10px] bg-white text-sky-800 px-2 py-0.5 rounded-md font-bold">VAZAMENTO</span>
                </div>
                <div className="font-bold text-xs mt-1.5">Encanador / Cano</div>
                <div className="text-[10px] font-normal text-sky-100">Desentupidora</div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrade('Marido de Aluguel');
                  setActiveTab('directory');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black p-3 rounded-2xl border border-white/20 shadow-md transition-all text-xs flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">🛠️</span>
                  <span className="text-[10px] bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-md font-bold">GERAL</span>
                </div>
                <div className="font-bold text-xs mt-1.5">Marido de Aluguel</div>
                <div className="text-[10px] font-normal text-zinc-300">Pequenos Reparos</div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrade('Mecânico');
                  setActiveTab('directory');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black p-3 rounded-2xl shadow-md transition-all text-xs flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">🚗</span>
                  <span className="text-[10px] bg-white text-emerald-900 px-2 py-0.5 rounded-md font-bold">GUINCHO</span>
                </div>
                <div className="font-bold text-xs mt-1.5">Socorro Auto 24h</div>
                <div className="text-[10px] font-normal text-emerald-100">Bateria & Pneu</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Emergency Alert Card (Dica de Segurança para Pane Elétrica e Vazamento) */}
      <section className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-200 text-amber-900 rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-amber-900">
              ⚡ Dica de Segurança em Emergências Residenciais:
            </h3>
            <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
              • Em caso de cheiro de queimado ou faísca: <strong>desligue imediatamente o disjuntor geral</strong> no quadro de luz.<br />
              • Em vazamentos graves de água: <strong>feche o registro geral (borboleta)</strong> antes de chamar o encanador.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('request-help')}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          Pedir Ajuda no Bairro
        </button>
      </section>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Wrench className="w-4 h-4" /> Profissionais do Bairro ({filteredProfessionals.length})
          </button>

          <button
            onClick={() => setActiveTab('request-help')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'request-help'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> Pedir Socorro / Reparo ({communityRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('register-pro')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'register-pro'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Sou Profissional (Cadastrar)
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECTORY OF PROFESSIONALS */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          
          {/* Filters and Search Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2 relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Buscar por profissão (chaveiro, eletricista, pedreiro) ou bairro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                >
                  <option value="Todos">Todas as Categorias</option>
                  <option value="Chaveiro">🔑 Chaveiro</option>
                  <option value="Eletricista">⚡ Eletricista</option>
                  <option value="Encanador">🚰 Encanador & Desentupidora</option>
                  <option value="Marido de Aluguel">🛠️ Marido de Aluguel</option>
                  <option value="Pedreiro">🧱 Pedreiro & Obras</option>
                  <option value="Mecânico">🚗 Socorro Mecânico & Guincho</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOnly24h(!only24h)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    only24h ? 'bg-amber-600 text-white border-amber-600' : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> 24 Horas
                </button>

                <button
                  type="button"
                  onClick={() => setOnlyVerified(!onlyVerified)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    onlyVerified ? 'bg-blue-600 text-white border-blue-600' : 'bg-zinc-50 text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Verificados
                </button>
              </div>
            </div>
          </div>

          {/* Professionals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProfessionals.map((prof) => (
              <div
                key={prof.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl shadow-2xs">
                        {prof.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-zinc-900 leading-tight">
                            {prof.name}
                          </h3>
                          {prof.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" title="Profissional Verificado pelo Resolve Aí" />
                          )}
                        </div>
                        <span className="inline-block mt-0.5 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          {prof.trade}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-amber-900 text-xs font-black shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{prof.rating}</span>
                      <span className="text-[10px] text-zinc-400 font-normal">({prof.totalReviews})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-3">
                    {prof.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {prof.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Location & Time info */}
                  <div className="space-y-1.5 text-xs text-zinc-500 border-t border-zinc-100 pt-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{prof.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>
                        {prof.is24Hours ? 'Atendimento 24h Emergencial' : 'Horário Comercial'} • Chegada ~{prof.responseTimeMinutes}min
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1-Click Action Buttons: Call & WhatsApp */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                  <a
                    href={`tel:${prof.phone.replace(/\D/g, '')}`}
                    className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Ligar Agora
                  </a>

                  <button
                    type="button"
                    onClick={() => openWhatsApp(prof.whatsapp, prof.name, prof.trade)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200">
              <Wrench className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="font-bold text-zinc-700">Nenhum profissional encontrado</h3>
              <p className="text-xs text-zinc-500 mt-1">Tente ajustar os filtros ou o termo de busca.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REQUEST COMMUNITY HELP / REPAIRS */}
      {activeTab === 'request-help' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form to Post Help Request */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-lg mb-2">
                📢 Mural Comunitário
              </div>
              <h2 className="text-lg font-bold text-zinc-900">
                Pedir Socorro / Reparo no Bairro
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Poste o que você está precisando para que profissionais e vizinhos próximos entrem em contato rapidamente.
              </p>
            </div>

            {requestSubmitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-sm">Pedido Publicado com Sucesso!</h3>
                <p className="text-xs text-emerald-700">
                  Os profissionais da sua região foram notificados no mural.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Qual reparo você precisa? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Chaveiro para abrir porta trancada"
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Especialidade
                    </label>
                    <select
                      value={reqCategory}
                      onChange={(e) => setReqCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                    >
                      <option value="Eletricista">⚡ Eletricista</option>
                      <option value="Chaveiro">🔑 Chaveiro</option>
                      <option value="Encanador">🚰 Encanador</option>
                      <option value="Marido de Aluguel">🛠️ Marido de Aluguel</option>
                      <option value="Pedreiro">🧱 Pedreiro / Obras</option>
                      <option value="Mecânico">🚗 Socorro Mecânico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Urgência
                    </label>
                    <select
                      value={reqUrgency}
                      onChange={(e) => setReqUrgency(e.target.value as any)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                    >
                      <option value="Emergência">🚨 Imediata / Emergência</option>
                      <option value="Alta">⚡ Alta (Hoje)</option>
                      <option value="Normal">📅 Normal (Agendar)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Bairro / Região *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Centro / Vila Nova"
                    value={reqNeighborhood}
                    onChange={(e) => setReqNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Seu Nome & Telefone / WhatsApp *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="(XX) 99999-9999"
                      value={reqPhone}
                      onChange={(e) => setReqPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Detalhes do problema *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Descreva o que aconteceu (ex: disjuntor desarmou e não arma mais, chave emperrada...)"
                    value={reqDescription}
                    onChange={(e) => setReqDescription(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Publicar Pedido de Ajuda
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Community Help Requests Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 text-sm">
                Pedidos de Socorro Ativos no Município ({communityRequests.length})
              </h3>
              <span className="text-xs text-zinc-400">Atualizado em tempo real</span>
            </div>

            <div className="space-y-3">
              {communityRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          req.urgency === 'Emergência'
                            ? 'bg-red-100 text-red-800 animate-pulse'
                            : req.urgency === 'Alta'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {req.urgency}
                        </span>
                        <span className="text-xs font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md">
                          {req.category}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {req.createdAt}
                        </span>
                      </div>
                      <h4 className="font-bold text-zinc-900 text-sm">
                        {req.title}
                      </h4>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      req.status === 'Aberto' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {req.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-100 text-xs">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{req.neighborhood}</span> • <span>Solicitante: <strong>{req.citizenName}</strong></span>
                    </div>

                    <a
                      href={`tel:${req.citizenPhone.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Ligar / Oferecer Ajuda: {req.citizenPhone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REGISTER AS A NEIGHBORHOOD PROFESSIONAL */}
      {activeTab === 'register-pro' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-2xl">
              🤝
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              Cadastre-se como Profissional no Resolve Aí
            </h2>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Presta serviços de eletricista, chaveiro, encanador ou reformas? Cadastre seu contato gratuitamente para atender chamados no seu bairro.
            </p>
          </div>

          {proRegistered ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-base">Cadastro Concluído!</h3>
              <p className="text-xs text-emerald-700">
                Seu perfil foi adicionado ao diretório municipal e já está disponível para os moradores da região.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterPro} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Nome do Profissional / Empresa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João Eletricista 24h"
                  value={proName}
                  onChange={(e) => setProName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Especialidade Principal *
                  </label>
                  <select
                    value={proTrade}
                    onChange={(e) => {
                      setProTrade(e.target.value);
                      if (e.target.value.includes('Chaveiro')) setProIcon('🔑');
                      else if (e.target.value.includes('Eletricista')) setProIcon('⚡');
                      else if (e.target.value.includes('Encanador')) setProIcon('🚰');
                      else if (e.target.value.includes('Marido')) setProIcon('🛠️');
                      else if (e.target.value.includes('Mecânico')) setProIcon('🚗');
                      else if (e.target.value.includes('Pedreiro')) setProIcon('🧱');
                    }}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option value="Eletricista de Emergência">⚡ Eletricista de Emergência</option>
                    <option value="Chaveiro 24h">🔑 Chaveiro 24h</option>
                    <option value="Encanador & Desentupidora">🚰 Encanador & Desentupidora</option>
                    <option value="Marido de Aluguel">🛠️ Marido de Aluguel</option>
                    <option value="Pedreiro & Reformas">🧱 Pedreiro & Reformas</option>
                    <option value="Mecânico & Guincho 24h">🚗 Mecânico & Guincho 24h</option>
                    <option value="Pintor Residencial">🎨 Pintor Residencial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Telefone & WhatsApp de Atendimento *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={proPhone}
                    onChange={(e) => setProPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Bairros / Regiões que você atende *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Centro, Zona Sul, Bairro X"
                    value={proNeighborhood}
                    onChange={(e) => setProNeighborhood(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Habilidades (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Troca de disjuntor, Chuveiro, Curto-circuito"
                    value={proSkills}
                    onChange={(e) => setProSkills(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Breve apresentação dos seus serviços *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ex: Atendimento rápido com emissão de nota, certificado NR10, experiência de 10 anos em manutenção predial e residencial..."
                  value={proDescription}
                  onChange={(e) => setProDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <input
                  type="checkbox"
                  id="pro24h"
                  checked={pro24h}
                  onChange={(e) => setPro24h(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="pro24h" className="text-xs text-zinc-700 font-semibold cursor-pointer">
                  Disponível para atendimentos emergenciais 24 Horas
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Concluir Cadastro Gratuito
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
