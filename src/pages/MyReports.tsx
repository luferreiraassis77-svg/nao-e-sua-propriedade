import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Issue } from '../types';
import IssueCard from '../components/IssueCard';
import { PlusCircle, FileText, ArrowRight, AlertCircle } from 'lucide-react';

export default function MyReports() {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'ocorrencias'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const list: Issue[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as Issue));
      setIssues(list);
      setLoading(false);
    }, (err) => {
      console.error('Error loading user issues:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 mx-auto">
          <FileText className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">Acesse sua conta</h2>
        <p className="text-xs text-zinc-500">
          Você precisa estar conectado para visualizar suas solicitações cadastradas.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
            <FileText className="w-7 h-7 text-blue-600" />
            Minhas Ocorrências Registradas
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Histórico completo de problemas reportados por <strong>{user.name}</strong>.
          </p>
        </div>

        <Link
          to="/report"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Novo Registro
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-zinc-400 font-medium">Carregando suas solicitações...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-zinc-300 p-12 text-center space-y-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <PlusCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-zinc-800">
            Você ainda não registrou nenhuma ocorrência
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Viu um buraco, lâmpada apagada ou entulho na sua rua? Registre e receba o protocolo de acompanhamento.
          </p>
          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Registrar Primeiro Problema
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id || issue.protocol} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
