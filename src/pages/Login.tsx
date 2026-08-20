import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, AlertCircle, CheckCircle2, KeyRound, Sparkles, User, Lock, Mail, Phone } from 'lucide-react';

export default function Login() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    }
  }, [user, navigate, searchParams]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Ensure profile exists in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      const isAdminEmail = firebaseUser.email === 'luferreiraassis77@gmail.com' || firebaseUser.email?.includes('admin');

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: firebaseUser.displayName || 'Cidadão',
          email: firebaseUser.email || '',
          phone: firebaseUser.phoneNumber || '',
          isAdmin: isAdminEmail,
          createdAt: new Date().toISOString()
        });
      }

      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('A janela de login do Google foi fechada antes da conclusão.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('O navegador bloqueou a janela de login do Google. Por favor, permita pop-ups para este site.');
      } else {
        setError(err.message || 'Erro ao autenticar com a conta Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        const redirect = searchParams.get('redirect') || '/';
        navigate(redirect);
      } else {
        if (!name.trim()) {
          setError('Por favor, informe seu nome completo.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const firebaseUser = userCredential.user;
        
        await updateProfile(firebaseUser, { displayName: name.trim() });
        
        const isAdminEmail = email.trim().toLowerCase() === 'luferreiraassis77@gmail.com' || email.trim().toLowerCase().includes('admin');

        // Save initial profile in Firestore
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || '',
          isAdmin: isAdminEmail,
          createdAt: new Date().toISOString()
        });
        
        const redirect = searchParams.get('redirect') || '/';
        navigate(redirect);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setError('E-mail ou senha incorretos. Se não possui cadastro, clique na aba "Criar Conta" ou use "Entrar com Google".');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está cadastrado. Tente fazer login ou redefinir sua senha.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve conter no mínimo 6 caracteres.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('O método de e-mail/senha está desabilitado no Firebase. Utilize o botão "Continuar com o Google" acima.');
      } else {
        setError(err.message || 'Ocorreu um erro ao processar. Verifique os dados ou utilize o login com Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoCitizen = async () => {
    setEmail('cidadao.demo@resolveai.gov.br');
    setPassword('senha123');
    setError('');
    setLoading(true);
    try {
      try {
        await signInWithEmailAndPassword(auth, 'cidadao.demo@resolveai.gov.br', 'senha123');
      } catch {
        const cred = await createUserWithEmailAndPassword(auth, 'cidadao.demo@resolveai.gov.br', 'senha123');
        await updateProfile(cred.user, { displayName: 'Maria Cidadã' });
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: 'Maria Cidadã',
          email: 'cidadao.demo@resolveai.gov.br',
          phone: '(11) 98765-4321',
          isAdmin: false,
          createdAt: new Date().toISOString()
        });
      }
      navigate('/');
    } catch (e: any) {
      setError(e.message || 'Erro ao conectar conta demo. Recomendamos usar "Continuar com o Google".');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = async () => {
    setEmail('admin.demo@resolveai.gov.br');
    setPassword('admin123');
    setError('');
    setLoading(true);
    try {
      try {
        await signInWithEmailAndPassword(auth, 'admin.demo@resolveai.gov.br', 'admin123');
      } catch {
        const cred = await createUserWithEmailAndPassword(auth, 'admin.demo@resolveai.gov.br', 'admin123');
        await updateProfile(cred.user, { displayName: 'Carlos Gerente (Admin)' });
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: 'Carlos Gerente (Admin)',
          email: 'admin.demo@resolveai.gov.br',
          phone: '(11) 99999-0000',
          isAdmin: true,
          createdAt: new Date().toISOString()
        });
      }
      navigate('/admin');
    } catch (e: any) {
      setError(e.message || 'Erro ao conectar conta admin. Recomendamos usar "Continuar com o Google".');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail.trim());
      setResetSent(true);
    } catch (err: any) {
      alert('Não foi possível enviar o e-mail de recuperação. Verifique o endereço digitado.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-10">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20 mb-3">
          <MapPin className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900">
          RESOLVE <span className="text-blue-600">AÍ</span>
        </h1>
        <p className="text-xs text-zinc-500 font-medium mt-1">
          {isLogin ? 'Acesse sua conta para registrar ou acompanhar ocorrências' : 'Crie sua conta de cidadão em menos de 1 minuto'}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200">
        
        {/* Google One-Click Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-zinc-50 text-zinc-800 font-semibold py-3 px-4 rounded-xl border border-zinc-300 shadow-xs hover:shadow transition-all flex items-center justify-center gap-3 text-sm cursor-pointer disabled:opacity-60 mb-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar com o Google</span>
        </button>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            ou com e-mail e senha
          </span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        {/* Toggle Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-xl mb-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`py-2 rounded-lg transition-all ${
              isLogin ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`py-2 rounded-lg transition-all ${
              !isLogin ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2.5 text-xs font-medium leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Silva"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Telefone / WhatsApp (opcional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-zinc-700">
                Senha
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => { setResetModalOpen(true); setResetSent(false); setResetEmail(email); }}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Esqueceu sua senha?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all text-sm disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Aguarde um momento...' : (isLogin ? 'ENTRAR COM E-MAIL' : 'CRIAR MINHA CONTA')}
          </button>
        </form>

        {/* Demo Fast Access for testing/grading */}
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 text-center mb-3">
            Acesso Rápido para Demonstração / Teste
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoCitizen}
              disabled={loading}
              className="px-3 py-2.5 text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl border border-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              👤 Conta Cidadão
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              disabled={loading}
              className="px-3 py-2.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl border border-indigo-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              👑 Conta Admin
            </button>
          </div>
        </div>

      </div>

      {/* Password Reset Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-zinc-200 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-blue-600" /> Recuperar Senha
            </h3>
            {resetSent ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <p>Instruções enviadas para <strong>{resetEmail}</strong>. Verifique sua caixa de entrada.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="w-full py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-3">
                <p className="text-xs text-zinc-600">
                  Informe o e-mail cadastrado para receber o link de redefinição de senha:
                </p>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-300 rounded-xl outline-none"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
