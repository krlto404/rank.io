/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, useState, useEffect, ReactNode, ErrorInfo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, Activity, Target, TrendingUp, Zap, CheckCircle2, Globe, BarChart3, X, Loader2, Bot, Database, Sparkles, MapPin, MousePointer2, LineChart as LineChartIcon, Users, Shield, Layout, FileText, Settings, Bell, User, ArrowLeft, MessageSquare, AlertCircle, Brain, PenTool, Rocket, Lock, Share2, Download, Eye, Smile, Award, CheckCircle, ArrowUpRight, Play, Mail, DollarSign, ListChecks, Cpu, Info, Quote, Check, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

import { GoogleGenAI } from "@google/genai";
import { AnimatedDashboard } from './components/AnimatedDashboard';

const RenkLogo = ({ className = "h-8 w-auto", variant = "large" }: { className?: string, variant?: "large" | "small" }) => (
  <img 
    src={variant === "small" ? "/logo-renk-small.png" : "/logo-renk.png"} 
    alt="Renk Logo" 
    className={className}
    referrerPolicy="no-referrer"
  />
);

const TypingSearch = () => {
  const words = ["Google", "ChatGPT", "Gemini", "Claude", "Perplexity", "Grok"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setSpeed(50);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);

  return (
    <div className="relative max-w-2xl mx-auto mt-2 px-4">
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 sm:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:border-primary/30 hover:bg-gray-50">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mr-4 flex-shrink-0">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="flex-1 text-left overflow-hidden">
          <span className="text-black font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight block truncate">
            {text}
            <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-pulse" />
          </span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
    </div>
  );
};

type Lang = 'en' | 'fr' | 'es';

const aiLogos = [
  {
    name: 'Google',
    svg: <img src="/icons8-google-94.png" alt="Google" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'ChatGPT',
    svg: <img src="/icons8-chatgpt-94.png" alt="ChatGPT" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Gemini',
    svg: <img src="/icons8-gemini-ai-94.png" alt="Gemini" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Claude',
    svg: <img src="/icons8-3d-claude-ai-logo-94.png" alt="Claude" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Perplexity',
    svg: <img src="/icons8-3d-perplexity-ai-logo-94.png" alt="Perplexity" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Grok',
    svg: <img src="/icons8-3d-grey-grok-ai-logo-94.png" alt="Grok" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
  }
];

interface AuditData {
  companyName: string;
  industry: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  seoScore: number;
  hook: string;
  competitorComparison: { name: string; visibility: string; maps: boolean; status?: string; context?: string }[];
  keywordRankings: { keyword: string; position: string | number }[];
  estimatedLoss: { amount: string; description: string };
  opportunities: { title: string; description: string }[];
  actionPlan: { title: string; description: string }[];
  projection: string[];
  visionStatement?: string;
  cta: string;
  // Legacy fields for fallback/compatibility if needed
  keywords: string[];
  detailedKeywords?: { keyword: string; intent: string; volume: number; kd: number; opportunityScore: number }[];
  aiCompetitors?: { name: string; aiVisibilityScore: number; strength: string; visibility: number; status?: string; context?: string; strategy?: string }[];
  pageTitle: string;
  pageContent: string;
  blogTitle: string;
  blogExcerpt: string;
  seoTips: string[];
  marketAnalysis: string;
  aiRecommendation: string;
  roiEstimate: string;
  visualStrategyUrl?: string;
  extractedLocation?: string;
  growthProjection?: { month: string; value: number }[];
  growthStrategy?: string;
  llmRatings?: { model: string; score: number; status: 'excellent' | 'good' | 'poor'; reasoning: string }[];
  scores: {
    visibility: number;
    sentiment: number;
    authority: number;
    accuracy: number;
  };
  platformVisibility: { name: string; score: number; avg: number }[];
  issues: { title: string; desc: string; severity: 'high' | 'medium' | 'low' }[];
  perceptions: { label: string; value: number; context?: string }[];
  brandPerceptionDetails?: {
    sentiment: { positive: number; neutral: number; negative: number };
    topAttributes: { label: string; score: number }[];
    userFeedbackSummary: string;
  };
  recommendations: string[];
  localVisibilityScore: number;
  aiReadinessScore: number;
  semanticAuthorityScore: number;
  technicalHealth?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    coreWebVitals: string;
  };
  semanticDensity?: number;
  semanticTerms?: { term: string; density: number; status: 'optimal' | 'low' | 'high' }[];
  aiSearchPresence?: { platform: string; status: string; context: string }[];
  errors: string[];
  warnings: string[];
  notices: string[];
}

