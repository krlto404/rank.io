/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, useState, useEffect, ReactNode, ErrorInfo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, Activity, Target, TrendingUp, Zap, CheckCircle2, Globe, BarChart3, X, Menu, Loader2, Bot, Database, Sparkles, MapPin, MousePointer2, LineChart as LineChartIcon, Users, Shield, Layout, FileText, Settings, Bell, User, ArrowLeft, MessageSquare, AlertCircle, Brain, PenTool, Rocket, Lock, Share2, Download, Eye, Smile, Award, CheckCircle, ArrowUpRight, Play, Mail, DollarSign, ListChecks, Cpu, Info, Quote, Check, ShieldCheck, Star, Home, Map } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { GoogleGenAI } from "@google/genai";
import { AnimatedDashboard } from './components/AnimatedDashboard';
import { BlogList, ArticleView, type BlogPost } from './components/Blog';
import { FAQ } from './components/FAQ';
import { Hero } from './components/landing/Hero';
import { AuditTool } from './components/landing/AuditTool';
import { Features } from './components/landing/Features';
import { Pricing } from './components/landing/Pricing';
import { Navbar } from './components/landing/Navbar';
import { AuthModal } from './components/AuthModal';
import { RenkLogo } from './components/RenkLogo';

// --- Main App Component ---

type Lang = 'en' | 'fr' | 'es';

const aiLogos = [
  {
    name: 'Google',
    svg: <img src="/icons8-google-94.png" alt="Google" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'ChatGPT',
    svg: <img src="/icons8-chatgpt-94.png" alt="ChatGPT" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Gemini',
    svg: <img src="/icons8-gemini-ai-94.png" alt="Gemini" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Claude',
    svg: <img src="/icons8-3d-claude-ai-logo-94.png" alt="Claude" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Perplexity',
    svg: <img src="/icons8-3d-perplexity-ai-logo-94.png" alt="Perplexity" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  },
  {
    name: 'Grok',
    svg: <img src="/icons8-3d-grey-grok-ai-logo-94.png" alt="Grok" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
  }
];

interface AuditData {
  companyName: string;
  industry: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  seoScore: number;
  hook: string;
  // Hero Metrics
  localVisibilityScore: number;
  aiReadinessScore: number;
  indexedPages: number;
  top10KeywordsCount: number;
  aiVisibilityRatio: string; // e.g. "0/4"
  
  // Competitors
  competitorComparison: { 
    name: string; 
    visibility: string; 
    maps: boolean; 
    status: string; 
    context: string;
    tags: string[];
    position: string;
  }[];
  
  // Positions
  detailedKeywords: { 
    keyword: string; 
    intent: string; 
    volume: number; 
    kd: number; 
    position: number;
    potential: 'HAUT' | 'MOYEN' | 'FAIBLE' | 'TRÈS HAUT';
    opportunityScore?: number;
  }[];
  
  // Losses
  estimatedLoss: { 
    monthlySearches: number;
    lostVisitors: number;
    lostLeads: number;
    lostRevenue: string;
    description: string;
  };
  
  // Diagnostic
  issues: { 
    title: string; 
    desc: string; 
    severity: 'critical' | 'major' | 'medium' | 'low';
    type: string;
  }[];
  
  // Opportunities
  opportunities: { 
    title: string; 
    description: string;
    speed: 'RAPIDE' | 'MOYEN' | 'LENT';
    impact: string;
  }[];
  
  // Roadmap
  roadmap: {
    phase1: { title: string; duration: string; actions: string[] };
    phase2: { title: string; duration: string; actions: string[] };
    phase3: { title: string; duration: string; actions: string[] };
  };
  
  // Projections
  projections: {
    month3: { positions: string; aiVisibility: string; visitors: number; leads: number; revenue: string };
    month6: { positions: string; aiVisibility: string; visitors: number; leads: number; revenue: string };
    month12: { positions: string; aiVisibility: string; visitors: number; leads: number; revenue: string };
  };
  
