import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: FirebaseUser) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      onAuthSuccess(userCredential.user);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue avec la connexion Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new OAuthProvider('apple.com');
      const userCredential = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      onAuthSuccess(userCredential.user);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue avec la connexion Apple.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: serverTimestamp()
        }, { merge: true });
        onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
        onAuthSuccess(userCredential.user);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.code === 'auth/user-not-found' ? 'Utilisateur non trouvé' : 
                err.code === 'auth/wrong-password' ? 'Mot de passe incorrect' : 
                err.code === 'auth/email-already-in-use' ? 'Cet email est déjà utilisé' :
                err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-premium p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text mb-2">
                {mode === 'login' ? 'Bon retour' : 'Rejoignez Renk'}
              </h2>
              <p className="text-text-secondary">
                {mode === 'login' ? 'Connectez-vous pour accéder à vos audits' : 'Commencez à dominer la recherche IA dès aujourd\'hui'}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuer avec Google
              </button>

              <button 
                onClick={handleAppleSignIn}
                disabled={loading}
                className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                Continuer avec Apple
              </button>
            </div>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Ou avec email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Mot de passe</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'login' ? 'Se connecter' : 'S\'inscrire')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm font-bold text-primary hover:underline"
              >
                {mode === 'login' ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
