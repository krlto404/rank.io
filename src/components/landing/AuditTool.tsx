import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight, Check, Loader2, Share2, Download, Zap } from 'lucide-react';

interface AuditToolProps {
  auditStep: 'idle' | 'analyzing' | 'results';
  auditUrl: string;
  setAuditUrl: (url: string) => void;
  handleStartAuditTrigger: () => void;
  analysisProgress: number;
  auditData: any;
  handleShare: () => void;
  handleDownload: () => void;
  isDownloading: boolean;
  setAuditStep: (step: 'idle' | 'analyzing' | 'results') => void;
  t: any;
  renderAuditResults: () => React.ReactNode;
}

export const AuditTool = ({
  auditStep,
  auditUrl,
  setAuditUrl,
  handleStartAuditTrigger,
  analysisProgress,
  auditData,
  handleShare,
  handleDownload,
  isDownloading,
  setAuditStep,
  t,
  renderAuditResults
}: AuditToolProps) => {
  return (
    <div id="audit-tool" className="w-full mb-12 sm:mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t.auditTitle}</h2>
          <p className="text-text-secondary text-base sm:text-lg font-medium">{t.auditSub}</p>
        </div>

        <div className="card p-6 md:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {auditStep === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 will-change-[transform,opacity]"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-main rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                  <div className="relative flex flex-col sm:flex-row gap-4 bg-surface p-2 rounded-2xl border border-border">
                    <div className="flex-1 flex items-center px-4 gap-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <input 
                        type="url" 
                        placeholder="https://eveom.fr"
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        className="bg-transparent border-none text-text placeholder:text-text-muted focus:ring-0 w-full text-lg font-medium"
                      />
                    </div>
                    <button 
                      onClick={handleStartAuditTrigger}
                      disabled={!auditUrl}
                      className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      {t.auditBtn}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {auditStep === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center space-y-12 max-w-2xl mx-auto relative will-change-opacity"
              >
                <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                  <motion.div 
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
                  />
                </div>

                <div className="relative w-48 h-48 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                  />
                  
                  <svg className="w-full h-full -rotate-90 relative z-10">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--info)" />
                      </linearGradient>
                    </defs>
                    <circle 
                      cx="96" cy="96" r="88" 
                      className="stroke-border fill-none" 
                      strokeWidth="4" 
                    />
                    <motion.circle 
                      cx="96" cy="96" r="88" 
                      className="stroke-[url(#progressGradient)] fill-none" 
                      strokeWidth="6"
                      strokeDasharray="553"
                      initial={{ strokeDashoffset: 553 }}
                      animate={{ strokeDashoffset: 553 - (553 * analysisProgress / 100) }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <motion.span 
                      key={analysisProgress}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-black text-text font-mono tracking-tighter"
                    >
                      {analysisProgress}%
                    </motion.span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mt-1">Analyse</span>
                  </div>

                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-30 pointer-events-none"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-primary to-transparent opacity-40 blur-sm" />
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-text tracking-tight">{t.auditAnalyzing}</h3>
                    <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Moteur de diagnostic Renk v4.0</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="max-w-md w-full mx-auto space-y-3 bg-bg-secondary p-6 rounded-md border border-border">
                      <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Status: Live Analysis</span>
                        </div>
                        <span className="text-[10px] font-mono text-primary/60">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                      
                      {[
                        { id: 'search', label: "Recherche d'entités locales...", progress: 20 },
                        { id: 'ai', label: "Analyse de la visibilité IA (ChatGPT, Gemini)...", progress: 45 },
                        { id: 'competitors', label: "Comparaison avec les concurrents réels...", progress: 70 },
                        { id: 'strategy', label: "Génération de la feuille de route stratégique...", progress: 90 }
                      ].map((step, i) => (
                        <div key={step.id} className={`flex items-center gap-4 p-3 rounded-sm transition-all duration-500 ${analysisProgress >= step.progress ? 'bg-primary/5 border-primary/10' : 'bg-surface border-border'}`}>
                          <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                            {analysisProgress >= step.progress ? (
                              <motion.div 
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                                {analysisProgress > step.progress - 25 && (
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="w-3 h-3 border border-primary border-t-transparent rounded-full"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-500 ${analysisProgress >= step.progress ? 'text-primary' : 'text-text-muted'}`}>
                              {step.label}
                            </div>
                            {analysisProgress > step.progress - 25 && analysisProgress < step.progress && (
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                className="h-[1px] bg-primary/30 mt-1"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] animate-pulse mt-4">
                      Connexion sécurisée aux API LLM établie...
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {auditStep === 'results' && auditData && (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">{auditUrl}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-text">{t.auditResults}</h3>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleShare}
                      className="p-3 rounded-md bg-surface border border-border hover:bg-bg-secondary transition-colors relative group"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">{t.auditShareReport}</span>
                    </button>
                    <button 
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="p-3 rounded-md bg-surface border border-border hover:bg-bg-secondary transition-colors relative group disabled:opacity-50"
                    >
                      {isDownloading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Download className="w-5 h-5" />}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                        {isDownloading ? t.auditGenerating : t.auditDownloadPDF}
                      </span>
                    </button>
                    <button 
                      onClick={() => setAuditStep('idle')}
                      className="btn-primary px-6 py-3"
                    >
                      {t.auditNewAudit}
                    </button>
                  </div>
                </div>

                {renderAuditResults()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
