import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import CalculatorCamouflage from './components/CalculatorCamouflage';
import SafeModeBottomBar from './components/SafeModeBottomBar';

// Primary "NÃO É SUA PROPRIEDADE" Application Screens
import NaoESuaPropriedadeHome from './pages/NaoESuaPropriedadeHome';
import MitosVerdades from './pages/MitosVerdades';
import AjudaEmergencia from './pages/AjudaEmergencia';
import EducacaoJovens from './pages/EducacaoJovens';
import Compartilhe from './pages/Compartilhe';
import Configuracoes from './pages/Configuracoes';

// Additional Integrated City & Health Modules
import SocialProtection from './pages/SocialProtection';
import MentalHealthCrisis from './pages/MentalHealthCrisis';
import NeighborhoodServices from './pages/NeighborhoodServices';
import WhatsAppAutomation from './pages/WhatsAppAutomation';
import CityMapPage from './pages/CityMapPage';
import Login from './pages/Login';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return localStorage.getItem('splash_enabled') !== 'false';
  });
  const [isCamouflaged, setIsCamouflaged] = useState(false);

  return (
    <AuthProvider>
      {/* 1. TELA DE ABERTURA / SPLASH SCREEN (2s) */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* 2. MODO CAMUFLAGEM (Calculadora Funcional Disfarçada) */}
      {isCamouflaged ? (
        <CalculatorCamouflage onUnlock={() => setIsCamouflaged(false)} />
      ) : (
        <BrowserRouter>
          <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-[#9C27B0] selection:text-white flex flex-col justify-between relative">
            <div>
              <Navbar onTriggerCamouflage={() => setIsCamouflaged(true)} />
              
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <Routes>
                  {/* 🔴 TELA INICIAL (HOME) */}
                  <Route path="/" element={<NaoESuaPropriedadeHome />} />
                  <Route path="/home" element={<NaoESuaPropriedadeHome />} />

                  {/* 🟣 TELA 1 — MITOS & VERDADES (Desconstruindo) */}
                  <Route path="/mitos-verdades" element={<MitosVerdades />} />
                  <Route path="/mitos" element={<MitosVerdades />} />

                  {/* 🟢 TELA 2 — AJUDA & EMERGÊNCIA (180 / 190 / MPU) */}
                  <Route path="/ajuda-emergencia" element={<AjudaEmergencia />} />
                  <Route path="/ajuda" element={<AjudaEmergencia />} />
                  <Route path="/emergencia" element={<AjudaEmergencia />} />
                  <Route path="/sos" element={<AjudaEmergencia />} />

                  {/* 🟡 TELA 3 — EDUCAÇÃO (Jovens & Educadores) */}
                  <Route path="/educacao" element={<EducacaoJovens />} />
                  <Route path="/escolas" element={<EducacaoJovens />} />
                  <Route path="/cartazes" element={<EducacaoJovens />} />

                  {/* 🔵 TELA 4 — COMPARTILHE (Multiplicar a Mensagem) */}
                  <Route path="/compartilhe" element={<Compartilhe />} />
                  <Route path="/compartilhar" element={<Compartilhe />} />

                  {/* ⚙️ TELA DE CONFIGURAÇÕES */}
                  <Route 
                    path="/configuracoes" 
                    element={
                      <Configuracoes 
                        onTriggerCamouflage={() => setIsCamouflaged(true)} 
                      />
                    } 
                  />

                  {/* Integrated Health, Social & Services Hub */}
                  <Route path="/social" element={<SocialProtection />} />
                  <Route path="/saude-mental" element={<MentalHealthCrisis />} />
                  <Route path="/prevencao-suicidio" element={<MentalHealthCrisis />} />
                  <Route path="/servicos" element={<NeighborhoodServices />} />
                  <Route path="/whatsapp" element={<WhatsAppAutomation />} />
                  <Route path="/map" element={<CityMapPage />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>

            {/* Academic, Legal & Social Manifesto Footer */}
            <footer className="border-t border-purple-200 bg-white/90 py-6 text-center text-xs text-zinc-600 mb-14">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="font-medium">
                  <strong className="text-purple-950">NÃO É SUA PROPRIEDADE</strong> — A liberdade não é um crime, é um direito inalienável.
                </p>
                <p className="text-[11px] text-zinc-500 font-semibold flex items-center justify-center gap-2">
                  <span>Central da Mulher: <strong>Ligue 180</strong></span>
                  <span>•</span>
                  <span>Polícia Militar: <strong>Ligue 190</strong></span>
                </p>
              </div>
            </footer>

            {/* 🛡️ DETALHE CRÍTICO: MODO SEGURO (Faixa vermelha fixa embaixo em todas as telas) */}
            <SafeModeBottomBar onTriggerCamouflage={() => setIsCamouflaged(true)} />
          </div>
        </BrowserRouter>
      )}
    </AuthProvider>
  );
}
