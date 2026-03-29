import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, ChevronDown, Sparkles } from 'lucide-react';

export function AnimatedDashboard({ lang }: { lang: 'en' | 'fr' | 'es' }) {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [scrollPos, setScrollPos] = useState(0);
  const [innerScroll, setInnerScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const targetText = 'eveom.com';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runAnimation = async () => {
      if (phase === 0) {
        setTypedText('');
        setScrollPos(0);
        setInnerScroll(0);
        await delay(800);
        if (!isCancelled) setPhase(1);
      } else if (phase === 1) {
        if (typedText.length < targetText.length) {
          await delay(40 + Math.random() * 60);
          if (!isCancelled) setTypedText(targetText.slice(0, typedText.length + 1));
        } else {
          await delay(600);
          if (!isCancelled) setPhase(2);
        }
      } else if (phase === 2) {
        await delay(1200);
        if (!isCancelled) setPhase(3);
      } else if (phase === 3) {
        // Page 1
        await delay(2500);
        if (isCancelled) return;
        setInnerScroll(1);
        
        await delay(2500);
        if (isCancelled) return;
        setScrollPos(1);
        setInnerScroll(0);
        
        // Page 2
        await delay(2500);
        if (isCancelled) return;
        setInnerScroll(1);
        
        await delay(2500);
        if (isCancelled) return;
        setScrollPos(2);
        setInnerScroll(0);
        
        // Page 3
        await delay(2500);
        if (isCancelled) return;
        setInnerScroll(1);
        
        await delay(2500);
        if (isCancelled) return;
        setScrollPos(3);
        setInnerScroll(0);
        
        // Page 4
        await delay(2500);
        if (isCancelled) return;
        setInnerScroll(1);
        
        await delay(2500);
        if (isCancelled) return;
        setPhase(0);
      }
    };

    runAnimation();

    return () => {
      isCancelled = true;
    };
  }, [phase, typedText, targetText]);

  const t = {
    en: {
      title: "Win every search",
      placeholder: "Enter your website",
      btn: "Analyze",
      domain: "Domain Research",
      aiSearch: "AI Search",
      seo: "SEO",
      visibility: "AI Visibility",
      mentions: "Mentions",
      cited: "Cited Pages",
      authority: "Authority Score",
      leader: "Industry leader",
      traffic: "Traffic Share",
      keywords: "Organic Keywords",
      orgTraffic: "Organic Traffic",
      overview: "Visibility Overview",
      great: "Great",
      platforms: "All AI platforms",
      desc: "Frequently mentioned and often preferred by LLMs",
      competitors: "Competitors",
      growth: "Growth",
      opportunities: "Opportunities",
      backlinks: "Backlinks",
      health: "Site Health",
      issues: "Issues Found",
      refDomains: "Referring Domains",
      toxicLinks: "Toxic Links",
      crawledPages: "Crawled Pages",
      redirects: "Redirects",
      https: "HTTPS",
      sitemap: "XML Sitemap",
      robots: "Robots.txt",
      valid: "Valid",
      found: "Found",
      seoScore: "SEO Score",
      coreWebVitals: "Core Web Vitals",
      mobileFriendly: "Mobile Friendly",
      indexability: "Indexability",
      contentQuality: "Content Quality",
      loadTime: "Load Time",
      passed: "Passed",
      yes: "Yes"
    },
    fr: {
      title: "Gagnez chaque recherche",
      placeholder: "Entrez votre site web",
      btn: "Analyser",
      domain: "Recherche de Domaine",
      aiSearch: "Recherche IA",
      seo: "SEO",
      visibility: "Visibilité IA",
      mentions: "Mentions",
      cited: "Pages Citées",
      authority: "Score d'Autorité",
      leader: "Leader du secteur",
      traffic: "Part de Trafic",
      keywords: "Mots-clés Organiques",
      orgTraffic: "Trafic Organique",
      overview: "Vue d'ensemble",
      great: "Excellent",
      platforms: "Toutes les IA",
      desc: "Fréquemment mentionné et souvent préféré par les LLMs",
      competitors: "Concurrents",
      growth: "Croissance",
      opportunities: "Opportunités",
      backlinks: "Backlinks",
      health: "Santé du Site",
      issues: "Problèmes Détectés",
      refDomains: "Domaines Référents",
      toxicLinks: "Liens Toxiques",
      crawledPages: "Pages Explorées",
      redirects: "Redirections",
      https: "HTTPS",
      sitemap: "Sitemap XML",
      robots: "Robots.txt",
      valid: "Valide",
      found: "Trouvé",
      seoScore: "Score SEO",
      coreWebVitals: "Signaux Web Essentiels",
      mobileFriendly: "Adapté aux Mobiles",
      indexability: "Indexabilité",
      contentQuality: "Qualité du Contenu",
      loadTime: "Temps de Chargement",
      passed: "Réussi",
      yes: "Oui"
    },
    es: {
      title: "Gana cada búsqueda",
      placeholder: "Ingresa tu sitio web",
      btn: "Analizar",
      domain: "Búsqueda de Dominio",
      aiSearch: "Búsqueda IA",
      seo: "SEO",
      visibility: "Visibilidad IA",
      mentions: "Menciones",
      cited: "Páginas Citadas",
      authority: "Puntuación Autoridad",
      leader: "Líder del sector",
      traffic: "Cuota de Tráfico",
      keywords: "Palabras Clave",
      orgTraffic: "Tráfico Orgánico",
      overview: "Visión General",
      great: "Excelente",
      platforms: "Todas las IA",
      desc: "Frecuentemente mencionado y preferido por los LLMs",
      competitors: "Competidores",
      growth: "Crecimiento",
      opportunities: "Oportunidades",
      backlinks: "Backlinks",
      health: "Salud del Sitio",
      issues: "Problemas Encontrados",
      refDomains: "Dominios Referentes",
      toxicLinks: "Enlaces Tóxicos",
      crawledPages: "Páginas Rastreadas",
      redirects: "Redirecciones",
      https: "HTTPS",
      sitemap: "Sitemap XML",
      robots: "Robots.txt",
      valid: "Válido",
      found: "Encontrado",
      seoScore: "Puntuación SEO",
      coreWebVitals: "Métricas Web Principales",
      mobileFriendly: "Adaptable a Móviles",
      indexability: "Indexabilidad",
      contentQuality: "Calidad del Contenido",
      loadTime: "Tiempo de Carga",
      passed: "Aprobado",
      yes: "Sí"
    }
  }[lang];

  return (
    <div className="relative w-full h-[85vh] sm:h-auto sm:aspect-square md:aspect-video overflow-hidden bg-gray-50 flex items-center justify-center font-sans rounded-[2rem] md:rounded-[2.5rem]">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(6,182,212,0.1)_0%,_transparent_50%)]" />
      
      <AnimatePresence mode="wait">
        {phase < 3 ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl px-8 flex flex-col items-center z-10"
          >
            <motion.h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-12 tracking-tighter text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t.title}
            </motion.h2>
            
            <motion.div 
              className="w-full relative bg-gray-100 border border-gray-200 rounded-full p-2 pl-8 flex items-center backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex-1 flex items-center">
                {typedText.length === 0 && phase === 0 ? (
                  <span className="text-gray-500 text-lg md:text-2xl font-medium">{t.placeholder}</span>
                ) : (
                  <span className="text-gray-900 text-lg md:text-2xl font-medium tracking-tight">
                    {typedText}
                    <span className="inline-block w-[2px] h-6 bg-emerald-400 ml-1 animate-[blink_1s_infinite] align-middle" />
                  </span>
                )}
              </div>
              <button 
                className={`bg-emerald-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center min-w-[120px] md:min-w-[140px] ${phase === 2 ? 'bg-emerald-400 scale-95' : 'hover:bg-emerald-400 hover:scale-105'}`}
              >
                {phase === 2 ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : t.btn}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col z-10"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex flex-col bg-white/80 backdrop-blur-sm overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-2xl"
            >
              {/* Header - Fixed */}
            <div className="p-4 sm:p-6 md:p-8 pb-0 md:pb-0 flex items-center justify-between mb-4 md:mb-6 shrink-0">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{t.domain}</h3>
              <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 relative">
                <motion.div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-100 rounded-lg shadow-sm"
                  initial={false}
                  animate={{ 
                    left: scrollPos === 3 ? "50%" : "4px"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <div 
                  className={`px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold flex items-center gap-2 relative z-10 transition-colors duration-300 w-1/2 justify-center ${scrollPos === 3 ? 'text-gray-500' : 'text-gray-900'}`}
                >
                  <Sparkles className={`w-3 h-3 md:w-4 md:h-4 ${scrollPos === 3 ? 'text-gray-500' : 'text-emerald-400'}`} /> {t.aiSearch}
                </div>
                <div 
                  className={`px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold relative z-10 transition-colors duration-300 w-1/2 text-center ${scrollPos === 3 ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  {t.seo}
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20"
            >
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-6 md:w-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-400"
                    initial={{ width: "0%" }}
                    animate={{ width: scrollPos > i ? "100%" : scrollPos === i ? "100%" : "0%" }}
                    transition={{ duration: scrollPos === i ? (i === 0 ? 5 : 6) : 0.2, ease: "linear" }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Scrollable Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full flex flex-col"
                animate={{ y: `${-scrollPos * 100}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Page 1: Overview */}
                <div className="w-full h-full shrink-0 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
                  <motion.div 
                    className="flex flex-col gap-3 md:gap-4 pb-12"
                    animate={{ y: (scrollPos > 0 || (scrollPos === 0 && innerScroll === 1)) ? (isMobile ? -150 : -80) : 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                  {/* Top Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <Card delay={0.1}>
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2 md:mb-3">{t.visibility}</div>
                    <div className="flex items-end gap-2 md:gap-3">
                      <div className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter">68</div>
                      <div className="w-full h-6 md:h-8 mb-1">
                        <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none">
                          <path d="M0,30 Q25,20 50,15 T100,5" fill="none" stroke="url(#emerald-grad)" strokeWidth="3" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="emerald-grad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.2}>
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2 md:mb-3">{t.mentions}</div>
                    <div className="flex items-baseline gap-2 md:gap-3">
                      <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">340</div>
                      <div className="text-emerald-400 text-xs md:text-sm font-bold bg-emerald-500/10 px-1.5 md:px-2 py-0.5 rounded">+15%</div>
                    </div>
                  </Card>
                  <Card delay={0.3} className="hidden md:block">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2 md:mb-3">{t.cited}</div>
                    <div className="flex items-baseline gap-2 md:gap-3">
                      <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">125</div>
                    </div>
                  </Card>
                </div>

                {/* Middle Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <Card delay={0.4} className="flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <div className="text-gray-500 text-xs md:text-sm font-medium mb-1 md:mb-2">{t.authority}</div>
                        <div className="flex flex-col xl:flex-row xl:items-center gap-1 md:gap-3">
                          <div className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter">45</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs md:text-sm font-medium mb-1 md:mb-2">{t.keywords}</div>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">820</div>
                          <div className="text-emerald-400 text-xs md:text-sm font-bold">+18%</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card delay={0.5} className="flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <div className="text-gray-500 text-xs md:text-sm font-medium mb-1 md:mb-2">{t.traffic}</div>
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="relative w-8 h-8 md:w-12 md:h-12">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="4" />
                              <motion.circle 
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 88 }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                cx="18" cy="18" r="16" fill="none" className="stroke-cyan-400" strokeWidth="4" strokeDasharray="100" strokeLinecap="round" 
                              />
                              <motion.circle 
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 90 }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="4" strokeDasharray="100" strokeLinecap="round" strokeDashoffset="88"
                              />
                            </svg>
                          </div>
                          <div className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tighter">12%</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs md:text-sm font-medium mb-1 md:mb-2">{t.orgTraffic}</div>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">4.5K</div>
                          <div className="text-emerald-400 text-xs md:text-sm font-bold">+24%</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-1 min-h-[120px]">
                  <Card delay={0.6} className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 md:gap-6">
                    <div className="w-full sm:w-1/3 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                      <div className="flex items-center gap-2 mb-0 sm:mb-4">
                        <div className="text-gray-500 text-xs md:text-sm font-medium">{t.overview}</div>
                      </div>
                      <div className="flex items-center gap-4 sm:block">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-10 md:w-32 md:h-16 overflow-hidden mb-0 sm:mb-2">
                          <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-gray-200" />
                          <motion.div 
                            initial={{ rotate: -180 }}
                            animate={{ rotate: -36 }} // 80%
                            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-emerald-500 border-b-transparent border-r-transparent" 
                          />
                          <div className="absolute inset-0 sm:bottom-0 sm:top-auto flex items-center sm:block justify-center text-center">
                            <div className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 tracking-tighter">68<span className="hidden sm:inline text-xs md:text-sm text-gray-500 font-medium">/100</span></div>
                          </div>
                        </div>
                        <div className="text-emerald-400 font-bold text-sm md:text-lg">Strong</div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-end mb-1 md:mb-2">
                        <div className="flex items-center gap-1 md:gap-2 bg-gray-50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-gray-200">
                          <span className="text-xs md:text-sm text-gray-600">{t.platforms}</span>
                          <ChevronDown className="w-2 h-2 md:w-3 md:h-3 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 relative mt-1 md:mt-2">
                        {/* Mock Line Chart */}
                        <svg viewBox="0 0 200 60" className="w-full h-full preserve-aspect-ratio-none overflow-visible">
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                            d="M0,50 L40,45 L80,55 L120,20 L160,30 L200,5" 
                            fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.4, ease: "easeInOut" }}
                            d="M0,40 L40,35 L80,40 L120,10 L160,15 L200,0" 
                            fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }}
                            d="M0,55 L40,50 L80,60 L120,40 L160,45 L200,30" 
                            fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                        </svg>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.7} className="col-span-1 hidden md:flex flex-col justify-center">
                    <div className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      "{t.desc}"
                    </div>
                    <div className="mt-2 md:mt-4 flex gap-1.5 md:gap-2">
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full" />
                      </div>
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full" />
                      </div>
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full" />
                      </div>
                    </div>
                  </Card>
                </div>
                </motion.div>
              </div>
                
              {/* Page 2: Competitors & Growth */}
              <div className="w-full h-full shrink-0 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
                <motion.div 
                  className="flex flex-col gap-3 md:gap-4 pb-12"
                  animate={{ y: (scrollPos > 1 || (scrollPos === 1 && innerScroll === 1)) ? (isMobile ? -150 : -80) : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <Card delay={0.1} className="flex flex-col h-48 md:h-64">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-4">{t.competitors}</div>
                    <div className="flex-1 flex flex-col justify-center gap-4">
                      {[
                        { name: "artefact.com", share: 45, color: "bg-emerald-500" },
                        { name: "ekimetrics.com", share: 35, color: "bg-cyan-500" },
                        { name: "eveom.com", share: 20, color: "bg-purple-500" }
                      ].map((comp, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-24 text-xs text-gray-600 truncate">{comp.name}</div>
                          <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: scrollPos >= 1 ? `${comp.share}%` : 0 }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                              className={`h-full ${comp.color}`}
                            />
                          </div>
                          <div className="w-8 text-xs font-bold text-gray-900 text-right">{comp.share}%</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card delay={0.2} className="flex flex-col h-48 md:h-64">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-4">{t.growth}</div>
                    <div className="flex-1 relative flex items-end justify-between gap-2 pb-2">
                      {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: scrollPos >= 1 ? `${h}%` : 0 }}
                          transition={{ duration: 0.8, delay: 0.3 + (i * 0.05), type: "spring" }}
                          className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </Card>
                </div>
                <Card delay={0.3} className="flex-1">
                  <div className="text-gray-500 text-xs md:text-sm font-medium mb-4">{t.opportunities}</div>
                  <div className="space-y-3">
                    {[
                      { k: "agence ia", v: "2.4K", d: "+15%" },
                      { k: "consultant ia", v: "1.2K", d: "+8%" },
                      { k: "intégration ia", v: "850", d: "+12%" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: scrollPos >= 1 ? 1 : 0, x: scrollPos >= 1 ? 0 : -20 }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className="text-sm text-gray-700">{item.k}</div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-bold text-gray-900">{item.v}</div>
                          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{item.d}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
                </motion.div>
              </div>

              {/* Page 3: Technical */}
              <div className="w-full h-full shrink-0 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
                <motion.div 
                  className="flex flex-col gap-3 md:gap-4 pb-12"
                  animate={{ y: (scrollPos > 2 || (scrollPos === 2 && innerScroll === 1)) ? (isMobile ? -150 : -80) : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <Card delay={0.1} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.health}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-emerald-400 tracking-tighter"
                    >
                      96<span className="text-sm md:text-lg text-emerald-500/50">%</span>
                    </motion.div>
                  </Card>
                  <Card delay={0.2} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.issues}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-amber-400 tracking-tighter"
                    >
                      3
                    </motion.div>
                  </Card>
                  <Card delay={0.3} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.crawledPages}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tighter"
                    >
                      1.2K
                    </motion.div>
                  </Card>
                  <Card delay={0.4} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.redirects}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-cyan-400 tracking-tighter"
                    >
                      45
                    </motion.div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
                  <Card delay={0.5} className="flex flex-col min-h-[140px]">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2">{t.backlinks} Profile</div>
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">850</div>
                            <div className="text-xs text-gray-500">Total Backlinks</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-emerald-400">128</div>
                            <div className="text-xs text-gray-500">{t.refDomains}</div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                      <svg viewBox="0 0 400 80" className="w-full h-full preserve-aspect-ratio-none overflow-visible">
                        <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: scrollPos >= 2 ? 1 : 0, opacity: scrollPos >= 2 ? 1 : 0 }}
                          transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                          d="M0,60 Q50,50 100,30 T200,20 T300,10 T400,5" 
                          fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" 
                        />
                        <motion.path 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: scrollPos >= 2 ? 0.2 : 0 }}
                          transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                          d="M0,60 Q50,50 100,30 T200,20 T300,10 T400,5 L400,80 L0,80 Z" 
                          fill="url(#cyan-grad)" 
                        />
                        <defs>
                          <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </Card>

                  <Card delay={0.6} className="flex flex-col min-h-[140px]">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2">Technical Errors</div>
                    <div className="space-y-2">
                      {[
                        { label: "404 Pages", count: 0, type: "success", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        { label: "Missing H1", count: 2, type: "warning", color: "text-amber-400", bg: "bg-amber-500/10" },
                        { label: "Slow Pages", count: 1, type: "warning", color: "text-amber-400", bg: "bg-amber-500/10" },
                        { label: "Broken Links", count: 0, type: "success", color: "text-emerald-400", bg: "bg-emerald-500/10" }
                      ].map((issue, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: scrollPos >= 2 ? 1 : 0, x: scrollPos >= 2 ? 0 : 20 }}
                          transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                          className="flex items-center justify-between p-1.5 md:p-2 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <div className="text-xs md:text-sm text-gray-700">{issue.label}</div>
                          <div className={`text-xs font-bold px-2 py-0.5 md:py-1 rounded ${issue.color} ${issue.bg}`}>
                            {issue.count}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <Card delay={0.7} className="h-16 md:h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.https}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                      className="text-sm md:text-base font-bold text-emerald-400"
                    >
                      {t.valid}
                    </motion.div>
                  </Card>
                  <Card delay={0.8} className="h-16 md:h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.sitemap}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.0, type: "spring" }}
                      className="text-sm md:text-base font-bold text-emerald-400"
                    >
                      {t.found}
                    </motion.div>
                  </Card>
                  <Card delay={0.9} className="h-16 md:h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-1">{t.robots}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                      className="text-sm md:text-base font-bold text-emerald-400"
                    >
                      {t.valid}
                    </motion.div>
                  </Card>
                </div>
                </motion.div>
              </div>

              {/* Page 4: SEO */}
              <div className="w-full h-full shrink-0 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
                <motion.div 
                  className="flex flex-col gap-3 md:gap-4 pb-12"
                  animate={{ y: (scrollPos > 3 || (scrollPos === 3 && innerScroll === 1)) ? (isMobile ? -150 : -80) : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <Card delay={0.1} className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
                    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start">
                      <div className="text-gray-500 text-xs md:text-sm font-medium mb-4">{t.seoScore}</div>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="3" />
                          <motion.circle 
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: scrollPos >= 3 ? 8 : 100 }}
                            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                            cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="3" strokeDasharray="100" strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <div className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter">98</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col gap-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">{t.coreWebVitals}</span>
                        <span className="text-sm font-bold text-emerald-400">{t.passed}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">{t.mobileFriendly}</span>
                        <span className="text-sm font-bold text-emerald-400">{t.yes}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">{t.indexability}</span>
                        <span className="text-sm font-bold text-emerald-400">100%</span>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.2} className="flex flex-col justify-center items-center text-center">
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-2">{t.loadTime}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 3 ? 1 : 0.5, opacity: scrollPos >= 3 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                      className="text-4xl md:text-6xl font-bold text-cyan-400 tracking-tighter"
                    >
                      0.4<span className="text-lg md:text-2xl text-cyan-500/50">s</span>
                    </motion.div>
                  </Card>
                </div>
                <Card delay={0.3} className="flex-1">
                  <div className="text-gray-500 text-xs md:text-sm font-medium mb-4">{t.contentQuality}</div>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Readability Score", score: 92, color: "bg-emerald-500" },
                      { label: "Keyword Density", score: 88, color: "bg-cyan-500" },
                      { label: "Meta Tags Optimization", score: 100, color: "bg-purple-500" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-40 text-xs text-gray-600 truncate">{item.label}</div>
                        <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: scrollPos >= 3 ? `${item.score}%` : 0 }}
                            transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                            className={`h-full ${item.color}`}
                          />
                        </div>
                        <div className="w-8 text-xs font-bold text-gray-900 text-right">{item.score}%</div>
                      </div>
                    ))}
                  </div>
                </Card>
                </motion.div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Card({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative overflow-hidden bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm hover:bg-gray-50 transition-colors group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
