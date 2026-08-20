import React from 'react';
import { Link } from 'react-router-dom';
import { Issue, SYSTEM_CATEGORIES } from '../types';
import { MapPin, Clock, ArrowRight, Star, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  key?: React.Key;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const categoryInfo = SYSTEM_CATEGORIES.find(c => c.name === issue.category) || {
    icon: '📍',
    name: issue.category,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Registrado':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'Registrado'
        };
      case 'Encaminhado':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500',
          label: 'Encaminhado'
        };
      case 'Em análise':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Em análise'
        };
      case 'Em atendimento':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          dot: 'bg-orange-500',
          label: 'Em atendimento'
        };
      case 'Resolvido':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Resolvido'
        };
      default:
        return {
          bg: 'bg-zinc-100 text-zinc-700 border-zinc-200',
          dot: 'bg-zinc-400',
          label: status
        };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-red-100 text-red-800 border-red-200 font-bold';
      case 'Alta':
        return 'bg-orange-100 text-orange-800 border-orange-200 font-semibold';
      default:
        return 'bg-zinc-100 text-zinc-600 border-zinc-200 font-normal';
    }
  };

  const statusBadge = getStatusBadge(issue.status);

  const formatDate = (val: any) => {
    if (!val) return 'Recente';
    try {
      if (val.toDate && typeof val.toDate === 'function') {
        return val.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? 'Recente' : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch {
      return 'Recente';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header with Category and Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl p-1.5 rounded-lg bg-zinc-100">
              {categoryInfo.icon}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                {issue.category}
              </span>
              <span className="text-xs font-mono font-semibold text-blue-600">
                {issue.protocol}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
              {statusBadge.label}
            </span>
            {issue.priority !== 'Normal' && (
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded-md border ${getPriorityBadge(issue.priority)}`}>
                Prioridade {issue.priority}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-800 text-sm font-medium line-clamp-2 mb-3 leading-relaxed">
          {issue.description}
        </p>

        {/* Photo thumbnail if provided */}
        {issue.photoUrl && (
          <div className="mb-3 rounded-xl overflow-hidden h-32 w-full bg-zinc-100 border border-zinc-200">
            <img 
              src={issue.photoUrl} 
              alt={issue.category} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // hide if broken image
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-zinc-100 space-y-2 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate font-medium">{issue.address}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formatDate(issue.createdAt)}</span>
          </div>

          {issue.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{issue.rating}/5</span>
            </div>
          )}

          <Link
            to={`/issue/${issue.protocol}`}
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Acompanhar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
