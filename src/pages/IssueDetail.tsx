import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Issue, IssueStatus, IssuePriority, SYSTEM_CATEGORIES } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Timeline from '../components/Timeline';
import RatingModal from '../components/RatingModal';
import { 
  MapPin, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Star, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  Send,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export default function IssueDetail() {
  const { protocol } = useParams<{ protocol: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [issueDocId, setIssueDocId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Admin Quick Update Form states
  const [newStatus, setNewStatus] = useState<IssueStatus>('Em análise');
  const [newPriority, setNewPriority] = useState<IssuePriority>('Normal');
  const [adminObservation, setAdminObservation] = useState('');
  const [adminDepartment, setAdminDepartment] = useState('');
  const [updating, setUpdating] = useState(false);

  // Rating Modal state
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!protocol) return;
      setLoading(true);
      try {
        const q = query(collection(db, 'ocorrencias'), where('protocol', '==', protocol.toUpperCase()));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const docItem = snap.docs[0];
          const data = docItem.data() as Issue;
          setIssue(data);
          setIssueDocId(docItem.id);
          setNewStatus(data.status);
          setNewPriority(data.priority);
          setAdminDepartment(data.department);
        } else {
          // Fallback: check if protocol param is actually doc ID
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching issue:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [protocol]);

  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDocId || !user?.isAdmin) return;

    setUpdating(true);
    try {
      const docRef = doc(db, 'ocorrencias', issueDocId);
      const updateEntry = {
        status: newStatus,
        observation: adminObservation.trim() || `Status atualizado para ${newStatus} pelo setor administrativo.`,
        updatedBy: user.name + ' (Administrador)',
        date: new Date()
      };

      await updateDoc(docRef, {
        status: newStatus,
        priority: newPriority,
        department: adminDepartment.trim() || issue?.department,
        updatedAt: serverTimestamp(),
        updates: arrayUnion(updateEntry)
      });

      // Update local state
      setIssue(prev => prev ? {
        ...prev,
        status: newStatus,
        priority: newPriority,
        department: adminDepartment.trim() || prev.department,
        updates: [...(prev.updates || []), updateEntry]
      } : null);

      setAdminObservation('');
      alert('Ocorrência despachada e atualizada com sucesso!');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Erro ao atualizar ocorrência.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRatingSubmit = async (rating: number, comment: string) => {
    if (!issueDocId) return;
    try {
      const docRef = doc(db, 'ocorrencias', issueDocId);
      await updateDoc(docRef, {
        rating,
        ratingComment: comment.trim(),
        ratingDate: new Date()
      });

      setIssue(prev => prev ? {
        ...prev,
        rating,
        ratingComment: comment.trim(),
        ratingDate: new Date()
      } : null);

      alert('Obrigado pela sua avaliação!');
    } catch (err) {
      console.error('Error saving rating:', err);
      throw err;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ocorrência ${issue?.protocol} — Resolve Aí`,
        text: `Acompanhe o andamento da ocorrência ${issue?.protocol}: ${issue?.description}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do protocolo copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-zinc-500 font-medium">Buscando protocolo...</p>
      </div>
    );
  }

  if (notFound || !issue) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">Protocolo não encontrado</h2>
        <p className="text-xs text-zinc-500">
          Não encontramos nenhuma ocorrência com o protocolo <code>{protocol}</code>. Verifique a digitação ou volte ao início.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </Link>
      </div>
    );
  }

  const categoryInfo = SYSTEM_CATEGORIES.find(c => c.name === issue.category) || {
    icon: '📍',
    name: issue.category
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para ocorrências
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" /> Compartilhar Protocolo
        </button>
      </div>

      {/* Protocol Banner (Tela 5 Header) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              PROTOCOLO: {issue.protocol}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 flex items-center gap-2 pt-1">
              <span>{categoryInfo.icon}</span> {issue.category}
            </h1>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              {issue.address}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs uppercase font-bold px-3 py-1.5 rounded-full border ${
              issue.status === 'Resolvido' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              issue.status === 'Em atendimento' ? 'bg-orange-50 text-orange-700 border-orange-200' :
              issue.status === 'Em análise' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              ● {issue.status}
            </span>

            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
              issue.priority === 'Urgente' ? 'bg-red-50 text-red-700 border-red-200' :
              issue.priority === 'Alta' ? 'bg-orange-50 text-orange-700 border-orange-200' :
              'bg-zinc-100 text-zinc-600 border-zinc-200'
            }`}>
              Prioridade: {issue.priority}
            </span>
          </div>
        </div>

        {/* Description & Department Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Descrição da Ocorrência
            </h3>
            <p className="text-sm text-zinc-800 leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200/70 whitespace-pre-wrap">
              {issue.description}
            </p>

            {issue.photoUrl && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Registro Fotográfico
                </h3>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 max-h-80">
                  <img src={issue.photoUrl} alt="Foto da ocorrência" className="w-full h-full object-contain max-h-80" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
              <h3 className="font-bold text-zinc-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" /> Órgão Responsável
              </h3>
              <p className="text-zinc-700 font-medium">
                {issue.department}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <h3 className="font-bold text-zinc-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-zinc-500" /> Solicitante
              </h3>
              <p className="text-zinc-700">
                {issue.reporterName}
              </p>
            </div>

            {/* Citizen Evaluation Box if Solved */}
            {issue.status === 'Resolvido' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2.5">
                <h3 className="font-bold text-xs flex items-center gap-1 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Problema Solucionado
                </h3>
                {issue.rating ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-4 h-4 ${s <= issue.rating! ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`} 
                        />
                      ))}
                      <span className="text-xs font-bold text-zinc-700 ml-1">{issue.rating}/5</span>
                    </div>
                    {issue.ratingComment && (
                      <p className="text-xs italic text-emerald-900">"{issue.ratingComment}"</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-emerald-800 mb-2">
                      Sua opinião é fundamental para avaliar os serviços públicos.
                    </p>
                    <button
                      onClick={() => setRatingModalOpen(true)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      ⭐ Avaliar Solução
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Timeline Section (Tela 5) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Linha do Tempo e Andamento do Atendimento
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Acompanhe o histórico oficial de tramitação e despacho desta solicitação.
          </p>
        </div>

        <Timeline
          currentStatus={issue.status}
          createdAt={issue.createdAt}
          updates={issue.updates || []}
        />
      </div>

      {/* Admin Dispatch & Status Change Panel */}
      {user?.isAdmin && (
        <div className="bg-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-indigo-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Despacho Administrativo (Órgão Público)</h2>
              <p className="text-xs text-indigo-300">
                Você tem permissão de administrador para alterar status, prioridade e redigir resposta oficial.
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminUpdate} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-indigo-200 mb-1.5">
                  Atualizar Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
                  className="w-full px-3.5 py-2.5 bg-indigo-900/80 border border-indigo-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Registrado">Registrado</option>
                  <option value="Encaminhado">Encaminhado</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Em atendimento">Em atendimento</option>
                  <option value="Resolvido">Resolvido</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-indigo-200 mb-1.5">
                  Nível de Prioridade
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as IssuePriority)}
                  className="w-full px-3.5 py-2.5 bg-indigo-900/80 border border-indigo-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Normal">🟢 Normal</option>
                  <option value="Alta">🟠 Alta</option>
                  <option value="Urgente">🔴 Urgente</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-indigo-200 mb-1.5">
                  Órgão Responsável
                </label>
                <input
                  type="text"
                  value={adminDepartment}
                  onChange={(e) => setAdminDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-indigo-900/80 border border-indigo-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-indigo-200 mb-1.5">
                Observação / Parecer Oficial da Equipe (Será exibido na linha do tempo para o cidadão)
              </label>
              <textarea
                rows={3}
                value={adminObservation}
                onChange={(e) => setAdminObservation(e.target.value)}
                placeholder="Exemplo: Equipe de pavimentação esteve no local e concluiu a operação tapa-buraco."
                className="w-full px-3.5 py-2.5 bg-indigo-900/80 border border-indigo-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {updating ? 'Salvando Despacho...' : 'Salvar Despacho e Atualizar Cidadão'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Citizen Rating Modal */}
      <RatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        onSubmit={handleRatingSubmit}
        protocol={issue.protocol}
      />

    </div>
  );
}