  // IA/LLM Details
  llmDetails: {
    name: string;
    status: 'INVISIBLE' | 'PARTIAL' | 'VISIBLE';
    cause: string;
    impact: string;
    recommendation: string;
    competitorsCited: string[];
    tags: string[];
    trafficShare: string;
    lostLeads: number;
  }[];
  visualStrategyUrl?: string;
  growthStrategy?: string;
  llmRatings?: { model: string; score: number; status: 'excellent' | 'good' | 'poor' | string; reasoning: string }[];
  scores: {
    visibility: number;
    sentiment: number;
    authority: number;
    accuracy: number;
  };
  aiSearchPresence?: { platform: string; status: string; context: string }[];
  technicalHealth?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    coreWebVitals: string;
  };
  semanticDensity?: number;
  semanticTerms?: { term: string; density: number; status: 'optimal' | 'low' | 'high' | string }[];
  semanticGap?: {
    term: string;
    clientDensity: number;
    competitorDensity: number;
    gap: number;
    priority: 'HAUTE' | 'MOYENNE' | 'FAIBLE' | string;
  }[];
  semanticMapping?: {
    category: string;
    terms: string[];
    relevance: number;
  }[];
  recommendations: string[];
  extractedLocation?: string;
  growthProjection?: { month: string; value: number }[];
  platformVisibility: { name: string; score: number; avg: number }[];
  perceptions: { label: string; value: number; context?: string }[];
  brandPerceptionDetails?: {
    sentiment: { positive: number; neutral: number; negative: number };
    topAttributes: { label: string; score: number }[];
    userFeedbackSummary: string;
  };
  semanticAuthorityScore: number;
  errors: string[];
  warnings: string[];
  notices: string[];
  cta: string;
  visionStatement?: string;
  keywordRankings?: { keyword: string; position: number; previousPosition: number; change: number }[];
  actionPlan?: { title: string; description: string }[];
  opportunityScore?: number;
  keywords?: { term: string; volume: string; difficulty: number; currentRank?: number }[];
  aiCompetitors?: { 
    name: string; 
    position: string; 
    strategy: string; 
    aiVisibilityScore?: number; 
    visibility?: number | string; 
    strength?: string; 
    status?: string; 
    context?: string;
  }[];
  roiEstimate?: string;
  pageTitle?: string;
  pageContent?: string;
  competitorAiVisibility?: { competitor: string; visibilityScore: number }[];
  blogTitle?: string;
  blogExcerpt?: string;
  marketAnalysis?: string;
  aiRecommendation?: string;
  seoTips?: string[];
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
    feat1Title: "Exclusive total 50 km",
    feat1Desc: "We work with only one professional per industry and per area. If we partner with you, we refuse your competitors. You get 100% of the results.",
    feat2Title: "AI LLM SEO",
    feat2Desc: "Your future clients are already searching on ChatGPT, Claude, and Gemini. We position your business as the obvious recommendation on these new artificial intelligences.",
    feat3Title: "Technology 100% automated",
    feat3Desc: "Our artificial intelligence manages everything: from auditing to content creation. The result? A faster, higher-performing strategy that's much more affordable than a traditional agency.",
    howTitle: "Our Acquisition Method",
    howSub: "A clear 3-step strategy to dominate your geographical area on Google and AIs.",
    step1Title: "1. Free Audit & Strategy",
    step1Desc: "We analyze your local market. We identify exactly what your customers are searching for on Google and artificial intelligences to create a custom action plan.",
    step2Title: "2. Pack d'Ouverture",
    step2Desc: "Immediate creation of 50 ultra-optimized contents: 10 service pages, 15 city pages, 10 articles, 10 AI FAQs, and 5 conversion pages. You are visible everywhere, right away.",
    step3Title: "3. Monthly Growth",
    step3Desc: "Every month, we add 20 new targeted contents and 10 Google Business Profile posts. Your visibility continuously increases, your competitors disappear.",
    priceTitle: "A Simple and Transparent Offer",
    priceSub: "Cutting-edge technology finally accessible to freelancers and local SMEs.",
    planName: "Local Domination",
    planSub: "Guaranteed exclusivity: 1 client per industry within a 50km radius.",
    planPrice: "$499",
    planSetup: "Starter Pack (50 contents)",
    planMo: "then $299/month (no commitment)",
    setupTitle: "Included at start:",
    setupItem1: "Complete strategic audit",
    setupItem2: "Opening Pack (50 Google & AI contents)",
    setupItem3: "Total exclusivity (50km radius)",
    growthTitle: "Every month for your growth:",
    growthItem1: "20 new ultra-targeted contents",
    growthItem2: "10 Google Business Profile posts",
    growthItem3: "Continuous ChatGPT & Gemini optimization",
    planCta: "Check my area's availability",
    auditTitle: "Get your first Free Audit",
    auditSub: "Instantly find out if your industry is still available and analyze your growth potential.",
    auditPlaceholder: "Enter your website address (e.g., www.my-business.com)",
    auditBtn: "Launch my Audit",
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
    auditIndexedPages: "Indexed Pages",
    auditTop10Keywords: "Top 10 Keywords",
    auditAiVisibilityRatio: "AI Visibility",
    auditCompetitorDominance: "Your competitors dominate",
    auditCompetitorDominanceSub: "These players are currently capturing the majority of customers in your sector.",
    auditCurrentPositions: "Your current positions",
    auditCurrentPositionsSub: "Pages beyond the first one receive 80% fewer clicks.",
    auditImpactInvisibility: "The real impact of your invisibility",
    auditImpactInvisibilitySub: "Every month, you are losing potential revenue.",
    auditWhyNoRanking: "Why Google doesn't rank you",
    auditWhyNoRankingSub: "Blocking issues detected limiting your growth.",
    auditQuickWins: "Google + AI Quick Wins",
    auditQuickWinsSub: "Priority actions for fast results.",
    auditRoadmapParallel: "Your parallel Google + AI roadmap",
    auditRoadmapParallelSub: "Concrete action plan towards local dominance.",
    auditProjectionResults: "Projected results",
    auditProjectionResultsSub: "Projections based on strategy implementation.",
    auditInvisibleOnAi: "You are invisible on AI",
    auditInvisibleOnAiSub: "AI assistants recommend your competitors instead of you.",
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
    auditSemanticGap: "Semantic Gap Analysis",
    auditSemanticMapping: "Semantic Mapping",
    auditClientDensity: "Your Density",
    auditCompetitorDensity: "Competitor Density",
    auditGap: "Gap",
    auditPriority: "Priority",
    auditRelevance: "Relevance",
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
    statSitesIndexed: "Strategic Audits",
    statLeadsGenerated: "Optimized Keywords",
    statAvgRoi: "Average ROI",
    statCitiesCovered: "Exclusivities",
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
    feat1Title: "Exclusivité totale 50 km",
    feat1Desc: "Nous travaillons avec un seul professionnel par métier et par zone. Si nous vous accompagnons, nous refusons vos concurrents. Vous obtenez 100% des résultats.",
    feat2Title: "AI LLM SEO",
    feat2Desc: "Vos futurs clients cherchent déjà sur ChatGPT, Claude et Gemini. Nous positionnons votre entreprise comme la seule recommandation évidente sur ces nouvelles intelligences artificielles.",
    feat3Title: "Technologie 100% automatisée",
    feat3Desc: "Notre intelligence artificielle gère tout : de l'audit à la création de vos contenus. Résultat ? Une stratégie plus rapide, plus performante et beaucoup moins chère qu'une agence classique.",
    howTitle: "Notre Méthode d'Acquisition",
    howSub: "Une stratégie claire en 3 étapes pour dominer votre zone géographique sur Google et les IA.",
    step1Title: "1. Audit Gratuit & Stratégie",
    step1Desc: "Nous analysons votre marché local. Nous identifions exactement ce que vos clients recherchent sur Google et sur les intelligences artificielles pour créer un plan d'action sur-mesure.",
    step2Title: "2. Pack d'Ouverture",
    step2Desc: "Création immédiate de 50 contenus ultra-optimisés : 10 pages services, 15 pages villes, 10 articles, 10 FAQ IA et 5 pages de conversion. Vous êtes visible partout, tout de suite.",
    step3Title: "3. Croissance Mensuelle",
    step3Desc: "Chaque mois, nous ajoutons 20 nouveaux contenus ciblés et 10 publications Google Business Profile. Votre visibilité augmente en continu, vos concurrents disparaissent.",
    priceTitle: "Une Offre Simple et Transparente",
    priceSub: "Une technologie de pointe enfin accessible aux indépendants et PME locales.",
    planName: "Domination Locale",
    planSub: "1 seul client par métier dans un rayon de 50 km.",
    planPrice: "499€",
    planSetup: "Frais d'ouverture de dossier",
    planMo: "puis 299€/mois (sans engagement)",
    setupTitle: "Inclus au démarrage :",
    setupItem1: "Audit stratégique complet",
    setupItem2: "Pack d'Ouverture (50 contenus Google & IA)",
    setupItem3: "Exclusivité totale (Rayon 50km)",
    growthTitle: "Chaque mois pour votre croissance :",
    growthItem1: "20 nouveaux contenus ultra-ciblés",
    growthItem2: "10 publications Google Business Profile",
    growthItem3: "Optimisation continue ChatGPT & Gemini",
    planCta: "Vérifier la disponibilité de ma zone",
    auditTitle: "Obtenez votre premier Audit Gratuit",
    auditSub: "Découvrez instantanément si votre secteur est encore disponible et analysez votre potentiel de croissance.",
    auditPlaceholder: "Entrez l'adresse de votre site web (ex: www.mon-entreprise.fr)",
    auditBtn: "Lancer mon Audit",
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
    auditIndexedPages: "Pages indexées",
    auditTop10Keywords: "Mots-clés Top 10",
    auditAiVisibilityRatio: "Visibilité IA",
    auditCompetitorDominance: "Vos concurrents dominent",
    auditCompetitorDominanceSub: "Ces acteurs capturent actuellement la majorité des clients dans votre secteur.",
    auditCurrentPositions: "Vos positions actuelles",
    auditCurrentPositionsSub: "Les pages au-delà de la première reçoivent 80% de clics en moins.",
    auditImpactInvisibility: "L'impact réel de votre invisibilité",
    auditImpactInvisibilitySub: "Chaque mois, vous perdez du chiffre d'affaires potentiel.",
    auditWhyNoRanking: "Pourquoi Google ne vous référence pas",
    auditWhyNoRankingSub: "Problèmes bloquants détectés limitant votre croissance.",
    auditQuickWins: "Quick wins Google + IA",
    auditQuickWinsSub: "Actions prioritaires pour des résultats rapides.",
    auditRoadmapParallel: "Votre roadmap Google + IA parallèle",
    auditRoadmapParallelSub: "Plan d'action concret vers la domination locale.",
    auditProjectionResults: "Résultats projetés",
    auditProjectionResultsSub: "Projections basées sur l'implémentation de la stratégie.",
    auditInvisibleOnAi: "Vous êtes invisible sur les IA",
    auditInvisibleOnAiSub: "Les assistants IA recommandent vos concurrents à votre place.",
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
    auditSemanticGap: "Analyse de l'Écart Sémantique",
    auditSemanticMapping: "Cartographie Sémantique",
    auditClientDensity: "Votre Densité",
    auditCompetitorDensity: "Densité Concurrent",
    auditGap: "Écart",
    auditPriority: "Priorité",
    auditRelevance: "Pertinence",
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
    statSitesIndexed: "Audits Stratégiques",
    statLeadsGenerated: "Mots-clés Optimisés",
    statAvgRoi: "ROI Moyen",
    statCitiesCovered: "Exclusivités",
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
    feat1Title: "Exclusividad total 50 km",
    feat1Desc: "Trabajamos con un solo profesional por sector y por zona. Si te acompañamos, rechazamos a tus competidores. Obtienes el 100% de los resultados.",
    feat2Title: "AI LLM SEO",
    feat2Desc: "Tus futuros clientes ya están buscando en ChatGPT, Claude y Gemini. Posicionamos tu negocio como la recomendación obvia en estas nuevas inteligencias artificiales.",
    feat3Title: "Tecnología 100% automatizada",
    feat3Desc: "Nuestra inteligencia artificial gestiona todo: desde la auditoría hasta la creación de tus contenidos. ¿El resultado? Una estrategia más rápida, de mayor rendimiento y mucho más asequible que una agencia tradicional.",
    howTitle: "Nuestro Método de Adquisición",
    howSub: "Una estrategia clara en 3 pasos para dominar tu área geográfica en Google y las IA.",
    step1Title: "1. Auditoría Gratis y Estrategia",
    step1Desc: "Analizamos tu mercado local. Identificamos exactamente qué buscan tus clientes en Google y en las inteligencias artificiales para crear un plan de acción a medida.",
    step2Title: "2. Pack de Inicio",
    step2Desc: "Creación inmediata de 50 contenidos ultra optimizados: 10 páginas de servicios, 15 páginas de ciudades, 10 artículos, 10 FAQ de IA y 5 páginas de conversión. Eres visible en todas partes, de inmediato.",
    step3Title: "3. Crecimiento Mensual",
    step3Desc: "Cada mes, añadimos 20 nuevos contenidos específicos y 10 publicaciones en Google Business Profile. Tu visibilidad aumenta continuamente, tus competidores desaparecen.",
    priceTitle: "Una Oferta Simple y Transparente",
    priceSub: "Tecnología punta por fin accesible para autónomos y pymes locales.",
    planName: "Dominación Local",
    planSub: "Exclusividad garantizada: 1 cliente por sector en un radio de 50 km.",
    planPrice: "499€",
    planSetup: "Pack de Inicio (50 contenidos)",
    planMo: "luego 299€/mes (sin compromiso)",
    setupTitle: "Incluido al inicio:",
    setupItem1: "Auditoría estratégica completa",
    setupItem2: "Pack de Apertura (50 contenidos Google e IA)",
    setupItem3: "Exclusividad total (Radio 50km)",
    growthTitle: "Cada mes para su crecimiento:",
    growthItem1: "20 nuevos contenidos ultra segmentados",
    growthItem2: "10 publicaciones en Google Business Profile",
    growthItem3: "Optimización continua ChatGPT y Gemini",
    planCta: "Comprobar disponibilidad de mi zona",
    auditTitle: "Obtén tu primera Auditoría Gratis",
    auditSub: "Descubre al instante si tu sector sigue disponible y analiza tu potencial de crecimiento.",
    auditPlaceholder: "Introduce la dirección de tu sitio web (ej: www.mi-empresa.es)",
    auditBtn: "Lanzar mi Auditoría",
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
    auditRoadmapParallel: "Tu roadmap Google + IA paralelo",
    auditRoadmapParallelSub: "Plan de acción concreto hacia el dominio local.",
    auditProjectionResults: "Resultados proyectados",
    auditProjectionResultsSub: "Proyecciones basadas en la implementación de la estrategia.",
    auditInvisibleOnAi: "Eres invisible en la IA",
    auditInvisibleOnAiSub: "Los asistentes de IA recomiendan a tus competidores en tu lugar.",
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
    auditSemanticGap: "Análisis de Brecha Semántica",
    auditSemanticMapping: "Mapeo Semántico",
    auditClientDensity: "Tu Densidad",
    auditCompetitorDensity: "Densidad del Competidor",
    auditGap: "Brecha",
    auditPriority: "Prioridad",
    auditRelevance: "Relevancia",
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
    statSitesIndexed: "Auditorías Estratégicas",
    statLeadsGenerated: "Palabras Clave Optimizadas",
    statAvgRoi: "ROI Medio",
    statCitiesCovered: "Exclusividades",
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
  const isInView = React.useRef(false);
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const startAnimation = () => {
    let startTime: number | null = null;
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * (value - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return <span ref={containerRef}>{count}{suffix}</span>;
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
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [view, setView] = useState<'landing' | 'dashboard' | 'conversion' | 'blog' | 'article'>('landing');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 4000], [1, 0.5]);
  const [lang] = useState<Lang>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Dashboard & Profile State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Audit terminé", message: "Votre analyse de visibilité IA est prête.", time: "Il y a 5 min", read: false },
    { id: 2, title: "Nouveau mot-clé", message: "Vous êtes maintenant cité pour 'plombier expert'.", time: "Il y a 1h", read: false },
    { id: 3, title: "Mise à jour système", message: "L'algorithme Renk a été mis à jour.", time: "Hier", read: true },
  ]);
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          }
        } catch (e) {
          console.error("Error fetching profile:", e);
        }
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, [user]);

  const handleStartAuditTrigger = () => {
    if (!user) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      return;
    }
    setAuditStep('analyzing');
    if (auditUrl) {
      runAudit();
    }
  };

  const renderUserProfile = () => {
    if (loadingProfile) {
      return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">Profil Utilisateur</h2>
            <p className="text-text-secondary">Gérez vos informations et suivez votre progression.</p>
          </div>
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-soft lg:sticky lg:top-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-main p-[2px] mb-4">
                  <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-text">{user?.displayName || 'Utilisateur'}</h3>
                <p className="text-text-secondary text-sm mb-6">{user?.email}</p>
                <div className="w-full pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Membre depuis</span>
                    <span className="font-medium text-text">
                      {profileData?.createdAt ? new Date(profileData.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Statut</span>
                    <span className="font-medium text-success flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Actif
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => signOut(auth)}
                  className="w-full mt-8 py-3 px-4 rounded-md border border-border text-text-secondary hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-colors text-sm font-bold"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setView('landing')}
              className="w-full mt-6 py-4 px-6 rounded-xl bg-surface border border-border text-text-secondary hover:text-primary transition-all flex items-center justify-center gap-3 font-bold lg:hidden shadow-soft"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </div>

          {/* First Audit Snapshot */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Marqueur de Progression
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                Premier Audit Enregistré
              </span>
            </div>
            
            {profileData?.firstAudit ? (
              <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-soft relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="p-6 border-b border-border bg-bg-secondary/50 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-text-secondary font-medium mb-1">Point de départ SEO & IA</div>
                    <div className="text-xl font-bold text-text">{profileData.firstAudit.companyName || 'Votre Entreprise'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Date de l'audit</div>
                    <div className="text-sm font-medium text-text">
                      {new Date(profileData.firstAudit.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-text-secondary mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Score de Visibilité Local
                    </div>
                    <div className="text-4xl font-bold text-text flex items-baseline gap-2">
                      {profileData.firstAudit.localVisibilityScore}
                      <span className="text-sm font-medium text-text-muted">/ 100</span>
                    </div>
                    <div className="w-full bg-bg-secondary rounded-full h-2 mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${profileData.firstAudit.localVisibilityScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full rounded-full" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-text-secondary mb-2 flex items-center gap-2">
                      <Bot className="w-4 h-4" /> Préparation IA
                    </div>
                    <div className="text-4xl font-bold text-text flex items-baseline gap-2">
                      {profileData.firstAudit.aiReadinessScore}
                      <span className="text-sm font-medium text-text-muted">/ 100</span>
                    </div>
                    <div className="w-full bg-bg-secondary rounded-full h-2 mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${profileData.firstAudit.aiReadinessScore}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="bg-info h-full rounded-full" 
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-6 border-t border-border">
                    <div className="text-sm text-text-secondary mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Constat Initial
                    </div>
                    <div className="p-5 rounded-lg bg-bg-secondary border border-border text-base text-text font-medium italic relative">
                      <Quote className="w-8 h-8 text-border absolute top-2 left-2 opacity-50" />
                      <span className="relative z-10 pl-6 block">"{profileData.firstAudit.hook}"</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-border border-dashed rounded-xl p-12 text-center shadow-soft">
                <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <h4 className="text-xl font-bold text-text mb-3">Aucun audit enregistré</h4>
                <p className="text-text-secondary text-base mb-8 max-w-md mx-auto">
                  Lancez votre premier audit pour établir votre point de départ. Il sera sauvegardé ici à vie comme marqueur de votre progression.
                </p>
                <button 
                  onClick={() => setView('landing')}
                  className="btn-primary py-3 px-8 text-base shadow-glow hover:shadow-glow-large transition-all"
                >
                  Lancer mon premier audit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    const stats = [
      { label: t.statTraffic, value: auditData ? `${((auditData.localVisibilityScore || 0) * 120).toLocaleString()}` : '0', change: auditData ? '+14%' : '0%', icon: TrendingUp, color: 'text-success' },
      { label: t.statKeywords, value: auditData ? `${(auditData.keywords?.length || 0) * 12}` : '0', change: auditData ? '+28' : '0', icon: Target, color: 'text-info' },
      { label: t.statLeads, value: auditData ? `${Math.floor((auditData.localVisibilityScore || 0) * 1.5)}` : '0', change: auditData ? '+5%' : '0%', icon: Users, color: 'text-primary' },
      { label: t.statAuthority, value: auditData ? `${auditData.aiReadinessScore || 0}` : '0', change: auditData ? '+2' : '0', icon: Shield, color: 'text-warning' },
    ];

    return (
      <div className="h-[100dvh] bg-bg-secondary text-text font-sans flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-surface hidden lg:flex flex-col p-6 sticky top-0 h-[100dvh]">
          <div className="flex items-center gap-2 mb-12">
            <RenkLogo className="h-28 w-auto" variant="small" />
          </div>

          <nav className="space-y-2 flex-1">
            {[
              { id: 'overview', icon: Layout, label: t.dashOverview },
              { id: 'keywords', icon: Target, label: t.dashKeywords },
              { id: 'content', icon: FileText, label: t.dashContent },
              { id: 'analytics', icon: BarChart3, label: t.dashAnalytics },
              { id: 'profile', icon: User, label: 'Mon Profil' },
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

          <div className="mt-auto space-y-2">
            <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
              <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{t.dashPro}</div>
              <div className="text-sm text-text font-bold mb-3">{t.dashUnlimited}</div>
              <button 
                onClick={() => setView('conversion')}
                className="btn-primary w-full py-2 text-sm"
              >
                {t.dashUpgrade}
              </button>
            </div>
            <button 
              onClick={() => setView('landing')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-secondary transition-all"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-bg-primary h-full scroll-smooth">
          <header className="flex justify-between items-center mb-8 sticky top-0 bg-bg-primary/80 backdrop-blur-md z-20 py-2 -mx-4 px-4 sm:-mx-8 sm:px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('landing')}
                className="lg:hidden p-2 rounded-md bg-surface border border-border text-text-secondary hover:text-primary transition-colors shadow-soft"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-text">{t.dashWelcome}, {formData.businessName || 'User'}</h1>
                <p className="text-text-secondary text-base">{t.dashStatus}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('landing')}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-md bg-surface border border-border text-text-secondary hover:text-primary transition-all shadow-soft text-sm font-bold"
              >
                <Home className="w-4 h-4" />
                Accueil
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-md bg-surface border border-border transition-all relative shadow-soft ${showNotifications ? 'text-primary border-primary/30' : 'text-text-secondary hover:text-primary'}`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setShowNotifications(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-premium z-40 overflow-hidden"
                      >
                        <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary/50">
                          <h3 className="font-bold text-sm">Notifications</h3>
                          <button 
                            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                            className="text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-70"
                          >
                            Tout marquer comme lu
                          </button>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((n) => (
                              <div 
                                key={n.id} 
                                className={`p-4 border-b border-border last:border-0 hover:bg-bg-secondary/30 transition-colors cursor-pointer relative ${!n.read ? 'bg-primary/5' : ''}`}
                                onClick={() => {
                                  setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                                }}
                              >
                                {!n.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />}
                                <div className="font-bold text-xs mb-1">{n.title}</div>
                                <div className="text-xs text-text-secondary line-clamp-2 mb-2">{n.message}</div>
                                <div className="text-[10px] text-gray-400 font-medium">{n.time}</div>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center text-text-secondary text-sm">
                              Aucune notification
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center bg-bg-secondary/30 border-t border-border">
                          <button className="text-xs font-bold text-text-secondary hover:text-primary transition-colors">
                            Voir tout l'historique
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full bg-gradient-main p-[1px] shadow-soft cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </button>
            </div>
          </header>

          {activeTab === 'profile' ? (
            renderUserProfile()
          ) : (
            <div className="relative">
              {!auditData && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-primary/40 backdrop-blur-[2px] rounded-xl -m-4 sm:-m-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full mx-4 p-8 bg-surface border border-primary/20 rounded-2xl shadow-premium text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-3">Accédez à vos statistiques</h3>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                      Générez votre audit pour accéder à vos statistiques et découvrir votre potentiel de croissance.
                    </p>
                    <button 
                      onClick={() => setView('landing')}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                    >
                      Générer mon audit
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              )}
              
              <div className={!auditData ? 'opacity-40 pointer-events-none grayscale-[0.5]' : ''}>
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
                  <AreaChart data={auditData ? [
                    { name: 'Mon', value: 400 },
                    { name: 'Tue', value: 300 },
                    { name: 'Wed', value: 600 },
                    { name: 'Thu', value: 800 },
                    { name: 'Fri', value: 500 },
                    { name: 'Sat', value: 900 },
                    { name: 'Sun', value: 1100 },
                  ] : [
                    { name: 'Mon', value: 0 },
                    { name: 'Tue', value: 0 },
                    { name: 'Wed', value: 0 },
                    { name: 'Thu', value: 0 },
                    { name: 'Fri', value: 0 },
                    { name: 'Sat', value: 0 },
                    { name: 'Sun', value: 0 },
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
                {auditData ? [
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
                )) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-text-secondary font-medium italic">Aucune activité récente</p>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setView('landing')}
                className="w-full mt-8 py-3 bg-bg-secondary border border-border rounded-md text-sm font-bold text-text-secondary hover:text-primary hover:bg-bg-primary transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t.dashBack}
              </button>
            </div>
          </div>
              </div>
            </div>
          )}
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
      - Semantic Gap: Compare the client's semantic density for 5 key terms against their top competitor.
      - Semantic Mapping: Group industry terms into 4 logical categories with relevance scores.
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
      - PHASE 3 (PAIN): Financial loss estimate based on local search volume, average CPC for the niche, and estimated conversion rates.
      - PHASE 4 (VISION): Market dominance projection.
      - PHASE 5 (PLAN): 4 concrete steps to win.
      - PHASE 6 (CTA): Urgent closing statement.
      
      Return a JSON object with exactly these fields:
      - companyName: string (the official name of the business)
      - industry: string (the specific industry, e.g., "Rénovation de l'habitat")
      - riskLevel: string ("low", "medium", "high", or "critical")
      - seoScore: number (0-100)
      - hook: string (max 15 words, PHASE 1)
      - localVisibilityScore: number (0-100)
      - aiReadinessScore: number (0-100)
      - indexedPages: number (realistic count of indexed pages)
      - top10KeywordsCount: number (how many keywords are in the top 10)
      - aiVisibilityRatio: string (e.g. "0/4" based on presence in ChatGPT, Gemini, Perplexity, Claude)
      
      - competitorComparison: array of 5 objects { name, visibility: string (e.g. "Top 3"), maps: boolean, status: string, context: string, tags: array of strings, position: string (e.g. "#1") }
      
      - detailedKeywords: array of 10 objects { keyword, intent, volume: number, kd: number, position: number, potential: "HAUT" | "MOYEN" | "FAIBLE" | "TRÈS HAUT" }
      
      - estimatedLoss: object { monthlySearches: number, lostVisitors: number, lostLeads: number, lostRevenue: string (e.g. "€6.3K"), description: string }
      
      - issues: array of 6 objects { title, desc: string, severity: "critical" | "major" | "medium" | "low", type: string (e.g. "GBP", "Pages Services", "Schema", "FAQ", "Social", "Geo") }
      
      - opportunities: array of 9 objects { title, description: string, speed: "RAPIDE" | "MOYEN" | "LENT", impact: string }
      
      - roadmap: object { 
          phase1: { title: "FONDATIONS", duration: "MOIS 1", actions: array of strings },
          phase2: { title: "CONTENU + SOCIAL", duration: "MOIS 2-3", actions: array of strings },
          phase3: { title: "DOMINATION", duration: "MOIS 4-6", actions: array of strings }
        }
        
      - projections: object {
          month3: { positions: string, aiVisibility: string, visitors: number, leads: number, revenue: string },
          month6: { positions: string, aiVisibility: string, visitors: number, leads: number, revenue: string },
          month12: { positions: string, aiVisibility: string, visitors: number, leads: number, revenue: string }
        }
        
      - llmDetails: array of 4 objects { 
          name: string (ChatGPT, Perplexity, Gemini, Claude), 
          status: "INVISIBLE" | "PARTIAL" | "VISIBLE", 
          cause: string, 
          impact: string, 
          recommendation: string, 
          competitorsCited: array of strings, 
          tags: array of strings, 
          trafficShare: string (e.g. "45%"), 
          lostLeads: number 
        }
      - llmRatings: array of 5 objects { model, score: number, status, reasoning }

      - scores: object { visibility: number, sentiment: number, authority: number, accuracy: number }
      - platformVisibility: array of 6 objects { name, score: number, avg: number }
      - perceptions: array of 4 objects { label, value: number, context: string }
      - brandPerceptionDetails: object { sentiment: { positive: number, neutral: number, negative: number }, topAttributes: array of { label, score }, userFeedbackSummary: string }
      - recommendations: array of 3 strings
      - technicalHealth: object { performance: number, accessibility: number, bestPractices: number, seo: number, coreWebVitals: "Passing" | "Needs Improvement" | "Failing" }
      - semanticDensity: number (0-100)
      - semanticTerms: array of at least 25 objects { term, density: number, status: "optimal" | "low" | "high" }
      - semanticGap: array of 5 objects { term, clientDensity: number, competitorDensity: number, gap: number, priority: "HAUTE" | "MOYENNE" | "FAIBLE" }
      - semanticMapping: array of 4 objects { category, terms: array of strings, relevance: number }
      - aiSearchPresence: array of 4 objects { platform, status, context }
      - errors: array of strings
      - warnings: array of strings
      - notices: array of strings
      - keywords: array of strings
      - pageTitle: string
      - pageContent: string
      - blogTitle: string
      - blogExcerpt: string
      - seoTips: array of strings
      - marketAnalysis: string
      - aiRecommendation: string
      - roiEstimate: string
      - growthStrategy: string
      - cta: string
      - visionStatement: string
      
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
            Your goal is to analyze the URL provided and convince the business owner that they are losing a massive amount of money by being invisible on AI search engines (ChatGPT, Gemini, Perplexity, Claude) and Google Maps. 
            
            STRICT RULES:
            1. IDENTIFY THE BUSINESS CORRECTLY: Use googleSearch to find the REAL name and REAL industry of the URL. If the URL is eveom.fr, it is a renovation company, NOT a web agency.
            2. TONE: Be professional, data-driven, and slightly aggressive to create urgency.
            3. DATA REALISM: You MUST provide highly realistic data based on search results. If the business is a small local shop, their AI visibility, LLM ratings, and SEO scores MUST be very low (0-20). Do not invent high scores for unknown brands.
            4. ZERO HALLUCINATION: Avoid inventing data at all costs. Use REAL local rankings and REAL search data. If specific information is missing, provide a professional estimate based on similar businesses, but clearly state the analysis is based on predictive modeling.
            4. DATA COMPLETENESS: You MUST provide realistic data for ALL requested JSON fields. Do not leave arrays empty.
            5. NO SELF-IDENTIFICATION: Never say you are Renk or that the client is Renk.
            6. LOCAL FOCUS: Find the city/region of the business and use it in your analysis.
            7. AUDIT BLOCKS: Your audit MUST cover exactly these 9 blocks of information:
               - Hero Metrics (Visibility, Keywords, Indexed Pages, AI Ratio)
               - Competitor Analysis (Top 5 local competitors with detailed status and tags)
               - Keyword Positions (Top 10 keywords with volume, position, and potential)
               - Financial Losses (Estimated CA lost per month/year)
               - Diagnostic (6 critical/major issues with detailed descriptions)
               - Opportunities (9 quick wins categorized by speed and impact)
               - Roadmap (3 phases: Foundations, Content, Domination)
               - Projections (3, 6, and 12 months growth estimates)
               - AI/LLM Visibility (Detailed breakdown for ChatGPT, Perplexity, Gemini, Claude)
            8. SEMANTIC QUALITY: The content must be ultra-qualitative, specific to the user's industry, and provide deep strategic value.`,
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
      
      // Save to Firestore if user is logged in
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (!userData.firstAudit) {
              await setDoc(userRef, { firstAudit: { ...data, growthProjection, date: new Date().toISOString() } }, { merge: true });
            }
          }
        } catch (e) {
          console.error("Failed to save first audit to profile:", e);
        }
      }

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

      const fallbackData: AuditData = {
        companyName: lang === 'fr' ? "Votre Entreprise" : lang === 'es' ? "Su Empresa" : "Your Business",
        industry: lang === 'fr' ? "Rénovation de l'habitat" : lang === 'es' ? "Renovación de viviendas" : "Home Renovation",
        riskLevel: "high",
        seoScore: 37,
        hook: lang === 'fr' ? "Votre entreprise est invisible sur Google sur 78% des recherches clés" : lang === 'es' ? "Su empresa es invisible en Google en el 78% de las búsquedas clave" : "Your business is invisible on Google for 78% of key searches",
        localVisibilityScore: 37,
        aiReadinessScore: 35,
        indexedPages: 12,
        top10KeywordsCount: 0,
        aiVisibilityRatio: "0/4",
        competitorComparison: [
          { name: "Concurrent A", visibility: "Top 3", maps: true, status: "Dominant", context: "Leader local", tags: ["SEO", "Maps"], position: "#1" },
          { name: "Concurrent B", visibility: "Top 5", maps: true, status: "Established", context: "Présence forte", tags: ["Ads"], position: "#4" },
          { name: "Vous", visibility: "> 20", maps: false, status: "Invisible", context: "Aucune donnée", tags: [], position: "N/A" }
        ],
        detailedKeywords: [
          { keyword: "rénovation maison", intent: "Commercial", volume: 1200, kd: 45, position: 18, potential: "HAUT", opportunityScore: 85 },
          { keyword: "devis travaux", intent: "Commercial", volume: 850, kd: 62, position: 12, potential: "MOYEN", opportunityScore: 72 }
        ],
        estimatedLoss: { 
          monthlySearches: 1200,
          lostVisitors: 720,
          lostLeads: 36,
          lostRevenue: "€4.5K",
          description: "Perte estimée basée sur le volume de recherche local." 
        },
        issues: [
          { title: "Schema Manquant", desc: "Le balisage LocalBusiness est absent", severity: "critical", type: "Schema" },
          { title: "Vitesse Mobile", desc: "Le temps de chargement mobile est lent", severity: "major", type: "Performance" }
        ],
        opportunities: [
          { title: "Mots-clés locaux", description: "Ciblez des termes spécifiques à votre ville", speed: "RAPIDE", impact: "HAUT" }
        ],
        roadmap: {
          phase1: { title: "FONDATIONS", duration: "MOIS 1", actions: ["Audit technique", "Optimisation GBP"] },
          phase2: { title: "CONTENU", duration: "MOIS 2-3", actions: ["Création de 20 pages"] },
          phase3: { title: "DOMINATION", duration: "MOIS 4-6", actions: ["Optimisation IA"] }
        },
        projections: {
          month3: { positions: "Top 10", aiVisibility: "20%", visitors: 150, leads: 8, revenue: "€2K" },
          month6: { positions: "Top 5", aiVisibility: "50%", visitors: 400, leads: 20, revenue: "€5K" },
          month12: { positions: "Top 3", aiVisibility: "85%", visitors: 1000, leads: 50, revenue: "€12K" }
        },
        llmDetails: [
          { name: "ChatGPT", status: "INVISIBLE", cause: "Manque de citations", impact: "Perte de visibilité IA", recommendation: "Optimiser le contenu", competitorsCited: [], tags: [], trafficShare: "0%", lostLeads: 10 }
        ],
        keywords: [
          { term: "SEO Local", volume: "1000", difficulty: 50, currentRank: 10 },
          { term: "IA", volume: "500", difficulty: 60, currentRank: 15 }
        ],
        pageTitle: "Audit de Visibilité",
        pageContent: "Contenu d'exemple pour l'audit.",
        blogTitle: "Le futur du SEO",
        blogExcerpt: "L'IA change tout.",
        seoTips: ["Optimisez votre fiche Google"],
        marketAnalysis: "Opportunité majeure de domination locale.",
        aiRecommendation: "Focus sur l'autorité sémantique.",
        roiEstimate: "300% sur 12 mois",
        scores: { visibility: 37, sentiment: 45, authority: 28, accuracy: 92 },
        platformVisibility: [
          { name: "Google", score: 35, avg: 60 },
          { name: "ChatGPT", score: 10, avg: 50 }
        ],
        perceptions: [
          { label: "Expertise", value: 45 }
        ],
        recommendations: ["Optimiser le contenu pour l'IA"],
        semanticAuthorityScore: 28,
        technicalHealth: { performance: 65, accessibility: 78, bestPractices: 82, seo: 45, coreWebVitals: "Needs Improvement" },
        errors: ["Erreur technique"],
        warnings: ["Avertissement SEO"],
        notices: ["Notice"],
        cta: "Lancer la stratégie",
        visionStatement: "Dominez votre marché local."
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

  const renderAuditResults = () => {
    if (!auditData) return null;

    return (
      <div className="space-y-12">
        {/* Main Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: t.scoreVisibility, value: auditData.scores?.visibility || 0, color: 'text-primary', icon: Eye, desc: t.auditAiVisibility },
            { label: t.scoreSentiment, value: auditData.scores?.sentiment || 0, color: 'text-info', icon: Smile, desc: t.auditBrandSentiment },
            { label: t.scoreAuthority, value: auditData.scores?.authority || 0, color: 'text-primary', icon: Award, desc: t.auditSemanticAuthority },
            { label: t.scoreAccuracy, value: auditData.scores?.accuracy || 0, color: 'text-warning', icon: CheckCircle, desc: t.auditDataAccuracy }
          ].map((score, i) => (
            <div key={i} className="card p-8 text-center group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-main opacity-50`} />
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
              <Activity className="w-6 h-6 text-primary" />
              {t.auditTechnicalHealth}
            </h4>
            <div className="space-y-6">
              {[
                { label: t.auditPerformance, value: auditData.technicalHealth?.performance || 0, color: 'bg-primary' },
                { label: t.auditAccessibility, value: auditData.technicalHealth?.accessibility || 0, color: 'bg-info' },
                { label: t.auditBestPractices, value: auditData.technicalHealth?.bestPractices || 0, color: 'bg-primary' },
                { label: t.auditSeo, value: auditData.technicalHealth?.seo || 0, color: 'bg-warning' }
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-text-muted">{metric.label}</span>
                    <span className="text-text">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-text-muted">{t.auditCoreWebVitals}</span>
                  <span className={`text-xs font-bold ${
                    auditData.technicalHealth?.coreWebVitals === 'Passing' ? 'text-success' : 
                    auditData.technicalHealth?.coreWebVitals === 'Needs Improvement' ? 'text-warning' : 'text-error'
                  }`}>
                    {auditData.technicalHealth?.coreWebVitals || 'N/A'}
                  </span>
                </div>
              </div>
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

        {/* Semantic Gap Analysis */}
        {auditData.semanticGap && auditData.semanticGap.length > 0 && (
          <div className="card p-8">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-warning" />
              {t.auditSemanticGap}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t.auditSemanticTerm}</th>
                    <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t.auditClientDensity}</th>
                    <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t.auditCompetitorDensity}</th>
                    <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t.auditGap}</th>
                    <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t.auditPriority}</th>
                  </tr>
                </thead>
                <tbody>
                  {auditData.semanticGap.map((gap, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-bg-secondary/50 transition-colors">
                      <td className="py-4 font-bold text-text">{gap.term}</td>
                      <td className="py-4 text-center font-mono text-sm text-text-secondary">{gap.clientDensity}%</td>
                      <td className="py-4 text-center font-mono text-sm text-text-secondary">{gap.competitorDensity}%</td>
                      <td className="py-4 text-center">
                        <span className="text-error font-black">-{gap.gap}%</span>
                      </td>
                      <td className="py-4 text-right">
                        <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-widest ${
                          gap.priority === 'HAUTE' ? 'bg-error/10 text-error' :
                          gap.priority === 'MOYENNE' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                        }`}>
                          {gap.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Strategic Analysis Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {auditData.marketAnalysis && (
            <div className="card p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                {t.auditMarketAnalysis}
              </h4>
              <p className="text-text-secondary leading-relaxed font-bold">
                {auditData.marketAnalysis}
              </p>
            </div>
          )}
          {auditData.aiRecommendation && (
            <div className="card p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                {t.auditGrowthStrategy}
              </h4>
              <p className="text-text-secondary leading-relaxed font-bold italic">
                "{auditData.aiRecommendation}"
              </p>
            </div>
          )}
        </div>

        {/* Roadmap & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-primary" />
              {t.auditRoadmapParallel}
            </h4>
            <div className="space-y-8">
              {['phase1', 'phase2', 'phase3'].map((phaseKey, i) => {
                const phase = auditData.roadmap?.[phaseKey as keyof typeof auditData.roadmap];
                if (!phase) return null;
                return (
                  <div key={i} className="relative pl-8 border-l-2 border-border">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-primary" />
                    <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">{phase.duration}</div>
                    <h5 className="text-lg font-bold text-text mb-3">{phase.title}</h5>
                    <ul className="space-y-2">
                      {phase.actions.map((action, j) => (
                        <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-8">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              {t.auditAiRecommendations}
            </h4>
            <div className="space-y-6">
              {auditData.recommendations && auditData.recommendations.length > 0 ? (
                auditData.recommendations.map((rec, i) => (
                  <div key={i} className="p-4 rounded-md bg-bg-secondary border border-border flex gap-4 hover:border-primary/30 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary font-black group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-sm text-text font-medium leading-relaxed">{rec}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-text-muted italic p-4 text-center border border-border rounded-md">
                  Recommandations non disponibles.
                </div>
              )}
              <button 
                onClick={() => setView('conversion')}
                className="btn-primary w-full mt-4 py-4 flex items-center justify-center gap-2"
              >
                {t.auditDeployBtn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Opportunity */}
        {(auditData.blogTitle || auditData.blogExcerpt) && (
          <div className="card p-8 group overflow-hidden relative border-primary/20 bg-primary/5 mt-8">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 p-2 rounded-md">
                   <FileText className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{t.auditNewAiArticle}</h4>
              </div>
              <h5 className="text-2xl font-black text-text mb-4 group-hover:text-primary transition-colors tracking-tight">
                {auditData.blogTitle}
              </h5>
              <p className="text-text-secondary mb-6 leading-relaxed max-w-3xl font-bold text-lg">
                {auditData.blogExcerpt}
              </p>
              <div className="flex flex-wrap gap-4">
                {auditData.seoTips?.map((tip: string, i: number) => (
                  <span key={i} className="text-[10px] px-3 py-1 bg-bg-secondary border border-border rounded-full font-black uppercase tracking-widest text-text-muted">
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (view === 'dashboard') {
    return renderDashboard();
  }

  if (view === 'conversion') {
    return <Conversion />;
  }

  if (view === 'blog') {
    return (
      <BlogList 
        onBack={() => setView('landing')} 
        onSelectPost={(post) => {
          setSelectedPost(post);
          setView('article');
          window.scrollTo(0, 0);
        }} 
      />
    );
  }

  if (view === 'article' && selectedPost) {
    return (
      <ArticleView 
        post={selectedPost} 
        onBack={() => setView('blog')} 
        onHome={() => setView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-text font-sans selection:bg-primary/30 relative overflow-x-hidden">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={(u) => setUser(u)}
        initialMode={authMode}
      />
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
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
        </div>
      )}

      {/* Navbar */}
      {auditStep === 'idle' && (
        <Navbar 
          showNavbar={showNavbar}
          user={user}
          setView={setView}
          setActiveTab={setActiveTab}
          setIsAuthModalOpen={setIsAuthModalOpen}
          setAuthMode={setAuthMode}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          t={t}
        />
      )}

      {/* Hero */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 ${auditStep === 'idle' ? 'pt-24 sm:pt-20' : 'pt-8'} pb-12 sm:pb-16`}>
        {auditStep === 'idle' && (
          <Hero 
            y2={y2}
            opacity={opacity}
            t={t}
            aiLogos={aiLogos}
          />
        )}

        {/* Interactive Audit Tool Section */}
        <AuditTool 
          auditStep={auditStep}
          auditUrl={auditUrl}
          setAuditUrl={setAuditUrl}
          handleStartAuditTrigger={handleStartAuditTrigger}
          analysisProgress={analysisProgress}
          auditData={auditData}
          handleShare={handleShare}
          handleDownload={handleDownload}
          isDownloading={isDownloading}
          setAuditStep={setAuditStep}
          t={t}
          renderAuditResults={renderAuditResults}
        />


        {/* Dashboard Preview */}
        {auditStep === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 sm:mt-32 relative group max-w-5xl mx-auto px-4 sm:px-6"
          >
            <div className="absolute -inset-1 bg-gradient-main rounded-md blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-surface border border-border rounded-md overflow-hidden shadow-soft">
            <div className="bg-bg-secondary border-b border-border p-3 flex items-center relative z-20">
                <div className="flex gap-1.5 absolute left-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/20" />
                </div>
                <div className="h-6 w-48 bg-bg-primary rounded-full mx-auto flex items-center justify-center border border-border/50">
                  <span className="text-[10px] font-medium text-text-muted">renk.io</span>
                </div>
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
          <div className="mt-8 sm:mt-20 relative px-4 sm:px-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-[120px] -z-10 opacity-30" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { 
                  label: t.statSitesIndexed, 
                  value: 228, 
                  suffix: '', 
                  icon: <Search className="w-5 h-5" />, 
                  color: "text-blue-600", 
                  glow: "group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.12)]",
                  gradient: "from-blue-200 via-cyan-200 to-blue-200"
                },
                { 
                  label: t.statLeadsGenerated, 
                  value: 12, 
                  suffix: 'k+', 
                  icon: <Sparkles className="w-5 h-5" />, 
                  color: "text-amber-500", 
                  glow: "group-hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]",
                  gradient: "from-amber-200 via-yellow-200 to-amber-200"
                },
                { 
                  label: t.statAvgRoi, 
                  value: 233, 
                  suffix: '%', 
                  icon: <TrendingUp className="w-5 h-5" />, 
                  color: "text-emerald-500", 
                  glow: "group-hover:shadow-[0_15px_40px_rgba(16,185,129,0.12)]",
                  gradient: "from-emerald-200 via-teal-200 to-emerald-200"
                },
                { 
                  label: t.statCitiesCovered, 
                  value: 90, 
                  suffix: '', 
                  icon: <MapPin className="w-5 h-5" />, 
                  color: "text-rose-500", 
                  glow: "group-hover:shadow-[0_15px_40px_rgba(244,63,94,0.12)]",
                  gradient: "from-rose-200 via-red-200 to-rose-200"
                }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className={`group relative p-4 sm:p-6 rounded-3xl bg-white border border-gray-100/80 transition-all duration-500 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[180px] ${stat.glow} hover:-translate-y-1.5`}
                >
                  {/* Multicolored Shadow Layer */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10`} />
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center w-full">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-white transition-all duration-500 shadow-sm relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      {React.cloneElement(stat.icon as React.ReactElement<{ className?: string }>, { className: `w-4 h-4 sm:w-6 sm:h-6 ${stat.color} transition-transform duration-500 group-hover:scale-110` })}
                    </div>
                    
                    <div className="text-2xl sm:text-5xl font-bold text-black tracking-tighter mb-1.5 sm:mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    
                    <div className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] leading-relaxed group-hover:text-black transition-colors duration-500 px-2">
                      {stat.label}
                    </div>
                  </div>

                  {/* Smart Bottom Indicator */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "30px" }}
                    className={`absolute bottom-4 h-1 rounded-full bg-gradient-to-r ${stat.gradient} opacity-20 group-hover:opacity-100 group-hover:w-16 transition-all duration-500`}
                  />
                </motion.div>
              ))}
            </div>
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
                                    <span className="text-primary">{comp.aiVisibilityScore || comp.visibility || 0}%</span>
                                  </div>
                                  <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${comp.aiVisibilityScore || comp.visibility || 0}%` }}
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
                            Vous perdez environ <span className="text-error">{auditData.estimatedLoss?.lostRevenue || 'un montant significatif'}</span> par mois
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
                            {auditData.roadmap ? (
                              Object.entries(auditData.roadmap).map(([key, phase], idx) => (
                                <div key={idx} className="p-4 bg-bg-secondary rounded-md border border-border">
                                  <div className="font-bold text-text mb-1">{phase.title}</div>
                                  <p className="text-sm text-text-secondary">{phase.duration}: {phase.actions.join(', ')}</p>
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


        {/* Features - Redesigned with Qualitative Interactive Visuals */}
        {auditStep === 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 sm:mt-48 md:mt-64 space-y-32 sm:space-y-48 md:space-y-64 max-w-7xl mx-auto px-4 sm:px-6"
          >
            {[
              { 
                title: t.feat1Title, 
                desc: t.feat1Desc, 
                align: 'left',
                color: "from-blue-500 to-cyan-400",
                visual: (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                          className="absolute w-48 h-48 border border-blue-400/30 rounded-full"
                        />
                      ))}
                    </div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute w-64 h-64 border-t-2 border-blue-500/20 rounded-full"
                    />
                    <div className="relative z-10 bg-white p-6 rounded-3xl shadow-xl border border-blue-50 flex flex-col items-center">
                      <ShieldCheck className="w-12 h-12 text-blue-500 mb-3" />
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{lang === 'fr' ? 'Zone Protégée' : 'Protected Zone'}</div>
                      <div className="text-2xl font-black text-gray-900 mt-1">50 KM</div>
                    </div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/4 right-1/4 bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-500">{lang === 'fr' ? 'EXCLUSIF' : 'EXCLUSIVE'}</span>
                    </motion.div>
                  </div>
                )
              },
              { 
                title: t.feat2Title, 
                desc: t.feat2Desc, 
                align: 'right',
                color: "from-indigo-500 to-purple-400",
                visual: (
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-[320px] bg-gray-50/50 rounded-[2rem] border border-gray-100 p-4 space-y-3 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lang === 'fr' ? 'Moteur de Recommandation IA' : 'AI Recommendation Engine'}</div>
                      </div>
                      {[
                        { text: lang === 'fr' ? "Qui est le meilleur en ville ?" : "Who is the best in town?", sender: "user" },
                        { text: lang === 'fr' ? "D'après les données récentes, Renk est le meilleur choix." : "Based on recent data, Renk is the top choice.", sender: "ai" },
                        { text: lang === 'fr' ? "Pourquoi Renk ?" : "Why Renk?", sender: "user" }
                      ].map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.5 + 0.5 }}
                          className={`p-3 rounded-2xl text-xs font-medium max-w-[80%] ${msg.sender === 'user' ? 'bg-white ml-auto text-gray-600 shadow-sm' : 'bg-indigo-500 text-white shadow-md shadow-indigo-200'}`}
                        >
                          {msg.text}
                        </motion.div>
                      ))}
                      <motion.div 
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" 
                      />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-3xl shadow-xl border border-indigo-50 flex items-center justify-center"
                    >
                      <Brain className="w-10 h-10 text-indigo-500" />
                    </motion.div>
                  </div>
                )
              },
              { 
                title: t.feat3Title, 
                desc: t.feat3Desc, 
                align: 'left',
                color: "from-violet-500 to-fuchsia-400",
                visual: (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full max-w-[300px] aspect-square">
                      {/* Central AI Hub */}
                      <motion.div 
                        animate={{ 
                          boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 40px rgba(139, 92, 246, 0.6)", "0 0 20px rgba(139, 92, 246, 0.3)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 m-auto w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-2xl z-20"
                      >
                        <Cpu className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      {/* Rotating Orbit */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-violet-200 rounded-full"
                      />

                      {/* Satellite Nodes */}
                      {[
                        { label: lang === 'fr' ? "Audit" : "Audit", angle: 0, icon: Search },
                        { label: lang === 'fr' ? "Contenu" : "Content", angle: 120, icon: PenTool },
                        { label: lang === 'fr' ? "Indexation" : "Indexing", angle: 240, icon: Globe }
                      ].map((node, i) => {
                        const radius = 110;
                        const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                        const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                        return (
                          <div key={i} className="absolute inset-0 m-auto pointer-events-none">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.2 + 0.5 }}
                              className="absolute w-16 h-16 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-lg z-30"
                              style={{ left: `calc(50% + ${x}px - 32px)`, top: `calc(50% + ${y}px - 32px)` }}
                            >
                              <node.icon className="w-5 h-5 text-violet-500 mb-1" />
                              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tight">{node.label}</span>
                            </motion.div>
                            
                            {/* Connecting Pulse */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ 
                                left: ["50%", `calc(50% + ${x}px)`],
                                top: ["50%", `calc(50% + ${y}px)`],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                              className="absolute w-2 h-2 bg-violet-400 rounded-full blur-[2px] z-10"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.21, 1.02, 0.47, 0.98] }}
                className={`flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
              >
                {/* Text Content */}
                <div className={`w-full md:w-1/2 text-center md:text-left ${feature.align === 'right' ? 'md:text-left' : ''}`}>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 md:mb-6 leading-[1.2]">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm sm:text-lg md:text-xl leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
                    {feature.desc}
                  </p>
                </div>

                {/* Visual Element */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.03] blur-3xl rounded-full scale-150`} />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10 w-full aspect-square max-w-[300px] sm:max-w-[400px] md:max-w-[450px] rounded-[2.5rem] sm:rounded-[3rem] bg-white border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] flex items-center justify-center group overflow-hidden"
                  >
                    <div className="scale-[0.7] sm:scale-90 md:scale-100 w-full h-full flex items-center justify-center">
                      {feature.visual}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* How it Works - Redesigned for Sensational Interaction */}
        {auditStep === 'idle' && (
          <motion.div 
            id="how-it-works" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-32 sm:mt-48 md:mt-64 pt-24 sm:pt-32 border-t border-gray-100 relative max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden"
          >
            <div className="text-center mb-24 sm:mb-32 md:mb-48">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-4 h-4" />
                {lang === 'fr' ? 'Processus de Domination' : 'Domination Process'}
              </motion.div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900 leading-[1.1]">{t.howTitle}</h2>
              <p className="text-gray-500 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">{t.howSub}</p>
            </div>
            
            <div className="relative">
              {/* Vertical Progress Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
              
              <div className="space-y-24 sm:space-y-32 md:space-y-48 relative">
                {[
                  { 
                    step: "01", 
                    title: t.step1Title, 
                    desc: t.step1Desc, 
                    icon: Search,
                    color: "from-blue-500 to-cyan-400",
                    shadow: "shadow-blue-200/50",
                    visual: (
                      <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
                        {/* 3D Wireframe Sphere Background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <motion.div 
                            animate={{ rotateY: 360, rotateX: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-80 h-80 border border-blue-500 rounded-full relative"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            {[...Array(6)].map((_, j) => (
                              <div 
                                key={j} 
                                className="absolute inset-0 border border-blue-400 rounded-full" 
                                style={{ transform: `rotateY(${j * 30}deg)` }} 
                              />
                            ))}
                          </motion.div>
                        </div>

                        {/* Central Scanning Interface */}
                        <div className="relative z-10 w-full max-w-[300px] aspect-square bg-white/5 backdrop-blur-xl rounded-[3.5rem] border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden">
                          {/* Scanning Laser Ring */}
                          <motion.div 
                            animate={{ 
                              top: ["-10%", "110%", "-10%"],
                              opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] z-30"
                          />

                          <div className="relative z-20 flex flex-col items-center p-8 w-full">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 border border-blue-50 relative group">
                              <Search className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl"
                              />
                            </div>
                            
                            {/* Data Readout */}
                            <div className="w-full space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-[8px] font-black text-blue-600 tracking-widest uppercase">Market Scan</span>
                                <span className="text-[8px] font-mono text-blue-400">98.4%</span>
                              </div>
                              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                  animate={{ width: ["0%", "100%", "0%"] }}
                                  transition={{ duration: 4, repeat: Infinity }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {[...Array(4)].map((_, j) => (
                                  <div key={j} className="h-4 bg-gray-50 rounded border border-gray-100 flex items-center px-2">
                                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                                    <div className="h-1 w-full bg-gray-200 rounded-full" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating Tech Elements */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {[...Array(4)].map((_, j) => (
                            <div 
                              key={j}
                              className="absolute w-12 h-12 border border-blue-200/30 rounded-lg flex items-center justify-center"
                              style={{ 
                                top: '50%', 
                                left: '50%', 
                                transform: `rotate(${j * 90}deg) translate(140px) rotate(-${j * 90}deg)` 
                              }}
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    )
                  },
                  { 
                    step: "02", 
                    title: t.step2Title, 
                    desc: t.step2Desc, 
                    icon: Rocket,
                    color: "from-indigo-500 to-purple-400",
                    shadow: "shadow-indigo-200/50",
                    visual: (
                      <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
                        {/* Neural Network Background */}
                        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
                          {[...Array(10)].map((_, j) => (
                            <g key={j}>
                              <circle cx={50 + j * 30} cy={50 + Math.sin(j) * 100 + 100} r="2" fill="#6366f1" />
                              <line 
                                x1={50 + j * 30} 
                                y1={50 + Math.sin(j) * 100 + 100} 
                                x2={50 + (j+1) * 30} 
                                y2={50 + Math.sin(j+1) * 100 + 100} 
                                stroke="#6366f1" 
                                strokeWidth="0.5" 
                              />
                            </g>
                          ))}
                        </svg>

                        {/* Deployment Matrix 3D Effect */}
                        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                          <div className="grid grid-cols-6 gap-2 rotate-[25deg] skew-x-[-10deg]">
                            {[...Array(36)].map((_, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0.1, y: 0 }}
                                animate={{ 
                                  opacity: [0.1, 0.6, 0.1],
                                  y: [0, -10, 0],
                                  backgroundColor: ["#f3f4f6", "#6366f1", "#f3f4f6"]
                                }}
                                transition={{ 
                                  duration: 4, 
                                  repeat: Infinity, 
                                  delay: j * 0.1 
                                }}
                                className="w-8 h-8 rounded-lg border border-gray-100 shadow-sm"
                              />
                            ))}
                          </div>

                          {/* Central Command Hub */}
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.02, 1],
                              rotate: [0, 2, -2, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute inset-0 m-auto w-48 h-48 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(99,102,241,0.3)] border border-indigo-50 flex flex-col items-center justify-center z-20"
                          >
                            <div className="relative mb-4">
                              <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200">
                                <Rocket className="w-10 h-10 text-white" />
                              </div>
                              <motion.div 
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl"
                              />
                            </div>
                            
                            <div className="text-center space-y-1">
                              <div className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">{lang === 'fr' ? 'DÉPLOIEMENT ACTIF' : 'ACTIVE DEPLOYMENT'}</div>
                              <div className="flex items-center justify-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-mono text-gray-400">50/50 NODES</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Data Streams */}
                        {[...Array(3)].map((_, j) => (
                          <motion.div
                            key={j}
                            animate={{ 
                              x: [-200, 400],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: j * 0.7, ease: "linear" }}
                            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-indigo-400 to-transparent z-30"
                            style={{ top: `${30 + j * 20}%` }}
                          />
                        ))}
                      </div>
                    )
                  },
                  { 
                    step: "03", 
                    title: t.step3Title, 
                    desc: t.step3Desc, 
                    icon: TrendingUp,
                    color: "from-violet-500 to-fuchsia-400",
                    shadow: "shadow-violet-200/50",
                    visual: (
                      <div className="relative w-full h-full flex items-center justify-center p-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className="w-full h-full bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(139,92,246,0.2)] border border-gray-100 p-8 flex flex-col relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'fr' ? 'PERFORMANCE' : 'PERFORMANCE'}</div>
                              <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-3xl font-black text-gray-900"
                              >
                                +412%
                              </motion.div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center shadow-inner">
                              <TrendingUp className="w-7 h-7 text-violet-500" />
                            </div>
                          </div>

                          {/* Dynamic 3D-like Chart Bars */}
                          <div className="flex-1 flex items-end gap-4">
                            {[30, 55, 40, 85, 65, 100].map((h, j) => (
                              <div key={j} className="flex-1 relative group h-full flex items-end">
                                <motion.div
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${h}%` }}
                                  transition={{ duration: 1.5, delay: j * 0.1, ease: "easeOut" }}
                                  className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-400 rounded-t-xl relative"
                                >
                                  {/* Glossy overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-30" />
                                  
                                  {/* Floating Value */}
                                  <motion.div 
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: j * 0.2 }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-violet-600"
                                  >
                                    {h}%
                                  </motion.div>
                                </motion.div>
                              </div>
                            ))}
                          </div>

                          {/* Data Particles */}
                          {[...Array(10)].map((_, j) => (
                            <motion.div
                              key={j}
                              animate={{ 
                                y: [0, -100],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{ duration: 4, repeat: Infinity, delay: j * 0.4 }}
                              className="absolute w-1 h-1 bg-fuchsia-400 rounded-full"
                              style={{ bottom: '10%', left: `${10 + j * 8}%` }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    )
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    transition={{ duration: 0.8, delay: i * 0.1 }} 
                    className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative`}
                  >
                    {/* Step Number Circle (Center) */}
                    <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-gray-50 rounded-full hidden md:flex items-center justify-center z-20 shadow-xl">
                      <span className="text-xl font-black text-gray-900">{item.step}</span>
                    </div>

                    {/* Content Side */}
                    <div className={`w-full md:w-1/2 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-2xl ${item.shadow} mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500`}>
                        <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-900 tracking-tight leading-tight">{item.title}</h3>
                      <p className="text-gray-500 text-base sm:text-xl leading-relaxed font-medium max-w-xl mx-auto md:mx-0">{item.desc}</p>
                    </div>

                    {/* Visual Side */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-video rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="scale-[0.8] sm:scale-90 md:scale-100 w-full h-full">
                            {item.visual}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Testimonials Marquee */}
        {auditStep === 'idle' && (
          <div className="mt-32 sm:mt-40 md:mt-56 pt-24 sm:pt-32 pb-8 sm:pb-12 border-t border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <div className="text-center mb-16 sm:mb-24 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">{t.testimonialsTitle}</h2>
              <p className="text-gray-500 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">{t.testimonialsSub}</p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {/* Row 1: Left to Right */}
              <div className="flex overflow-hidden group">
                <motion.div 
                  animate={{ x: [0, -1920] }}
                  transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="flex gap-6 sm:gap-8 whitespace-nowrap px-4"
                >
                  {[
                    { name: "Marc D.", role: "Plomberie Express", content: "Depuis qu'on est passé sur Renk, mon téléphone n'arrête pas de sonner. L'exclusivité sur Annecy change tout.", city: "Annecy", rating: 5 },
                    { name: "Elena R.", role: "Cabinet Dentaire", content: "Les patients nous trouvent maintenant via ChatGPT. C'est un flux constant de nouveaux rendez-vous qualifiés.", city: "Lyon", rating: 5 },
                    { name: "Thomas L.", role: "Immo Prestige", content: "Le monopole local est un avantage injuste. Mes concurrents sont invisibles sur les nouveaux moteurs IA.", city: "Bordeaux", rating: 4 },
                    { name: "Sophie M.", role: "Avocat Associé", content: "Une visibilité sémantique impressionnante. Nous dominons les recherches juridiques sur tout le secteur.", city: "Paris", rating: 5 },
                    { name: "Jean P.", role: "Garage du Centre", content: "L'audit gratuit m'a ouvert les yeux. Aujourd'hui, on capte 80% des recherches locales sur notre métier.", city: "Nantes", rating: 5 },
                    { name: "Marc D.", role: "Plomberie Express", content: "Depuis qu'on est passé sur Renk, mon téléphone n'arrête pas de sonner. L'exclusivité sur Annecy change tout.", city: "Annecy", rating: 5 },
                    { name: "Elena R.", role: "Cabinet Dentaire", content: "Les patients nous trouvent maintenant via ChatGPT. C'est un flux constant de nouveaux rendez-vous qualifiés.", city: "Lyon", rating: 5 },
                    { name: "Thomas L.", role: "Immo Prestige", content: "Le monopole local est un avantage injuste. Mes concurrents sont invisibles sur les nouveaux moteurs IA.", city: "Bordeaux", rating: 4 }
                  ].map((testimonial, i) => (
                    <div 
                      key={i}
                      className="w-[300px] sm:w-[400px] p-6 sm:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-soft shrink-0 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < Math.floor(testimonial.rating) ? 'text-green-500 fill-green-500' : 'text-gray-200 fill-gray-200'}`} 
                          />
                        ))}
                        <span className="ml-2 text-[10px] font-bold text-green-600">{testimonial.rating}</span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed mb-6 whitespace-normal">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 font-bold text-sm border border-gray-100">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{testimonial.role} • {testimonial.city}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Row 2: Right to Left */}
              <div className="flex overflow-hidden group">
                <motion.div 
                  animate={{ x: [-1920, 0] }}
                  transition={{ 
                    duration: 45, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="flex gap-6 sm:gap-8 whitespace-nowrap px-4"
                >
                  {[
                    { name: "Antoine S.", role: "Rénovation Pro", content: "Le pack d'ouverture a été rentabilisé en 15 jours. La qualité des leads est largement supérieure à Google Ads.", city: "Lille", rating: 5 },
                    { name: "Chloé D.", role: "L'Atelier Coiffure", content: "On est passé de l'ombre à la lumière. Les gens viennent de 30km à la ronde car ils nous voient partout.", city: "Marseille", rating: 5 },
                    { name: "Nicolas P.", role: "Expert Comptable", content: "Enfin une solution qui comprend les enjeux du SEO local moderne. L'automatisation nous fait gagner un temps fou.", city: "Toulouse", rating: 4.5 },
                    { name: "Sarah K.", role: "Ostéopathe", content: "Ma visibilité sur Google Business Profile a explosé. Je suis complet 3 semaines à l'avance désormais.", city: "Nice", rating: 5 },
                    { name: "Lucas G.", role: "Menuiserie Alu", content: "L'exclusivité est le vrai plus. Savoir que Renk ne travaillera pas avec mon voisin me rassure énormément.", city: "Strasbourg", rating: 5 },
                    { name: "Antoine S.", role: "Rénovation Pro", content: "Le pack d'ouverture a été rentabilisé en 15 jours. La qualité des leads est largement supérieure à Google Ads.", city: "Lille", rating: 5 },
                    { name: "Chloé D.", role: "L'Atelier Coiffure", content: "On est passé de l'ombre à la lumière. Les gens viennent de 30km à la ronde car ils nous voient partout.", city: "Marseille", rating: 5 },
                    { name: "Nicolas P.", role: "Expert Comptable", content: "Enfin une solution qui comprend les enjeux du SEO local moderne. L'automatisation nous fait gagner un temps fou.", city: "Toulouse", rating: 4.5 }
                  ].map((testimonial, i) => (
                    <div 
                      key={i}
                      className="w-[300px] sm:w-[400px] p-6 sm:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-soft shrink-0 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < Math.floor(testimonial.rating) ? 'text-green-500 fill-green-500' : 'text-gray-200 fill-gray-200'}`} 
                          />
                        ))}
                        <span className="ml-2 text-[10px] font-bold text-green-600">{testimonial.rating}</span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed mb-6 whitespace-normal">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 font-bold text-sm border border-gray-100">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{testimonial.role} • {testimonial.city}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        )}

        {/* FAQ Section */}
        {auditStep === 'idle' && <FAQ />}

        {/* Pricing */}
        {auditStep === 'idle' && (
          <motion.div 
            id="pricing" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-border mb-24 sm:mb-32 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-text drop-shadow-soft px-4">{t.priceTitle}</h2>
              <p className="text-text-secondary text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-6 mb-10">{t.priceSub}</p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-primary' : 'text-gray-400'}`}>Mensuel</span>
                <button 
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative w-14 h-7 bg-gray-100 rounded-full p-1 transition-colors hover:bg-gray-200"
                >
                  <motion.div 
                    animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                    className="w-5 h-5 bg-white rounded-full shadow-sm border border-gray-200"
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-primary' : 'text-gray-400'}`}>Annuel</span>
                  <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                    -15%
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-6 sm:p-10 rounded-[2.5rem] bg-white border border-primary/20 relative overflow-hidden shadow-premium group hover:border-primary/40 transition-all backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black text-text tracking-tight mb-1">{t.planName}</h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
                        Exclusivité 50km
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-text">
                          {billingCycle === 'monthly' ? '499€' : `${Math.round(499 * 0.85)}€`}
                        </span>
                      </div>
                      <div className="text-text-secondary text-xs font-bold uppercase tracking-widest">{t.planSetup}</div>
                    </div>
                  </div>

                  <div className="mb-10 p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-primary font-black text-xl sm:text-2xl">
                        {billingCycle === 'monthly' ? '299€' : `${Math.round(299 * 0.85)}€`}/mois
                      </div>
                      {billingCycle === 'annual' && (
                        <span className="text-[10px] font-black bg-green-100 text-green-600 px-2 py-1 rounded-md uppercase tracking-widest">
                          Économie -15%
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm font-medium mb-0">
                      {billingCycle === 'annual' ? 'Facturé annuellement (sans engagement après 12 mois)' : 'Sans engagement, résiliable à tout moment'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Zap className="w-3 h-3 text-amber-500" />
                        {t.setupTitle}
                      </h4>
                      <ul className="space-y-4">
                        {[t.setupItem1, t.setupItem2, t.setupItem3].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3 h-3 text-blue-500" />
                            </div>
                            <span className="text-sm font-bold text-text leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        {t.growthTitle}
                      </h4>
                      <ul className="space-y-4">
                        {[t.growthItem1, t.growthItem2, t.growthItem3].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                            </div>
                            <span className="text-sm font-bold text-text leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setView('conversion')}
                    className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
                  >
                    {t.planCta}
                  </button>
                  
                  <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                    Paiement sécurisé • Support prioritaire 7j/7
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-16 text-center text-text-secondary text-base font-bold bg-white/20 backdrop-blur-md px-4">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <RenkLogo className="h-16 w-auto" variant="small" />
          <div className="flex gap-8 text-sm uppercase tracking-widest text-gray-400">
            <a href="#how-it-works" className="hover:text-primary transition-colors">Processus</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Tarifs</a>
            <button 
              onClick={() => {
                setView('blog');
                window.scrollTo(0, 0);
              }}
              className="hover:text-primary transition-colors uppercase tracking-widest"
            >
              Blog
            </button>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
        <p className="tracking-wide text-sm opacity-60">© 2026 Renk. {t.footerRights}</p>
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
