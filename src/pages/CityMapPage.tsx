import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Issue, SYSTEM_CATEGORIES } from '../types';
import MapView from '../components/MapView';
import { MapPin, Filter, Search, PlusCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CityMapPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterPriority, setFilterPriority] = useState('Todas');

  useEffect(() => {
    const q = query(collection(db, 'ocorrencias'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list: Issue[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as Issue));
      setIssues(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredIssues = issues.filter(issue => {
    const matchCat = filterCategory === 'Todas' || issue.category === filterCategory;
    const matchStat = filterStatus === 'Todos' || issue.status === filterStatus;
    const matchPrio = filterPriority === 'Todas' || issue.priority === filterPriority;
    return matchCat && matchStat && matchPrio;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-7 h-7 text-blue-600" />
            Mapa Urbano de Ocorrências
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Visualização georreferenciada em tempo real com identificação visual por gravidade e status.
          </p>
        </div>

        <Link
          to="/report"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Registrar Problema
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-1">
            Filtrar Categoria
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas">Todas as Categorias</option>
            {SYSTEM_CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-1">
            Filtrar Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Registrado">Registrado</option>
            <option value="Encaminhado">Encaminhado</option>
            <option value="Em análise">Em análise</option>
            <option value="Em atendimento">Em atendimento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-1">
            Filtrar Gravidade
          </label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas">Todas as Prioridades</option>
            <option value="Normal">🟢 Normal</option>
            <option value="Alta">🟠 Alta</option>
            <option value="Urgente">🔴 Urgente</option>
          </select>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapView
        issues={filteredIssues}
        height="640px"
        className="w-full shadow-md"
      />

    </div>
  );
}
