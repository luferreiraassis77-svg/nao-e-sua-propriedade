import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Issue, SYSTEM_CATEGORIES } from '../types';
import { useAuth } from '../contexts/AuthContext';
import IssueCard from '../components/IssueCard';
import MapView from '../components/MapView';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Map as MapIcon, 
  LayoutGrid, 
  AlertCircle, 
  FileSearch, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  Shield,
  Baby,
  PhoneCall,
  ShieldAlert,
  Flame,
  Utensils,
  Wrench,
  MessageSquare,
  Calendar,
  Clock,
  RefreshCw
} from 'lucide-react';
import { EMERGENCY_COMMANDS } from '../types';
import campanhaMulherImg from '../assets/images/campanha_feminicidio_180_1787223865455.jpg';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [protocolSearch, setProtocolSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'ocorrencias'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesList: Issue[] = [];
      snapshot.forEach((doc) => {
        issuesList.push({ id: doc.id, ...doc.data() } as Issue);
      });
      setIssues(issuesList);
      setLoading(false);
    }, (error) => {
      console.error("Error reading occurrences from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProtocolSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolSearch.trim()) return;
    const cleanProtocol = protocolSearch.trim().toUpperCase();
    navigate(`/issue/${cleanProtocol}`);
  };

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Todos' || issue.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalResolved = issues.filter(i => i.status === 'Resolvido').length;
  const totalUrgent = issues.filter(i => i.priority === 'Urgente' && i.status !== 'Resolvido').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Greeting & Action Header (Tela 3) */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" /> Portal Cidadão Resolve Aí
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Olá, {user ? user.name.split(' ')[0] : 'Cidadão'}! 👋
          </h1>
          
          <p className="text-blue-100/90 text-sm sm:text-base font-light">
            O que você encontrou na cidade hoje? Registre uma ocorrência e acompanhe as providências públicas em tempo real.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/report"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5 text-blue-600" />
              REGISTRAR PROBLEMA
            </Link>

            <Link
              to="/social"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              Acolhimento & Vulnerabilidade
            </Link>

            <Link
              to="/map"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl border border-white/20 text-sm transition-all flex items-center gap-2"
            >
              <MapIcon className="w-4 h-4" />
              Ver Mapa Completo
            </Link>
          </div>
        </div>
      </section>

      {/* ALERTA SOS: SAÚDE MENTAL, DEPRESSÃO & PREVENÇÃO AO SUICÍDIO 188 */}
      <section className="bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-zinc-900/10 rounded-3xl p-5 sm:p-6 border-2 border-amber-400 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-xs">
              💛
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-zinc-950 tracking-tight flex items-center gap-2">
                SOS Saúde Mental, Depressão & Prevenção ao Suicídio
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full animate-pulse">
                  24h Grátis
                </span>
              </h2>
              <p className="text-xs text-zinc-700">
                Acolhimento emocional humanizado, sigiloso e sem julgamento pelo <strong>CVV 188</strong>, <strong>SAMU 192</strong> e rede <strong>CAPS</strong>.
              </p>
            </div>
          </div>

          <Link
            to="/saude-mental"
            className="inline-flex items-center gap-1.5 text-xs font-black text-amber-950 hover:underline shrink-0 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-xl border border-amber-500"
          >
            Abrir Central SOS 188 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Action Buttons Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <a
            href="tel:188"
            className="p-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-2xl font-black shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">💛</span>
              <span className="text-[10px] bg-zinc-950 text-amber-300 font-black px-2 py-0.5 rounded-md">
                188
              </span>
            </div>
            <div className="font-black text-xs">Ligue 188 (CVV)</div>
            <div className="text-[10px] text-zinc-900 font-bold mt-0.5">Apoio Emocional 24h</div>
          </a>

          <a
            href="tel:192"
            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🚑</span>
              <span className="text-[10px] bg-white text-red-700 font-black px-2 py-0.5 rounded-md">
                192
              </span>
            </div>
            <div className="font-black text-xs">SAMU 192</div>
            <div className="text-[10px] text-red-100 mt-0.5">Socorro e Urgência</div>
          </a>

          <a
            href="https://cvv.org.br/chat/"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white hover:bg-amber-50 text-amber-950 rounded-2xl border border-amber-300 shadow-2xs transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">💬</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                CHAT
              </span>
            </div>
            <div className="font-bold text-xs">Chat CVV Online</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Mensagens de Texto</div>
          </a>

          <Link
            to="/saude-mental"
            className="p-3 bg-zinc-900 hover:bg-black text-amber-300 rounded-2xl shadow-xs transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🧘</span>
              <span className="text-[10px] bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded-md">
                4-7-8
              </span>
            </div>
            <div className="font-bold text-xs">Desarmar Crise & CAPS</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Exercício e Rede SUS</div>
          </Link>
        </div>
      </section>

      {/* ONE-CLICK COMMANDS & SOCIAL PROTECTION BANNER (Todos Comandos no Botão) */}
      <section className="bg-gradient-to-r from-emerald-50 via-rose-50 to-purple-50 rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-zinc-900 tracking-tight flex items-center gap-2">
                Cuidados com Animais, Idosos, Mulheres & Jovens
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  1 Clique
                </span>
              </h2>
              <p className="text-xs text-zinc-600">
                Linha direta de denúncia de maus-tratos a animais, proteção aos idosos, mulheres, crianças e apoio social.
              </p>
            </div>
          </div>

          <Link
            to="/social"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline shrink-0"
          >
            Ver Central Completa <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Action Buttons Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          <a
            href="tel:190"
            className="p-3 bg-white hover:bg-emerald-700 text-emerald-950 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🐾</span>
              <span className="text-[10px] bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-black px-2 py-0.5 rounded-md">
                190
              </span>
            </div>
            <div className="font-bold text-xs">Proteção Animal</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-emerald-100 mt-0.5">Maus-Tratos / CCZ</div>
          </a>

          <a
            href="tel:100"
            className="p-3 bg-white hover:bg-purple-700 text-purple-950 hover:text-white rounded-2xl border border-purple-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">👵</span>
              <span className="text-[10px] bg-purple-100 group-hover:bg-white group-hover:text-purple-800 text-purple-900 font-black px-2 py-0.5 rounded-md">
                100
              </span>
            </div>
            <div className="font-bold text-xs">Direitos do Idoso</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-purple-100 mt-0.5">Negligência & ILPI</div>
          </a>

          <a
            href="tel:180"
            className="p-3 bg-white hover:bg-rose-600 text-rose-950 hover:text-white rounded-2xl border border-rose-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🛡️</span>
              <span className="text-[10px] bg-rose-100 group-hover:bg-white group-hover:text-rose-800 text-rose-800 font-black px-2 py-0.5 rounded-md">
                180
              </span>
            </div>
            <div className="font-bold text-xs">Proteção à Mulher</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-rose-100 mt-0.5">Central 24h Sigilosa</div>
          </a>

          <a
            href="tel:100"
            className="p-3 bg-white hover:bg-amber-600 text-amber-950 hover:text-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🧒</span>
              <span className="text-[10px] bg-amber-100 group-hover:bg-white group-hover:text-amber-800 text-amber-900 font-black px-2 py-0.5 rounded-md">
                100
              </span>
            </div>
            <div className="font-bold text-xs">Crianças & Jovens</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-amber-100 mt-0.5">Conselho Tutelar</div>
          </a>

          <button
            onClick={() => navigate('/report?category=Abordagem Social / População em Situação de Rua')}
            className="p-3 bg-white hover:bg-sky-600 text-sky-950 hover:text-white rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🤝</span>
              <span className="text-[10px] bg-sky-100 group-hover:bg-white group-hover:text-sky-800 text-sky-900 font-black px-2 py-0.5 rounded-md">
                SEAS
              </span>
            </div>
            <div className="font-bold text-xs">Abordagem de Rua</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-sky-100 mt-0.5">Resgate & Frio</div>
          </button>

          <button
            onClick={() => navigate('/report?category=Assistência Social e Alimentar (CRAS / CREAS)')}
            className="p-3 bg-white hover:bg-indigo-600 text-indigo-950 hover:text-white rounded-2xl border border-indigo-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🍲</span>
              <span className="text-[10px] bg-indigo-100 group-hover:bg-white group-hover:text-indigo-800 text-indigo-900 font-black px-2 py-0.5 rounded-md">
                CRAS
              </span>
            </div>
            <div className="font-bold text-xs">Cesta & Benefícios</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-indigo-100 mt-0.5">CadÚnico / Alimentos</div>
          </button>
        </div>
      </section>

      {/* MANIFESTO E CAMPANHA: PROTEÇÃO À MULHER & LIGUE 180 */}
      <section className="bg-gradient-to-br from-purple-950 via-zinc-950 to-purple-900 text-white rounded-3xl p-5 sm:p-7 border-2 border-purple-500/40 shadow-lg overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-400/30 max-w-[220px] group">
              <img
                src={campanhaMulherImg}
                alt="Campanha: Traição não justifica morte - Ligue 180"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-400/30 uppercase tracking-wide">
              <span>💜</span> Combate ao Feminicídio & Violência
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              TRAIÇÃO NÃO JUSTIFICA MORTE
            </h3>

            <p className="text-sm sm:text-base text-purple-200 font-bold leading-snug">
              “Nenhuma mulher é propriedade de ninguém. Meu corpo, minha vida, minhas escolhas pertencem só a mim.”
            </p>

            <div className="bg-purple-900/40 border border-purple-500/30 rounded-2xl p-3.5 text-xs text-purple-100 leading-relaxed">
              Quem mata por ciúme, por controle ou por vingança comete <strong>feminicídio</strong>. <strong>A culpa nunca é da vítima.</strong>
            </div>

            <div className="pt-1 flex flex-wrap gap-2.5 items-center">
              <a
                href="tel:180"
                className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-zinc-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <PhoneCall className="w-3.5 h-3.5" /> LIGAR 180 (DENUNCIE)
              </a>
              <Link
                to="/social"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-black text-purple-200 font-bold rounded-xl text-xs flex items-center gap-2 border border-purple-400/30 transition-all"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" /> Abrigo & Suporte Social &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEIGHBORHOOD REPAIRS & TRADESPEOPLE COMMAND BAR (Chaveiro, Eletricista, Encanador, Pedreiro) */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-zinc-900 tracking-tight flex items-center gap-2">
                Reparos no Bairro & Profissionais Verificados
                <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">
                  1 Toque
                </span>
              </h2>
              <p className="text-xs text-zinc-600">
                Chaveiro 24h, eletricista urgente, encanador, pedreiro e reparos residenciais rápidos.
              </p>
            </div>
          </div>

          <Link
            to="/servicos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline shrink-0"
          >
            Ver Profissionais & Pedir Ajuda <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Repair Action Buttons Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          <Link
            to="/servicos"
            className="p-3 bg-white hover:bg-amber-600 text-zinc-900 hover:text-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🔑</span>
              <span className="text-[10px] bg-amber-100 group-hover:bg-white group-hover:text-amber-800 text-amber-900 font-black px-2 py-0.5 rounded-md">
                24H
              </span>
            </div>
            <div className="font-bold text-xs">Chaveiro Urgente</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-amber-100 mt-0.5">Portas & Fechaduras</div>
          </Link>

          <Link
            to="/servicos"
            className="p-3 bg-white hover:bg-yellow-500 text-zinc-900 hover:text-white rounded-2xl border border-yellow-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">⚡</span>
              <span className="text-[10px] bg-yellow-100 group-hover:bg-white group-hover:text-yellow-800 text-yellow-900 font-black px-2 py-0.5 rounded-md">
                SOS
              </span>
            </div>
            <div className="font-bold text-xs">Eletricista / Pane</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-yellow-100 mt-0.5">Curto & Disjuntor</div>
          </Link>

          <Link
            to="/servicos"
            className="p-3 bg-white hover:bg-sky-600 text-zinc-900 hover:text-white rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🚰</span>
              <span className="text-[10px] bg-sky-100 group-hover:bg-white group-hover:text-sky-800 text-sky-900 font-black px-2 py-0.5 rounded-md">
                SOS
              </span>
            </div>
            <div className="font-bold text-xs">Encanador / Cano</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-sky-100 mt-0.5">Vazamento & Esgoto</div>
          </Link>

          <Link
            to="/servicos"
            className="p-3 bg-white hover:bg-zinc-800 text-zinc-900 hover:text-white rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🛠️</span>
              <span className="text-[10px] bg-zinc-100 group-hover:bg-white group-hover:text-zinc-900 text-zinc-900 font-black px-2 py-0.5 rounded-md">
                GERAL
              </span>
            </div>
            <div className="font-bold text-xs">Marido de Aluguel</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-zinc-300 mt-0.5">Montagem & TV</div>
          </Link>

          <Link
            to="/servicos"
            className="p-3 bg-white hover:bg-emerald-600 text-zinc-900 hover:text-white rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🚗</span>
              <span className="text-[10px] bg-emerald-100 group-hover:bg-white group-hover:text-emerald-800 text-emerald-900 font-black px-2 py-0.5 rounded-md">
                AUTO
              </span>
            </div>
            <div className="font-bold text-xs">Socorro Mecânico</div>
            <div className="text-[10px] text-zinc-500 group-hover:text-emerald-100 mt-0.5">Bateria & Guincho</div>
          </Link>
        </div>
      </section>

      {/* WHATSAPP 24H & INTEGRATED AGENDA AUTOMATION SECTION */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-zinc-900 rounded-3xl p-5 sm:p-6 text-white shadow-md space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-400/30 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Automação 24h & WhatsApp Oficial
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Tira Dúvidas, Remarca, Cancela e Envia Lembretes 24h
              </h2>
              <p className="text-xs text-emerald-100/80">
                Assistente inteligente com inteligência artificial conectado à sua agenda em tempo real direto no WhatsApp.
              </p>
            </div>
          </div>

          <Link
            to="/whatsapp"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0 hover:scale-102"
          >
            <Calendar className="w-4 h-4" />
            Abrir Central WhatsApp & Agenda
          </Link>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <Link
            to="/whatsapp"
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-base mb-1">❓</div>
            <div className="font-bold text-xs text-white">Tira Dúvidas 24h</div>
            <div className="text-[10px] text-emerald-200">Documentos e locais</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-base mb-1">🔄</div>
            <div className="font-bold text-xs text-white">Remarca com 1 Comando</div>
            <div className="text-[10px] text-emerald-200">Reagendamento fácil</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-base mb-1">❌</div>
            <div className="font-bold text-xs text-white">Cancela & Libera Vaga</div>
            <div className="text-[10px] text-emerald-200">Agenda atualizada</div>
          </Link>

          <Link
            to="/whatsapp"
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-2xl border border-white/10 text-left transition-all"
          >
            <div className="text-base mb-1">🔔</div>
            <div className="font-bold text-xs text-white">Lembretes 24h & 2h</div>
            <div className="text-[10px] text-emerald-200">Confirmação de presença</div>
          </Link>
        </div>
      </section>

      {/* Protocol Quick Lookup Box */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs">
        <form onSubmit={handleProtocolSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-700 font-semibold text-sm shrink-0">
            <FileSearch className="w-5 h-5 text-blue-600" />
            <span>Consultar Protocolo:</span>
          </div>
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Ex: RA-2026-0820-0045"
              value={protocolSearch}
              onChange={(e) => setProtocolSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer"
          >
            Buscar Ocorrência
          </button>
        </form>
      </section>

      {/* Interactive Category Buttons (Tela 3 Categories) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            Categorias & Demandas de Atendimento
          </h2>
          <span className="text-xs text-zinc-500">Clique para registrar com 1 toque</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SYSTEM_CATEGORIES.map((category) => {
            const isSocial = category.isSocialProtection;
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/report?category=${encodeURIComponent(category.name)}`)}
                className={`p-3.5 rounded-2xl border shadow-2xs hover:shadow-md transition-all text-left flex items-center gap-3 group cursor-pointer ${
                  isSocial 
                    ? 'bg-rose-50/40 border-rose-200/80 hover:border-rose-400 hover:bg-rose-50' 
                    : 'bg-white border-zinc-200/80 hover:border-blue-300 hover:bg-blue-50/40'
                }`}
              >
                <span className={`text-2xl p-2 rounded-xl group-hover:scale-110 transition-transform ${
                  isSocial ? 'bg-rose-100/80 text-rose-800' : 'bg-zinc-100 text-zinc-800'
                }`}>
                  {category.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className={`text-xs font-bold truncate transition-colors ${
                      isSocial ? 'text-rose-950 group-hover:text-rose-700' : 'text-zinc-900 group-hover:text-blue-600'
                    }`}>
                      {category.name}
                    </p>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-0.5 mt-0.5">
                    {isSocial ? 'Acolhimento imediato →' : 'Registrar agora →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feed / Explorer Section */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              Ocorrências Registradas na Cidade
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold font-mono">
                {filteredIssues.length}
              </span>
            </h2>
            <p className="text-xs text-zinc-500">
              Transparência pública e acompanhamento das demandas da população.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-200/80 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grade
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" /> Mapa Interativo
              </button>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por rua, descrição ou protocolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todas">Todas as Categorias</option>
              {SYSTEM_CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Registrado">Registrado</option>
              <option value="Encaminhado">Encaminhado</option>
              <option value="Em análise">Em análise</option>
              <option value="Em atendimento">Em atendimento</option>
              <option value="Resolvido">Resolvido</option>
            </select>
          </div>
        </div>

        {/* Content View: Grid or Map */}
        {loading ? (
          <div className="py-16 text-center text-zinc-400 space-y-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-medium">Carregando ocorrências da cidade...</p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-zinc-300 p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-zinc-800">
              Nenhuma ocorrência encontrada
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Não encontramos problemas cadastrados com os filtros atuais. Você pode registrar uma nova ocorrência agora mesmo.
            </p>
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Registrar Primeiro Problema
            </Link>
          </div>
        ) : viewMode === 'map' ? (
          <MapView issues={filteredIssues} height="560px" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id || issue.protocol} issue={issue} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
