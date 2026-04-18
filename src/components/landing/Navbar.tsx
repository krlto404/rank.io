import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, Home } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { RenkLogo } from '../RenkLogo';

interface NavbarProps {
  showNavbar: boolean;
  user: any;
  setView: (view: any) => void;
  setActiveTab: (tab: string) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  setIsAuthModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  t: any;
}

export const Navbar = ({
  showNavbar,
  user,
  setView,
  setActiveTab,
  setAuthMode,
  setIsAuthModalOpen,
  isMenuOpen,
  setIsMenuOpen,
  t
}: NavbarProps) => {

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full border-b border-border bg-white/40 backdrop-blur-xl z-50 h-12 sm:h-14 will-change-transform"
      >
        <div className="pl-2 sm:pl-4 pr-4 sm:px-6 h-full flex justify-between items-center max-w-7xl mx-auto w-full relative">
          <div className="flex items-center -ml-2 sm:-ml-4">
            <RenkLogo className="h-24 sm:h-32 w-auto translate-y-2" variant="small" />
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setActiveTab('overview');
                  }}
                  className="hidden sm:block text-sm font-bold text-text hover:text-primary transition-colors"
                >
                  Tableau de Bord
                </button>
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setActiveTab('profile');
                  }}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-bg-secondary border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-main p-[1px]">
                    <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary group-hover:text-primary transition-colors">Mon Profil</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="text-sm font-bold text-text hover:text-primary transition-colors"
              >
                Connexion
              </button>
            )}

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text hover:text-primary transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white bg-landing z-[100] flex flex-col p-8 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <RenkLogo className="h-24 sm:h-32 w-auto" variant="small" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-8 h-8 text-text" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                <a 
                  href="#pricing" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-text hover:text-primary transition-colors"
                >
                  {t.navPricing}
                </a>

                <button 
                  onClick={() => {
                    setView('blog');
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className="text-2xl font-bold text-text hover:text-primary text-left transition-colors"
                >
                  Blog
                </button>

                {user ? (
                  <div className="flex flex-col gap-8">
                    <button 
                      onClick={() => {
                        setView('dashboard');
                        setActiveTab('overview');
                        setIsMenuOpen(false);
                      }}
                      className="text-2xl font-bold text-text hover:text-primary text-left transition-colors"
                    >
                      Tableau de Bord
                    </button>
                    <button 
                      onClick={() => {
                        setView('dashboard');
                        setActiveTab('profile');
                        setIsMenuOpen(false);
                      }}
                      className="text-2xl font-bold text-text hover:text-primary text-left transition-colors"
                    >
                      Mon Profil
                    </button>
                    <div className="pt-4 border-t border-border">
                      <div className="text-sm font-bold text-text-secondary mb-2">{user.email}</div>
                      <button 
                        onClick={() => {
                          signOut(auth);
                          setIsMenuOpen(false);
                        }}
                        className="text-xl font-bold text-red-500"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-2xl font-bold text-text hover:text-primary text-left"
                  >
                    Connexion
                  </button>
                )}

                <button 
                  onClick={() => {
                    const element = document.getElementById('audit-tool');
                    element?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary text-xl py-4 w-full"
                >
                  {t.navStart}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
