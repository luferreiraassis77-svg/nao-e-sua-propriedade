import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Calendar, 
  Clock, 
  RefreshCw, 
  ArrowUpRight, 
  Sparkles, 
  CheckCheck,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; options?: Array<{ label: string; action: string }> }>>([
    {
      sender: 'bot',
      text: '👋 Olá! Sou o *Assistente WhatsApp 24h do Resolve Aí*.\n\nPosso tirar dúvidas, agendar, remarcar e cancelar seus compromissos a qualquer hora!',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: '📅 Agendar Atendimento', action: 'Quero agendar um serviço' },
        { label: '🔄 Remarcar Data', action: 'Gostaria de remarcar meu compromisso' },
        { label: '❌ Cancelar', action: 'Preciso cancelar meu agendamento' },
        { label: '❓ Tirar Dúvidas 24h', action: 'Quais os horários de atendimento?' }
      ]
    }
  ]);

  const navigate = useNavigate();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time }]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/whatsapp-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: data.replyText,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          options: data.quickOptions
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Entendido! Acesse nossa central de automação para gerenciar sua agenda completa.',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-zinc-700 animate-bounce flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>WhatsApp 24h & Agenda IA</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer group ${
            isOpen 
              ? 'bg-zinc-800 text-white rotate-90 hover:bg-zinc-900' 
              : 'bg-[#25D366] text-white hover:scale-105 hover:bg-[#1ebd5a]'
          }`}
          title="WhatsApp 24h & Agenda Automática"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-[#25D366] rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col animate-fade-in">
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  🤖
                </div>
                <span className="w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full absolute bottom-0 right-0"></span>
              </div>

              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1">
                  ResolveBot WhatsApp
                  <span className="text-[9px] bg-emerald-400 text-emerald-950 font-bold px-1 rounded">24H</span>
                </div>
                <div className="text-[10px] text-emerald-200">Online • Sincronizado à Agenda</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/whatsapp');
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg text-xs font-bold text-emerald-200 flex items-center gap-1 cursor-pointer"
                title="Abrir Central Completa"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#efeae2] text-xs scrollbar-thin">
            <div className="text-center my-1">
              <span className="bg-white/90 text-[10px] text-zinc-600 px-2.5 py-0.5 rounded-full shadow-2xs font-medium">
                Atendimento Automatizado 24h
              </span>
            </div>

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#d9fdd3] text-zinc-900 rounded-tr-none'
                      : 'bg-white text-zinc-900 rounded-tl-none border border-zinc-100'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                  <div className="text-[9px] text-zinc-400 text-right mt-1 font-mono flex items-center justify-end gap-1">
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-500" />}
                  </div>
                </div>

                {m.options && m.options.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1 max-w-[85%]">
                    {m.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt.action)}
                        className="bg-white hover:bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="bg-white text-zinc-500 px-3 py-1.5 rounded-2xl rounded-tl-none w-fit text-[11px] flex items-center gap-1.5 shadow-2xs">
                <Bot className="w-3 h-3 text-emerald-600 animate-spin" />
                <span>Digitando...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Agenda Link Banner */}
          <div className="bg-emerald-50 px-3 py-1.5 border-t border-emerald-200 flex items-center justify-between text-[11px]">
            <span className="text-emerald-900 font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-600" /> Agenda Integrada
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/whatsapp');
              }}
              className="font-bold text-emerald-700 hover:text-emerald-950 underline cursor-pointer"
            >
              Abrir Painel &rarr;
            </button>
          </div>

          {/* Input Box */}
          <div className="bg-[#f0f2f5] p-2.5 border-t border-zinc-200 flex items-center gap-1.5 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida ou comando..."
              className="flex-1 bg-white px-3 py-2 rounded-xl text-xs border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#075E54]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-full bg-[#075E54] hover:bg-[#128C7E] disabled:opacity-50 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
