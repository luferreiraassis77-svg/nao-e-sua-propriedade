import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HelpCircle,
  PhoneCall,
  GraduationCap,
  Share2,
  Settings,
  ShieldAlert,
  Menu,
  X,
  LogOut,
  Sparkles,
  Heart,
  Home as HomeIcon,
  Calculator
} from 'lucide-react';
import QuickCommandModal from './QuickCommandModal';

interface NavbarProps {
  onTriggerCamouflage?: () => void;
}

export default function Navbar({ onTriggerCamouflage }: NavbarProps) {
  const { user, signOut, toggleAdminRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo: NÃO É SUA PROPRIEDADE */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9C27B0] to-[#4A148C] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl">💜</span>
              </div>
              <div>
                <span className="font-black text-lg sm:text-xl tracking-tight text-zinc-900 flex items-center gap-1">
                  NÃO É SUA <span className="text-[#9C27B0]">PROPRIEDADE</span>
                </span>
                <p className="text-[10px] uppercase font-bold tracking-wider text-purple-900/60 -mt-1 hidden sm:block">
                  A liberdade é um direito inalienável
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links (4 TELAS) */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 ${
                  isActive('/') ? 'bg-purple-100 text-purple-950' : 'text-zinc-700 hover:text-purple-900 hover:bg-purple-50'
                }`}
              >
                <HomeIcon className="w-3.5 h-3.5" /> Início
              </Link>

              {/* TELA 1: MITOS & VERDADES */}
              <Link 
                to="/mitos-verdades" 
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive('/mitos-verdades') 
                    ? 'bg-purple-700 text-white shadow-xs' 
                    : 'text-purple-950 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Mitos & Verdades</span>
              </Link>

              {/* TELA 2: AJUDA & EMERGÊNCIA */}
              <Link 
                to="/ajuda-emergencia" 
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive('/ajuda-emergencia')
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-emerald-950 bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ajuda & Emergência</span>
              </Link>

              {/* TELA 3: EDUCAÇÃO */}
              <Link 
                to="/educacao" 
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive('/educacao')
                    ? 'bg-amber-500 text-zinc-950 shadow-xs' 
                    : 'text-amber-950 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                <span>Educação</span>
              </Link>

              {/* TELA 4: COMPARTILHE */}
              <Link 
                to="/compartilhe" 
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive('/compartilhe')
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-blue-950 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Compartilhe</span>
              </Link>

              {/* CONFIGURAÇÕES */}
              <Link 
                to="/configuracoes" 
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive('/configuracoes') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
                title="Configurações e Camuflagem"
              >
                <Settings className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center gap-2">
              
              {onTriggerCamouflage && (
                <button
                  type="button"
                  onClick={onTriggerCamouflage}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="Disfarçar aplicativo instantaneamente em Calculadora"
                >
                  <Calculator className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="hidden xl:inline">Camuflar</span>
                </button>
              )}

              {/* LIGUE 180 BUTTON */}
              <a
                href="tel:180"
                className="bg-[#9C27B0] hover:bg-[#8E24AA] text-white text-xs font-black px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
                title="Ligue 180 - Central de Atendimento à Mulher 24h"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>LIGUE 180</span>
              </a>

              {/* Quick Commands Trigger */}
              <button
                type="button"
                onClick={() => setSosModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-3 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Central de Comandos em 1 Botão"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>SOS</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:180"
                className="px-3 py-1.5 bg-[#9C27B0] text-white text-xs font-black rounded-xl flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> 180
              </a>

              {onTriggerCamouflage && (
                <button
                  type="button"
                  onClick={onTriggerCamouflage}
                  className="p-2 bg-zinc-100 text-zinc-700 rounded-xl"
                  title="Camuflar"
                >
                  <Calculator className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-900 font-bold hover:bg-purple-50"
            >
              <HomeIcon className="w-5 h-5 text-purple-700" /> Início
            </Link>

            <Link
              to="/mitos-verdades"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-950 font-black bg-purple-50 border border-purple-200"
            >
              <HelpCircle className="w-5 h-5 text-[#9C27B0]" /> 🟣 Tela 1 — Mitos & Verdades
            </Link>
            
            <Link
              to="/ajuda-emergencia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-950 font-black bg-emerald-50 border border-emerald-200"
            >
              <PhoneCall className="w-5 h-5 text-emerald-600" /> 🟢 Tela 2 — Ajuda & Emergência (180/190)
            </Link>

            <Link
              to="/educacao"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-950 font-black bg-amber-50 border border-amber-200"
            >
              <GraduationCap className="w-5 h-5 text-amber-600" /> 🟡 Tela 3 — Educação & Cartazes
            </Link>

            <Link
              to="/compartilhe"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-950 font-black bg-blue-50 border border-blue-200"
            >
              <Share2 className="w-5 h-5 text-blue-600" /> 🔵 Tela 4 — Compartilhe
            </Link>

            <Link
              to="/configuracoes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-700 font-bold hover:bg-zinc-100"
            >
              <Settings className="w-5 h-5 text-zinc-600" /> ⚙️ Configurações & Camuflagem
            </Link>
          </div>
        )}
      </header>

      {/* Quick Command & SOS Modal */}
      <QuickCommandModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />
    </>
  );
}
