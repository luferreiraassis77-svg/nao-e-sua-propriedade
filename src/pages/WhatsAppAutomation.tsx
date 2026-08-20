import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Clock, 
  Send, 
  Bot, 
  CheckCheck, 
  Bell, 
  Plus, 
  RefreshCw, 
  X, 
  Check, 
  AlertCircle, 
  Smartphone, 
  QrCode, 
  Phone, 
  Share2, 
  CalendarDays, 
  Zap, 
  Filter, 
  Search, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  User,
  MapPin,
  FileText,
  Copy,
  Info
} from 'lucide-react';
import { 
  Appointment, 
  AppointmentStatus, 
  WhatsAppMessage, 
  WhatsAppReminderRule, 
  WhatsAppLog, 
  INITIAL_APPOINTMENTS, 
  DEFAULT_REMINDER_RULES 
} from '../types';

export default function WhatsAppAutomation() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'agenda' | 'reminders' | 'config'>('simulator');
  
  // Appointments State with persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('resolveai_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_APPOINTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('resolveai_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Reminder rules state
  const [reminderRules, setReminderRules] = useState<WhatsAppReminderRule[]>(() => {
    const saved = localStorage.getItem('resolveai_reminder_rules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_REMINDER_RULES;
  });

  // WhatsApp Logs
  const [logs, setLogs] = useState<WhatsAppLog[]>([
    {
      id: 'log-1',
      recipientName: 'Mariana Silveira',
      phone: '(11) 98765-4321',
      type: 'Lembrete 24h',
      messagePreview: '🔔 Lembrete Resolve Aí: Olá Mariana, você tem um compromisso amanhã às 09:30...',
      timestamp: 'Hoje, 09:00',
      status: 'Confirmado'
    },
    {
      id: 'log-2',
      recipientName: 'Juliana Mendes',
      phone: '(11) 96543-2109',
      type: 'Remarcação',
      messagePreview: '🔄 Agendamento Remarcado: Nova data definida para 22/08 às 11:00.',
      timestamp: 'Ontem, 16:46',
      status: 'Respondido'
    },
    {
      id: 'log-3',
      recipientName: 'Carlos Eduardo Ramos',
      phone: '(11) 97654-3210',
      type: 'Confirmação',
      messagePreview: '📅 Cadastro Único confirmado para 21/08 às 14:00 no CRAS Central.',
      timestamp: '18/08, 10:15',
      status: 'Lido'
    }
  ]);

  // Chat Simulator State
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `👋 Olá! Sou o *Assistente Virtual 24h do Resolve Aí* no WhatsApp.\n\nEstou conectado à *agenda oficial* da cidade e dos profissionais do bairro para:\n\n❓ *Tirar dúvidas 24h* sobre serviços e documentos\n📅 *Agendar* atendimentos, vistorias e consultas\n🔄 *Remarcar* datas ou horários com 1 comando\n❌ *Cancelar* agendamentos a qualquer momento\n🔔 *Disparar lembretes automáticos* com confirmação de presença\n\n_Como posso ajudar você agora?_`,
      timestamp: '10:00',
      status: 'read',
      quickActions: [
        { label: '📅 Agendar Atendimento', action: 'Quero agendar um serviço' },
        { label: '🔄 Remarcar Minha Visita', action: 'Quero remarcar meu agendamento AGT-849201' },
        { label: '❌ Cancelar Compromisso', action: 'Preciso cancelar meu agendamento' },
        { label: '❓ Dúvidas sobre o CRAS / Pet', action: 'Quais documentos preciso para atendimento no CRAS?' }
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Filter / Search in Agenda
  const [agendaSearch, setAgendaSearch] = useState('');
  const [agendaFilterStatus, setAgendaFilterStatus] = useState<string>('todos');

  // Modals
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New appointment form state
  const [newForm, setNewForm] = useState({
    clientName: '',
    clientPhone: '',
    service: 'Vistoria Técnica / Iluminação',
    professionalOrDept: 'Secretaria de Serviços e Obras',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    address: '',
    notes: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Send message to WhatsApp Assistant Backend
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: WhatsAppMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/whatsapp-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
          currentAppointments: appointments
        })
      });

      const data = await response.json();

      // If backend modified an appointment (Cancel / Reschedule / Confirm)
      if (data.updatedAppointment) {
        setAppointments(prev => 
          prev.map(apt => apt.id === data.updatedAppointment.id || apt.protocol === data.updatedAppointment.protocol 
            ? data.updatedAppointment 
            : apt
          )
        );

        // Add log
        const newLog: WhatsAppLog = {
          id: `log-${Date.now()}`,
          recipientName: data.updatedAppointment.clientName || 'Cidadão',
          phone: data.updatedAppointment.clientPhone || '(11) 98765-4321',
          type: data.actionDetected === 'cancel' ? 'Cancelamento' : (data.actionDetected === 'reschedule' ? 'Remarcação' : 'Confirmação'),
          messagePreview: data.replyText?.slice(0, 80) + '...',
          timestamp: 'Agora',
          status: 'Respondido'
        };
        setLogs(prev => [newLog, ...prev]);
      }

      // If backend created a new appointment
      if (data.newAppointment) {
        setAppointments(prev => [data.newAppointment, ...prev]);
        const newLog: WhatsAppLog = {
          id: `log-${Date.now()}`,
          recipientName: data.newAppointment.clientName,
          phone: data.newAppointment.clientPhone,
          type: 'Confirmação',
          messagePreview: `Novo agendamento criado: ${data.newAppointment.service}`,
          timestamp: 'Agora',
          status: 'Entregue'
        };
        setLogs(prev => [newLog, ...prev]);
      }

      const botMsg: WhatsAppMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.replyText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        quickActions: data.quickOptions?.length > 0 ? data.quickOptions : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error in WhatsApp Assistant:', error);
      const fallbackMsg: WhatsAppMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Desculpe, tive uma instabilidade momentânea. Mas nossa agenda 24h está ativa! Posso te ajudar a agendar, remarcar ou tirar dúvidas.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Direct actions on appointments
  const handleCancelAppointment = (apt: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Cancelado' as AppointmentStatus, notes: (a.notes ? a.notes + ' | ' : '') + 'Cancelado pelo painel.' } : a));
    showToast(`Compromisso ${apt.protocol} cancelado com sucesso. Horário liberado na agenda.`);
    
    // Add WhatsApp message
    const msg: WhatsAppMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `❌ *Aviso de Cancelamento Automático*\n\nO agendamento *${apt.protocol}* de *${apt.clientName}* para *${apt.service}* em *${apt.date} às ${apt.time}* foi cancelado e a agenda atualizada.`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleConfirmReschedule = () => {
    if (!showRescheduleModal || !newDate || !newTime) return;
    
    setAppointments(prev => prev.map(a => a.id === showRescheduleModal.id ? {
      ...a,
      date: newDate,
      time: newTime,
      status: 'Remarcado' as AppointmentStatus,
      notes: (a.notes ? a.notes + ' | ' : '') + `Remarcado para ${newDate} às ${newTime}.`
    } : a));

    showToast(`Compromisso ${showRescheduleModal.protocol} remarcado para ${newDate} às ${newTime}!`);

    const msg: WhatsAppMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `🔄 *Agendamento Remarcado na Agenda!*\n\n📋 *Protocolo:* ${showRescheduleModal.protocol}\n👤 *Cliente:* ${showRescheduleModal.clientName}\n📅 *Nova Data:* ${newDate}\n⏰ *Novo Horário:* ${newTime}\n📍 *Local:* ${showRescheduleModal.address}\n\n🔔 Notificação de lembrete enviada via WhatsApp!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };
    setMessages(prev => [...prev, msg]);

    setShowRescheduleModal(null);
    setNewDate('');
    setNewTime('');
  };

  const handleSendManualReminder = (apt: Appointment) => {
    const template = reminderRules.find(r => r.id === 'rule-24h')?.template || 'Lembrete de compromisso';
    const parsedText = template
      .replace('{{nome}}', apt.clientName)
      .replace('{{servico}}', apt.service)
      .replace('{{data}}', apt.date)
      .replace('{{horario}}', apt.time)
      .replace('{{endereco}}', apt.address)
      .replace('{{protocolo}}', apt.protocol);

    // Open WhatsApp link or simulate in chat
    const cleanPhone = apt.clientPhone.replace(/\D/g, '');
    const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(parsedText)}`;
    
    // Add to logs
    const newLog: WhatsAppLog = {
      id: `log-${Date.now()}`,
      recipientName: apt.clientName,
      phone: apt.clientPhone,
      type: 'Lembrete 24h',
      messagePreview: parsedText.slice(0, 85) + '...',
      timestamp: 'Agora',
      status: 'Entregue'
    };
    setLogs(prev => [newLog, ...prev]);

    // Send in bot simulator
    const botMsg: WhatsAppMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `🔔 *Disparo de Lembrete via WhatsApp para ${apt.clientName} (${apt.clientPhone})*:\n\n${parsedText}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
      quickActions: [
        { label: '1️⃣ Confirmar', action: `Confirmo presença no protocolo ${apt.protocol}` },
        { label: '2️⃣ Remarcar', action: `Quero remarcar o protocolo ${apt.protocol}` },
        { label: '3️⃣ Cancelar', action: `Cancelar protocolo ${apt.protocol}` }
      ]
    };
    setMessages(prev => [...prev, botMsg]);

    showToast(`Lembrete disparado para ${apt.clientName} com sucesso!`);
    window.open(waUrl, '_blank');
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.clientName || !newForm.clientPhone || !newForm.date || !newForm.time) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const randomProtocol = `AGT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      protocol: randomProtocol,
      clientName: newForm.clientName,
      clientPhone: newForm.clientPhone,
      service: newForm.service,
      professionalOrDept: newForm.professionalOrDept,
      date: newForm.date,
      time: newForm.time,
      address: newForm.address || 'Atendimento Central / Presencial',
      status: 'Confirmado',
      reminder24hSent: false,
      reminder2hSent: false,
      notes: newForm.notes,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setAppointments(prev => [newApt, ...prev]);
    setShowNewAppointmentModal(false);
    showToast(`Agendamento ${randomProtocol} adicionado à agenda e integrado ao WhatsApp!`);

    // Add confirmation message to chat
    const msg: WhatsAppMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `📅 *Novo Agendamento Criado!*\n\n👤 *Cliente:* ${newApt.clientName}\n📋 *Protocolo:* *${newApt.protocol}*\n📌 *Serviço:* ${newApt.service}\n📆 *Data:* ${newApt.date} às ${newApt.time}\n📍 *Local:* ${newApt.address}\n\n🔔 A automação de lembretes foi programada para 24h e 2h antes!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };
    setMessages(prev => [...prev, msg]);

    // Reset form
    setNewForm({
      clientName: '',
      clientPhone: '',
      service: 'Vistoria Técnica / Iluminação',
      professionalOrDept: 'Secretaria de Serviços e Obras',
      date: new Date().toISOString().slice(0, 10),
      time: '10:00',
      address: '',
      notes: ''
    });
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.clientName.toLowerCase().includes(agendaSearch.toLowerCase()) ||
      apt.protocol.toLowerCase().includes(agendaSearch.toLowerCase()) ||
      apt.service.toLowerCase().includes(agendaSearch.toLowerCase()) ||
      apt.professionalOrDept.toLowerCase().includes(agendaSearch.toLowerCase());
    
    const matchesStatus = agendaFilterStatus === 'todos' || apt.status.toLowerCase() === agendaFilterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-3 animate-fade-in">
          <CheckCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-zinc-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Automação com IA 24/7 & Agenda Integrada
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Secretaria Virtual & WhatsApp 24 Horas
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Tira dúvidas, agenda atendimentos, remarca horários, cancela compromissos e dispara lembretes preventivos automaticamente direto no WhatsApp e na sua agenda.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-white">{appointments.filter(a => a.status !== 'Cancelado').length}</div>
              <div className="text-[11px] font-bold text-emerald-200 uppercase">Na Agenda</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-300">24/7</div>
              <div className="text-[11px] font-bold text-emerald-200 uppercase">Ativo</div>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-amber-300">100%</div>
              <div className="text-[11px] font-bold text-emerald-200 uppercase">Automático</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-emerald-700/50 mt-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-emerald-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Simulador WhatsApp 24h
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'agenda'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-emerald-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agenda Sincronizada ({appointments.length})
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'reminders'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-emerald-100'
            }`}
          >
            <Bell className="w-4 h-4" />
            Régua de Lembretes & Disparos
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'config'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-emerald-100'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Conexão WhatsApp & QR Code
          </button>
        </div>
      </div>

      {/* ================= TAB 1: WHATSAPP 24H SIMULATOR ================= */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Quick Action Triggers & Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-base">
                <Zap className="w-5 h-5 text-amber-500" />
                Testar Ações em 1 Toque
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Clique nos comandos rápidos abaixo para ver a IA executando agendamentos, remarcações, cancelamentos e respostas de dúvidas em tempo real:
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleSendMessage('Olá! Gostaria de agendar uma castração para o meu cachorro.')}
                  className="w-full text-left p-3 rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-zinc-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🐾</span>
                    <span>1. Agendar Castração Animal</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleSendMessage('Quero remarcar minha visita AGT-849201 para sexta às 15h')}
                  className="w-full text-left p-3 rounded-2xl border border-zinc-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs font-semibold text-zinc-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🔄</span>
                    <span>2. Remarcar Agendamento AGT-849201</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleSendMessage('Preciso cancelar meu agendamento AGT-773190')}
                  className="w-full text-left p-3 rounded-2xl border border-zinc-200 hover:border-red-500 hover:bg-red-50/50 transition-all text-xs font-semibold text-zinc-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">❌</span>
                    <span>3. Cancelar Agendamento</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleSendMessage('Como funciona o atendimento do CRAS e que documentos preciso levar?')}
                  className="w-full text-left p-3 rounded-2xl border border-zinc-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all text-xs font-semibold text-zinc-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">❓</span>
                    <span>4. Tirar Dúvidas 24h sobre CRAS</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleSendMessage('Preciso de um eletricista de emergência para disjuntor em curto')}
                  className="w-full text-left p-3 rounded-2xl border border-zinc-200 hover:border-yellow-500 hover:bg-yellow-50/50 transition-all text-xs font-semibold text-zinc-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">⚡</span>
                    <span>5. Chamar Eletricista / Chaveiro</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-yellow-600 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Sync Status Info */}
            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Sincronização Bidirecional Ativa
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Toda ação realizada no chat do WhatsApp atualiza imediatamente a aba <strong>Agenda Sincronizada</strong> e libera ou reserva horários no calendário automaticamente.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setActiveTab('agenda')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  Ver Agenda em Tempo Real &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp Phone Simulation Frame */}
          <div className="lg:col-span-2">
            <div className="bg-[#efeae2] rounded-3xl shadow-xl border border-zinc-300 overflow-hidden flex flex-col h-[650px] relative">
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg border border-white/30">
                      🤖
                    </div>
                    <span className="w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full absolute bottom-0 right-0"></span>
                  </div>

                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      Resolve Aí • Assistente Oficial 24h
                      <span className="text-[10px] bg-emerald-400 text-emerald-950 font-black px-1.5 py-0.2 rounded-full">
                        ✓ OFICIAL
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                      <span>Online 24 horas</span> • <span>Responde em 2s</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20no%20Resolve%20Aí"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-emerald-600/40 hover:bg-emerald-600 rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 text-white"
                    title="Abrir no WhatsApp Web"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp Real</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-repeat" style={{ backgroundImage: 'radial-gradient(#0000000a 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                <div className="text-center my-2">
                  <span className="bg-white/80 backdrop-blur-xs text-[11px] text-zinc-600 px-3 py-1 rounded-full shadow-2xs font-medium">
                    🔒 Mensagens criptografadas de ponta a ponta • IA 24h Ativa
                  </span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#d9fdd3] text-zinc-900 rounded-tr-none'
                          : 'bg-white text-zinc-900 rounded-tl-none border border-zinc-100'
                      }`}
                    >
                      <div className="whitespace-pre-line break-words">
                        {msg.text}
                      </div>

                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-zinc-400 font-mono">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'user' && (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                        )}
                      </div>
                    </div>

                    {/* Quick Options Buttons inside Bot Messages */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%] sm:max-w-[75%]">
                        {msg.quickActions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(opt.action)}
                            className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs transition-all hover:scale-102 cursor-pointer flex items-center gap-1"
                          >
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 bg-white text-zinc-500 px-4 py-2.5 rounded-2xl rounded-tl-none w-fit text-xs shadow-xs border border-zinc-100">
                    <Bot className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                    <span>Digitando resposta...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* WhatsApp Input Bar */}
              <div className="bg-[#f0f2f5] p-3 border-t border-zinc-300 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua dúvida ou comando (ex: remarcar para amanhã, cancelar, agendar)..."
                  className="flex-1 bg-white px-4 py-2.5 rounded-2xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#075e54] text-zinc-800"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 rounded-full bg-[#075e54] hover:bg-[#128c7e] disabled:opacity-50 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SYNCHRONIZED AGENDA ================= */}
      {activeTab === 'agenda' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={agendaSearch}
                  onChange={(e) => setAgendaSearch(e.target.value)}
                  placeholder="Buscar por nome, protocolo ou serviço..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={agendaFilterStatus}
                onChange={(e) => setAgendaFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="todos">Todos os Status</option>
                <option value="Agendado">Agendado</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Remarcado">Remarcado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <button
              onClick={() => setShowNewAppointmentModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Novo Agendamento na Agenda
            </button>
          </div>

          {/* Agenda Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAppointments.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-3">
                <CalendarDays className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-base font-bold text-zinc-700">Nenhum compromisso encontrado</h3>
                <p className="text-xs text-zinc-500">Tente ajustar seus filtros de busca ou crie um novo agendamento.</p>
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={`bg-white rounded-3xl p-5 border transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 ${
                    apt.status === 'Cancelado' 
                      ? 'border-red-200 bg-red-50/20 opacity-75' 
                      : apt.status === 'Confirmado'
                      ? 'border-emerald-200'
                      : apt.status === 'Remarcado'
                      ? 'border-blue-200'
                      : 'border-zinc-200'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-black text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                          {apt.protocol}
                        </span>
                        <h3 className="text-sm font-black text-zinc-900 mt-1">
                          {apt.service}
                        </h3>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${
                          apt.status === 'Confirmado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'Remarcado'
                            ? 'bg-blue-100 text-blue-800'
                            : apt.status === 'Cancelado'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 text-xs text-zinc-600">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="font-semibold text-zinc-800">{apt.clientName}</span>
                        <span className="text-zinc-400 font-mono text-[11px]">({apt.clientPhone})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-zinc-900">{apt.date} às {apt.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{apt.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                        <Bot className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{apt.professionalOrDept}</span>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="bg-zinc-50 p-2.5 rounded-xl text-[11px] text-zinc-600 border border-zinc-200/60 italic">
                        "{apt.notes}"
                      </div>
                    )}
                  </div>

                  {/* Actions Matrix */}
                  <div className="pt-3 border-t border-zinc-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Bell className="w-3 h-3 text-emerald-600" /> Lembrete 24h:
                      </span>
                      <span className={apt.reminder24hSent ? 'text-emerald-700 font-bold' : 'text-zinc-400 font-medium'}>
                        {apt.reminder24hSent ? '✓ Enviado' : 'Programado'}
                      </span>
                    </div>

                    {apt.status !== 'Cancelado' && (
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <button
                          onClick={() => handleSendManualReminder(apt)}
                          className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                          title="Disparar Lembrete WhatsApp"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Lembrete</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowRescheduleModal(apt);
                            setNewDate(apt.date);
                            setNewTime(apt.time);
                          }}
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                          title="Remarcar Data/Hora"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Remarcar</span>
                        </button>

                        <button
                          onClick={() => handleCancelAppointment(apt)}
                          className="p-2 bg-red-50 hover:bg-red-600 text-red-800 hover:text-white rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                          title="Cancelar Agendamento"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancelar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: REMINDERS & DISPATCH RULES ================= */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Rules Configuration */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-zinc-900">
                      Régua de Disparos Automáticos de WhatsApp
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Configure os momentos exatos em que a IA deve enviar lembretes e solicitar confirmação.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reminderRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                            {rule.hoursBefore === 0 ? '⚡' : `${rule.hoursBefore}h`}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-zinc-900">{rule.title}</div>
                            <div className="text-[11px] text-zinc-500">{rule.triggerDescription}</div>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rule.enabled}
                            onChange={() => {
                              setReminderRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                              showToast(`Regra "${rule.title}" atualizada.`);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-700">
                        {rule.template}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Dispatch Logs */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-zinc-900">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Histórico de Disparos em Tempo Real
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-900">{log.recipientName}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                          {log.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">{log.phone} • {log.timestamp}</div>
                      <p className="text-zinc-600 text-[11px] line-clamp-2">
                        {log.messagePreview}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: WHATSAPP QR CODE & INTEGRATION ================= */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-900">Conectar WhatsApp Business</h2>
                <p className="text-xs text-zinc-500">Escaneie o QR Code no app do WhatsApp para conectar a IA à sua linha.</p>
              </div>
            </div>

            {/* QR Code Mock Visual */}
            <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-300 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-md border border-zinc-200 flex items-center justify-center">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-zinc-900 rounded-lg">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-white'
                          : 'bg-zinc-900'
                      } rounded-xs`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Status: Robô Conectado e Operando 24 Horas
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-600">
              <div className="font-bold text-zinc-900">Instruções de Conexão:</div>
              <ol className="list-decimal list-inside space-y-1 text-zinc-600 leading-relaxed">
                <li>Abra o WhatsApp no seu smartphone.</li>
                <li>Toque em <strong>Aparelhos Conectados</strong> &rarr; <strong>Conectar um aparelho</strong>.</li>
                <li>Aponte a câmera para o QR Code acima para sincronizar as mensagens e a agenda.</li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-900">Integração com Google Calendar & iCal</h2>
                  <p className="text-xs text-zinc-500">Sincronize os agendamentos feitos no WhatsApp direto com seu calendário pessoal.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="text-xs font-bold text-blue-900">Link de Assinatura iCal / Google Calendar:</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://resolveai.gov.br/api/calendar/feed.ics?token=resolveai_secret_8492"
                    className="w-full bg-white px-3 py-2 rounded-xl border border-blue-300 text-[11px] font-mono text-zinc-700"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://resolveai.gov.br/api/calendar/feed.ics?token=resolveai_secret_8492');
                      showToast('Link do calendário copiado!');
                    }}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all cursor-pointer"
                    title="Copiar Link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-900">Recursos de Automação Ativos:</div>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bloqueio de horários conflitantes na agenda em tempo real</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Liberação instantânea de vagas em caso de cancelamento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Envio de alertas para o WhatsApp dos servidores e profissionais</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button
                onClick={() => {
                  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Resolve Ai//NONSGML v1.0//PT\n${appointments.map(a => `BEGIN:VEVENT\nSUMMARY:${a.service} - ${a.clientName}\nDESCRIPTION:Protocolo: ${a.protocol}\\nNotas: ${a.notes || ''}\nLOCATION:${a.address}\nSTATUS:CONFIRMED\nEND:VEVENT`).join('\n')}\nEND:VCALENDAR`;
                  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'agenda_resolve_ai.ics';
                  a.click();
                  showToast('Arquivo .ics da agenda baixado!');
                }}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Exportar Agenda Completa (.ics)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW APPOINTMENT ================= */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-black text-base">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Criar Novo Agendamento na Agenda
              </div>
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-700 font-bold mb-1">Nome do Solicitante / Cliente *</label>
                <input
                  type="text"
                  required
                  value={newForm.clientName}
                  onChange={(e) => setNewForm({ ...newForm, clientName: e.target.value })}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">WhatsApp para Lembretes Automáticos *</label>
                <input
                  type="tel"
                  required
                  value={newForm.clientPhone}
                  onChange={(e) => setNewForm({ ...newForm, clientPhone: e.target.value })}
                  placeholder="Ex: (11) 98765-4321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-bold mb-1">Data *</label>
                  <input
                    type="date"
                    required
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-bold mb-1">Horário *</label>
                  <input
                    type="time"
                    required
                    value={newForm.time}
                    onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">Serviço Solicitado</label>
                <input
                  type="text"
                  value={newForm.service}
                  onChange={(e) => setNewForm({ ...newForm, service: e.target.value })}
                  placeholder="Ex: Cadastro Único, Castração, Chaveiro, Iluminação"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">Endereço / Local de Atendimento</label>
                <input
                  type="text"
                  value={newForm.address}
                  onChange={(e) => setNewForm({ ...newForm, address: e.target.value })}
                  placeholder="Ex: CRAS Central ou Rua das Flores, 140"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">Observações Internas</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  placeholder="Instruções para a equipe..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Confirmar e Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: RESCHEDULE ================= */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-black text-base">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                Remarcar Compromisso
              </div>
              <button
                onClick={() => setShowRescheduleModal(null)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
                <div className="font-bold text-blue-950">{showRescheduleModal.service}</div>
                <div className="text-zinc-600">Cliente: <strong>{showRescheduleModal.clientName}</strong> ({showRescheduleModal.protocol})</div>
                <div className="text-blue-800 text-[11px]">Horário atual: {showRescheduleModal.date} às {showRescheduleModal.time}</div>
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">Nova Data *</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-bold mb-1">Novo Horário *</label>
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Confirmar Remarcação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