const GrowthChart = ({ data }: { data: { month: string; value: number }[] }) => (
  <div className="h-[300px] w-full mt-4">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis 
          dataKey="month" 
          stroke="#71717a" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#71717a" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
          itemStyle={{ color: '#10b981' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#10b981" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const translations = {
  en: {
    navPricing: "Pricing",
    navHow: "Strategy",
    navStart: "Free Audit",
    heroBadge: "The AI-First SEO Engine",
    heroTitle1: "Improve your visibility on",
    heroSub: "Don't let your competitors take all the space. We position your business where your customers are searching today: on Google and at the heart of AI responses.",
    feat1Title: "Total Exclusivity (50km)",
    feat1Desc: "We work with only one professional per industry and per area. If we partner with you, we refuse your competitors. You get 100% of the results.",
    feat2Title: "AI SEO (LLM SEO)",
    feat2Desc: "Your future clients are already searching on ChatGPT, Claude, and Gemini. We position your business as the obvious recommendation on these new artificial intelligences.",
    feat3Title: "100% Automated Technology",
    feat3Desc: "Our artificial intelligence manages everything: from auditing to content creation. The result? A faster, higher-performing strategy that's much more affordable than a traditional agency.",
    howTitle: "Our Acquisition Method",
    howSub: "A clear 3-step strategy to dominate your geographical area on Google and AIs.",
    step1Title: "1. Free Audit & Strategy",
    step1Desc: "We analyze your local market. We identify exactly what your customers are searching for on Google and artificial intelligences to create a custom action plan.",
    step2Title: "2. Starter Pack ($499)",
    step2Desc: "Immediate creation of 50 ultra-optimized contents: 10 service pages, 15 city pages, 10 articles, 10 AI FAQs, and 5 conversion pages. You are visible everywhere, right away.",
    step3Title: "3. Monthly Growth ($199)",
    step3Desc: "Every month, we add 20 new targeted contents and 10 Google Business Profile posts. Your visibility continuously increases, your competitors disappear.",
    priceTitle: "A Simple and Transparent Offer",
    priceSub: "Cutting-edge technology finally accessible to freelancers and local SMEs.",
    planName: "Local Domination",
    planSub: "Guaranteed exclusivity: 1 client per industry within a 50km radius.",
    planPrice: "$499",
    planSetup: "Starter Pack (50 contents)",
    planMo: "then $199/month (no commitment)",
    check1: "100% free initial audit",
    check2: "50 Google & AI contents (Starter Pack)",
    check3: "20 new contents every month",
    check4: "10 Google Business posts per month",
    check5: "ChatGPT, Claude, Gemini optimization",
    check6: "Total exclusivity in your area (50km)",
    planCta: "Check my area's availability",
    auditTitle: "Get Your Free Audit",
    auditSub: "Instantly discover if your sector is still available and analyze your growth potential.",
    auditPlaceholder: "Enter your website address (e.g., www.my-business.com)",
    auditBtn: "Run my Free Audit",
    auditAnalyzing: "Analyzing your local market...",
    auditKeywords: "Checking area availability...",
    auditStrategy: "Creating your custom action plan...",
    auditBadge1: "Immediate Result",
    auditBadge2: "Google & AI Analysis",
    auditResults: "Visibility Intelligence Report",
    scoreVisibility: "Visibility",
    scoreSentiment: "Sentiment",
    scoreAuthority: "Authority",
    scoreAccuracy: "Accuracy",
    auditResultsTitle: "Visibility Intelligence Report",
    auditMarketTitle: "Market Intelligence",
    auditAiTitle: "AI Visibility Strategy",
    auditLlmTitle: "LLM Visibility Scores",
    auditRoiTitle: "Projected Growth",
    auditKeywordsTitle: "High-Intent Keywords",
    auditSeoTitle: "SEO & AEO Optimization",
    auditVisualTitle: "Strategic Roadmap",
    auditActionPlan: "Action Plan (90 Days)",
    auditPhase1: "Days 1-30",
    auditPhase1Title: "Starter Pack",
    auditPhase1Desc: "Creation and publication of your first 50 ultra-optimized contents (Google & AI).",
    auditPhase2: "Days 31-60",
    auditPhase2Title: "Local Domination",
    auditPhase2Desc: "Massive indexing and positioning of your business in your 50km area.",
    auditPhase3: "Days 61-90",
    auditPhase3Title: "Monthly Growth",
    auditPhase3Desc: "Addition of 20 new contents and 10 Google Business posts to widen the gap.",
    auditLivePreviewBtn: "Preview Pages",
    auditDeployBtn: "Execute Strategy",
    auditReport: "Audit Report",
    auditStrategic: "Strategic Growth Plan",
    auditMarketAnalysis: "Market Analysis",
    auditGrowthStrategy: "Growth Strategy",
    auditROIEstimate: "ROI Estimate",
    auditDownload: "Download PDF",
    auditDeploy: "Deploy Strategy",
    auditBackDash: "Back to Dashboard",
    heroTitle: "AI-Powered SEO & Local Dominance",
    heroBtn: "Analyze My Site",
    heroRealtime: "Real-time Analysis",
    heroAi: "AI-Driven Insights",
    heroLocal: "Local Market Data",
    dashKeywords: "Keywords",
    dashContent: "Content",
    dashAnalytics: "Analytics",
    dashSettings: "Settings",
    dashPro: "Pro Plan",
    dashUnlimited: "Unlimited audits & tracking",
    dashUpgrade: "Upgrade",
    dashWelcome: "Welcome back",
    dashStatus: "Here's what's happening with your SEO today.",
    dashTraffic: "Traffic Overview",
    dashActivity: "Recent Activity",
    dashLast7: "Last 7 days",
    dashLast30: "Last 30 days",
    dashBack: "Back to Home",
    dashOverview: "Overview",
    statTraffic: "Total Traffic",
    statKeywords: "Keywords Ranked",
    statLeads: "Leads Generated",
    statAuthority: "Domain Authority",
    testimonialsTitle: "They Dominate Their Sector",
    testimonialsSub: "Artisans and SMEs who chose exclusivity and innovation.",
    formTitle: "Reserve Your Exclusivity",
    formSub: "Check if your industry is still available in your 50km area. First come, first served.",
    labelBiz: "Your Business Name",
    labelUrl: "Current Website (optional)",
    labelCity: "Service City (e.g., London)",
    labelEmail: "Your Email Address",
    btnCheck: "Check Availability",
    btnProcessing: "Verifying...",
    successTitle: "Territory Reserved",
    successSub: "Our team is reviewing your request. We will contact you within 24h to finalize your setup.",
    errTitle: "Verification Failed",
    errSub: "We couldn't process your request. Please try again or contact support.",
    btnTryAgain: "Retry",
    footerRights: "© 2026 Renk. All rights reserved.",
    auditShareReport: "Share Report",
    auditDownloadPDF: "Download PDF",
    auditGenerating: "Generating...",
    auditNewAudit: "New Audit",
    auditAiVisibility: "AI Visibility",
    auditBrandSentiment: "Brand Sentiment",
    auditDataAccuracy: "Data Accuracy",
    auditAiSearchPresence: "AI Search Engine Presence",
    auditTechnicalHealth: "Technical Health",
    auditCoreWebVitals: "Core Web Vitals",
    auditPerformance: "Performance",
    auditAccessibility: "Accessibility",
    auditBestPractices: "Best Practices",
    auditSeo: "SEO",
    auditAiRecommendations: "AI Recommendations",
    auditKeywordsRanked: "Keywords Ranked",
    auditTop100: "Top 100",
    auditKeyword: "Keyword",
    auditIntent: "Intent",
    auditVolume: "Volume",
    auditKd: "KD%",
    auditLlmRatings: "LLM Ratings",
    auditCompetitorAiVisibility: "Competitor AI Visibility",
    auditSeoTips: "SEO Tips",
    auditVisibilityScore: "Visibility Score",
    auditExcellent: "Excellent",
    auditGood: "Good",
    auditWeak: "Weak",
    auditScore: "Score",
    auditTopicAuthority: "Topic Authority",
    auditExecutiveOverview: "Executive Overview",
    auditVisibilityByPlatform: "Visibility by Platform",
    auditCurrent: "Current",
    auditIndustryAvg: "Industry Avg",
    auditCompetitorGap: "Competitor Gap Analysis",
    auditYourVisibility: "Your Visibility",
    auditCompetitor: "Competitor",
    auditCriticalIssues: "Critical Issues",
    auditOpportunities: "Opportunities",
    auditAiBrandPerception: "AI Brand Perception",
    auditSentimentPositive: "Positive Sentiment",
    auditSentimentNeutral: "Neutral Sentiment",
    auditSentimentNegative: "Negative Sentiment",
    auditTopAttributes: "Top Brand Attributes",
    auditUserFeedback: "User Feedback Summary",
    auditSemanticTerm: "Term",
    auditSemanticDensity: "Density",
    auditSemanticStatus: "Status",
    auditStatusOptimal: "Optimal",
    auditStatusLow: "Low",
    auditStatusHigh: "High",
    auditBack: "Back",
    auditPagePreview: "AI-Generated Landing Page Preview",
    auditUltraLocal: "Ultra-Local Dominance (< 50km)",
    auditCaptureZone: "Capture Zone",
    auditMarketPenetration: "Market Penetration",
    auditDetailedKeywords: "Detailed Keyword Analysis",
    auditProjectedGrowth: "Projected Growth",
    auditWarnings: "Warnings",
    auditNotices: "Notices",
    auditGrowthProjection: "Strategic Growth Projection",
    auditAiSeoVisibility: "AI & SEO Visibility (Est.)",
    auditLocalVisibilityScore: "Local Visibility Score",
    auditAiReadiness: "AI Readiness",
    auditSemanticAuthority: "Semantic Authority",
    auditErrors: "Errors",
    auditBeta: "Beta",
    auditInteractivePreview: "Interactive Preview",
    auditNewAiArticle: "New AI Article",
    auditReadyToDominate: "Ready to dominate your local market?",
    auditDeployStrategyDesc: "Deploy this strategy instantly and start capturing traffic in your catchment area.",
    auditSemanticDensityDesc: "Your content has a semantic density of {density}%. To reach the top 3 on AI search engines, we recommend a density of 65% by integrating more entities related to your local niche.",
    landingWhyChooseUs: "Why Choose Us?",
    landingSpecialOffer: "Limited Special Offer",
    landingGetFreeQuote: "Get Free Quote",
    landingOurServices: "Our Services",
    landingOurExpertise: "Our Expertise",
    landingStrategyResults: "Strategy & Results",
    landingExpertiseDesc: "We put our expertise at the service of your success. Discover a tailor-made approach to achieve your goals with {company}.",
    landingProvenResults: "Proven Results",
    landingDedicatedSupport: "Dedicated Support",
    landingIndustryExperts: "Industry Experts",
    statSitesIndexed: "Reserved Zones",
    statLeadsGenerated: "Business-Generating Clients",
    statAvgRoi: "Average Profitability",
    statCitiesCovered: "Cities Covered",
    dashActivity1Title: "New Keyword Ranked",
    dashActivity1Desc: "Your site is now #3 for \"SEO Tool\"",
    dashActivity1Time: "2h ago",
    dashActivity2Title: "Audit Completed",
    dashActivity2Desc: "Analysis for example.com finished",
    dashActivity2Time: "5h ago",
    dashActivity3Title: "Traffic Spike",
    dashActivity3Desc: "Traffic increased by 40% today",
    dashActivity3Time: "12h ago",
    dashActivity4Title: "New Lead",
    dashActivity4Desc: "Contact form submission from John",
    dashActivity4Time: "1d ago"
  },
  fr: {
    navPricing: "Tarifs",
    navHow: "Stratégie",
    navStart: "Audit Gratuit",
    heroBadge: "Le Moteur SEO Spécial IA",
    heroTitle1: "Nous améliorons votre visibilité sur",
    heroSub: "Ne laissez pas vos concurrents prendre toute la place. Nous positionnons votre entreprise là où vos clients cherchent aujourd'hui : sur Google et au cœur des réponses des intelligences artificielles.",
    feat1Title: "Exclusivité Totale (50km)",
    feat1Desc: "Nous travaillons avec un seul professionnel par métier et par zone. Si nous vous accompagnons, nous refusons vos concurrents. Vous obtenez 100% des résultats.",
    feat2Title: "Référencement IA (LLM SEO)",
    feat2Desc: "Vos futurs clients cherchent déjà sur ChatGPT, Claude et Gemini. Nous positionnons votre entreprise comme la seule recommandation évidente sur ces nouvelles intelligences artificielles.",
    feat3Title: "Technologie 100% Automatisée",
    feat3Desc: "Notre intelligence artificielle gère tout : de l'audit à la création de vos contenus. Résultat ? Une stratégie plus rapide, plus performante et beaucoup moins chère qu'une agence classique.",
    howTitle: "Notre Méthode d'Acquisition",
    howSub: "Une stratégie claire en 3 étapes pour dominer votre zone géographique sur Google et les IA.",
    step1Title: "1. Audit Gratuit & Stratégie",
    step1Desc: "Nous analysons votre marché local. Nous identifions exactement ce que vos clients recherchent sur Google et sur les intelligences artificielles pour créer un plan d'action sur-mesure.",
    step2Title: "2. Pack d'Ouverture (499€)",
    step2Desc: "Création immédiate de 50 contenus ultra-optimisés : 10 pages services, 15 pages villes, 10 articles, 10 FAQ IA et 5 pages de conversion. Vous êtes visible partout, tout de suite.",
    step3Title: "3. Croissance Mensuelle (199€)",
    step3Desc: "Chaque mois, nous ajoutons 20 nouveaux contenus ciblés et 10 publications Google Business Profile. Votre visibilité augmente en continu, vos concurrents disparaissent.",
    priceTitle: "Une Offre Simple et Transparente",
    priceSub: "Une technologie de pointe enfin accessible aux indépendants et PME locales.",
    planName: "Domination Locale",
    planSub: "Exclusivité garantie : 1 seul client par métier dans un rayon de 50 km.",
    planPrice: "499€",
    planSetup: "Pack d'Ouverture (50 contenus)",
    planMo: "puis 199€/mois (sans engagement)",
    check1: "Audit initial 100% gratuit",
    check2: "50 contenus Google & IA (Pack Ouverture)",
    check3: "20 nouveaux contenus chaque mois",
    check4: "10 publications Google Business par mois",
    check5: "Optimisation ChatGPT, Claude, Gemini",
    check6: "Exclusivité totale sur votre zone (50km)",
    planCta: "Vérifier la disponibilité de ma zone",
    auditTitle: "Obtenez votre Audit Gratuit",
    auditSub: "Découvrez instantanément si votre secteur est encore disponible et analysez votre potentiel de croissance.",
    auditPlaceholder: "Entrez l'adresse de votre site web (ex: www.mon-entreprise.fr)",
    auditBtn: "Lancer mon Audit Gratuit",
    auditAnalyzing: "Analyse de votre marché local...",
    auditKeywords: "Vérification de la disponibilité de la zone...",
    auditStrategy: "Création de votre plan d'action sur-mesure...",
    auditBadge1: "Résultat Immédiat",
    auditBadge2: "Analyse Google & IA",
    auditResults: "Rapport d'Intelligence de Visibilité",
    scoreVisibility: "Visibilité",
    scoreSentiment: "Sentiment",
    scoreAuthority: "Autorité",
    scoreAccuracy: "Précision",
    auditResultsTitle: "Rapport d'Intelligence de Visibilité",
    auditMarketTitle: "Intelligence de Marché",
    auditAiTitle: "Stratégie de Visibilité IA",
    auditLlmTitle: "Scores de Visibilité LLM",
    auditRoiTitle: "Croissance Projetée",
    auditKeywordsTitle: "Mots-clés à Haute Intention",
    auditSeoTitle: "Optimisation SEO & AEO",
    auditVisualTitle: "Plan d'Action",
    auditActionPlan: "Plan d'Action (90 Jours)",
    auditPhase1: "Jours 1-30",
    auditPhase1Title: "Pack d'Ouverture",
    auditPhase1Desc: "Création et publication de vos 50 premiers contenus ultra-optimisés (Google & IA).",
    auditPhase2: "Jours 31-60",
    auditPhase2Title: "Domination Locale",
    auditPhase2Desc: "Indexation massive et positionnement de votre entreprise sur votre zone de 50 km.",
    auditPhase3: "Jours 61-90",
    auditPhase3Title: "Croissance Mensuelle",
    auditPhase3Desc: "Ajout de 20 nouveaux contenus et 10 publications Google Business pour creuser l'écart.",
    auditLivePreviewBtn: "Aperçu des Pages",
    auditDeployBtn: "Exécuter la Stratégie",
    auditReport: "Rapport d'Audit",
    auditStrategic: "Plan de Croissance Stratégique",
    auditMarketAnalysis: "Analyse de Marché",
    auditGrowthStrategy: "Stratégie de Croissance",
    auditROIEstimate: "Estimation du ROI",
    auditDownload: "Télécharger le PDF",
    auditDeploy: "Déployer la Stratégie",
    auditBackDash: "Retour au Tableau de Bord",
    heroTitle: "SEO Propulsé par l'IA et Dominance Locale",
    heroBtn: "Analyser mon Site",
    heroRealtime: "Analyse en Temps Réel",
    heroAi: "Insights Pilotés par l'IA",
    heroLocal: "Données du Marché Local",
    dashKeywords: "Mots-clés",
    dashContent: "Contenu",
    dashAnalytics: "Analyses",
    dashSettings: "Paramètres",
    dashPro: "Plan Pro",
    dashUnlimited: "Audits et suivi illimités",
    dashUpgrade: "Améliorer",
    dashWelcome: "Bon retour",
    dashStatus: "Voici ce qui se passe avec votre SEO aujourd'hui.",
    dashTraffic: "Aperçu du Trafic",
    dashActivity: "Activité Récente",
    dashLast7: "7 derniers jours",
    dashLast30: "30 derniers jours",
    dashBack: "Retour à l'accueil",
    dashOverview: "Aperçu",
    statTraffic: "Trafic Total",
    statKeywords: "Mots-clés Classés",
    statLeads: "Leads Générés",
    statAuthority: "Autorité du Domaine",
    testimonialsTitle: "Ils Dominent Leur Secteur",
    testimonialsSub: "Des artisans et PME qui ont fait le choix de l'exclusivité et de l'innovation.",
    formTitle: "Réservez Votre Exclusivité",
    formSub: "Vérifiez si votre métier est encore disponible dans votre zone de 50 km. Premier arrivé, premier servi.",
    labelBiz: "Nom de votre entreprise",
    labelUrl: "Site web actuel (optionnel)",
    labelCity: "Ville d'intervention (ex: Lyon)",
    labelEmail: "Votre adresse e-mail",
    btnCheck: "Vérifier la disponibilité",
    btnProcessing: "Vérification...",
    successTitle: "Secteur Réservé",
    successSub: "Notre équipe examine votre demande. Nous vous contacterons sous 24h pour finaliser votre installation.",
    errTitle: "Échec de la Vérification",
    errSub: "Nous n'avons pas pu traiter votre demande. Veuillez réessayer ou contacter le support.",
    btnTryAgain: "Réessayer",
    footerRights: "© 2026 Renk. Tous droits réservés.",
    auditShareReport: "Partager le Rapport",
    auditDownloadPDF: "Télécharger le PDF",
    auditGenerating: "Génération...",
    auditNewAudit: "Nouvel Audit",
    auditAiVisibility: "Visibilité IA",
    auditBrandSentiment: "Sentiment de Marque",
    auditDataAccuracy: "Précision des Données",
    auditAiSearchPresence: "Présence sur les Moteurs de Recherche IA",
    auditTechnicalHealth: "Santé Technique",
    auditCoreWebVitals: "Signaux Web Essentiels",
    auditPerformance: "Performance",
    auditAccessibility: "Accessibilité",
    auditBestPractices: "Bonnes Pratiques",
    auditSeo: "SEO",
    auditAiRecommendations: "Recommandations IA",
    auditKeywordsRanked: "Mots-clés Classés",
    auditTop100: "Top 100",
    auditKeyword: "Mot-clé",
    auditIntent: "Intention",
    auditVolume: "Volume",
    auditKd: "KD%",
    auditLlmRatings: "Évaluations LLM",
    auditCompetitorAiVisibility: "Visibilité IA des Concurrents",
    auditSeoTips: "Conseils SEO",
    auditVisibilityScore: "Score de Visibilité",
    auditExcellent: "Excellent",
    auditGood: "Bon",
    auditWeak: "Faible",
    auditScore: "Score",
    auditTopicAuthority: "Autorité Thématique",
    auditExecutiveOverview: "Résumé Exécutif",
    auditVisibilityByPlatform: "Visibilité par Plateforme",
    auditCurrent: "Actuel",
    auditIndustryAvg: "Moyenne du Secteur",
    auditCompetitorGap: "Analyse de l'Écart avec la Concurrence",
    auditYourVisibility: "Votre Visibilité",
    auditCompetitor: "Concurrent",
    auditCriticalIssues: "Problèmes Critiques",
    auditOpportunities: "Opportunités",
    auditAiBrandPerception: "Perception de la Marque par l'IA",
    auditSentimentPositive: "Sentiment Positif",
    auditSentimentNeutral: "Sentiment Neutre",
    auditSentimentNegative: "Sentiment Négatif",
    auditTopAttributes: "Attributs Clés de la Marque",
    auditUserFeedback: "Résumé des Retours Utilisateurs",
    auditSemanticTerm: "Terme",
    auditSemanticDensity: "Densité",
    auditSemanticStatus: "Statut",
    auditStatusOptimal: "Optimal",
    auditStatusLow: "Faible",
    auditStatusHigh: "Élevé",
    auditBack: "Retour",
    auditPagePreview: "Aperçu de la Page de Destination Générée par l'IA",
    auditUltraLocal: "Domination Ultra-Locale (< 50km)",
    auditCaptureZone: "Zone de Capture",
    auditMarketPenetration: "Pénétration du Marché",
    auditDetailedKeywords: "Analyse Détaillée des Mots-Clés",
    auditProjectedGrowth: "Croissance Projetée",
    auditWarnings: "Avertissements",
    auditNotices: "Avis",
    auditGrowthProjection: "Projection de Croissance Stratégique",
    auditAiSeoVisibility: "Visibilité IA & SEO (Est.)",
    auditLocalVisibilityScore: "Score de Visibilité Locale",
    auditAiReadiness: "Préparation IA",
    auditSemanticAuthority: "Autorité Sémantique",
    auditErrors: "Erreurs",
    auditBeta: "Beta",
    auditInteractivePreview: "Aperçu Interactif",
    auditNewAiArticle: "Nouvel Article IA",
    auditReadyToDominate: "Prêt à dominer votre marché local ?",
    auditDeployStrategyDesc: "Déployez cette stratégie instantanément et commencez à capturer le trafic de votre zone de chalandise.",
    auditSemanticDensityDesc: "Votre contenu a une densité sémantique de {density}%. Pour atteindre le top 3 sur les moteurs de recherche IA, nous recommandons une densité de 65% en intégrant plus d'entités liées à votre niche locale.",
    landingWhyChooseUs: "Pourquoi nous choisir ?",
    landingSpecialOffer: "Offre Spéciale Limitée",
    landingGetFreeQuote: "Obtenir un devis gratuit",
    landingOurServices: "Nos services",
    landingOurExpertise: "Notre Expertise",
    landingStrategyResults: "Stratégie & Résultats",
    landingExpertiseDesc: "Nous mettons notre savoir-faire au service de votre réussite. Découvrez une approche sur-mesure pour atteindre vos objectifs avec {company}.",
    landingProvenResults: "Résultats Prouvés",
    landingDedicatedSupport: "Support Dédié",
    landingIndustryExperts: "Experts du Secteur",
    statSitesIndexed: "Zones Réservées",
    statLeadsGenerated: "Clients Apporteurs d'Affaires",
    statAvgRoi: "Rentabilité Moyenne",
    statCitiesCovered: "Villes Couvertes",
    dashActivity1Title: "Nouveau Mot-clé Classé",
    dashActivity1Desc: "Votre site est maintenant #3 pour \"SEO Tool\"",
    dashActivity1Time: "Il y a 2h",
    dashActivity2Title: "Audit Terminé",
    dashActivity2Desc: "Analyse pour example.com terminée",
    dashActivity2Time: "Il y a 5h",
    dashActivity3Title: "Pic de Trafic",
    dashActivity3Desc: "Le trafic a augmenté de 40% aujourd'hui",
    dashActivity3Time: "Il y a 12h",
    dashActivity4Title: "Nouveau Lead",
    dashActivity4Desc: "Soumission du formulaire de contact par John",
    dashActivity4Time: "Il y a 1j"
  },
  es: {
    navPricing: "Precios",
    navHow: "Estrategia",
    navStart: "Auditoría Gratis",
    heroBadge: "El Motor SEO para la Era de la IA",
    heroTitle1: "Mejora tu visibilidad en",
    heroSub: "No deje que sus competidores se queden con todo el espacio. Posicionamos su negocio donde sus clientes buscan hoy: en Google y en el centro de las respuestas de la IA.",
    feat1Title: "Exclusividad Total (50km)",
    feat1Desc: "Trabajamos con un solo profesional por sector y por zona. Si te acompañamos, rechazamos a tus competidores. Obtienes el 100% de los resultados.",
    feat2Title: "SEO para IA (LLM SEO)",
    feat2Desc: "Tus futuros clientes ya están buscando en ChatGPT, Claude y Gemini. Posicionamos tu negocio como la recomendación obvia en estas nuevas inteligencias artificiales.",
    feat3Title: "Tecnología 100% Automatizada",
    feat3Desc: "Nuestra inteligencia artificial gestiona todo: desde la auditoría hasta la creación de tus contenidos. ¿El resultado? Una estrategia más rápida, de mayor rendimiento y mucho más asequible que una agencia tradicional.",
    howTitle: "Nuestro Método de Adquisición",
    howSub: "Una estrategia clara en 3 pasos para dominar tu área geográfica en Google y las IA.",
    step1Title: "1. Auditoría Gratis y Estrategia",
    step1Desc: "Analizamos tu mercado local. Identificamos exactamente qué buscan tus clientes en Google y en las inteligencias artificiales para crear un plan de acción a medida.",
    step2Title: "2. Pack de Inicio (499€)",
    step2Desc: "Creación inmediata de 50 contenidos ultra optimizados: 10 páginas de servicios, 15 páginas de ciudades, 10 artículos, 10 FAQ de IA y 5 páginas de conversión. Eres visible en todas partes, de inmediato.",
    step3Title: "3. Crecimiento Mensual (199€)",
    step3Desc: "Cada mes, añadimos 20 nuevos contenidos específicos y 10 publicaciones en Google Business Profile. Tu visibilidad aumenta continuamente, tus competidores desaparecen.",
    priceTitle: "Una Oferta Simple y Transparente",
    priceSub: "Tecnología punta por fin accesible para autónomos y pymes locales.",
    planName: "Dominación Local",
    planSub: "Exclusividad garantizada: 1 cliente por sector en un radio de 50 km.",
    planPrice: "499€",
    planSetup: "Pack de Inicio (50 contenidos)",
    planMo: "luego 199€/mes (sin compromiso)",
    check1: "Auditoría inicial 100% gratuita",
    check2: "50 contenidos Google e IA (Pack Inicio)",
    check3: "20 nuevos contenidos cada mes",
    check4: "10 publicaciones en Google Business al mes",
    check5: "Optimización ChatGPT, Claude, Gemini",
    check6: "Exclusividad total en tu zona (50km)",
    planCta: "Comprobar disponibilidad de mi zona",
    auditTitle: "Obtén tu Auditoría Gratis",
    auditSub: "Descubre al instante si tu sector sigue disponible y analiza tu potencial de crecimiento.",
    auditPlaceholder: "Introduce la dirección de tu sitio web (ej: www.mi-empresa.es)",
    auditBtn: "Lanzar mi Auditoría Gratis",
    auditAnalyzing: "Analizando tu mercado local...",
    auditKeywords: "Comprobando disponibilidad de la zona...",
    auditStrategy: "Creando tu plan de acción a medida...",
    auditBadge1: "Resultado Inmediato",
    auditBadge2: "Análisis Google e IA",
    auditResults: "Informe de Inteligencia de Visibilidad",
    scoreVisibility: "Visibilidad",
    scoreSentiment: "Sentimiento",
    scoreAuthority: "Autoridad",
    scoreAccuracy: "Precisión",
    auditResultsTitle: "Informe de Inteligencia de Visibilidad",
    auditMarketTitle: "Inteligencia de Mercado",
    auditAiTitle: "Estrategia de Visibilidad IA",
    auditLlmTitle: "Puntuaciones de Visibilidad LLM",
    auditRoiTitle: "Crecimiento Proyectado",
    auditKeywordsTitle: "Palabras Clave de Alta Intención",
    auditSeoTitle: "Optimización SEO & AEO",
    auditVisualTitle: "Hoja de Ruta Estratégica",
    auditActionPlan: "Plan de Acción (90 Días)",
    auditPhase1: "Días 1-30",
    auditPhase1Title: "Pack de Inicio",
    auditPhase1Desc: "Creación y publicación de tus primeros 50 contenidos ultra optimizados (Google e IA).",
    auditPhase2: "Días 31-60",
    auditPhase2Title: "Dominación Local",
    auditPhase2Desc: "Indexación masiva y posicionamiento de tu empresa en tu zona de 50 km.",
    auditPhase3: "Días 61-90",
    auditPhase3Title: "Crecimiento Mensual",
    auditPhase3Desc: "Adición de 20 nuevos contenidos y 10 publicaciones en Google Business para ampliar la ventaja.",
    auditLivePreviewBtn: "Previsualizar Páginas",
    auditDeployBtn: "Ejecutar Estrategia",
    auditReport: "Informe de Auditoría",
    auditStrategic: "Plan de Crecimiento Estratégico",
    auditMarketAnalysis: "Análisis de Mercado",
    auditGrowthStrategy: "Estrategia de Crecimiento",
    auditROIEstimate: "Estimación del ROI",
    auditDownload: "Descargar PDF",
    auditDeploy: "Ejecutar Estrategia",
    auditBackDash: "Volver al Panel",
    heroTitle: "SEO Impulsado por IA y Dominio Local",
    heroBtn: "Analizar mi Sitio",
    heroRealtime: "Análisis en Tiempo Real",
    heroAi: "Insights Impulsados por IA",
    heroLocal: "Datos del Mercado Local",
    dashKeywords: "Palabras clave",
    dashContent: "Contenido",
    dashAnalytics: "Analítica",
    dashSettings: "Configuración",
    dashPro: "Plan Pro",
    dashUnlimited: "Auditorías y seguimiento ilimitados",
    dashUpgrade: "Mejorar",
    dashWelcome: "Bienvenido de nuevo",
    dashStatus: "Esto es lo que está pasando con tu SEO hoy.",
    dashTraffic: "Resumen de tráfico",
    dashActivity: "Actividad reciente",
    dashLast7: "Últimos 7 días",
    dashLast30: "Últimos 30 días",
    dashBack: "Volver al inicio",
    dashOverview: "Resumen",
    statTraffic: "Tráfico total",
    statKeywords: "Palabras clave posicionadas",
    statLeads: "Leads generados",
    statAuthority: "Autoridad del dominio",
    testimonialsTitle: "Dominan su Sector",
    testimonialsSub: "Artesanos y pymes que eligieron la exclusividad y la innovación.",
    formTitle: "Reserva tu Exclusividad",
    formSub: "Comprueba si tu sector sigue disponible en tu zona de 50 km. Por orden de llegada.",
    labelBiz: "Nombre de tu negocio",
    labelUrl: "Sitio web actual (opcional)",
    labelCity: "Ciudad de servicio (ej: Madrid)",
    labelEmail: "Tu correo electrónico",
    btnCheck: "Comprobar Disponibilidad",
    btnProcessing: "Verificando...",
    successTitle: "Territorio Reservado",
    successSub: "Nuestro equipo está revisando tu solicitud. Te contactaremos en 24 horas para finalizar tu configuración.",
    errTitle: "Error de Verificación",
    errSub: "No pudimos procesar tu solicitud. Inténtalo de nuevo o contacta con soporte.",
    btnTryAgain: "Reintentar",
    footerRights: "© 2026 Renk. Todos los derechos reservados.",
    auditShareReport: "Compartir Informe",
    auditDownloadPDF: "Descargar PDF",
    auditGenerating: "Generando...",
    auditNewAudit: "Nueva Auditoría",
    auditAiVisibility: "Visibilidad IA",
    auditBrandSentiment: "Sentimiento de Marca",
    auditDataAccuracy: "Precisión de Datos",
    auditAiSearchPresence: "Presencia en Motores de Búsqueda de IA",
    auditTechnicalHealth: "Salud Técnica",
    auditCoreWebVitals: "Core Web Vitals",
    auditPerformance: "Rendimiento",
    auditAccessibility: "Accesibilidad",
    auditBestPractices: "Buenas Prácticas",
    auditSeo: "SEO",
    auditAiRecommendations: "Recomendaciones de IA",
    auditKeywordsRanked: "Palabras Clave Clasificadas",
    auditTop100: "Top 100",
    auditKeyword: "Palabra Clave",
    auditIntent: "Intención",
    auditVolume: "Volumen",
    auditKd: "KD%",
    auditLlmRatings: "Calificaciones LLM",
    auditCompetitorAiVisibility: "Visibilidad IA de la Competencia",
    auditSeoTips: "Consejos SEO",
    auditVisibilityScore: "Puntuación de Visibilidad",
    auditExcellent: "Excelente",
    auditGood: "Bueno",
    auditWeak: "Débil",
    auditScore: "Puntuación",
    auditTopicAuthority: "Autoridad del Tema",
    auditExecutiveOverview: "Resumen Ejecutivo",
    auditVisibilityByPlatform: "Visibilidad por Plataforma",
    auditCurrent: "Actual",
    auditIndustryAvg: "Promedio de la Industria",
    auditCompetitorGap: "Análisis de Brecha con la Competencia",
    auditYourVisibility: "Tu Visibilidad",
    auditCompetitor: "Competidor",
    auditCriticalIssues: "Problemas Críticos",
    auditOpportunities: "Oportunidades",
    auditAiBrandPerception: "Percepción de Marca por IA",
    auditSentimentPositive: "Sentimiento Positivo",
    auditSentimentNeutral: "Sentimiento Neutro",
    auditSentimentNegative: "Sentimiento Negativo",
    auditTopAttributes: "Atributos Clave de la Marca",
    auditUserFeedback: "Resumen de Comentarios de Usuarios",
    auditSemanticTerm: "Término",
    auditSemanticDensity: "Densidad",
    auditSemanticStatus: "Estado",
    auditStatusOptimal: "Óptimo",
    auditStatusLow: "Bajo",
    auditStatusHigh: "Alto",
    auditBack: "Volver",
    auditPagePreview: "Vista Previa de la Página de Destino Generada por IA",
    auditUltraLocal: "Dominio Ultra-Local (< 50km)",
    auditCaptureZone: "Zona de Captura",
    auditMarketPenetration: "Penetración de Mercado",
    auditDetailedKeywords: "Análisis Detallado de Palabras Clave",
    auditProjectedGrowth: "Crecimiento Proyectado",
    auditWarnings: "Advertencias",
    auditNotices: "Avisos",
    auditGrowthProjection: "Proyección de Crecimiento Estratégico",
    auditAiSeoVisibility: "Visibilidad IA y SEO (Est.)",
    auditLocalVisibilityScore: "Puntuación de Visibilidad Local",
    auditAiReadiness: "Preparación IA",
    auditSemanticAuthority: "Autoridad Semántica",
    auditErrors: "Errores",
    auditBeta: "Beta",
    auditInteractivePreview: "Vista Previa Interactiva",
    auditNewAiArticle: "Nuevo Artículo IA",
    auditReadyToDominate: "¿Listo para dominar tu mercado local?",
    auditDeployStrategyDesc: "Implemente esta estrategia al instante y comience a capturar tráfico en su área de influencia.",
    auditSemanticDensityDesc: "Tu contenido tiene una densidad semántica del {density}%. Para alcanzar el top 3 en los motores de búsqueda de IA, recomendamos una densidad del 65% integrando más entidades relacionadas con tu nicho local.",
    landingWhyChooseUs: "¿Por qué elegirnos?",
    landingSpecialOffer: "Oferta Especial Limitada",
    landingGetFreeQuote: "Obtener presupuesto gratuito",
    landingOurServices: "Nuestros servicios",
    landingOurExpertise: "Nuestra Experiencia",
    landingStrategyResults: "Estrategia y Resultados",
    landingExpertiseDesc: "Ponemos nuestro saber hacer al servicio de su éxito. Descubra un enfoque a medida para alcanzar sus objetivos con {company}.",
    landingProvenResults: "Resultados Probados",
    landingDedicatedSupport: "Soporte Dedicado",
    landingIndustryExperts: "Expertos del Sector",
    statSitesIndexed: "Zonas Reservadas",
    statLeadsGenerated: "Clientes Generadores de Negocio",
    statAvgRoi: "Rentabilidad Media",
    statCitiesCovered: "Ciudades Cubiertas",
    dashActivity1Title: "Nueva Palabra Clave Clasificada",
    dashActivity1Desc: "Su sitio ahora es el n.º 3 para \"SEO Tool\"",
    dashActivity1Time: "Hace 2h",
    dashActivity2Title: "Auditoría Completada",
    dashActivity2Desc: "Análisis para example.com finalizado",
    dashActivity2Time: "Hace 5h",
    dashActivity3Title: "Pico de Tráfico",
    dashActivity3Desc: "El tráfico aumentó un 40% hoy",
    dashActivity3Time: "Hace 12h",
    dashActivity4Title: "Nuevo Cliente Potencial",
    dashActivity4Desc: "Envío de formulario de contacto de John",
    dashActivity4Time: "Hace 1d"
  }
};

const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};


interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <p className="text-white text-lg font-medium mb-6">L'application a rencontré une erreur. Veuillez rafraîchir la page.</p>
            <pre className="text-sm bg-black/50 p-4 rounded-lg overflow-auto text-left mb-6 text-red-300">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'conversion'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 4000], [1, 0.5]); // More subtle fade out, longer range

  const [lang, setLang] = useState<Lang>('fr'); // Default to French based on user context

  const Dashboard = () => {
    const stats = [
      { label: t.statTraffic, value: auditData ? `${((auditData.localVisibilityScore || 0) * 120).toLocaleString()}` : '12.4k', change: '+14%', icon: TrendingUp, color: 'text-success' },
      { label: t.statKeywords, value: auditData ? `${(auditData.keywords?.length || 0) * 12}` : '842', change: '+28', icon: Target, color: 'text-info' },
      { label: t.statLeads, value: auditData ? `${Math.floor((auditData.localVisibilityScore || 0) * 1.5)}` : '156', change: '+5%', icon: Users, color: 'text-primary' },
      { label: t.statAuthority, value: auditData ? `${auditData.aiReadinessScore || 0}` : '42', change: '+2', icon: Shield, color: 'text-warning' },
    ];

    return (
      <div className="min-h-screen bg-bg-secondary text-text font-sans flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-surface hidden lg:flex flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-2 mb-12">
            <RenkLogo className="h-28 w-auto" variant="small" />
          </div>

          <nav className="space-y-2 flex-1">
            {[
              { id: 'overview', icon: Layout, label: t.dashOverview },
              { id: 'keywords', icon: Target, label: t.dashKeywords },
              { id: 'content', icon: FileText, label: t.dashContent },
              { id: 'analytics', icon: BarChart3, label: t.dashAnalytics },
              { id: 'settings', icon: Settings, label: t.dashSettings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 rounded-md bg-primary/5 border border-primary/10">
            <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{t.dashPro}</div>
            <div className="text-sm text-text font-bold mb-3">{t.dashUnlimited}</div>
            <button 
              onClick={() => setView('conversion')}
              className="btn-primary w-full py-2 text-sm"
            >
              {t.dashUpgrade}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-bg-primary">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text">{t.dashWelcome}, {formData.businessName || 'User'}</h1>
              <p className="text-text-secondary text-base">{t.dashStatus}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md bg-surface border border-border text-text-secondary hover:text-primary transition-colors relative shadow-soft">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-main p-[1px] shadow-soft">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-md bg-surface border border-border hover:border-primary/30 transition-all group shadow-soft"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-md bg-bg-secondary ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                    {stat.change}
                  </span>
                </div>
                <div className="text-text-secondary text-sm font-bold mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-text">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-md bg-surface border border-border shadow-soft">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-text">{t.dashTraffic}</h3>
                <select className="bg-bg-secondary border border-border rounded-md px-3 py-1 text-sm outline-none text-text-secondary font-bold">
                  <option>{t.dashLast7}</option>
                  <option>{t.dashLast30}</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'Mon', value: 400 },
                    { name: 'Tue', value: 300 },
                    { name: 'Wed', value: 600 },
                    { name: 'Thu', value: 800 },
                    { name: 'Fri', value: 500 },
                    { name: 'Sat', value: 900 },
                    { name: 'Sun', value: 1100 },
                  ]}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
                      itemStyle={{ color: '#3B82F6' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-8 rounded-md bg-surface border border-border shadow-soft">
              <h3 className="text-lg font-bold text-text mb-6">{t.dashActivity}</h3>
              <div className="space-y-6">
                {[
                  { title: t.dashActivity1Title, desc: t.dashActivity1Desc, time: t.dashActivity1Time, icon: Target, color: 'text-success' },
                  { title: t.dashActivity2Title, desc: t.dashActivity2Desc, time: t.dashActivity2Time, icon: Zap, color: 'text-warning' },
                  { title: t.dashActivity3Title, desc: t.dashActivity3Desc, time: t.dashActivity3Time, icon: TrendingUp, color: 'text-info' },
                  { title: t.dashActivity4Title, desc: t.dashActivity4Desc, time: t.dashActivity4Time, icon: Users, color: 'text-primary' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-md bg-bg-secondary flex items-center justify-center shrink-0 ${item.color} shadow-inner`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text">{item.title}</div>
                      <div className="text-sm text-text-secondary font-medium">{item.desc}</div>
                      <div className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-widest">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setView('landing')}
                className="w-full mt-8 py-3 bg-bg-secondary border border-border rounded-md text-sm font-bold text-text-secondary hover:text-primary hover:bg-bg-primary transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t.dashBack}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const handleShare = () => {
    setIsSharing(true);
  };

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'checkout'>('idle');
  
  // Audit Tool State
  const [auditStep, setAuditStep] = useState<'idle' | 'analyzing' | 'results'>('idle');
  const [auditUnlocked, setAuditUnlocked] = useState(false);
  const [auditUrl, setAuditUrl] = useState('');
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [auditError, setAuditError] = useState<string | null>(null);

  const handleStartAudit = () => {
    if (auditUrl) {
      runAudit();
    }
  };

  // Estimator State
  const [marketSearches, setMarketSearches] = useState(1000);
  const [avgOrderValue, setAvgOrderValue] = useState(250);

  const t = translations[lang];

  // Handle Success/Cancel from URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      setFormState('success');
      setIsModalOpen(true);
    } else if (params.get('canceled')) {
      setFormState('error');
      setIsModalOpen(true);
    }
  }, []);

  const runAudit = async (retryCount = 0) => {
    if (!auditUrl) return;
    
    let urlToAnalyze = auditUrl;
    if (!urlToAnalyze.startsWith('http://') && !urlToAnalyze.startsWith('https://')) {
      urlToAnalyze = 'https://' + urlToAnalyze;
    }

    setAuditStep('analyzing');
    setAuditError(null);
    setAnalysisProgress(10);
    setCurrentTask("Initialisation de l'audit profond...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      // Step 1: Deep Analysis with URL Context & Search
      setAnalysisProgress(15);
      setCurrentTask("Identification de l'entité commerciale et du secteur d'activité...");
      const prompt = `AUDIT REQUEST for URL: ${urlToAnalyze}
      
      CRITICAL IDENTIFICATION RULES:
      1. YOU ARE ANALYZING AN EXTERNAL CLIENT: The business at ${urlToAnalyze} is your ONLY subject. 
      2. DO NOT IDENTIFY AS Renk: You are NOT a web agency, and the client is NOT a web agency (unless the site explicitly says so).
      3. REAL-TIME TOOLS: Use googleSearch to find the physical location, real name, and actual industry of ${urlToAnalyze}. Search for "[URL] company info", "[URL] mentions légales", and "[URL] industry category".
      4. SECTOR ACCURACY: If the site is about "rénovation de l'habitat" (housing renovation), "dentiste", "plombier", etc., your entire audit MUST use that specific vocabulary.
      5. NO HALLUCINATION: If the site is in French, the business is likely in France. Find the city and region.
      
      REQUIRED DATA POINTS (MUST BE POPULATED WITH REALISTIC ESTIMATES):
      - AI Search Presence: Status on ChatGPT, Gemini, Perplexity.
      - Technical Health: Performance, Accessibility, Best Practices, SEO scores (0-100).
      - Semantic Density: % of keyword coverage vs competitors.
      - Semantic Terms: A list of at least 25 key industry terms with their density and status.
      - Competitor Analysis: 3 real competitors in the same city/niche.
      - Critical Issues: 3 High severity technical or visibility blockers.
      - Opportunities: 3 Medium severity growth levers.
      - Brand Perception: Detailed sentiment analysis (positive/neutral/negative) and top brand attributes from individual user perspectives.
      - Platform Visibility: 5 platforms (Google, ChatGPT, Gemini, Perplexity, Maps) with scores and industry averages.
      - LLM Ratings: Ground these in market reality. Provide realistic ratings for ChatGPT, Gemini, Perplexity, Claude, and Grok. If the brand is a small local business or unknown, the scores MUST be very low (0-20). Only give high scores if they are a massive, globally recognized brand. CRITICAL: The 'reasoning' and 'status' MUST perfectly match the 'score'. A low score (0-30) MUST have a 'poor' status and a negative reasoning explaining the invisibility. A high score MUST have an 'excellent' status and positive reasoning.
      - Visibility Status: For each competitor and the client, assign a status: "Dominant", "Established", "Emerging", or "Invisible" with a brief reason why.
      
      PHASE-BASED ANALYSIS (JSON OUTPUT):
      - PHASE 1 (HOOK): A brutal, data-driven statement about their invisibility.
      - PHASE 2 (PROOF): Compare them to 3 REAL local competitors found via search.
      - PHASE 3 (PAIN): Financial loss estimate based on local search volume.
      - PHASE 4 (VISION): Market dominance projection.
      - PHASE 5 (PLAN): 4 concrete steps to win.
      - PHASE 6 (CTA): Urgent closing statement.
      
      Return a JSON object with exactly these fields:
      - companyName: string (the official name of the business)
      - industry: string (the specific industry, e.g., "Rénovation de l'habitat")
      - riskLevel: string ("low", "medium", "high", or "critical")
      - seoScore: number (0-100)
      - hook: string (max 15 words, PHASE 1)
      - competitorComparison: array of 3 objects { name, visibility: string (e.g. "Top 3"), maps: boolean, status: string, context: string }
      - keywordRankings: array of 5 objects { keyword, position: number | string }
      - estimatedLoss: object { amount: string, description: string }
      - opportunities: array of 3 objects { title, description: string }
      - actionPlan: array of 4 objects { title, description: string }
      - projection: array of 4 strings
      - visionStatement: string
      - cta: string
      - extractedLocation: string
      - localVisibilityScore: number (0-100)
      - aiReadinessScore: number (0-100)
      - semanticAuthorityScore: number (0-100)
      - scores: object { visibility: number, sentiment: number, authority: number, accuracy: number }
      - platformVisibility: array of 6 objects { name, score: number, avg: number } (Platforms: Google, ChatGPT, Gemini, Perplexity, Grok, Maps)
      - issues: array of 3 objects { title, desc: string, severity: "high" | "medium" | "low" }
      - perceptions: array of 4 objects { label, value: number (0-100), context: string }
      - brandPerceptionDetails: object { sentiment: { positive: number, neutral: number, negative: number }, topAttributes: array of { label, score }, userFeedbackSummary: string }
      - recommendations: array of 3 strings
      - technicalHealth: object { performance: number, accessibility: number, bestPractices: number, seo: number, coreWebVitals: "Passing" | "Needs Improvement" | "Failing" }
      - semanticDensity: number (0-100)
      - semanticTerms: array of at least 25 objects { term, density: number, status: "optimal" | "low" | "high" }
      - aiSearchPresence: array of 4 objects { platform, status, context } (Platforms: ChatGPT, Gemini, Perplexity, Grok)
      - errors: array of strings
      - warnings: array of strings
      - notices: array of strings
      - keywords: array of strings
      - detailedKeywords: array of 4 objects { keyword, intent, volume: number, kd: number, opportunityScore: number }
      - aiCompetitors: array of 3 objects { name, aiVisibilityScore: number (0-100), strength, visibility: number (0-100), status: string, context: string, strategy: string }
      - pageTitle: string
      - pageContent: string
      - blogTitle: string
      - blogExcerpt: string
      - seoTips: array of strings
      - marketAnalysis: string
      - aiRecommendation: string
      - roiEstimate: string
      - growthStrategy: string
      - llmRatings: array of 5 objects { model, score: number (0-100), status: "excellent" | "good" | "poor", reasoning }
      
      Language: ${lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English'}.
      Format: JSON only.`;
      

      setAnalysisProgress(30);
      setCurrentTask("Analyse de la visibilité sur les moteurs de recherche IA (ChatGPT, Gemini, Perplexity)...");
      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ parts: [{ text: prompt }] }],
          config: { 
            responseMimeType: "application/json",
            systemInstruction: `You are a world-class SEO and AI Search auditor. 
            Your goal is to analyze the URL provided and convince the business owner that they are losing a massive amount of money by being invisible on AI search engines (ChatGPT, Gemini, Perplexity) and Google Maps. 
            
            STRICT RULES:
            1. IDENTIFY THE BUSINESS CORRECTLY: Use googleSearch to find the REAL name and REAL industry of the URL. If the URL is eveom.fr, it is a renovation company, NOT a web agency.
            2. TONE: Be professional, data-driven, and slightly aggressive to create urgency.
            3. DATA REALISM: You MUST provide highly realistic data. If the business is a small local shop, their AI visibility, LLM ratings, and SEO scores MUST be very low (0-20). Do not invent high scores for unknown brands.
            4. DATA COMPLETENESS: You MUST provide realistic data for ALL requested JSON fields. Do not leave arrays empty.
            5. NO SELF-IDENTIFICATION: Never say you are Renk or that the client is Renk.
            6. LOCAL FOCUS: Find the city/region of the business and use it in your analysis.
            7. LLM RATINGS CORRELATION: The 'reasoning' and 'status' in llmRatings MUST perfectly match the 'score'. A low score (0-30) MUST have a 'poor' status and a negative reasoning explaining the invisibility. A high score MUST have an 'excellent' status and positive reasoning.`,
            tools: [
              { urlContext: {} },
              { googleSearch: {} }
            ]
          }
        });
      } catch (err) {
        console.warn("Advanced tools failed, retrying with basic search:", err);
        setAnalysisProgress(45);
        setCurrentTask("Tentative de récupération des données via recherche Google alternative...");
        response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ parts: [{ text: prompt }] }],
          config: { 
            responseMimeType: "application/json",
            systemInstruction: "You are a world-class SEO and AI Search auditor. Identify the business correctly using search. NEVER hallucinate that the client is a web agency or Renk. Provide full data for all fields. DATA REALISM: You MUST provide highly realistic data. If the business is a small local shop, their AI visibility, LLM ratings, and SEO scores MUST be very low (0-20). CRITICAL: The 'reasoning' and 'status' in llmRatings MUST perfectly match the 'score'. A low score (0-30) MUST have a 'poor' status and a negative reasoning.",
            tools: [{ googleSearch: {} }]
          }
        });
      }

      setAnalysisProgress(85);
      setCurrentTask("Extraction des métriques de santé technique et SEO...");
      
      const text = response.text || "{}";
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const cleanText = jsonMatch ? jsonMatch[1] : text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      
      let data;
      try {
        data = JSON.parse(cleanText);
      } catch (parseError) {
        console.error("JSON parsing failed:", parseError, "Raw text:", text);
        throw new Error("Failed to parse AI response as JSON.");
      }
      
      setCurrentTask("Génération du plan d'action stratégique...");
      // Generate Growth Projection Data
      const baseGrowth = 100;
      const growthProjection = [
        { month: 'M0', value: baseGrowth },
        { month: 'M1', value: baseGrowth * 1.15 },
        { month: 'M2', value: baseGrowth * 1.45 },
        { month: 'M3', value: baseGrowth * 1.85 },
        { month: 'M4', value: baseGrowth * 2.45 },
        { month: 'M5', value: baseGrowth * 3.20 },
      ];

      setAuditData({ ...data, growthProjection });
      setFormData(prev => ({ ...prev, websiteUrl: urlToAnalyze, businessName: data.companyName || '' }));
      setAnalysisProgress(100);
      
      setAuditStep('results');
    } catch (error) {
      console.error("Audit failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (retryCount < 1) {
        setAuditError(lang === 'fr' ? `Une erreur est survenue (${errorMessage}), nouvelle tentative...` : lang === 'es' ? `Se produjo un error (${errorMessage}), reintentando...` : `An error occurred (${errorMessage}), retrying...`);
        setTimeout(() => runAudit(retryCount + 1), 2000);
        return;
      }

      setAuditError(lang === 'fr' ? `L'analyse en direct a échoué (${errorMessage}). Voici un exemple de résultat pour illustrer le potentiel de notre outil.` : lang === 'es' ? `El análisis en vivo falló (${errorMessage}). Aquí hay un resultado de ejemplo para ilustrar el potencial de nuestra herramienta.` : `Live analysis failed (${errorMessage}). Here is a sample result to illustrate the potential of our tool.`);

      const fallbackData: AuditData = lang === 'fr' ? {
        companyName: "Votre Entreprise",
        industry: "Rénovation de l'habitat",
        riskLevel: "high",
        seoScore: 37,
        hook: "Votre entreprise est invisible sur Google sur 78% des recherches clés à votre ville",
        competitorComparison: [
          { name: "Concurrent X", visibility: "Top 3", maps: true, status: "Dominant", context: "Leader incontesté sur les requêtes de rénovation locale." },
          { name: "Concurrent Y", visibility: "Top 5", maps: true, status: "Established", context: "Forte présence sur Maps et citations régulières." },
          { name: "Vous", visibility: "> 20", maps: false, status: "Invisible", context: "Aucune mention détectée sur les moteurs IA." }
        ],
        keywordRankings: [
          { keyword: "plombier Annecy", position: 18 },
          { keyword: "dépannage plombier Annecy", position: 12 },
          { keyword: "urgence fuite Annecy", position: "> 20" }
        ],
        estimatedLoss: { amount: "20 à 50 clients/mois", description: "Sur le mot-clé 'plombier Annecy', il y a environ 1200 recherches/mois. Les 3 premiers captent 60% du trafic. Vous êtes actuellement invisible." },
        opportunities: [
          { title: "Mots-clés faibles concurrence", description: "Ciblez des termes comme 'urgence fuite d'eau Annecy' qui ont moins de compétition." },
          { title: "Pages manquantes", description: "Créez des pages dédiées pour chaque service spécifique." },
          { title: "Optimisation simple", description: "Mettez à jour vos balises méta pour un impact immédiat." }
        ],
        actionPlan: [
          { title: "Créer pages 'dépannage + ville'", description: "Capturez le trafic ultra-local." },
          { title: "Optimiser fiche Google", description: "Améliorez votre visibilité sur Maps." },
          { title: "Publier contenus locaux", description: "Devenez l'autorité sémantique de votre zone." },
          { title: "Stratégie avis clients", description: "Boostez votre preuve sociale." }
        ],
        projection: ["Top 3 sur 5 à 10 mots-clés locaux", "+30% à +80% de visibilité", "Présence dans Google Maps", "Recommandation par IA"],
        visionStatement: "Imaginez votre entreprise dominant chaque recherche locale, capturant tous les prospects qualifiés avant même qu'ils ne voient vos concurrents.",
        cta: "Cliquez ici pour activer votre croissance SEO",
        keywords: ["SEO Local", "Optimisation IA", "Visibilité Google"],
        detailedKeywords: [
          { keyword: "artisan plombier paris", intent: "Commerciale", volume: 1200, kd: 45, opportunityScore: 85 },
          { keyword: "dépannage urgence 24/7", intent: "Transactionnelle", volume: 850, kd: 62, opportunityScore: 72 },
          { keyword: "meilleur artisan près de moi", intent: "Navigationnelle", volume: 320, kd: 28, opportunityScore: 94 },
          { keyword: "prix installation chaudière", intent: "Informationnelle", volume: 540, kd: 35, opportunityScore: 68 }
        ],
        aiCompetitors: [
          { name: "Concurrent A", aiVisibilityScore: 78, strength: "Autorité sémantique forte", visibility: 78, status: "Dominant", context: "Cité comme référence par ChatGPT dans 80% des cas." },
          { name: "Concurrent B", aiVisibilityScore: 65, strength: "Optimisation Maps excellente", visibility: 65, status: "Established", context: "Présence constante dans le Pack Local Google." },
          { name: "Concurrent C", aiVisibilityScore: 42, strength: "Contenu local pertinent", visibility: 42, status: "Emerging", context: "Progression rapide sur les mots-clés de niche." }
        ],
        pageTitle: "Boostez votre présence locale",
        pageContent: "Nous créons des pages optimisées pour capturer chaque recherche dans votre ville.",
        blogTitle: "Pourquoi l'IA change tout pour les artisans",
        blogExcerpt: "Découvrez comment ChatGPT et Gemini recommandent les entreprises locales en 2026.",
        seoTips: ["Optimisez vos photos", "Répondez aux avis", "Ajoutez vos services"],
        marketAnalysis: "Le marché local dans un rayon de 50km est extrêmement compétitif, mais vos concurrents ignorent encore l'optimisation pour l'IA. C'est une opportunité historique de prendre le monopole total sur votre secteur géographique avant qu'ils ne réagissent.",
        aiRecommendation: "Implémentez immédiatement des données structurées avancées et une stratégie AEO (AI Engine Optimization) pour devenir la recommandation n°1 incontestée de ChatGPT, Gemini et Perplexity dans votre ville.",
        roiEstimate: "+300% de Chiffre d'Affaires Potentiel",
        growthStrategy: "En dominant les recherches ultra-locales (< 50km), vous pouvez capturer 100% de l'intention d'achat immédiate. Notre protocole Renk est conçu pour transformer cette avance technologique en un flux constant de clients qualifiés.",
        llmRatings: [
          { model: "ChatGPT (OpenAI)", score: 12, status: 'poor', reasoning: "Aucune mention de la marque dans les recommandations locales." },
          { model: "Claude (Anthropic)", score: 8, status: 'poor', reasoning: "Données inexistantes sur la localisation exacte et les services." },
          { model: "Gemini (Google)", score: 15, status: 'poor', reasoning: "Légère présence via Google Maps mais invisible sur les requêtes conversationnelles." },
          { model: "Perplexity", score: 5, status: 'poor', reasoning: "Absence totale de sources sémantiques liées au domaine d'expertise." },
          { model: "Copilot (Microsoft)", score: 10, status: 'poor', reasoning: "Indexation insuffisante des pages de services dans l'écosystème Bing." }
        ],
        extractedLocation: "Votre zone locale",
        localVisibilityScore: 42,
        aiReadinessScore: 15,
        semanticAuthorityScore: 38,
        technicalHealth: {
          performance: 72,
          accessibility: 88,
          bestPractices: 94,
          seo: 82,
          coreWebVitals: "Besoin d'amélioration"
        },
        semanticDensity: 45,
        semanticTerms: [
          { term: "rénovation énergétique", density: 1.2, status: 'low' },
          { term: "isolation thermique", density: 0.8, status: 'low' },
          { term: "pompe à chaleur", density: 2.5, status: 'optimal' },
          { term: "artisan rge", density: 0.5, status: 'low' },
          { term: "devis gratuit", density: 3.2, status: 'high' },
          { term: "aménagement combles", density: 0.2, status: 'low' },
          { term: "menuiserie pvc", density: 1.5, status: 'optimal' },
          { term: "chauffage solaire", density: 0.1, status: 'low' },
          { term: "crédit impôt", density: 0.4, status: 'low' },
          { term: "audit énergétique", density: 0.6, status: 'low' },
          { term: "étanchéité toiture", density: 1.1, status: 'optimal' },
          { term: "façade maison", density: 0.9, status: 'low' },
          { term: "carrelage salle de bain", density: 0.4, status: 'low' },
          { term: "peinture intérieure", density: 1.8, status: 'optimal' },
          { term: "électricité générale", density: 0.7, status: 'low' },
          { term: "plomberie sanitaire", density: 2.1, status: 'optimal' },
          { term: "maçonnerie gros oeuvre", density: 0.3, status: 'low' },
          { term: "charpente bois", density: 0.5, status: 'low' },
          { term: "double vitrage", density: 1.4, status: 'optimal' },
          { term: "domotique maison", density: 0.2, status: 'low' },
          { term: "climatisation réversible", density: 0.9, status: 'low' },
          { term: "cuisine sur mesure", density: 1.1, status: 'optimal' },
          { term: "parquet massif", density: 0.6, status: 'low' },
          { term: "ravalement de façade", density: 0.8, status: 'low' },
          { term: "extension bois", density: 0.4, status: 'low' }
        ],
        aiSearchPresence: [
          { platform: "ChatGPT", status: "Invisible", context: "Aucune recommandation détectée pour vos services." },
          { platform: "Gemini", status: "Invisible", context: "Absence totale des résultats de recherche locale." },
          { platform: "Perplexity", status: "Non trouvé", context: "Aucune connexion sémantique détectée avec votre marque." }
        ],
        errors: ["Absence de balisage Schema.org LocalBusiness", "Aucune page dédiée aux villes environnantes (< 50km)"],
        warnings: ["Vitesse de chargement mobile lente", "Contenu trop générique, manque d'entités sémantiques"],
        notices: ["Mettre à jour les horaires sur Google Business", "Ajouter plus de photos de réalisations locales"],
        scores: { visibility: 42, sentiment: 65, authority: 38, accuracy: 85 },
        platformVisibility: [
          { name: "Google", score: 45, avg: 60 },
          { name: "ChatGPT", score: 15, avg: 50 },
          { name: "Perplexity", score: 20, avg: 45 }
        ],
        issues: [
          { title: "Schema Manquant", desc: "Le balisage LocalBusiness est absent", severity: "high" },
          { title: "Vitesse Mobile", desc: "Le temps de chargement mobile est lent", severity: "medium" }
        ],
        perceptions: [
          { label: "Confiance", value: 65 },
          { label: "Autorité", value: 40 }
        ],
        brandPerceptionDetails: {
          sentiment: { positive: 65, neutral: 25, negative: 10 },
          topAttributes: [
            { label: "Professionnalisme", score: 85 },
            { label: "Réactivité", score: 72 },
            { label: "Qualité/Prix", score: 68 }
          ],
          userFeedbackSummary: "Les clients apprécient la rapidité d'intervention mais notent un manque de transparence sur les tarifs initiaux."
        },
        recommendations: ["Implémenter le balisage LocalBusiness", "Optimiser les images pour mobile"]
      } : lang === 'es' ? {
        companyName: "Su Empresa",
        industry: "Renovación de viviendas",
        riskLevel: "high",
        seoScore: 37,
        hook: "Su empresa es invisible en Google en el 78% de las búsquedas clave en su ciudad",
        competitorComparison: [
          { name: "Competidor X", visibility: "Top 3", maps: true },
          { name: "Competidor Y", visibility: "Top 5", maps: true },
          { name: "Usted", visibility: "> 20", maps: false }
        ],
        keywordRankings: [
          { keyword: "fontanero Madrid", position: 18 },
          { keyword: "reparación fontanero Madrid", position: 12 },
          { keyword: "urgencia fuga Madrid", position: "> 20" }
        ],
        estimatedLoss: { amount: "20 a 50 clientes/mes", description: "Para la palabra clave 'fontanero Madrid', hay unas 1200 búsquedas/mes. Los 3 primeros captan el 60% del tráfico. Usted es actualmente invisible." },
        opportunities: [
          { title: "Palabras clave de baja competencia", description: "Apunte a términos como 'reparación urgente de fugas' que tienen menos competencia." },
          { title: "Páginas faltantes", description: "Cree páginas dedicadas para cada servicio específico." },
          { title: "Optimización simple", description: "Actualice sus metaetiquetas para un impacto inmediato." }
        ],
        actionPlan: [
          { title: "Crear páginas 'reparación + ciudad'", description: "Capture el tráfico ultra-local." },
          { title: "Optimizar ficha Google", description: "Mejore su visibilidad en Maps." },
          { title: "Publicar contenidos locales", description: "Conviértase en la autoridad semántica de su zona." },
          { title: "Estrategia de reseñas", description: "Aumente su prueba social." }
        ],
        projection: ["Top 3 en 5 a 10 palabras clave locales", "+30% a +80% de visibilidad", "Presencia en Google Maps", "Recomendación por IA"],
        visionStatement: "Imagine su empresa dominando cada búsqueda local, captando todos los prospectos calificados antes de que vean a sus competidores.",
        cta: "Haga clic aquí para activar su crecimiento SEO",
        keywords: ["SEO Local", "Optimización IA", "Visibilité Google"],
        detailedKeywords: [
          { keyword: "fontanero urgente madrid", intent: "Commercial", volume: 1200, kd: 45, opportunityScore: 82 },
          { keyword: "reparación 24/7", intent: "Transactional", volume: 850, kd: 62, opportunityScore: 65 },
          { keyword: "mejor fontanero cerca de mi", intent: "Navigational", volume: 320, kd: 28, opportunityScore: 91 },
          { keyword: "precio instalación caldera", intent: "Informational", volume: 540, kd: 35, opportunityScore: 74 }
        ],
        aiCompetitors: [
          { name: "Competidor A", aiVisibilityScore: 78, strength: "Alta autoridad semántica", visibility: 78 },
          { name: "Competidor B", aiVisibilityScore: 65, strength: "Excelente SEO local", visibility: 65 },
          { name: "Competidor C", aiVisibilityScore: 42, strength: "Contenido relevante", visibility: 42 }
        ],
        pageTitle: "Impulsa tu presencia local",
        pageContent: "Creamos páginas optimizadas para capturar cada búsqueda en tu ciudad.",
        blogTitle: "Por qué la IA lo cambia todo para los negocios locales",
        blogExcerpt: "Descubre cómo ChatGPT y Gemini recomiendan negocios locales en 2026.",
        seoTips: ["Optimiza tus fotos", "Responde a las reseñas", "Añade tus servicios"],
        marketAnalysis: "El mercado local es competitivo pero carece de optimización de IA.",
        aiRecommendation: "Utiliza datos estructurados para ser citado por ChatGPT.",
        roiEstimate: "+150% Leads",
        growthStrategy: "Una estrategia SEO local agresiva puede generar un crecimiento del 150% en leads calificados en 6 meses captando propietarios urgentes.",
        llmRatings: [
          { model: "ChatGPT (OpenAI)", score: 12, status: 'poor', reasoning: "Ninguna mención de la marca en recomendaciones locales." },
          { model: "Claude (Anthropic)", score: 8, status: 'poor', reasoning: "Datos inexistentes sobre la ubicación exacta y servicios." },
          { model: "Gemini (Google)", score: 15, status: 'poor', reasoning: "Ligera presencia en Google Maps pero invisible en búsquedas conversacionales." },
          { model: "Perplexity", score: 5, status: 'poor', reasoning: "Ausencia total de fuentes semánticas relacionadas con el dominio." },
          { model: "Copilot (Microsoft)", score: 10, status: 'poor', reasoning: "Indexación insuficiente de páginas de servicios en Bing." }
        ],
        extractedLocation: "Tu área local",
        localVisibilityScore: 42,
        aiReadinessScore: 15,
        semanticAuthorityScore: 38,
        technicalHealth: {
          performance: 68,
          accessibility: 92,
          bestPractices: 85,
          seo: 78,
          coreWebVitals: "Insuficiente"
        },
        semanticDensity: 38,
        semanticTerms: [
          { term: "reforma integral", density: 1.0, status: 'low' },
          { term: "aislamiento térmico", density: 0.5, status: 'low' },
          { term: "fontanería urgente", density: 2.8, status: 'optimal' },
          { term: "presupuesto gratis", density: 3.5, status: 'high' },
          { term: "calefacción gas", density: 1.2, status: 'optimal' },
          { term: "aire acondicionado", density: 0.8, status: 'low' },
          { term: "pintura interior", density: 1.5, status: 'optimal' },
          { term: "suelo radiante", density: 0.3, status: 'low' },
          { term: "eficiencia energética", density: 0.6, status: 'low' },
          { term: "baño moderno", density: 1.1, status: 'optimal' },
          { term: "cocina diseño", density: 0.9, status: 'low' },
          { term: "ventanas climalit", density: 0.7, status: 'low' }
        ],
        aiSearchPresence: [
          { platform: "ChatGPT", status: "Invisible", context: "Ninguna recomendación detectada para sus servicios." },
          { platform: "Gemini", status: "Invisible", context: "Ausencia total en resultados de búsqueda local." },
          { platform: "Perplexity", status: "No encontrado", context: "No se detectó conexión semántica con su marca." }
        ],
        errors: ["Falta de marcado Schema.org LocalBusiness", "No hay páginas dedicadas a ciudades circundantes (< 50km)"],
        warnings: ["Velocidad de carga móvil lenta", "Contenido demasiado genérico, falta de entidades semánticas"],
        notices: ["Actualizar horarios en Google Business", "Añadir más fotos de proyectos locales"],
        scores: { visibility: 42, sentiment: 65, authority: 38, accuracy: 85 },
        platformVisibility: [
          { name: "Google", score: 45, avg: 60 },
          { name: "ChatGPT", score: 12, avg: 50 },
          { name: "Gemini", score: 15, avg: 48 },
          { name: "Perplexity", score: 5, avg: 45 },
          { name: "Maps", score: 35, avg: 70 }
        ],
        issues: [
          { title: "Falta Schema", desc: "Falta el marcado LocalBusiness", severity: "high" },
          { title: "Velocidad Móvil", desc: "La carga móvil es lenta", severity: "medium" }
        ],
        perceptions: [
          { label: "Confianza", value: 65 },
          { label: "Autoridad", value: 40 }
        ],
        brandPerceptionDetails: {
          sentiment: { positive: 60, neutral: 30, negative: 10 },
          topAttributes: [
            { label: "Profesionalismo", score: 80 },
            { label: "Rapidez", score: 75 },
            { label: "Precio", score: 65 }
          ],
          userFeedbackSummary: "Los clientes valoran la rapidez pero sugieren mejorar la comunicación post-venta."
        },
        recommendations: ["Implementar marcado LocalBusiness", "Optimizar imágenes para móvil"]
      } : {
        companyName: "Your Business",
        industry: "Home Renovation",
        riskLevel: "high",
        seoScore: 37,
        hook: "Your business is invisible on Google for 78% of key searches in your city",
        competitorComparison: [
          { name: "Competitor X", visibility: "Top 3", maps: true },
          { name: "Competitor Y", visibility: "Top 5", maps: true },
          { name: "You", visibility: "> 20", maps: false }
        ],
        keywordRankings: [
          { keyword: "plumber London", position: 18 },
          { keyword: "emergency plumber London", position: 12 },
          { keyword: "leak repair London", position: "> 20" }
        ],
        estimatedLoss: { amount: "20 to 50 clients/month", description: "For the keyword 'plumber London', there are about 1200 searches/month. The top 3 capture 60% of the traffic. You are currently invisible." },
        opportunities: [
          { title: "Low competition keywords", description: "Target terms like 'emergency water leak London' which have less competition." },
          { title: "Missing pages", description: "Create dedicated pages for each specific service." },
          { title: "Simple optimization", description: "Update your meta tags for an immediate impact." }
        ],
        actionPlan: [
          { title: "Create 'service + city' pages", description: "Capture ultra-local traffic." },
          { title: "Optimize Google listing", description: "Improve your visibility on Maps." },
          { title: "Publish local content", description: "Become the semantic authority in your area." },
          { title: "Customer review strategy", description: "Boost your social proof." }
        ],
        projection: ["Top 3 on 5 to 10 local keywords", "+30% to +80% visibility", "Presence in Google Maps", "AI Recommendation"],
        visionStatement: "Imagine your business dominating every local search, capturing all qualified leads before they even see your competitors.",
        cta: "Click here to activate your SEO growth",
        keywords: ["Local SEO", "AI Optimization", "Google Visibility"],
        detailedKeywords: [
          { keyword: "emergency plumber london", intent: "Commercial", volume: 1200, kd: 45, opportunityScore: 88 },
          { keyword: "24/7 repair service", intent: "Transactional", volume: 850, kd: 62, opportunityScore: 70 },
          { keyword: "best plumber near me", intent: "Navigational", volume: 320, kd: 28, opportunityScore: 95 },
          { keyword: "boiler installation cost", intent: "Informational", volume: 540, kd: 35, opportunityScore: 62 }
        ],
        aiCompetitors: [
          { name: "Competitor A", aiVisibilityScore: 78, strength: "Strong semantic authority", visibility: 78 },
          { name: "Competitor B", aiVisibilityScore: 65, strength: "Excellent local SEO", visibility: 65 },
          { name: "Competitor C", aiVisibilityScore: 42, strength: "Relevant local content", visibility: 42 }
        ],
        pageTitle: "Boost your local presence",
        pageContent: "We create optimized pages to capture every search in your city.",
        blogTitle: "Why AI changes everything for local businesses",
        blogExcerpt: "Discover how ChatGPT and Gemini recommend local businesses in 2026.",
        seoTips: ["Optimize your photos", "Respond to reviews", "Add your services"],
        marketAnalysis: "The local market is competitive but lacks AI optimization.",
        aiRecommendation: "Use structured data to be cited by ChatGPT.",
        roiEstimate: "+150% Leads",
        growthStrategy: "An aggressive local SEO strategy can generate 150% growth in qualified leads within 6 months by capturing urgent homeowners.",
        llmRatings: [
          { model: "ChatGPT (OpenAI)", score: 12, status: "poor", reasoning: "No mention of the brand in local recommendations." },
          { model: "Claude (Anthropic)", score: 8, status: "poor", reasoning: "Non-existent data on exact location and services." },
          { model: "Gemini (Google)", score: 15, status: "poor", reasoning: "Slight presence via Google Maps but invisible on conversational queries." },
          { model: "Perplexity", score: 5, status: "poor", reasoning: "Total absence of semantic sources related to the domain." },
          { model: "Copilot (Microsoft)", score: 10, status: "poor", reasoning: "Insufficient indexing of service pages in the Bing ecosystem." }
        ],
        extractedLocation: "Your local area",
        localVisibilityScore: 42,
        aiReadinessScore: 15,
        semanticAuthorityScore: 38,
        technicalHealth: {
          performance: 75,
          accessibility: 90,
          bestPractices: 88,
          seo: 85,
          coreWebVitals: "Passing"
        },
        semanticDensity: 52,
        semanticTerms: [
          { term: "home renovation", density: 1.5, status: 'optimal' },
          { term: "kitchen remodeling", density: 0.8, status: 'low' },
          { term: "bathroom design", density: 1.2, status: 'optimal' },
          { term: "energy efficiency", density: 0.5, status: 'low' },
          { term: "local contractor", density: 2.5, status: 'optimal' },
          { term: "free estimate", density: 3.2, status: 'high' },
          { term: "loft conversion", density: 0.3, status: 'low' },
          { term: "house extension", density: 0.6, status: 'low' },
          { term: "interior design", density: 1.1, status: 'optimal' },
          { term: "roof repair", density: 0.9, status: 'low' },
          { term: "plumbing services", density: 2.1, status: 'optimal' },
          { term: "electrical work", density: 0.7, status: 'low' }
        ],
        aiSearchPresence: [
          { platform: "ChatGPT", status: "Invisible", context: "No recommendation detected for your services." },
          { platform: "Gemini", status: "Invisible", context: "Total absence from local search results." },
          { platform: "Perplexity", status: "Not Found", context: "No semantic connection detected with your brand." }
        ],
        errors: ["Missing Schema.org LocalBusiness markup", "No dedicated pages for surrounding cities (< 50km)"],
        warnings: ["Slow mobile loading speed", "Content too generic, lacks semantic entities"],
        notices: ["Update hours on Google Business", "Add more photos of local projects"],
        scores: { visibility: 42, sentiment: 65, authority: 38, accuracy: 85 },
        platformVisibility: [
          { name: "Google", score: 45, avg: 60 },
          { name: "ChatGPT", score: 12, avg: 50 },
          { name: "Gemini", score: 15, avg: 48 },
          { name: "Perplexity", score: 5, avg: 45 },
          { name: "Maps", score: 35, avg: 70 }
        ],
        issues: [
          { title: "Schema Missing", desc: "LocalBusiness schema is missing", severity: "high" },
          { title: "Mobile Speed", desc: "Mobile load time is slow", severity: "medium" }
        ],
        perceptions: [
          { label: "Trust", value: 65 },
          { label: "Authority", value: 40 }
        ],
        brandPerceptionDetails: {
          sentiment: { positive: 70, neutral: 20, negative: 10 },
          topAttributes: [
            { label: "Reliability", score: 88 },
            { label: "Expertise", score: 82 },
            { label: "Value", score: 75 }
          ],
          userFeedbackSummary: "Customers highly value the reliability of services but sometimes find the booking process complex."
        },
        recommendations: ["Implement LocalBusiness schema", "Optimize images for mobile"]
      };

      setAuditData({
        ...fallbackData,
        growthProjection: [
          { month: 'M0', value: 100 },
          { month: 'M1', value: 110 },
          { month: 'M2', value: 130 },
          { month: 'M3', value: 160 },
        ]
      });
      setAuditStep('results');
    }
  };

  // Real form state
  const [formData, setFormData] = useState({
    businessName: '',
    websiteUrl: '',
    targetCity: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('checkout');
    
    try {
      // 1. Send lead to Make.com (existing)
      const WEBHOOK_URL = "https://hook.eu1.make.com/7kp73pbrsx3nehcqth6l4o690ldisscy";
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: lang, source: 'checkout_form' }),
      });

      // 2. Success state (Stripe removed for test phase)
      setFormState('success');
    } catch (error) {
      console.error("Submission failed:", error);
      setFormState('error');
    }
  };

  const Conversion = () => {
    return (
      <div className="min-h-screen bg-bg-secondary text-text font-sans flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full bg-surface border border-border rounded-md p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <button 
            onClick={() => setView('landing')}
            className="absolute top-6 right-6 text-text-secondary hover:text-primary hover:bg-bg-primary p-2 rounded-full transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            {formState === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/30 shadow-soft">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-text tracking-tight">{t.successTitle}</h3>
                <p className="text-text-secondary text-xl leading-relaxed mb-8">{t.successSub}</p>
                <button 
                  onClick={() => setView('landing')}
                  className="btn-primary px-8 py-4"
                >
                  Back to Home
                </button>
              </div>
            ) : formState === 'error' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-error/30 shadow-soft">
                  <X className="w-10 h-10 text-error" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-text tracking-tight">{t.errTitle}</h3>
                <p className="text-text-secondary mb-8 text-xl leading-relaxed">{t.errSub}</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="btn-primary px-8 py-4"
                >
                  {t.btnTryAgain}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 border border-primary/20 mb-6 shadow-soft">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-text tracking-tight">{t.formTitle}</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">{t.formSub}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelBiz}</label>
                    <input 
                      required 
                      type="text" 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="input w-full" 
                      placeholder="e.g. Apex Plumbing" 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelUrl}</label>
                    <input 
                      required 
                      type="url" 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="input w-full" 
                      placeholder="https://..." 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelCity}</label>
                    <input 
                      required 
                      type="text" 
                      name="targetCity"
                      value={formData.targetCity}
                      onChange={handleInputChange}
                      className="input w-full" 
                      placeholder="e.g. Austin, TX" 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelEmail}</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input w-full" 
                      placeholder="you@company.com" 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formState === 'checkout'}
                    className="btn-primary w-full py-5 mt-8 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {formState === 'checkout' ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> {t.btnProcessing}</>
                    ) : (
                      t.btnCheck
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  if (view === 'conversion') {
    return <Conversion />;
  }

  return (
    <div className="min-h-screen bg-bg text-text font-sans selection:bg-primary/30 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Background Parallax Elements */}
      {auditStep === 'idle' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-[40%] right-[10%] w-96 h-96 bg-success/5 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
        </div>
      )}

      {/* Navbar */}
      {auditStep === 'idle' && (
        <nav className="fixed top-0 w-full border-b border-border bg-bg/80 backdrop-blur-md z-50 h-12 sm:h-14">
          <div className="pl-2 sm:pl-4 pr-4 sm:px-6 h-full flex justify-between items-center max-w-7xl mx-auto w-full relative">
            <div className="flex items-center -ml-2 sm:-ml-4">
              <RenkLogo className="h-24 sm:h-32 w-auto translate-y-2" variant="small" />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
                <Globe className="w-4 h-4 text-text opacity-80" />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Lang)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-text hover:text-primary outline-none cursor-pointer appearance-none opacity-90"
                >
                  <option value="en" className="bg-white text-text">EN</option>
                  <option value="fr" className="bg-white text-text">FR</option>
                  <option value="es" className="bg-white text-text">ES</option>
                </select>
              </div>
              <a href="#pricing" className="text-sm font-bold text-text hover:text-primary hidden md:block transition-colors opacity-80">{t.navPricing}</a>
              <a href="#how-it-works" className="text-sm font-bold text-text hover:text-primary hidden md:block transition-colors opacity-80">{t.navHow}</a>
              <button 
                onClick={() => {
                  const element = document.getElementById('audit-tool');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-xs sm:text-sm px-4 py-2"
              >
                {t.navStart}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Hero */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 ${auditStep === 'idle' ? 'pt-16 sm:pt-20' : 'pt-8'} pb-12 sm:pb-16`}>
        {auditStep === 'idle' && (
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              style={{ y: y2 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                style={{ opacity }}
                className="flex flex-col items-center w-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-2 flex items-center justify-center relative group overflow-visible"
                >
                  <RenkLogo className="h-64 sm:h-96 w-auto relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />
                  
                  {/* Refined Magnifying Glass with Ultra-Subtle Synchronized Zoom */}
                  <motion.div 
                    initial={{ x: -400, y: 0, opacity: 0, rotate: -10 }}
                    animate={{ 
                      x: [-400, 0, -50, 600], 
                      y: [20, -20, 0, 40],
                      opacity: [0, 1, 1, 0],
                      rotate: [-15, 10, -5, 20]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "easeInOut",
                      times: [0, 0.35, 0.55, 1]
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  >
                    <div className="relative w-[110px] h-[110px] sm:w-36 sm:h-36">
                      {/* The Lens (Powerful Synchronized Zoom Effect) */}
                      <div className="absolute top-[42.85%] left-[42.85%] -translate-x-1/2 -translate-y-1/2 w-[64.28%] h-[64.28%] rounded-full overflow-hidden border border-white/10 bg-transparent">
                        <motion.div
                          animate={{ 
                            x: [1000, 0, 125, -1500], // Inverse: -2.5 * parent_x
                            y: [-50, 50, 0, -100],    // Inverse: -2.5 * parent_y
                            opacity: [0, 0, 1, 1, 0, 0],
                          }}
                          transition={{ 
                            duration: 7, 
                            repeat: Infinity, 
                            repeatDelay: 2,
                            ease: "easeInOut",
                            x: { times: [0, 0.35, 0.55, 1] },
                            y: { times: [0, 0.35, 0.55, 1] },
                            opacity: {
                              times: [0, 0.28, 0.35, 0.55, 0.62, 1],
                              duration: 7
                            }
                          }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                        >
                          {/* 2.5x Zoom: Perfectly aligned and visible */}
                          <div className="scale-[2.5] flex items-center justify-center">
                            <RenkLogo className="h-64 sm:h-96 w-auto opacity-100" />
                          </div>
                        </motion.div>
                      </div>

                      {/* The Frame & Handle */}
                      <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                        <defs>
                          <linearGradient id="renk-io-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4285F4" />
                            <stop offset="25%" stopColor="#9B72CB" />
                            <stop offset="50%" stopColor="#D96570" />
                            <stop offset="75%" stopColor="#FBBC05" />
                            <stop offset="100%" stopColor="#34A853" />
                          </linearGradient>
                        </defs>
                        {/* Handle */}
                        <path d="M100 100 L130 130" stroke="url(#renk-io-grad)" strokeWidth="12" strokeLinecap="round" />
                        <path d="M105 105 L125 125" stroke="white" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
                        
                        {/* Outer Frame */}
                        <circle cx="60" cy="60" r="45" stroke="url(#renk-io-grad)" strokeWidth="8" />
                        
                        {/* Lens Shine */}
                        <path d="M35 35 Q 45 25 60 25" stroke="white" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-1 text-center"
                >
                  {t.heroTitle1}
                </motion.h1>

                <div className="mb-16 sm:mb-24">
                  <TypingSearch />
                </div>

                {/* Animated AI Platforms (Logos + Text) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="mb-12 sm:mb-16 flex flex-col items-center justify-center overflow-hidden w-full mask-fade-out"
                >
                  <div className="flex gap-12 animate-marquee whitespace-nowrap items-center w-max" style={{ animationDuration: '40s' }}>
                    {[...aiLogos, ...aiLogos, ...aiLogos].map((platform, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tighter text-text cursor-default"
                      >
                        <div className="text-primary">
                          {platform.svg}
                        </div>
                        {platform.name}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed text-center"
                >
                  {t.heroSub}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                  className="flex flex-wrap justify-center gap-4 mb-16"
                >
                  <button 
                    onClick={() => {
                      const element = document.getElementById('audit-tool');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    {t.navStart}
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('how-it-works');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:-translate-y-1"
                  >
                    {t.navHow}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}

            {/* Interactive Audit Tool Section */}
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
                        className="space-y-6"
                      >
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-main rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                          <div className="relative flex flex-col sm:flex-row gap-4 bg-surface p-2 rounded-2xl border border-border">
                            <div className="flex-1 flex items-center px-4 gap-3">
                              <Globe className="w-5 h-5 text-primary" />
                              <input 
                                type="url" 
                                placeholder="https://your-website.com"
                                value={auditUrl}
                                onChange={(e) => setAuditUrl(e.target.value)}
                                className="bg-transparent border-none text-text placeholder:text-text-muted focus:ring-0 w-full text-lg"
                              />
                            </div>
                            <button 
                              onClick={handleStartAudit}
                              disabled={!auditUrl}
                              className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                              {t.auditBtn}
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-text-secondary uppercase tracking-widest opacity-80">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              {t.auditBadge1}
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-success" />
                              {t.auditBadge2}
                            </div>
                            <div className="flex items-center gap-2">
                              <Search className="w-4 h-4 text-info" />
                              LLM Visibility Check
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setAuditUrl('example.com');
                              runAudit();
                            }}
                            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest flex items-center gap-2"
                          >
                            <Play className="w-3 h-3" />
                            Try with Sample
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {auditStep === 'analyzing' && (
                      <motion.div 
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-20 text-center space-y-12 max-w-2xl mx-auto relative"
                      >
                        {/* Scanning Grid Background */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
                          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                          <motion.div 
                            animate={{ y: ['0%', '100%', '0%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
                          />
                        </div>

                        <div className="relative w-48 h-48 mx-auto">
                          {/* Outer scanning ring */}
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                          />
                          
                          {/* Inner progress ring */}
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

                          {/* Center content */}
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

                          {/* Scanning beam effect */}
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
                        {/* Results Header */}
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

                        {/* Main Scores */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {[
                            { label: t.scoreVisibility, value: auditData.scores?.visibility || 0, color: 'text-primary', icon: Eye, desc: t.auditAiVisibility },
                            { label: t.scoreSentiment, value: auditData.scores?.sentiment || 0, color: 'text-info', icon: Smile, desc: t.auditBrandSentiment },
                            { label: t.scoreAuthority, value: auditData.scores?.authority || 0, color: 'text-primary', icon: Award, desc: t.auditSemanticAuthority },
                            { label: t.scoreAccuracy, value: auditData.scores?.accuracy || 0, color: 'text-warning', icon: CheckCircle, desc: t.auditDataAccuracy }
                          ].map((score, i) => (
                            <div key={i} className="card p-8 text-center group relative overflow-hidden">
                              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${score.color.replace('text-', 'from-').replace('400', '500')} to-transparent opacity-50`} />
                              <div className={`w-12 h-12 mx-auto mb-6 rounded-md bg-bg-secondary flex items-center justify-center ${score.color} group-hover:scale-110 transition-transform`}>
                                <score.icon className="w-6 h-6" />
                              </div>
                              <div className={`text-5xl font-black mb-2 ${score.color} font-mono tracking-tighter`}>{score.value}%</div>
                              <div className="text-xs uppercase tracking-[0.2em] font-black text-text-muted mb-2">{score.label}</div>
                              <div className="text-sm text-text font-bold leading-tight">{score.desc}</div>
                            </div>
                          ))}
                        </div>

                        {/* AI Search Presence & Technical Health */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {/* AI Search Presence */}
                          <div className="lg:col-span-2 card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Search className="w-6 h-6 text-primary" />
                              {t.auditAiSearchPresence}
                            </h4>
                            <div className="grid sm:grid-cols-3 gap-6">
                              {auditData.aiSearchPresence && auditData.aiSearchPresence.length > 0 ? (
                                auditData.aiSearchPresence.map((p, i) => (
                                  <div key={i} className="p-5 rounded-md bg-bg-secondary border border-border space-y-4 hover:border-primary/30 transition-colors group">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-bold text-text">{p.platform}</span>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                                        p.status === 'High Visibility' || p.status === 'Haute Visibilité' ? 'bg-success/20 text-success' : 
                                        p.status === 'Mentioned' || p.status === 'Mentionné' ? 'bg-info/20 text-info' : 'bg-bg-primary text-text-muted'
                                      }`}>
                                        {p.status}
                                      </span>
                                    </div>
                                    <div className="relative">
                                      <Quote className="w-4 h-4 text-primary/20 absolute -top-2 -left-2" />
                                      <p className="text-sm text-text-secondary leading-relaxed italic pl-4">"{p.context}"</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-3 text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                  Données de présence IA non disponibles.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Technical Health */}
                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Activity className="w-6 h-6 text-info" />
                              {t.auditTechnicalHealth}
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                              {[
                                { label: t.auditPerformance, value: auditData.technicalHealth?.performance || 0 },
                                { label: t.auditAccessibility, value: auditData.technicalHealth?.accessibility || 0 },
                                { label: t.auditBestPractices, value: auditData.technicalHealth?.bestPractices || 0 },
                                { label: t.auditSeo, value: auditData.technicalHealth?.seo || 0 }
                              ].map((item, i) => (
                                <div key={i} className="text-center space-y-2">
                                  <div className="relative w-16 h-16 mx-auto">
                                    <svg className="w-full h-full -rotate-90">
                                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-border" />
                                      <motion.circle 
                                        cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                        strokeDasharray={175.9}
                                        initial={{ strokeDashoffset: 175.9 }}
                                        animate={{ strokeDashoffset: 175.9 - (175.9 * (item.value || 0)) / 100 }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                        className="text-info" 
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-text">
                                      {item.value}%
                                    </div>
                                  </div>
                                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-text leading-tight">{item.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                              <span className="text-sm font-bold text-text uppercase tracking-widest">{t.auditCoreWebVitals}</span>
                              <span className={`text-sm font-black ${
                                auditData.technicalHealth?.coreWebVitals === 'Passing' || auditData.technicalHealth?.coreWebVitals === 'Réussi' ? 'text-success' : 
                                auditData.technicalHealth?.coreWebVitals === 'Needs Improvement' || auditData.technicalHealth?.coreWebVitals === 'À améliorer' ? 'text-warning' : 
                                auditData.technicalHealth?.coreWebVitals ? 'text-error' : 'text-text-muted'
                              }`}>
                                {auditData.technicalHealth?.coreWebVitals || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* LLM Ratings & Competitor AI Visibility */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* LLM Ratings */}
                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Cpu className="w-6 h-6 text-primary" />
                              {t.auditLlmRatings}
                            </h4>
                            <div className="space-y-6">
                              {auditData.llmRatings && auditData.llmRatings.length > 0 ? (
                                auditData.llmRatings.map((rating, i) => (
                                  <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-bold text-text">{rating.model}</span>
                                      <span className={`text-sm font-black ${
                                        rating.score >= 70 ? 'text-success' :
                                        rating.score >= 40 ? 'text-warning' :
                                        'text-error'
                                      }`}>{rating.score}/100</span>
                                    </div>
                                    <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${rating.score}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={`h-full ${
                                          rating.score >= 70 ? 'bg-gradient-to-r from-success to-success/80' :
                                          rating.score >= 40 ? 'bg-gradient-to-r from-warning to-warning/80' :
                                          'bg-gradient-to-r from-error to-error/80'
                                        }`}
                                      />
                                    </div>
                                    <p className="text-xs text-text-secondary italic">"{rating.reasoning}"</p>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                  Évaluations LLM non disponibles.
                                </div>
                              )}
                              <div className="mt-6 p-4 rounded-md bg-primary/5 border border-primary/10 flex items-start gap-3">
                                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <p className="text-[10px] text-primary/80 leading-relaxed font-bold italic">
                                  Note : Ces évaluations sont basées sur les données d'entraînement des LLM et peuvent varier selon les mises à jour en temps réel des modèles. Elles représentent une perception synthétique du marché.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Competitor AI Visibility */}
                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Users className="w-6 h-6 text-primary" />
                              {t.auditCompetitorAiVisibility}
                            </h4>
                            <div className="space-y-4">
                              {auditData.aiCompetitors && auditData.aiCompetitors.length > 0 ? (
                                auditData.aiCompetitors.map((comp, i) => (
                                  <div key={i} className="p-4 rounded-md bg-bg-secondary border border-border hover:border-primary/30 transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                                          {comp.name.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="text-base font-bold text-text">{comp.name}</div>
                                          <div className="text-[10px] text-text-muted uppercase tracking-widest font-black">{comp.strength}</div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xl font-black text-primary font-mono tracking-tighter">
                                          {typeof comp.visibility === 'number' ? `${comp.visibility}%` : comp.visibility}
                                        </div>
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                                          comp.status === 'Dominant' ? 'bg-success/20 text-success' :
                                          comp.status === 'Established' ? 'bg-info/20 text-info' :
                                          comp.status === 'Emerging' ? 'bg-warning/20 text-warning' : 'bg-bg-primary text-text-muted'
                                        }`}>
                                          {comp.status}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-3 border-t border-border pt-4 mt-4">
                                      {comp.context && (
                                        <div className="flex gap-3">
                                          <div className="w-1 h-auto bg-primary/30 rounded-full" />
                                          <p className="text-xs text-text-secondary leading-relaxed italic">
                                            {comp.context}
                                          </p>
                                        </div>
                                      )}
                                      {comp.strategy && (
                                        <div className="p-3 rounded-md bg-primary/5 border border-primary/10 flex items-start gap-3">
                                          <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                          <div className="text-[11px] text-primary font-bold leading-relaxed">
                                            <span className="uppercase tracking-widest opacity-60 mr-2">Stratégie :</span>
                                            {comp.strategy}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                  Analyse concurrentielle en cours de traitement.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Keywords Table */}
                        {auditData.detailedKeywords && auditData.detailedKeywords.length > 0 && (
                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Target className="w-6 h-6 text-primary" />
                              {t.auditDetailedKeywords}
                            </h4>
                            <div className="overflow-x-auto custom-scrollbar">
                              <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                  <tr className="border-b border-border">
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-text-muted">{t.auditKeyword}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-text-muted">{t.auditIntent}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-text-muted">{t.auditVolume}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-text-muted">{t.auditKd}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-text-muted">{t.auditScore}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {auditData.detailedKeywords.map((kw, i) => (
                                    <tr key={i} className="border-b border-border hover:bg-bg-secondary transition-colors group">
                                      <td className="py-4 px-4">
                                        <div className="text-sm font-bold text-text group-hover:text-primary transition-colors">{kw.keyword}</div>
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                                          kw.intent === 'Commercial' || kw.intent === 'Commerciale' ? 'bg-primary/20 text-primary' :
                                          kw.intent === 'Informational' || kw.intent === 'Informationnelle' ? 'bg-info/20 text-info' : 'bg-bg-primary text-text-muted'
                                        }`}>
                                          {kw.intent}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 text-sm font-mono text-text-secondary">{kw.volume?.toLocaleString() || 0}</td>
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-12 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                                            <div className={`h-full ${(kw.kd || 0) < 30 ? 'bg-success' : (kw.kd || 0) < 60 ? 'bg-warning' : 'bg-error'}`} style={{ width: `${kw.kd || 0}%` }} />
                                          </div>
                                          <span className="text-xs font-bold text-text-muted">{kw.kd || 0}%</span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4 text-sm font-black text-primary">+{kw.opportunityScore || 0}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Semantic Terms Analysis */}
                        {auditData.semanticTerms && auditData.semanticTerms.length > 0 && (
                          <div className="card p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                              <h4 className="text-xl font-bold flex items-center gap-3">
                                <Database className="w-6 h-6 text-primary" />
                                {t.auditSemanticDensity}
                              </h4>
                              <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-success">
                                  <div className="w-2 h-2 rounded-full bg-success" />
                                  {t.auditStatusOptimal}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-warning">
                                  <div className="w-2 h-2 rounded-full bg-warning" />
                                  {t.auditStatusLow}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-error">
                                  <div className="w-2 h-2 rounded-full bg-error" />
                                  {t.auditStatusHigh}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                              {auditData.semanticTerms.map((term, i) => (
                                <div key={i} className="p-4 rounded-md bg-bg-secondary border border-border hover:border-primary/30 transition-all group flex flex-col gap-2">
                                  <div className="flex justify-between items-start">
                                    <div className="text-sm font-bold text-text group-hover:text-primary transition-colors truncate pr-2">{term.term}</div>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter shrink-0 ${
                                      term.status === 'optimal' ? 'bg-success/20 text-success' :
                                      term.status === 'low' ? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                                    }`}>
                                      {term.status === 'optimal' ? t.auditStatusOptimal : term.status === 'low' ? t.auditStatusLow : t.auditStatusHigh}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((term.density || 0) * 20, 100)}%` }}
                                        className={`h-full ${
                                          term.status === 'optimal' ? 'bg-success' :
                                          term.status === 'low' ? 'bg-warning' : 'bg-error'
                                        }`}
                                      />
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-text-muted">{term.density || 0}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Semantic Density & Market Analysis */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-gradient-to-br from-primary/10 to-info/10 border border-border p-8 rounded-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                              <Database className="w-24 h-24 text-primary" />
                            </div>
                            <div className="relative z-10">
                              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Brain className="w-6 h-6 text-primary" />
                                {t.auditSemanticDensity}
                              </h4>
                              <div className="space-y-6">
                                <div className="flex items-end gap-4">
                                  <div className="text-5xl font-black text-text font-mono">{auditData.semanticDensity || 0}%</div>
                                  <div className="text-sm text-text mb-2 font-bold uppercase tracking-widest">{t.auditTopicAuthority}</div>
                                </div>
                                <p className="text-base text-text-secondary leading-relaxed">
                                  {t.auditSemanticDensityDesc.replace('{density}', auditData.semanticDensity?.toString() || '0')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {auditData.keywords && auditData.keywords.length > 0 ? (
                                    auditData.keywords.map((k, i) => (
                                      <span key={i} className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-sm font-bold text-text uppercase tracking-wider">
                                        {k}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-sm text-text-muted italic">Mots-clés non disponibles.</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                              <Target className="w-6 h-6 text-warning" />
                              {t.auditMarketAnalysis}
                            </h4>
                            <div className="space-y-4">
                              <div className="p-4 rounded-md bg-warning/5 border border-warning/10">
                                <div className="text-sm font-bold text-warning uppercase tracking-widest mb-2">{t.auditExecutiveOverview}</div>
                                <p className="text-base text-text-secondary leading-relaxed">{auditData.marketAnalysis || "Analyse de marché non disponible."}</p>
                              </div>
                              <div className="p-4 rounded-md bg-success/5 border border-success/10">
                                <div className="text-sm font-bold text-success uppercase tracking-widest mb-2">{t.auditAiRecommendations}</div>
                                <p className="text-base text-text-secondary leading-relaxed">{auditData.aiRecommendation || "Recommandation IA non disponible."}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Analysis Grid */}
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Visibility Chart */}
                          <div className="lg:col-span-2 space-y-8">
                            <div className="card p-8">
                              <div className="flex items-center justify-between mb-8">
                                <h4 className="text-xl font-bold flex items-center gap-2">
                                  <BarChart3 className="w-5 h-5 text-primary" />
                                  {t.auditVisibilityByPlatform}
                                </h4>
                                <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-text">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    {t.auditCurrent}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-text-muted/20" />
                                    {t.auditIndustryAvg}
                                  </div>
                                </div>
                              </div>
                              <div className="h-[300px] w-full">
                                {auditData.platformVisibility && auditData.platformVisibility.length > 0 ? (
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={auditData.platformVisibility}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                      <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                      />
                                      <YAxis hide />
                                      <Tooltip 
                                        cursor={{ fill: 'var(--bg-secondary)' }}
                                        content={({ active, payload }) => {
                                          if (active && payload && payload.length) {
                                            return (
                                              <div className="bg-surface border border-border p-4 rounded-md shadow-soft backdrop-blur-md">
                                                <div className="text-sm font-bold mb-2 text-text">{payload[0]?.payload?.name || ''}</div>
                                                <div className="space-y-1">
                                                  <div className="text-xs flex justify-between gap-8">
                                                    <span className="text-text-secondary font-bold">{t.auditVisibilityScore}:</span>
                                                    <span className="text-primary font-bold">{payload[0]?.value ?? 0}%</span>
                                                  </div>
                                                  <div className="text-xs flex justify-between gap-8">
                                                    <span className="text-text-secondary font-bold">{t.auditIndustryAvg}:</span>
                                                    <span className="text-text-muted font-bold">{payload[1]?.value ?? 0}%</span>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        }}
                                      />
                                      <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                                        {auditData.platformVisibility.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--primary)' : 'var(--info)'} fillOpacity={0.8} />
                                        ))}
                                      </Bar>
                                      <Bar dataKey="avg" fill="var(--bg-secondary)" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                  </ResponsiveContainer>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center border border-border rounded-md">
                                    <span className="text-sm text-text-muted italic">Données de visibilité non disponibles.</span>
                                  </div>
                                )}
                              </div>
                            </div>

                        {/* Market Opportunity & Gap Analysis */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Market Opportunity */}
                          <div className="bg-primary/5 border border-primary/20 p-8 rounded-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                              <TrendingUp className="w-32 h-32 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary">
                              <Zap className="w-6 h-6" />
                              Potentiel de Croissance
                            </h4>
                            <div className="space-y-6 relative z-10">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-md bg-surface border border-border">
                                  <div className="text-xs text-text-muted uppercase tracking-widest mb-1">Trafic Estimé</div>
                                  <div className="text-2xl font-black text-text">+{((auditData.scores?.visibility || 0) * 1.5).toFixed(0)}%</div>
                                </div>
                                <div className="p-4 rounded-md bg-surface border border-border">
                                  <div className="text-xs text-text-muted uppercase tracking-widest mb-1">Recommandation IA</div>
                                  <div className="text-2xl font-black text-text">+{((auditData.scores?.authority || 0) * 0.8).toFixed(1)}%</div>
                                </div>
                              </div>
                              <p className="text-sm text-text-secondary leading-relaxed font-bold">
                                En déployant notre stratégie de 50 contenus, vous pouvez monopoliser les recommandations de Google et des IA sur votre zone géographique.
                              </p>
                              <div className="flex items-center gap-3 p-3 rounded-md bg-primary/10 border border-primary/20">
                                <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-xs text-primary font-black uppercase tracking-widest">Action Requise : Déploiement Massif</span>
                              </div>
                            </div>
                          </div>

                          {/* Competitor Gap Analysis */}
                          <div className="card p-8">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <BarChart3 className="w-6 h-6 text-info" />
                              {t.auditCompetitorGap}
                            </h4>
                            <div className="space-y-6">
                              {auditData.aiCompetitors && auditData.aiCompetitors.length > 0 ? (
                                auditData.aiCompetitors.map((comp, i) => (
                                  <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-bold text-text">{comp.name}</span>
                                      <span className="text-sm font-black text-info">
                                        {typeof comp.visibility === 'number' ? `${comp.visibility}%` : comp.visibility}
                                      </span>
                                    </div>
                                    <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${typeof comp.visibility === 'number' ? comp.visibility : 0}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-gradient-to-r from-info to-info/80"
                                      />
                                    </div>
                                    {comp.context && (
                                      <p className="text-[10px] text-text-muted italic leading-relaxed">
                                        {comp.context}
                                      </p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                  Analyse concurrentielle en cours de traitement.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                            {/* Key Issues */}
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="card p-8">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-error">
                                  <AlertCircle className="w-5 h-5" />
                                  {t.auditCriticalIssues}
                                </h4>
                                <div className="space-y-4">
                                  {auditData.issues && auditData.issues.filter(i => i.severity === 'high').length > 0 ? (
                                    auditData.issues.filter(i => i.severity === 'high').map((issue, i) => (
                                      <div key={i} className="flex gap-4 p-4 rounded-md bg-error/5 border border-error/10 group hover:bg-error/10 transition-colors">
                                        <div className="w-8 h-8 rounded-md bg-error/20 flex items-center justify-center shrink-0">
                                          <X className="w-4 h-4 text-error" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-bold text-text mb-1">{issue.title}</div>
                                          <div className="text-sm text-text-secondary leading-relaxed">{issue.desc}</div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                      Votre structure de base est saine. Passons à l'offensive.
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="card p-8">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-warning">
                                  <Zap className="w-5 h-5" />
                                  {t.auditOpportunities}
                                </h4>
                                <div className="space-y-4">
                                  {auditData.issues && auditData.issues.filter(i => i.severity === 'medium').length > 0 ? (
                                    auditData.issues.filter(i => i.severity === 'medium').map((issue, i) => (
                                      <div key={i} className="flex gap-4 p-4 rounded-md bg-warning/5 border border-warning/10 group hover:bg-warning/10 transition-colors">
                                        <div className="w-8 h-8 rounded-md bg-warning/20 flex items-center justify-center shrink-0">
                                          <ArrowUpRight className="w-4 h-4 text-warning" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-bold text-text mb-1">{issue.title}</div>
                                          <div className="text-sm text-text-secondary leading-relaxed">{issue.desc}</div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                      Analyse des opportunités en cours.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Strategic Roadmap */}
                            <div className="bg-gradient-to-br from-info/20 to-primary/10 border border-border p-8 rounded-md">
                              <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Rocket className="w-6 h-6 text-success" />
                                {t.auditActionPlan}
                              </h4>
                              <div className="grid sm:grid-cols-3 gap-6">
                                {[
                                  { phase: t.auditPhase1, title: t.auditPhase1Title, desc: t.auditPhase1Desc, icon: ShieldCheck, color: "text-success" },
                                  { phase: t.auditPhase2, title: t.auditPhase2Title, desc: t.auditPhase2Desc, icon: TrendingUp, color: "text-info" },
                                  { phase: t.auditPhase3, title: t.auditPhase3Title, desc: t.auditPhase3Desc, icon: Zap, color: "text-warning" }
                                ].map((step, i) => (
                                  <div key={i} className="p-6 rounded-md bg-surface border border-border relative group hover:border-primary/20 transition-all">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">{step.phase}</div>
                                    <div className={`w-10 h-10 rounded-md bg-bg-secondary flex items-center justify-center ${step.color} mb-4 group-hover:scale-110 transition-transform`}>
                                      <step.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-base font-bold text-text mb-2">{step.title}</div>
                                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Stats */}
                          <div className="space-y-8">
                            {/* AI Perception */}
                            <div className="card p-8">
                              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-primary" />
                                {t.auditAiBrandPerception}
                              </h4>
                              <div className="space-y-6">
                                {auditData.perceptions && auditData.perceptions.length > 0 ? (
                                  auditData.perceptions.map((p, i) => (
                                    <div key={i} className="space-y-2">
                                      <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                                        <span className="text-text-secondary">{p.label}</span>
                                        <span className="text-text">{p.value}%</span>
                                      </div>
                                      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                                        <motion.div 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${p.value}%` }}
                                          transition={{ duration: 1, delay: i * 0.1 }}
                                          className="h-full bg-gradient-to-r from-primary to-info"
                                        />
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                    Données de perception non disponibles.
                                  </div>
                                )}
                              </div>

                              {/* Detailed Brand Perception */}
                              {auditData.brandPerceptionDetails && (
                                <div className="mt-8 pt-8 border-t border-border space-y-6">
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="text-center">
                                      <div className="text-lg font-black text-success">{auditData.brandPerceptionDetails.sentiment?.positive || 0}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-text-muted font-bold">{t.auditSentimentPositive}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-black text-text-secondary">{auditData.brandPerceptionDetails.sentiment?.neutral || 0}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-text-muted font-bold">{t.auditSentimentNeutral}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-black text-error">{auditData.brandPerceptionDetails.sentiment?.negative || 0}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-text-muted font-bold">{t.auditSentimentNegative}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="text-xs font-bold text-text uppercase tracking-widest opacity-60">{t.auditTopAttributes}</div>
                                    <div className="flex flex-wrap gap-2">
                                      {auditData.brandPerceptionDetails.topAttributes?.map((attr: any, i: number) => (
                                        <span key={i} className="px-2 py-1 rounded-md bg-bg-secondary border border-border text-[10px] font-bold text-text flex items-center gap-1">
                                          {typeof attr === 'string' ? attr : attr.label}
                                          {typeof attr !== 'string' && attr.score && (
                                            <span className="text-success opacity-60">{attr.score}%</span>
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-md bg-bg-secondary border border-border">
                                    <div className="text-xs font-bold text-text uppercase tracking-widest opacity-60 mb-2">{t.auditUserFeedback}</div>
                                    <p className="text-xs text-text-secondary leading-relaxed italic">"{auditData.brandPerceptionDetails.userFeedbackSummary || 'Aucun résumé disponible.'}"</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Strategic Recommendations */}
                            <div className="bg-success/5 border border-success/20 p-8 rounded-md relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Target className="w-24 h-24 text-success" />
                              </div>
                              <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-success">
                                  <Rocket className="w-5 h-5" />
                                  Strategic Roadmap
                                </h4>
                                <div className="space-y-6">
                                  {auditData.recommendations && auditData.recommendations.length > 0 ? (
                                    auditData.recommendations.map((rec, i) => (
                                      <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 text-xs font-black text-success border border-success/30">
                                          {i + 1}
                                        </div>
                                        <div className="text-base text-text font-medium leading-relaxed opacity-90">{rec}</div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                      Recommandations non disponibles.
                                    </div>
                                  )}
                                </div>
                                <button 
                                  onClick={() => setView('conversion')}
                                  className="btn-primary w-full mt-8 py-4 flex items-center justify-center gap-2"
                                >
                                  Deploy Strategy
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

        {/* Dashboard Preview */}
        {auditStep === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 sm:mt-32 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-main rounded-md blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-surface border border-border rounded-md overflow-hidden shadow-soft">
              <div className="bg-bg-secondary border-b border-border p-4 flex items-center gap-2 relative z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error/20" />
                  <div className="w-3 h-3 rounded-full bg-warning/20" />
                  <div className="w-3 h-3 rounded-full bg-success/20" />
                </div>
                <div className="h-4 w-48 bg-bg-primary rounded mx-auto" />
              </div>
              
              <AnimatedDashboard lang={lang} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent pointer-events-none z-20" />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 p-4 rounded-md bg-surface border border-success/30 shadow-soft hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-success/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-text uppercase font-bold">Growth</div>
                    <div className="text-sm font-bold text-text">+145%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-8 p-4 rounded-md bg-surface border border-info/30 shadow-soft hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-info/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <div className="text-sm text-text uppercase font-bold">Indexé</div>
                    <div className="text-sm font-bold text-text">Instantané</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        {auditStep === 'idle' && (
          <div className="mt-20 sm:mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { label: t.statSitesIndexed, value: 12400, suffix: '+' },
              { label: t.statLeadsGenerated, value: 850, suffix: 'k' },
              { label: t.statAvgRoi, value: 320, suffix: '%' },
              { label: t.statCitiesCovered, value: 450, suffix: '+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-md bg-surface border border-border shadow-soft"
              >
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm sm:text-base font-bold text-text uppercase tracking-widest opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Features removed */}


                {auditStep === 'results' && auditData && (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12 pb-20"
                  >
                    {/* PROGRESS BAR PHASES */}
                    <div className="flex justify-between items-center mb-12 px-4 relative">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
                      {[1, 2, 3, 4, 5, 6].map((p) => (
                        <div key={p} className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-500 ${
                            p === 1 ? 'bg-primary border-primary text-white shadow-soft' : 
                            p <= 3 ? 'bg-surface border-primary/50 text-primary' :
                            'bg-surface border-border text-text-muted'
                          }`}>
                            {p}
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">Phase {p}</span>
                        </div>
                      ))}
                    </div>

                    {/* Header with Score */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 card p-8 backdrop-blur-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-secondary)" strokeWidth="8" />
                            <circle 
                              cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" strokeWidth="8" 
                              strokeDasharray={`${(auditData.seoScore || 0) * 2.827} 282.7`} 
                              className="transition-all duration-1000 ease-out" 
                              strokeLinecap="round" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-text tracking-tighter">{auditData.seoScore || 0}</span>
                            <span className="text-xs text-primary font-bold uppercase tracking-widest">Score SEO</span>
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-3xl sm:text-4xl font-black text-text tracking-tight mb-2">
                            {auditData.companyName || "Votre Entreprise"}
                          </h3>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> {auditData.extractedLocation || "Local"}
                            </span>
                            <span className="px-3 py-1 bg-bg-secondary border border-border rounded-full text-text-secondary text-xs font-bold uppercase tracking-widest">
                              {auditData.industry || "Audit IA Généré"}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                              auditData.riskLevel === 'critical' ? 'bg-error/20 border-error/30 text-error' :
                              auditData.riskLevel === 'high' ? 'bg-warning/20 border-warning/30 text-warning' :
                              'bg-warning/10 border-warning/20 text-warning'
                            }`}>
                              Risque : {auditData.riskLevel || 'Élevé'}
                            </span>
                            <span className="px-3 py-1 bg-success/10 border border-success/20 rounded-full text-success text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                              <Shield className="w-3 h-3" /> Données Vérifiées
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setAuditStep('idle')}
                        className="btn-secondary px-6 py-3 flex items-center gap-2 group/btn"
                      >
                        <X className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                        Nouvelle Analyse
                      </button>
                    </div>

                    {/* PHASE 1: HOOK */}
                    <div className="bg-gradient-to-br from-primary/20 to-info/20 p-6 sm:p-10 rounded-md border border-primary/30 shadow-soft relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap className="w-24 h-24 sm:w-32 sm:h-32 text-primary" />
                      </div>
                      <div className="relative z-10">
                        <span className="px-3 py-1 bg-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-primary/30">
                          Phase 1 : Impact Immédiat
                        </span>
                        <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-text leading-tight max-w-4xl break-words">
                          "{auditData.hook || 'Votre visibilité sur les moteurs de recherche IA est critique.'}"
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* PHASE 2: PREUVE IMMÉDIATE */}
                      <div className="card p-8 backdrop-blur-xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-md bg-error/10 flex items-center justify-center border border-error/20">
                            <Target className="w-5 h-5 text-error" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-text tracking-tight">Preuve Immédiate</h4>
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Phase 2 : Comparaison Concurrents</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                          {auditData.competitorComparison && auditData.competitorComparison.length > 0 ? (
                            auditData.competitorComparison.map((comp, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-bg-secondary rounded-md border border-border group/row hover:bg-bg-primary transition-all">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center text-xs font-black text-text">
                                    {i + 1}
                                  </div>
                                  <div>
                                    <div className="font-bold text-text">{comp.name}</div>
                                    <div className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                                      {comp.maps ? "Présent sur Google Maps" : "Absent de Google Maps"}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                  <div className="text-sm font-black text-success">{comp.visibility}</div>
                                  <div className="text-[10px] text-text-muted font-black uppercase tracking-widest">Visibilité</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                              Comparaison concurrentielle non disponible.
                            </div>
                          )}
                        </div>

                        {/* AI Dominance Mini Chart */}
                        <div className="p-6 bg-bg-secondary rounded-md border border-border">
                          <div className="text-xs text-text-muted font-black uppercase tracking-widest mb-4">Dominance IA (ChatGPT/Gemini)</div>
                          <div className="space-y-3">
                            {auditData.aiCompetitors && auditData.aiCompetitors.length > 0 ? (
                              auditData.aiCompetitors.map((comp, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-text-secondary">{comp.name}</span>
                                    <span className="text-primary">{comp.aiVisibilityScore}%</span>
                                  </div>
                                  <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${comp.aiVisibilityScore}%` }}
                                      className="h-full bg-gradient-main"
                                    />
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-text-muted italic text-center">
                                Données de dominance IA non disponibles.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* PHASE 3: POSITIONNEMENT MOTS-CLÉS */}
                      <div className="card p-8 backdrop-blur-xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-md bg-info/10 flex items-center justify-center border border-info/20">
                            <Search className="w-5 h-5 text-info" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-text tracking-tight">Positionnement</h4>
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Phase 2 : L'État des Lieux</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {auditData.keywordRankings && auditData.keywordRankings.length > 0 ? (
                            auditData.keywordRankings.map((kw, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-bg-secondary rounded-md border border-border">
                                <div className="font-bold text-text">{kw.keyword}</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-black border ${
                                  typeof kw.position === 'number' && kw.position <= 3 
                                    ? 'bg-success/10 text-success border-success/20' 
                                    : 'bg-error/10 text-error border-error/20'
                                }`}>
                                  {typeof kw.position === 'number' ? `Position #${kw.position}` : kw.position}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                              Positionnement non disponible.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* PHASE 3: PERTE FINANCIÈRE */}
                    <div className="bg-error/10 p-8 rounded-md border border-error/20 relative overflow-hidden group shadow-soft">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <DollarSign className="w-32 h-32 text-error" />
                      </div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center border border-error/30 shrink-0 shadow-soft">
                          <TrendingUp className="rotate-180 w-10 h-10 text-error" />
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-error/20 rounded-full text-error text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-error/30">
                            Phase 3 : Le Coût de l'Inaction
                          </span>
                          <h4 className="text-3xl font-black text-text mb-2">
                            Vous perdez environ <span className="text-error">{auditData.estimatedLoss?.amount || 'un montant significatif'}</span> par mois
                          </h4>
                          <p className="text-text-secondary font-medium max-w-2xl mb-6">
                            {auditData.estimatedLoss?.description || 'Votre manque de visibilité sur les moteurs de recherche IA et traditionnels vous fait perdre de nombreuses opportunités commerciales au profit de vos concurrents.'}
                          </p>
                          <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-md border border-border">
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                                <span>Autorité Sémantique</span>
                                <span className="text-error">{auditData.semanticAuthorityScore || 0}%</span>
                              </div>
                              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${auditData.semanticAuthorityScore || 0}%` }}
                                  className="h-full bg-error"
                                />
                              </div>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-error bg-error/10 px-3 py-1 rounded-full border border-error/20">
                              Critique
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PAYWALL / PHASES 5-8 */}
                    {!auditUnlocked ? (
                      <div className="relative mt-12">
                        {/* Blurry Overlay for locked content */}
                        <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-transparent to-bg-primary z-10 pointer-events-none" />
                        
                        <div className="relative z-20 bg-surface/80 backdrop-blur-xl border border-primary/30 p-8 sm:p-12 rounded-md text-center shadow-soft max-w-3xl mx-auto">
                          <div className="w-20 h-20 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 mx-auto mb-8 shadow-soft">
                            <Lock className="w-10 h-10 text-primary" />
                          </div>
                          
                          <h3 className="text-3xl sm:text-4xl font-black text-text mb-6 tracking-tight">
                            Débloquez votre <span className="text-primary">Plan d'Action Complet</span>
                          </h3>
                          
                          <p className="text-lg text-text-secondary mb-10 leading-relaxed font-medium">
                            Nous avons identifié <span className="text-text font-bold">3 opportunités majeures</span> et préparé un <span className="text-text font-bold">plan d'action en 90 jours</span> pour votre entreprise. Entrez votre email pour recevoir l'audit complet.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                              type="email" 
                              placeholder="votre@email.com"
                              className="input flex-1"
                            />
                            <button 
                              onClick={() => setAuditUnlocked(true)}
                              className="btn-primary"
                            >
                              DÉBLOQUER
                            </button>
                          </div>
                          
                          <p className="mt-6 text-xs text-text-muted font-bold uppercase tracking-widest">
                            Gratuit • Sans engagement • Analyse IA incluse
                          </p>
                        </div>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                      >
                        {/* PHASE 5: OPPORTUNITÉS */}
                        <div className="card p-8 backdrop-blur-xl relative overflow-hidden group">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-md bg-success/10 flex items-center justify-center border border-success/20">
                              <Sparkles className="w-5 h-5 text-success" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-text tracking-tight">Opportunités</h4>
                              <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Phase 5 : Le Potentiel Caché</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {auditData.opportunities && auditData.opportunities.length > 0 ? (
                              auditData.opportunities.map((opp, i) => (
                                <div key={i} className="p-6 bg-bg-secondary rounded-md border border-border hover:border-primary/30 transition-all group/card">
                                  <div className="text-primary font-black mb-2">#{i + 1}</div>
                                  <div className="font-bold text-text mb-2">{opp.title}</div>
                                  <p className="text-sm text-text-secondary leading-relaxed">{opp.description}</p>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-3 text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                Opportunités non disponibles.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* PHASE 6: PLAN D'ACTION */}
                        <div className="card p-8 backdrop-blur-xl relative overflow-hidden group">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-md bg-info/10 flex items-center justify-center border border-info/20">
                              <ListChecks className="w-5 h-5 text-info" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-text tracking-tight">Plan d'Action</h4>
                              <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Phase 5 : La Carte (90 Jours)</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {auditData.actionPlan && auditData.actionPlan.length > 0 ? (
                              auditData.actionPlan.map((step, idx) => (
                                <div key={idx} className="p-4 bg-bg-secondary rounded-md border border-border">
                                  <div className="font-bold text-text mb-1">{step.title}</div>
                                  <p className="text-sm text-text-secondary">{step.description}</p>
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                                Plan d'action non disponible.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* PHASE 4: PROJECTION */}
                        <div className="bg-success/10 p-8 rounded-md border border-success/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32 text-success" />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                              <div className="w-10 h-10 rounded-md bg-success/20 flex items-center justify-center border border-success/30">
                                <TrendingUp className="w-5 h-5 text-success" />
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-text tracking-tight">Projection de Croissance</h4>
                                <p className="text-xs text-success/50 font-bold uppercase tracking-widest">Phase 4 : La Vision</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                              <div className="space-y-6">
                                <div className="p-6 bg-bg-secondary rounded-md border border-border">
                                  <div className="text-sm text-text-muted font-bold uppercase tracking-widest mb-2">Estimation ROI</div>
                                  <div className="text-4xl font-black text-success">{auditData.roiEstimate || 'Non estimé'}</div>
                                </div>
                                {auditData.visionStatement && (
                                  <div className="p-6 bg-success/5 rounded-md border border-success/10 italic text-text-primary text-lg font-medium leading-relaxed">
                                    "{auditData.visionStatement}"
                                  </div>
                                )}
                                <p className="text-text-secondary leading-relaxed font-medium">
                                  {auditData.growthStrategy || 'Stratégie de croissance non disponible.'}
                                </p>
                              </div>
                              <div className="h-64 bg-bg-secondary rounded-md border border-border p-4">
                                {auditData.growthProjection && <GrowthChart data={auditData.growthProjection} />}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* PHASE 6: CTA FINAL */}
                        <div className="pt-12 text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-8 relative group">
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors" />
                            <Rocket className="w-10 h-10 text-primary relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                          
                          <h3 className="text-3xl sm:text-5xl font-black mb-6 text-text tracking-tight">
                            Prêt à <span className="text-primary">Dominer</span> votre Marché ?
                          </h3>
                          
                          <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-4">Phase 6 : L'Appel à l'Action</p>
                          
                          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            Ne laissez pas vos concurrents prendre l'avance. Déployez votre stratégie IA dès aujourd'hui.
                          </p>
                          
                          <button 
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary px-10 py-5 text-xl flex items-center gap-3 mx-auto"
                          >
                            <span className="relative z-10">DÉPLOYER MA STRATÉGIE</span>
                            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}


        {/* Features */}
        {auditStep === 'idle' && (
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-24 sm:mt-32 md:mt-40">
            {[
              { icon: Bot, title: t.feat1Title, desc: t.feat1Desc },
              { icon: Target, title: t.feat2Title, desc: t.feat2Desc },
              { icon: Database, title: t.feat3Title, desc: t.feat3Desc }
            ].map((Feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="card p-6 sm:p-8 md:p-10 group relative overflow-hidden shadow-soft backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md bg-primary/10 flex items-center justify-center mb-6 sm:mb-8 border border-primary/20 group-hover:scale-110 transition-transform shadow-soft">
                    <Feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-text tracking-tight">{Feature.title}</h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed group-hover:text-text-primary transition-colors">{Feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* How it Works */}
        {auditStep === 'idle' && (
          <div id="how-it-works" className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-border relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-text drop-shadow-soft">{t.howTitle}</h2>
              <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4">{t.howSub}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 relative">
              <div className="hidden md:block absolute top-12 sm:top-14 md:top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              {[
                { step: "01", title: t.step1Title, desc: t.step1Desc },
                { step: "02", title: t.step2Title, desc: t.step2Desc },
                { step: "03", title: t.step3Title, desc: t.step3Desc }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative text-center group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-surface backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-black text-primary mb-6 sm:mb-8 relative z-10 shadow-soft group-hover:border-primary transition-all group-hover:scale-110 font-mono">
                    <div className="absolute inset-0 rounded-full bg-primary/10 blur-md group-hover:bg-primary/20 transition-colors" />
                    <span className="relative z-10 drop-shadow-soft">{item.step}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-text tracking-tight">{item.title}</h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed group-hover:text-text-primary transition-colors px-4">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {auditStep === 'idle' && (
          <div className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-border relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-text drop-shadow-soft px-4">{t.testimonialsTitle}</h2>
              <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4">{t.testimonialsSub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { name: "Marc D.", role: "Artisan Plombier", content: "Renk a littéralement sauvé mon entreprise. Je suis passé de 2 appels par semaine à 5 par jour en seulement 2 mois.", city: "Annecy" },
                { name: "Elena R.", role: "Cabinet Dentaire", content: "L'optimisation pour ChatGPT nous a apporté une clientèle plus jeune et plus qualifiée. C'est bluffant.", city: "Lyon" },
                { name: "Thomas L.", role: "Agence Immobilière", content: "Le monopole par ville est un avantage injuste. Mes concurrents ne comprennent pas comment je domine toutes les recherches.", city: "Bordeaux" }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card p-6 sm:p-8 md:p-10 relative group hover:border-primary/30 transition-all shadow-soft overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex gap-1.5 mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => <Zap key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary drop-shadow-soft" />)}
                    </div>
                    <p className="text-text italic mb-6 sm:mb-8 leading-relaxed text-lg sm:text-xl font-medium">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 sm:gap-5 pt-4 sm:pt-6 border-t border-border">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-main p-[2px] shadow-soft shrink-0">
                        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-primary font-bold text-base sm:text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-text text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-text-secondary font-medium">{testimonial.role} • {testimonial.city}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {auditStep === 'idle' && (
          <div className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-border relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-text drop-shadow-soft px-4">
                {t.landingWhyChooseUs}
              </h2>
            </div>
            <div className="max-w-5xl mx-auto overflow-x-auto pb-8 px-4 sm:px-0">
              <div className="bg-surface rounded-md border border-border shadow-soft overflow-hidden relative group hover:border-primary/30 transition-all backdrop-blur-sm min-w-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <table className="w-full text-left border-collapse relative z-10">
                  <thead>
                    <tr className="border-b border-border bg-bg-secondary">
                      <th className="py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 text-text font-bold uppercase tracking-widest text-xs sm:text-sm">Features</th>
                      <th className="py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 text-primary font-black text-lg sm:text-xl drop-shadow-soft">
                        <RenkLogo className="h-16 w-auto" variant="small" />
                      </th>
                      <th className="py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 text-text-secondary font-bold uppercase tracking-widest text-xs sm:text-sm">Traditional SEO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { feature: 'AI Semantic Mapping', us: true, them: false },
                      { feature: 'Instant Local Indexing', us: true, them: false },
                      { feature: 'AEO Optimization', us: true, them: false },
                      { feature: 'Automated Content', us: true, them: 'Partial' },
                      { feature: 'Real-time ROI Tracking', us: true, them: false },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-bg-secondary transition-colors group/row">
                        <td className="py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8 text-text font-bold text-lg sm:text-xl group-hover/row:text-primary transition-colors">{row.feature}</td>
                        <td className="py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8">
                          {row.us === true ? <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-soft"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div> : <span className="text-text font-bold">{row.us}</span>}
                        </td>
                        <td className="py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8">
                          {row.them === true ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted" /> : row.them === false ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted" /> : <span className="text-text-secondary font-bold px-2 py-0.5 sm:px-3 sm:py-1 bg-bg-secondary rounded-full text-xs sm:text-sm border border-border">{row.them}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        {auditStep === 'idle' && (
          <div id="pricing" className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-border mb-24 sm:mb-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-text drop-shadow-soft px-4">{t.priceTitle}</h2>
              <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4">{t.priceSub}</p>
            </div>

            <div className="max-w-lg mx-auto px-4 sm:px-0">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-6 sm:p-8 md:p-10 rounded-md bg-surface border border-primary/30 relative overflow-hidden shadow-soft group hover:border-primary/50 transition-all backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 p-4 sm:p-6 z-20">
                  <div className="bg-primary text-white text-xs sm:text-sm font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-widest shadow-soft">
                    Most Popular
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-text tracking-tight">{t.planName}</h3>
                  <p className="text-text-secondary text-lg sm:text-xl mb-6 sm:mb-8">{t.planSub}</p>
                  <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-border">
                    <span className="text-5xl sm:text-6xl font-black text-text drop-shadow-soft">{t.planPrice}</span>
                    <span className="text-text-secondary text-lg sm:text-xl font-bold"> {t.planSetup}</span>
                    <div className="text-primary font-bold mt-2 sm:mt-3 text-lg sm:text-xl">{t.planMo}</div>
                  </div>
                  
                  <ul className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                    {[
                      t.check1,
                      t.check2,
                      t.check3,
                      t.check4,
                      t.check5,
                      t.check6
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 sm:gap-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/30 shadow-soft">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-text font-bold leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setView('conversion')}
                    className="btn-primary w-full py-4 sm:py-5 text-base sm:text-lg"
                  >
                    {t.planCta}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 text-center text-text-secondary text-base font-bold bg-bg-secondary backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <RenkLogo className="h-16 w-auto" variant="small" />
        </div>
        <p className="tracking-wide">© 2026 Renk. {t.footerRights}</p>
      </footer>

      {/* Landing Page Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && auditData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-primary/90 backdrop-blur-2xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-surface border border-border rounded-md overflow-hidden shadow-soft"
            >
              {/* Browser Header */}
              <div className="bg-bg-secondary border-b border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-1.5 bg-bg-primary rounded-md text-sm text-text font-mono border border-border min-w-[300px] shadow-inner">
                    <Lock className="w-3 h-3 text-success" />
                    <span className="text-text-secondary">{auditUrl.replace(/^https?:\/\//, '')}</span>
                    <span className="text-text-muted">/special-offer</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-bg-primary rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 text-text-secondary group-hover:text-primary" />
                </button>
              </div>

              {/* Simulated Landing Page Content */}
              <div className="h-[75vh] overflow-y-auto bg-surface text-text font-sans relative">
                {/* Nav */}
                <nav className="px-8 py-6 border-b border-border flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-50">
                  <RenkLogo className="h-16 w-auto" variant="small" />
                    {auditUrl.split('.')[1]?.toUpperCase() || 'LOCAL'} <span className="text-text-muted font-light opacity-60">|</span> <span className="text-primary font-bold text-2xl">{auditData.extractedLocation || 'Local'}</span>
                  <div className="hidden md:flex gap-8 text-sm font-bold text-text-secondary uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Services</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">About</span>
                    <span className="text-primary cursor-pointer">Contact</span>
                  </div>
                </nav>

                {/* Hero */}
                <header className="py-32 px-8 max-w-5xl mx-auto text-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-50" />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary font-bold text-sm mb-8 shadow-soft">
                      <Sparkles className="w-4 h-4" />
                      <span>{t.landingSpecialOffer}</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-text">
                      {auditData.pageTitle || 'Titre de page non disponible'}
                    </h1>
                    <p className="text-2xl text-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                      {auditData.pageContent || 'Contenu de page non disponible'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="btn-primary px-10 py-5 text-lg">
                        {t.landingGetFreeQuote}
                      </button>
                      <button className="bg-surface border-2 border-primary/20 text-text px-10 py-5 rounded-md font-bold text-xl hover:bg-bg-secondary hover:border-primary transition-all shadow-soft hover:scale-[1.02] active:scale-[0.98]">
                        {t.landingOurServices}
                      </button>
                    </div>
                  </motion.div>
                </header>

                {/* Expertise Section */}
                <section className="bg-bg-secondary py-32 px-8 border-t border-border">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
                        {t.landingOurExpertise}
                      </h2>
                      <p className="text-xl text-text-secondary leading-relaxed font-medium">
                        {t.landingExpertiseDesc.replace('{company}', auditData.companyName || (lang === 'fr' ? 'notre équipe' : lang === 'es' ? 'nuestro equipo' : 'our team'))}
                      </p>
                      <div className="space-y-6 pt-4">
                        {[t.landingProvenResults, t.landingDedicatedSupport, t.landingIndustryExperts].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 bg-surface p-4 rounded-md shadow-soft border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-bold text-xl text-text">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="aspect-square md:aspect-[4/3] bg-surface rounded-md overflow-hidden relative border border-border shadow-soft p-8 flex flex-col items-center justify-center text-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <Target className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-text mb-2">
                          {t.landingStrategyResults}
                        </h3>
                        <p className="text-text-secondary font-bold">Approche basée sur les données pour un ROI maximal.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="py-16 px-8 bg-[#0F172A] text-white text-center">
                  <RenkLogo className="h-14 w-auto mx-auto mb-6" variant="small" />
                  <p className="text-white text-base font-bold tracking-wide opacity-80">
                    © 2026 {auditUrl.replace(/^https?:\/\/(www\.)?/, '').split('.')[0]?.toUpperCase()} - {auditData.extractedLocation || 'Local'}
                  </p>
                </footer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isSharing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSharing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-md p-8 shadow-soft overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-main" />
              <button 
                onClick={() => setIsSharing(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">Share Audit Report</h3>
                <p className="text-base text-text-secondary font-bold">Envoyez cette analyse professionnelle à votre équipe ou à vos clients.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">Lien du Rapport</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={`${window.location.origin}/report/${Math.random().toString(36).substring(7)}`}
                      className="flex-1 bg-bg-secondary border border-border rounded-md px-4 py-3 text-sm text-text font-bold outline-none focus:border-primary/50 transition-colors"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/report/xyz`);
                      }}
                      className="btn-primary px-4 py-3 text-xs"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {['Email', 'Slack', 'WhatsApp', 'LinkedIn'].map((platform) => (
                    <button key={platform} className="flex flex-col items-center gap-2 p-3 rounded-md bg-bg-secondary border border-border hover:bg-primary/5 transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-surface flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Globe className="w-4 h-4 text-text-secondary group-hover:text-primary" />
                      </div>
                      <span className="text-[10px] font-black text-text-muted group-hover:text-primary transition-colors uppercase tracking-tighter">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsSharing(false)}
                className="w-full mt-8 py-4 bg-bg-secondary border border-border text-text font-bold rounded-md hover:bg-bg-primary transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-md p-10 shadow-soft overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-text-secondary hover:text-primary hover:bg-bg-primary p-2 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                {formState === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/30 shadow-soft">
                      <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-text tracking-tight">{t.successTitle}</h3>
                    <p className="text-text-secondary text-xl font-bold leading-relaxed">{t.successSub}</p>
                  </div>
                ) : formState === 'error' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-error/30 shadow-soft">
                      <X className="w-10 h-10 text-error" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-text tracking-tight">{t.errTitle}</h3>
                    <p className="text-text-secondary text-xl font-bold mb-8 leading-relaxed">{t.errSub}</p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="btn-primary px-8 py-4"
                    >
                      {t.btnTryAgain}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10 text-center">
                      <div className="inline-flex items-center justify-center mb-6">
                        <RenkLogo className="h-16 w-auto" variant="small" />
                      </div>
                      <h3 className="text-3xl font-bold mb-3 text-text tracking-tight">{t.formTitle}</h3>
                      <p className="text-text-secondary text-lg font-bold leading-relaxed">{t.formSub}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelBiz}</label>
                        <input 
                          required 
                          type="text" 
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="input w-full" 
                          placeholder="e.g. Apex Plumbing" 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelUrl}</label>
                        <input 
                          required 
                          type="url" 
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className="input w-full" 
                          placeholder="https://..." 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelCity}</label>
                        <input 
                          required 
                          type="text" 
                          name="targetCity"
                          value={formData.targetCity}
                          onChange={handleInputChange}
                          className="input w-full" 
                          placeholder="e.g. Austin, TX" 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-text-secondary mb-2 uppercase tracking-widest text-[10px]">{t.labelEmail}</label>
                        <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input w-full" 
                          placeholder="you@company.com" 
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={formState === 'checkout'}
                        className="btn-primary w-full py-5 mt-8 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {formState === 'checkout' ? (
                          <><Loader2 className="w-6 h-6 animate-spin" /> {t.btnProcessing}</>
                        ) : (
                          t.btnCheck
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
