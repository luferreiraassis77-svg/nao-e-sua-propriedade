import React from 'react';
import { IssueStatus, STATUS_STEPS, StatusUpdate } from '../types';
import { CheckCircle2, Circle, Clock, Check } from 'lucide-react';

interface TimelineProps {
  currentStatus: IssueStatus;
  createdAt: any;
  updatedAt?: any;
  updates?: StatusUpdate[];
}

export default function Timeline({ currentStatus, createdAt, updates = [] }: TimelineProps) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);

  const getStepDescription = (step: IssueStatus) => {
    switch (step) {
      case 'Registrado':
        return 'Ocorrência cadastrada com sucesso no sistema pelo cidadão.';
      case 'Encaminhado':
        return 'Enviada para triagem do órgão público competente.';
      case 'Em análise':
        return 'Equipe técnica avaliando a vistoria e prioridade do reparo.';
      case 'Em atendimento':
        return 'Equipe em campo executando os serviços de manutenção.';
      case 'Resolvido':
        return 'Serviço finalizado e problema solucionado com sucesso!';
      default:
        return '';
    }
  };

  const getUpdateForStep = (step: IssueStatus) => {
    return updates.find(u => u.status === step);
  };

  const formatDate = (val: any) => {
    if (!val) return '';
    try {
      if (val.toDate && typeof val.toDate === 'function') {
        return val.toDate().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? '' : d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200">
      {STATUS_STEPS.map((step, idx) => {
        const isPassed = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isPending = idx > currentIndex;
        const stepUpdate = getUpdateForStep(step);

        let iconBg = 'bg-zinc-100 text-zinc-400 border-zinc-300';
        let badgeColor = 'text-zinc-500 font-normal';

        if (isPassed) {
          iconBg = 'bg-blue-600 text-white border-blue-600 shadow-xs';
          badgeColor = 'text-blue-900 font-semibold';
        } else if (isCurrent) {
          iconBg = 'bg-amber-500 text-white border-amber-500 ring-4 ring-amber-100 animate-pulse';
          badgeColor = 'text-amber-900 font-bold';
        }

        if (step === 'Resolvido' && isCurrent) {
          iconBg = 'bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-100';
          badgeColor = 'text-emerald-900 font-bold';
        }

        return (
          <div key={step} className="relative group">
            {/* Step Marker */}
            <div 
              className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center text-xs transition-all ${iconBg}`}
            >
              {isPassed ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : isCurrent ? (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              ) : (
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
              )}
            </div>

            {/* Content */}
            <div className={`p-4 rounded-xl border transition-all ${
              isCurrent 
                ? 'bg-amber-50/60 border-amber-200 shadow-xs' 
                : isPassed 
                  ? 'bg-white border-zinc-200' 
                  : 'bg-zinc-50/50 border-zinc-200/60 opacity-60'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className={`text-base ${badgeColor} flex items-center gap-2`}>
                  {step}
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      Status Atual
                    </span>
                  )}
                  {step === 'Resolvido' && isPassed && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Concluído
                    </span>
                  )}
                </span>

                <span className="text-xs text-zinc-500 font-mono">
                  {idx === 0 ? formatDate(createdAt) : (stepUpdate ? formatDate(stepUpdate.date) : '')}
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                {stepUpdate?.observation ? stepUpdate.observation : getStepDescription(step)}
              </p>

              {stepUpdate?.updatedBy && (
                <p className="mt-2 text-[11px] text-zinc-400">
                  Despachado por: <span className="font-medium text-zinc-600">{stepUpdate.updatedBy}</span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
