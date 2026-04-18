import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Search, Loader2, ChevronDown, Sparkles } from 'lucide-react';

export function AnimatedDashboard({ lang }: { lang: 'en' | 'fr' | 'es' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.8 }); // Trigger when 80% visible for better UX
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [scrollPos, setScrollPos] = useState(0);
  const [innerScroll, setInnerScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const targetText = 'eveom.fr';

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
      if (!isInView) {
        setPhase(0);
        setTypedText('');
        setScrollPos(0);
        setInnerScroll(0);
        return;
      }

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
  }, [phase, typedText, targetText, isInView]);

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
    <div ref={containerRef} className="relative w-full h-[50vh] sm:h-auto sm:aspect-[16/10] md:aspect-video overflow-hidden bg-white border border-border rounded-[24px] sm:rounded-[32px] flex items-center justify-center font-sans shadow-premium">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
      
      <AnimatePresence mode="wait">
        {phase < 3 ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl px-8 flex flex-col items-center z-10"
            >
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-10 tracking-tighter text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t.title}
            </motion.h2>
            
            <motion.div 
              className="w-full relative bg-white border border-border rounded-full p-2 pl-8 flex items-center shadow-soft hover:shadow-lg transition-shadow duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex-1 flex items-center">
                {typedText.length === 0 && phase === 0 ? (
                  <span className="text-text-muted text-lg md:text-2xl font-medium opacity-50">{t.placeholder}</span>
                ) : (
                  <span className="text-text-primary text-lg md:text-2xl font-bold tracking-tight">
                    {typedText}
                    <span className="inline-block w-[3px] h-6 bg-primary ml-1 animate-[blink_1s_infinite] align-middle" />
                  </span>
                )}
              </div>
              <button 
                className={`btn-primary px-6 md:px-10 py-3 md:py-4 !rounded-full text-sm md:text-lg font-bold transition-all duration-300 flex items-center justify-center min-w-[120px] md:min-w-[160px] ${phase === 2 ? 'opacity-80 scale-95' : ''}`}
              >
                {phase === 2 ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : t.btn}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col z-10 p-4 md:p-8"
          >
            <motion.div 
              className="w-full h-full flex flex-col bg-white overflow-hidden rounded-[20px] md:rounded-[24px] border border-border shadow-premium relative group"
            >
              {/* Header - Fixed */}
            <div className="p-4 md:p-6 pb-2 md:pb-2 flex items-center justify-between shrink-0 border-b border-border/50">
              <h3 className="text-base md:text-xl font-bold text-text-primary tracking-tight font-display">{t.domain}</h3>
              <div className="flex bg-bg-secondary p-1 rounded-full border border-border relative w-32 md:w-48">
                <motion.div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm"
                  initial={false}
                  animate={{ 
                    left: scrollPos === 3 ? "50%" : "4px"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <div 
                  className={`px-3 md:px-5 py-1 md:py-2 text-[10px] md:text-xs font-bold flex items-center gap-1.5 relative z-10 transition-colors duration-300 w-1/2 justify-center ${scrollPos === 3 ? 'text-text-muted' : 'text-text-primary'}`}
                >
                  <Sparkles className={`w-3 h-3 md:w-4 md:h-4 ${scrollPos === 3 ? 'text-text-muted' : 'text-primary'}`} /> AI
                </div>
                <div 
                  className={`px-3 md:px-5 py-1 md:py-2 text-[10px] md:text-xs font-bold relative z-10 transition-colors duration-300 w-1/2 text-center ${scrollPos === 3 ? 'text-text-primary' : 'text-text-muted'}`}
                >
                  SEO
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
                <div key={i} className="w-6 md:w-8 h-1 bg-border rounded-full overflow-hidden will-change-transform">
                  <motion.div 
                    className="h-full bg-primary will-change-[width]"
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
                className="absolute top-0 left-0 w-full h-full flex flex-col will-change-transform"
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
                    <div className="text-text-muted text-[10px] md:text-xs font-medium mb-1 md:mb-2">{t.visibility}</div>
                    <div className="flex items-end gap-2 md:gap-3">
                      <div className="text-2xl md:text-3xl font-bold text-text-primary tracking-tighter">68</div>
                      <div className="w-full h-4 md:h-6 mb-1">
                        <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none">
                          <path d="M0,30 Q25,20 50,15 T100,5" fill="none" stroke="url(#primary-grad)" strokeWidth="3" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="primary-grad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.2}>
                    <div className="text-text-muted text-[10px] md:text-xs font-medium mb-1 md:mb-2">{t.mentions}</div>
                    <div className="flex items-baseline gap-1.5 md:gap-2">
                      <div className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">340</div>
                      <div className="text-success text-[10px] font-bold bg-success/10 px-1 py-0.5 rounded">+15%</div>
                    </div>
                  </Card>
                  <Card delay={0.3} className="hidden md:block">
                    <div className="text-text-muted text-[10px] md:text-xs font-medium mb-1 md:mb-2">{t.cited}</div>
                    <div className="flex items-baseline gap-1.5 md:gap-2">
                      <div className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">125</div>
                    </div>
                  </Card>
                </div>

                {/* Middle Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <Card delay={0.4} className="flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <div className="text-text-muted text-xs md:text-sm font-medium mb-1 md:mb-2">{t.authority}</div>
                        <div className="flex flex-col xl:flex-row xl:items-center gap-1 md:gap-3">
                          <div className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter">45</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-text-muted text-xs md:text-sm font-medium mb-1 md:mb-2">{t.keywords}</div>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <div className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">820</div>
                          <div className="text-success text-xs md:text-sm font-bold">+18%</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card delay={0.5} className="flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <div className="text-text-muted text-xs md:text-sm font-medium mb-1 md:mb-2">{t.traffic}</div>
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="relative w-8 h-8 md:w-12 md:h-12">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" className="stroke-border" strokeWidth="4" />
                              <motion.circle 
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 88 }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="100" strokeLinecap="round" 
                              />
                              <motion.circle 
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 90 }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                cx="18" cy="18" r="16" fill="none" className="stroke-success" strokeWidth="4" strokeDasharray="100" strokeLinecap="round" strokeDashoffset="88"
                              />
                            </svg>
                          </div>
                          <div className="text-2xl md:text-4xl font-bold text-text-primary tracking-tighter">12%</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-text-muted text-xs md:text-sm font-medium mb-1 md:mb-2">{t.orgTraffic}</div>
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <div className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">4.5K</div>
                          <div className="text-success text-xs md:text-sm font-bold">+24%</div>
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
                        <div className="text-text-muted text-xs md:text-sm font-medium">{t.overview}</div>
                      </div>
                      <div className="flex items-center gap-4 sm:block">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-10 md:w-32 md:h-16 overflow-hidden mb-0 sm:mb-2">
                          <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-border" />
                          <motion.div 
                            initial={{ rotate: -180 }}
                            animate={{ rotate: -36 }} // 80%
                            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-success border-b-transparent border-r-transparent" 
                          />
                          <div className="absolute inset-0 sm:bottom-0 sm:top-auto flex items-center sm:block justify-center text-center">
                            <div className="text-lg sm:text-xl md:text-3xl font-bold text-text-primary tracking-tighter">68<span className="hidden sm:inline text-xs md:text-sm text-text-muted font-medium">/100</span></div>
                          </div>
                        </div>
                        <div className="text-success font-bold text-sm md:text-lg">Strong</div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-end mb-1 md:mb-2">
                        <div className="flex items-center gap-1 md:gap-2 bg-bg-secondary px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-border">
                          <span className="text-xs md:text-sm text-text-secondary">{t.platforms}</span>
                          <ChevronDown className="w-2 h-2 md:w-3 md:h-3 text-text-muted" />
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
                            fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.4, ease: "easeInOut" }}
                            d="M0,40 L40,35 L80,40 L120,10 L160,15 L200,0" 
                            fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }}
                            d="M0,55 L40,50 L80,60 L120,40 L160,45 L200,30" 
                            fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          />
                        </svg>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.7} className="col-span-1 hidden md:flex flex-col justify-center">
                    <div className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      "{t.desc}"
                    </div>
                    <div className="mt-2 md:mt-4 flex gap-1.5 md:gap-2">
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-success/20 flex items-center justify-center border border-success/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-success rounded-full" />
                      </div>
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full" />
                      </div>
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-warning/20 flex items-center justify-center border border-warning/30">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-warning rounded-full" />
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
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-4">{t.competitors}</div>
                    <div className="flex-1 flex flex-col justify-center gap-4">
                      {[
                        { name: "concurrent-a.fr", share: 45, color: "bg-success" },
                        { name: "concurrent-b.fr", share: 35, color: "bg-primary" },
                        { name: "eveom.fr", share: 20, color: "bg-error" }
                      ].map((comp, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-24 text-xs text-text-secondary truncate">{comp.name}</div>
                          <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: scrollPos >= 1 ? `${comp.share}%` : 0 }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                              className={`h-full ${comp.color}`}
                            />
                          </div>
                          <div className="w-8 text-xs font-bold text-text-primary text-right">{comp.share}%</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card delay={0.2} className="flex flex-col h-48 md:h-64">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-4">{t.growth}</div>
                    <div className="flex-1 relative flex items-end justify-between gap-2 pb-2">
                      {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: scrollPos >= 1 ? `${h}%` : 0 }}
                          transition={{ duration: 0.8, delay: 0.3 + (i * 0.05), type: "spring" }}
                          className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm"
                        />
                      ))}
                    </div>
                  </Card>
                </div>
                <Card delay={0.3} className="flex-1">
                  <div className="text-text-muted text-xs md:text-sm font-medium mb-4">{t.opportunities}</div>
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
                        className="flex items-center justify-between p-2 rounded-lg bg-bg-secondary border border-border"
                      >
                        <div className="text-sm text-text-secondary">{item.k}</div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-bold text-text-primary">{item.v}</div>
                          <div className="text-xs font-bold text-success bg-success/10 px-1.5 py-0.5 rounded">{item.d}</div>
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
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.health}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-success tracking-tighter"
                    >
                      96<span className="text-sm md:text-lg text-success/50">%</span>
                    </motion.div>
                  </Card>
                  <Card delay={0.2} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.issues}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-warning tracking-tighter"
                    >
                      3
                    </motion.div>
                  </Card>
                  <Card delay={0.3} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.crawledPages}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-text-primary tracking-tighter"
                    >
                      1.2K
                    </motion.div>
                  </Card>
                  <Card delay={0.4} className="h-20 md:h-28 flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.redirects}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                      className="text-2xl md:text-4xl font-bold text-primary tracking-tighter"
                    >
                      45
                    </motion.div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
                  <Card delay={0.5} className="flex flex-col min-h-[140px]">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-2">{t.backlinks} Profile</div>
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <div className="text-2xl font-bold text-text-primary">850</div>
                            <div className="text-xs text-text-muted">Total Backlinks</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-success">128</div>
                            <div className="text-xs text-text-muted">{t.refDomains}</div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                      <svg viewBox="0 0 400 80" className="w-full h-full preserve-aspect-ratio-none overflow-visible">
                        <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: scrollPos >= 2 ? 1 : 0, opacity: scrollPos >= 2 ? 1 : 0 }}
                          transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                          d="M0,60 Q50,50 100,30 T200,20 T300,10 T400,5" 
                          fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" 
                        />
                        <motion.path 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: scrollPos >= 2 ? 0.2 : 0 }}
                          transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                          d="M0,60 Q50,50 100,30 T200,20 T300,10 T400,5 L400,80 L0,80 Z" 
                          fill="url(#primary-grad-technical)" 
                        />
                        <defs>
                          <linearGradient id="primary-grad-technical" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </Card>

                  <Card delay={0.6} className="flex flex-col min-h-[140px]">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-2">Technical Errors</div>
                    <div className="space-y-2">
                      {[
                        { label: "404 Pages", count: 0, type: "success", color: "text-success", bg: "bg-success/10" },
                        { label: "Missing H1", count: 2, type: "warning", color: "text-warning", bg: "bg-warning/10" },
                        { label: "Slow Pages", count: 1, type: "warning", color: "text-warning", bg: "bg-warning/10" },
                        { label: "Broken Links", count: 0, type: "success", color: "text-success", bg: "bg-success/10" }
                      ].map((issue, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: scrollPos >= 2 ? 1 : 0, x: scrollPos >= 2 ? 0 : 20 }}
                          transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                          className="flex items-center justify-between p-1.5 md:p-2 rounded-lg bg-bg-secondary border border-border"
                        >
                          <div className="text-xs md:text-sm text-text-secondary">{issue.label}</div>
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
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.https}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                      className="text-sm md:text-base font-bold text-success"
                    >
                      {t.valid}
                    </motion.div>
                  </Card>
                  <Card delay={0.8} className="h-16 md:h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.sitemap}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.0, type: "spring" }}
                      className="text-sm md:text-base font-bold text-success"
                    >
                      {t.found}
                    </motion.div>
                  </Card>
                  <Card delay={0.9} className="h-16 md:h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-1">{t.robots}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 2 ? 1 : 0.5, opacity: scrollPos >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                      className="text-sm md:text-base font-bold text-success"
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
                      <div className="text-text-muted text-xs md:text-sm font-medium mb-4">{t.seoScore}</div>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-border" strokeWidth="3" />
                          <motion.circle 
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: scrollPos >= 3 ? 8 : 100 }}
                            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                            cx="18" cy="18" r="16" fill="none" className="stroke-success" strokeWidth="3" strokeDasharray="100" strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <div className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter">98</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col gap-3">
                      <div className="flex justify-between items-center p-2 bg-bg-secondary rounded-lg">
                        <span className="text-sm text-text-secondary">{t.coreWebVitals}</span>
                        <span className="text-sm font-bold text-success">{t.passed}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-bg-secondary rounded-lg">
                        <span className="text-sm text-text-secondary">{t.mobileFriendly}</span>
                        <span className="text-sm font-bold text-success">{t.yes}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-bg-secondary rounded-lg">
                        <span className="text-sm text-text-secondary">{t.indexability}</span>
                        <span className="text-sm font-bold text-success">100%</span>
                      </div>
                    </div>
                  </Card>
                  <Card delay={0.2} className="flex flex-col justify-center items-center text-center">
                    <div className="text-text-muted text-xs md:text-sm font-medium mb-2">{t.loadTime}</div>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: scrollPos >= 3 ? 1 : 0.5, opacity: scrollPos >= 3 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                      className="text-4xl md:text-6xl font-bold text-primary tracking-tighter"
                    >
                      0.4<span className="text-lg md:text-2xl text-primary/50">s</span>
                    </motion.div>
                  </Card>
                </div>
                <Card delay={0.3} className="flex-1">
                  <div className="text-text-muted text-xs md:text-sm font-medium mb-4">{t.contentQuality}</div>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Readability Score", score: 92, color: "bg-success" },
                      { label: "Keyword Density", score: 88, color: "bg-primary" },
                      { label: "Meta Tags Optimization", score: 100, color: "bg-warning" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-40 text-xs text-text-secondary truncate">{item.label}</div>
                        <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: scrollPos >= 3 ? `${item.score}%` : 0 }}
                            transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                            className={`h-full ${item.color}`}
                          />
                        </div>
                        <div className="w-8 text-xs font-bold text-text-primary text-right">{item.score}%</div>
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden bg-white border border-border rounded-[24px] p-4 md:p-6 shadow-soft hover:shadow-lg transition-all duration-500 group ${className}`}
    >
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
