import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  toggleAdminRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          const emailNormalized = (firebaseUser.email || '').trim().toLowerCase();
          const isMasterAdmin = emailNormalized === 'luferreiraassis77@gmail.com' || emailNormalized.includes('admin');

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const isAdminFinal = isMasterAdmin ? true : (userData.isAdmin ?? false);
            
            // If master admin was marked as false previously, update in Firestore
            if (isMasterAdmin && !userData.isAdmin) {
              setDoc(userDocRef, { isAdmin: true }, { merge: true }).catch(console.warn);
            }

            setUser({
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || 'Cidadão',
              email: firebaseUser.email || '',
              phone: userData.phone || '',
              isAdmin: isAdminFinal,
              createdAt: userData.createdAt,
            });
          } else {
            const defaultProfile: UserProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Cidadão',
              email: firebaseUser.email || '',
              phone: '',
              isAdmin: isMasterAdmin,
              createdAt: new Date().toISOString(),
            };
            try {
              await setDoc(userDocRef, defaultProfile);
            } catch (writeErr) {
              console.warn("Could not save initial user doc:", writeErr);
            }
            setUser(defaultProfile);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
          const emailNormalized = (firebaseUser.email || '').trim().toLowerCase();
          const isMasterAdmin = emailNormalized === 'luferreiraassis77@gmail.com' || emailNormalized.includes('admin');
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Cidadão',
            email: firebaseUser.email || '',
            isAdmin: isMasterAdmin,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const toggleAdminRole = async () => {
    if (!user) return;
    const newAdminStatus = !user.isAdmin;
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, { isAdmin: newAdminStatus }, { merge: true });
    setUser(prev => prev ? { ...prev, isAdmin: newAdminStatus } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, resetPassword, toggleAdminRole }}>
      {!loading ? children : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-medium text-zinc-500">Iniciando Resolve Aí...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
