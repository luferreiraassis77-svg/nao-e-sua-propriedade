import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Issue, IssueStatus, IssuePriority, SYSTEM_CATEGORIES } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Download, 
  ExternalLink, 
  Filter, 
  Sparkles,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterPriority, setFilterPriority] = useState('Todas');

  // Quick Dispatch Modal
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<IssueStatus>('Em atendimento');
  const [modalPriority, setModalPriority] = useState<IssuePriority>('Normal');
  const [modalDepartment, setModalDepartment] = useState('');
  const [modalObservation, setModalObservation] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'ocorrencias'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Issue[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as Issue);
      });
      setIssues(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalCount = issues.length;
  const inProgressCount = issues.filter(i => i.status === 'Em análise' || i.status === 'Em atendimento' || i.status === 'Encaminhado').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolvido').length;
  const urgentCount = issues.filter(i => (i.priority === 'Urgente' || i.priority === 'Alta') && i.status !== 'Resolvido').length;

  // Chart Data: By Category
  const categoryData = SYSTEM_CATEGORIES.map(cat => {
    const count = issues.filter(i => i.category === cat.name).length;
    return { name: cat.name.split('/')[0].trim(), value: count };
  }).filter(c => c.value > 0);

  // Chart Data: By Status
  const statusData = [
    { name: 'Registrado', value: issues.filter(i => i.status === 'Registrado').length, color: '#3b82f6' },
    { name: 'Encaminhado', value: issues.filter(i => i.status === 'Encaminhado').length, color: '#6366f1' },
    { name: 'Em análise', value: issues.filter(i => i.status === 'Em análise').length, color: '#f59e0b' },
    { name: 'Em atendimento', value: issues.filter(i => i.status === 'Em atendimento').length, color: '#f97316' },
    { name: 'Resolvido', value: issues.filter(i => i.status === 'Resolvido').length, color: '#10b981' },
  ].filter(s => s.value > 0);

  // Chart Data: By Priority
  const priorityData = [
    { name: 'Normal', value: issues.filter(i => i.priority === 'Normal').length, color: '#10b981' },
    { name: 'Alta', value: issues.filter(i => i.priority === 'Alta').length, color: '#f97316' },
    { name: 'Urgente', value: issues.filter(i => i.priority === 'Urgente').length, color: '#ef4444' },
  ].filter(p => p.value > 0);

  // Filtered list for table
  const filteredTable = issues.filter(issue => {
    const matchesSearch = 
      issue.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = filterCategory === 'Todas' || issue.category === filterCategory;
    const matchesStat = filterStatus === 'Todos' || issue.status === filterStatus;
    const matchesPrio = filterPriority === 'Todas' || issue.priority === filterPriority;

    return matchesSearch && matchesCat && matchesStat && matchesPrio;
  });

  const handleOpenDispatch = (issue: Issue) => {
    setSelectedIssue(issue);
    setModalStatus(issue.status);
    setModalPriority(issue.priority);
    setModalDepartment(issue.department);
    setModalObservation('');
    setModalOpen(true);
  };

  const handleSaveDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue || !selectedIssue.id) return;

    setUpdating(true);
    try {
      const docRef = doc(db, 'ocorrencias', selectedIssue.id);
      const updateLog = {
        status: modalStatus,
        observation: modalObservation.trim() || `Despachado para ${modalStatus} pela gestão pública.`,
        updatedBy: (user?.name || 'Administrador') + ' (Painel de Gestão)',
        date: new Date()
      };

      await updateDoc(docRef, {
        status: modalStatus,
        priority: modalPriority,
        department: modalDepartment.trim() || selectedIssue.department,
        updatedAt: serverTimestamp(),
        updates: arrayUnion(updateLog)
      });

      setModalOpen(false);
      alert(`Protocolo ${selectedIssue.protocol} atualizado com sucesso!`);
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar ocorrência.');
    } finally {
      setUpdating(false);
    }
  };

  // Export CSV function for transparency
  const exportToCSV = () => {
    if (issues.length === 0) return;
    const headers = ['Protocolo', 'Categoria', 'Orgao', 'Status', 'Prioridade', 'Endereco', 'Solicitante', 'Descricao'];
    const rows = issues.map(i => [
      `"${i.protocol}"`,
      `"${i.category}"`,
      `"${i.department}"`,
      `"${i.status}"`,
      `"${i.priority}"`,
      `"${i.address.replace(/"/g, '""')}"`,
      `"${i.reporterName}"`,
      `"${i.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `resolve_ai_relatorio_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-zinc-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Módulo de Gestão Pública
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Painel Administrativo Municipal
          </h1>
          <p className="text-xs text-zinc-400">
            Controle integrado de ordens de serviço, despacho para secretarias e estatísticas em tempo real.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Exportar Relatório CSV
          </button>

          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Mapa de Calor
          </Link>
        </div>
      </div>

      {/* Metric Cards (Requested 248 / 72 / 134 / 12 Structure) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-mono">
              {totalCount}
            </span>
            <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
              Ocorrências Totais
            </p>
          </div>
        </div>

        {/* Em Análise / Atendimento */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {inProgressCount}
            </span>
            <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
              Em Análise / Campo
            </p>
          </div>
        </div>

        {/* Resolvidas */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
              {resolvedCount}
            </span>
            <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
              Resolvidas
            </p>
          </div>
        </div>

        {/* Urgentes */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono">
              {urgentCount}
            </span>
            <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
              Urgentes em Aberto
            </p>
          </div>
        </div>

      </div>

      {/* Analytics Charts Section (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-zinc-900">
              Demandas por Categoria de Serviço
            </h3>
            <p className="text-xs text-zinc-500">Distribuição volumétrica das solicitações da população</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" angle={-25} textAnchor="end" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" name="Ocorrências" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-zinc-900">
              Progresso e Eficiência dos Atendimentos
            </h3>
            <p className="text-xs text-zinc-500">Percentual das solicitações por fase de conclusão</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-zinc-400">Nenhum dado registrado ainda.</p>
            )}
          </div>
        </div>

      </div>

      {/* Occurrences Management Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
        
        {/* Table Filters Header */}
        <div className="p-6 border-b border-zinc-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                Gestão e Despacho de Ocorrências
              </h3>
              <p className="text-xs text-zinc-500">
                Selecione uma solicitação para alterar o status, prioridade ou encaminhar para a equipe em campo.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-lg">
              {filteredTable.length} de {issues.length} registros
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Filtrar por protocolo, rua ou nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todas">Todas as Categorias</option>
                {SYSTEM_CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
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

            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todas">Todas as Prioridades</option>
                <option value="Normal">🟢 Normal</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Urgente">🔴 Urgente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 uppercase font-semibold border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3.5">Protocolo</th>
                <th className="px-6 py-3.5">Categoria / Órgão</th>
                <th className="px-6 py-3.5">Endereço</th>
                <th className="px-6 py-3.5">Prioridade</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 text-zinc-700">
              {filteredTable.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                    Nenhuma ocorrência encontrada com estes filtros.
                  </td>
                </tr>
              ) : (
                filteredTable.map((item) => (
                  <tr key={item.id || item.protocol} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      <Link to={`/issue/${item.protocol}`} className="hover:underline">
                        {item.protocol}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900">{item.category}</div>
                      <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">{item.department}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {item.address}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase border ${
                        item.priority === 'Urgente' ? 'bg-red-50 text-red-700 border-red-200' :
                        item.priority === 'Alta' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                        item.status === 'Resolvido' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        item.status === 'Em atendimento' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        item.status === 'Em análise' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenDispatch(item)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        ⚡ Despachar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Quick Dispatch Modal */}
      {modalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="border-b border-zinc-100 pb-3">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {selectedIssue.protocol}
              </span>
              <h3 className="text-xl font-bold text-zinc-900 mt-1">
                Despachar Solicitação Pública
              </h3>
              <p className="text-xs text-zinc-500">{selectedIssue.category} — {selectedIssue.address}</p>
            </div>

            <form onSubmit={handleSaveDispatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    Novo Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as IssueStatus)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Registrado">Registrado</option>
                    <option value="Encaminhado">Encaminhado</option>
                    <option value="Em análise">Em análise</option>
                    <option value="Em atendimento">Em atendimento</option>
                    <option value="Resolvido">Resolvido</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={modalPriority}
                    onChange={(e) => setModalPriority(e.target.value as IssuePriority)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Normal">🟢 Normal</option>
                    <option value="Alta">🟠 Alta</option>
                    <option value="Urgente">🔴 Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Órgão / Secretaria Responsável
                </label>
                <input
                  type="text"
                  value={modalDepartment}
                  onChange={(e) => setModalDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Despacho / Parecer Oficial (Notificação para o Cidadão)
                </label>
                <textarea
                  rows={3}
                  value={modalObservation}
                  onChange={(e) => setModalObservation(e.target.value)}
                  placeholder="Ex: Ordem de serviço nº 402 gerada. Equipe encaminhada para reparo do asfalto."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-zinc-600 font-semibold hover:bg-zinc-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
                >
                  {updating ? 'Salvando...' : 'Confirmar Despacho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
