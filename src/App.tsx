/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, useState, ReactNode, ErrorInfo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, Activity, Target, TrendingUp, Zap, CheckCircle2, Globe, BarChart3, X, Loader2, Bot, Database, Sparkles, MapPin, MousePointer2, LineChart as LineChartIcon, Users, Shield, Layout, FileText, Settings, Bell, User, ArrowLeft, MessageSquare, AlertCircle, Brain, PenTool, Rocket, Lock, Share2, Download, Eye, Smile, Award, CheckCircle, ArrowUpRight, Play, Mail, DollarSign, ListChecks, Cpu, Info, Quote, Check, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

import { GoogleGenAI } from "@google/genai";
import { AnimatedDashboard } from './components/AnimatedDashboard';
import AuditReport from './AuditReport';

type Lang = 'en' | 'fr' | 'es';

const aiLogos = [
  {
    name: 'Google',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: 'ChatGPT',
    svg: (
      <svg viewBox="0 0 2406 2406" className="w-8 h-8 " xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path id="chatgpt-path" d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"/>
        <use href="#chatgpt-path" transform="rotate(60 1203 1203)"/>
        <use href="#chatgpt-path" transform="rotate(120 1203 1203)"/>
        <use href="#chatgpt-path" transform="rotate(180 1203 1203)"/>
        <use href="#chatgpt-path" transform="rotate(240 1203 1203)"/>
        <use href="#chatgpt-path" transform="rotate(300 1203 1203)"/>
      </svg>
    )
  },
  {
    name: 'Gemini',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 scale-90" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0001 0C12.0001 6.62742 17.3727 12 24 12C17.3727 12 12.0001 17.3726 12.0001 24C12.0001 17.3726 6.62746 12 0 12C6.62746 12 12.0001 6.62742 12.0001 0Z" fill="url(#gemini-grad)"/>
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4"/>
            <stop offset="0.5" stopColor="#9B72CB"/>
            <stop offset="1" stopColor="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'Claude',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 scale-110" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.5a1.5 1.5 0 0 1 1.5 1.5v4.6l4-2.3a1.5 1.5 0 1 1 1.5 2.6l-4 2.3 4 2.3a1.5 1.5 0 1 1-1.5 2.6l-4-2.3v4.6a1.5 1.5 0 1 1-3 0v-4.6l-4 2.3a1.5 1.5 0 1 1-1.5-2.6l4-2.3-4-2.3a1.5 1.5 0 1 1 1.5-2.6l4 2.3V4a1.5 1.5 0 0 1 1.5-1.5z" fill="#D97757"/>
      </svg>
    )
  },
  {
    name: 'Perplexity',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 scale-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
      </svg>
    )
  },
  {
    name: 'Grok',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 " fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.265 5.638 5.899-5.638z"/>
      </svg>
    )
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
    navStart: "Run Free Audit",
    heroBadge: "The AI-First SEO Engine",
    heroTitle1: "Improve your visibility on",
    heroTitle2: "Google, ChatGPT and beyond.",
    heroSub: "The first audit tool that actually sells for you.",
    feat1Title: "Google Domination",
    feat1Desc: "Mass-generate hyper-targeted local landing pages that capture 100% of your city's search volume.",
    feat2Title: "AI Recommendation (AEO)",
    feat2Desc: "Our invisible semantic optimization ensures your brand is the primary citation in AI-powered search results.",
    feat3Title: "Autopilot Authority",
    feat3Desc: "Continuous content generation and technical SEO that builds long-term domain authority without lifting a finger.",
    howTitle: "How it works",
    howSub: "Three steps to local dominance.",
    step1Title: "Semantic Mapping",
    step1Desc: "We identify the exact intent behind local searches and AI queries in your specific territory.",
    step2Title: "Massive Deployment",
    step2Desc: "Our engine deploys dozens of high-converting pages, blog posts, and FAQs optimized for both humans and bots.",
    step3Title: "Market Lock",
    step3Desc: "We monitor, index, and update your content. One client per industry per city. Total exclusivity.",
    priceTitle: "Transparent Growth Plans",
    priceSub: "Enterprise-grade SEO performance at a fraction of the cost.",
    planName: "Market Leader",
    planSub: "Everything you need to own your local market.",
    planPrice: "$499",
    planSetup: "setup",
    planMo: "+ $199/mo maintenance",
    check1: "50+ Targeted Local Pages",
    check2: "AEO Optimization (ChatGPT/Gemini)",
    check3: "Monthly Authority Content",
    check4: "Instant Google Indexing",
    check5: "Real-time Performance Dashboard",
    check6: "Dedicated Growth Manager",
    planCta: "Claim Your Territory",
    auditTitle: "Deep AI Audit",
    auditSub: "Analyze your website's semantic visibility and local market potential in real-time.",
    auditPlaceholder: "Enter your URL (e.g. https://yourbusiness.com)",
    auditBtn: "Analyze Visibility",
    auditAnalyzing: "Crawling semantic data...",
    auditKeywords: "Mapping local competition...",
    auditStrategy: "Building growth roadmap...",
    auditBadge1: "Real-time Analysis",
    auditBadge2: "AI-Powered",
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
    auditLivePreviewBtn: "Preview Landing Pages",
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
    dashBack: "Back to Landing",
    dashOverview: "Overview",
    statTraffic: "Total Traffic",
    statKeywords: "Keywords Ranked",
    statLeads: "Leads Generated",
    statAuthority: "Domain Authority",
    testimonialsTitle: "Trusted by Local Leaders",
    testimonialsSub: "Join 500+ businesses dominating their local markets with RankEngine.",
    formTitle: "Start Your AI SEO Journey",
    formSub: "Join 500+ businesses dominating their local markets with RankEngine.ai. Get started today.",
    labelBiz: "Business Name",
    labelUrl: "Website URL",
    labelCity: "Target Region",
    labelEmail: "Work Email",
    btnCheck: "Get Started Now",
    btnProcessing: "Verifying...",
    successTitle: "Territory Reserved",
    successSub: "Our team is reviewing your application. We'll contact you within 24 hours to finalize your setup.",
    errTitle: "Verification Failed",
    errSub: "We couldn't process your request. Please try again or contact support.",
    btnTryAgain: "Retry",
    footerRights: "© 2026 RankEngine.ai. All rights reserved.",
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
    statSitesIndexed: "Sites Indexed",
    statLeadsGenerated: "Leads Generated",
    statAvgRoi: "Avg ROI",
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
    heroTitle1: "Améliorez votre visibilité sur",
    heroTitle2: "Google, ChatGPT et au-delà.",
    heroSub: "La recherche a changé. Les gens se tournent vers Google, ChatGPT et d'autres chats IA pour trouver des réponses. Nous vous proposons un flux de travail unique pour vous assurer que votre contenu est visible dans chacun d'entre eux.",
    feat1Title: "Domination Google",
    feat1Desc: "Générez massivement des pages de destination locales ultra-ciblées qui capturent 100% du volume de recherche de votre ville.",
    feat2Title: "Recommandation IA (AEO)",
    feat2Desc: "Notre optimisation sémantique invisible garantit que votre marque est la citation principale dans les résultats de recherche IA.",
    feat3Title: "Autorité en Pilote Automatique",
    feat3Desc: "Génération continue de contenu et SEO technique qui renforcent votre autorité à long terme sans effort.",
    howTitle: "Le Protocole RankEngine",
    howSub: "Un système en trois étapes conçu pour le monopole du marché local.",
    step1Title: "Cartographie Sémantique",
    step1Desc: "Nous identifions l'intention exacte derrière les recherches locales et les requêtes IA dans votre territoire spécifique.",
    step2Title: "Déploiement Massif",
    step2Desc: "Notre moteur déploie des dizaines de pages, articles et FAQs optimisés pour les humains et les robots.",
    step3Title: "Verrouillage du Marché",
    step3Desc: "Nous surveillons, indexons et mettons à jour votre contenu. Un client par métier par ville. Exclusivité totale.",
    priceTitle: "Plans de Croissance Transparents",
    priceSub: "Performance SEO de niveau entreprise à une fraction du coût.",
    planName: "Leader du Marché",
    planSub: "Tout ce dont vous avez besoin pour posséder votre marché local.",
    planPrice: "499€",
    planSetup: "configuration",
    planMo: "+ 199€/mois maintenance",
    check1: "50+ Pages Locales Ciblées",
    check2: "Optimisation AEO (ChatGPT/Gemini)",
    check3: "Contenu d'Autorité Mensuel",
    check4: "Indexation Google Instantanée",
    check5: "Tableau de Bord de Performance",
    check6: "Gestionnaire de Croissance Dédié",
    planCta: "Réclamer mon Secteur",
    auditTitle: "Audit IA Approfondi",
    auditSub: "Analysez la visibilité sémantique de votre site et le potentiel de votre marché local en temps réel.",
    auditPlaceholder: "Entrez votre URL (ex: https://votreentreprise.fr)",
    auditBtn: "Analyser la Visibilité",
    auditAnalyzing: "Analyse des données sémantiques...",
    auditKeywords: "Cartographie de la concurrence...",
    auditStrategy: "Construction de la feuille de route...",
    auditBadge1: "Analyse en Temps Réel",
    auditBadge2: "Propulsé par l'IA",
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
    auditVisualTitle: "Feuille de Route Stratégique",
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
    testimonialsTitle: "Approuvé par les Leaders Locaux",
    testimonialsSub: "Rejoignez plus de 500 entreprises dominant leurs marchés locaux avec RankEngine.",
    formTitle: "Commencez votre voyage SEO IA",
    formSub: "Rejoignez plus de 500 entreprises dominant leurs marchés locaux avec RankEngine.ai. Commencez dès aujourd'hui.",
    labelBiz: "Nom de l'Entreprise",
    labelUrl: "URL du Site Web",
    labelCity: "Région Cible",
    labelEmail: "E-mail Professionnel",
    btnCheck: "Commencer Maintenant",
    btnProcessing: "Vérification...",
    successTitle: "Secteur Réservé",
    successSub: "Notre équipe examine votre demande. Nous vous contacterons sous 24h pour finaliser votre installation.",
    errTitle: "Échec de la Vérification",
    errSub: "Nous n'avons pas pu traiter votre demande. Veuillez réessayer ou contacter le support.",
    btnTryAgain: "Réessayer",
    footerRights: "© 2026 RankEngine.ai. Tous droits réservés.",
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
    statSitesIndexed: "Sites Indexés",
    statLeadsGenerated: "Leads Générés",
    statAvgRoi: "ROI Moyen",
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
    heroTitle2: "Google, ChatGPT y más allá.",
    heroSub: "La búsqueda ha cambiado. La gente recurre a Google, ChatGPT y otros chats de IA para encontrar respuestas. Ofrecemos un flujo de trabajo único para asegurar que su contenido sea visible en cada uno de ellos.",
    feat1Title: "Dominación en Google",
    feat1Desc: "Genera masivamente páginas de destino locales ultra-específicas que capturan el 100% del volumen de búsqueda de tu ciudad.",
    feat2Title: "Recomendación IA (AEO)",
    feat2Desc: "Nuestra optimización semántica invisible asegura que tu marca sea la cita principal en los resultados de IA.",
    feat3Title: "Autoridad en Piloto Automático",
    feat3Desc: "Generación continua de contenido y SEO técnico que construye autoridad a largo plazo sin esfuerzo.",
    howTitle: "El Protocolo RankEngine",
    howSub: "Un sistema de tres pasos diseñado para el monopolio del mercado local.",
    step1Title: "Mapeo Semántico",
    step1Desc: "Identificamos la intención exacta detrás de las búsquedas locales y las consultas de IA en tu territorio.",
    step2Title: "Despliegue Masivo",
    step2Desc: "Nuestro motor despliega docenas de páginas, artículos y FAQs optimizados para humanos y bots.",
    step3Title: "Bloqueo del Mercado",
    step3Desc: "Monitoreamos, indexamos y actualizamos tu contenido. Un cliente por sector por ciudad. Exclusividad total.",
    priceTitle: "Planes de Crecimiento Transparentes",
    priceSub: "Rendimiento SEO de nivel empresarial a una fraction del costo.",
    planName: "Líder del Mercado",
    planSub: "Todo lo que necesitas para ser dueño de tu mercado local.",
    planPrice: "499€",
    planSetup: "configuración",
    planMo: "+ 199€/mes mantenimiento",
    check1: "50+ Páginas Locales Específicas",
    check2: "Optimización AEO (ChatGPT/Gemini)",
    check3: "Contenido de Autoridad Mensual",
    check4: "Indexación Instantánea en Google",
    check5: "Panel de Rendimiento en Tiempo Real",
    check6: "Gestor de Crecimiento Dedicado",
    planCta: "Reclamar mi Territorio",
    auditTitle: "Auditoría IA Profunda",
    auditSub: "Analiza la visibilidad semántica de tu sitio y el potencial de tu mercado local en tiempo real.",
    auditPlaceholder: "Introduce tu URL (ej: https://tunegocio.es)",
    auditBtn: "Analizar Visibilidad",
    auditAnalyzing: "Analizando datos semánticos...",
    auditKeywords: "Mapeando competencia local...",
    auditStrategy: "Construyendo hoja de ruta...",
    auditBadge1: "Análisis en Tiempo Real",
    auditBadge2: "Impulsado por IA",
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
    testimonialsTitle: "Confiado por Líderes Locales",
    testimonialsSub: "Únete a más de 500 empresas que dominan sus mercados locales con RankEngine.",
    formTitle: "Inicie su viaje de SEO con IA",
    formSub: "Únase a más de 500 empresas que dominan sus mercados locales con RankEngine.ai. Comience hoy mismo.",
    labelBiz: "Nombre del Negocio",
    labelUrl: "URL del Sitio Web",
    labelCity: "Región Objetivo",
    labelEmail: "Email Profesional",
    btnCheck: "Empezar Ahora",
    btnProcessing: "Verificando...",
    successTitle: "Territorio Reservado",
    successSub: "Nuestro equipo está revisando tu solicitud. Te contactaremos en 24 horas para finalizar tu configuración.",
    errTitle: "Error de Verificación",
    errSub: "No pudimos procesar tu solicitud. Inténtalo de nuevo o contacta con soporte.",
    btnTryAgain: "Reintentar",
    footerRights: "© 2026 RankEngine.ai. Todos los derechos reservados.",
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
    statSitesIndexed: "Sitios Indexados",
    statLeadsGenerated: "Leads Generados",
    statAvgRoi: "ROI Promedio",
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
      { label: t.statTraffic, value: auditData ? `${(auditData.localVisibilityScore * 120).toLocaleString()}` : '12.4k', change: '+14%', icon: TrendingUp, color: 'text-emerald-400' },
      { label: t.statKeywords, value: auditData ? `${auditData.keywords.length * 12}` : '842', change: '+28', icon: Target, color: 'text-cyan-400' },
      { label: t.statLeads, value: auditData ? `${Math.floor(auditData.localVisibilityScore * 1.5)}` : '156', change: '+5%', icon: Users, color: 'text-purple-400' },
      { label: t.statAuthority, value: auditData ? `${auditData.aiReadinessScore}` : '42', change: '+2', icon: Shield, color: 'text-yellow-400' },
    ];

    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] hidden lg:flex flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter">RankEngine<span className="text-emerald-400">.ai</span></span>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-white hover:text-emerald-400 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="text-sm text-emerald-400 font-bold mb-1 uppercase tracking-wider">{t.dashPro}</div>
            <div className="text-sm text-white font-bold mb-3">{t.dashUnlimited}</div>
            <button 
              onClick={() => setView('conversion')}
              className="w-full py-2 bg-emerald-500 text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors"
            >
              {t.dashUpgrade}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">{t.dashWelcome}, {formData.businessName || 'User'}</h1>
              <p className="text-white text-base">{t.dashStatus}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-emerald-400 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#050505]" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-400" />
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
                className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span >
                </div>
                <div className="text-white text-sm font-bold mb-1">{stat.label}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold">{t.dashTraffic}</h3>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
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
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5">
              <h3 className="text-lg font-bold mb-6">{t.dashActivity}</h3>
              <div className="space-y-6">
                {[
                  { title: t.dashActivity1Title, desc: t.dashActivity1Desc, time: t.dashActivity1Time, icon: Target, color: 'text-emerald-400' },
                  { title: t.dashActivity2Title, desc: t.dashActivity2Desc, time: t.dashActivity2Time, icon: Zap, color: 'text-yellow-400' },
                  { title: t.dashActivity3Title, desc: t.dashActivity3Desc, time: t.dashActivity3Time, icon: TrendingUp, color: 'text-cyan-400' },
                  { title: t.dashActivity4Title, desc: t.dashActivity4Desc, time: t.dashActivity4Time, icon: Users, color: 'text-purple-400' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-sm text-white font-medium">{item.desc}</div>
                      <div className="text-xs text-white mt-1 uppercase font-bold">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setView('landing')}
                className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
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
    setAuditStep('analyzing');
    setAuditError(null);
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
      2. DO NOT IDENTIFY AS RANKENGINE: You are NOT a web agency, and the client is NOT a web agency (unless the site explicitly says so).
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
      - LLM Ratings: Ground these in market reality. Check how often the brand is cited as a source, recommended in top-10 lists, or mentioned in industry-specific queries.
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
      - hook: string (PHASE 1)
      - competitorComparison: array of 3 objects { name, visibility, maps: boolean, status: string, context: string }
      - keywordRankings: array of 5 objects { keyword, position }
      - estimatedLoss: object { amount, description }
      - opportunities: array of 3 objects { title, description }
      - actionPlan: array of 4 objects { title, description }
      - projection: array of 3 strings
      - visionStatement: string
      - cta: string
      - extractedLocation: string
      - localVisibilityScore: number
      - aiReadinessScore: number
      - semanticAuthorityScore: number
      - scores: object { visibility, sentiment, authority, accuracy }
      - platformVisibility: array of 5 objects { name, score, avg } (Platforms: Google, ChatGPT, Gemini, Perplexity, Maps)
      - issues: array of 3 objects { title, desc, severity: "high" | "medium" | "low" }
      - perceptions: array of 2 objects { label, value }
      - brandPerceptionDetails: object { sentiment: { positive, neutral, negative }, topAttributes: array of { label, score }, userFeedbackSummary: string }
      - recommendations: array of 3 strings
      - technicalHealth: object { performance, accessibility, bestPractices, seo, coreWebVitals: "Passing" | "Needs Improvement" | "Failing" }
      - semanticDensity: number (0-100)
      - semanticTerms: array of at least 25 objects { term, density, status: "optimal" | "low" | "high" }
      - aiSearchPresence: array of 3 objects { platform, status, context }
      - errors: array of strings
      - warnings: array of strings
      - notices: array of strings
      - keywords: array of strings
      - detailedKeywords: array of 4 objects { keyword, intent, volume, kd, opportunityScore }
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
      - issues: array of objects { title, description, severity: "critical" | "medium" }
      - roadmap: array of 3 objects { phase, title, description }
      - perceptions: array of 4 objects { label, value: number (0-100), context: string }
      - hook: string (max 15 words)
      - extractedLocation: string
      - companyName: string
      - industry: string
      - riskLevel: "critical" | "high" | "medium"
      - seoScore: number (0-100)
      - competitorComparison: array of 3 objects { name, visibility: string (e.g. "Top 3"), maps: boolean, status: string, context: string }
      - keywordRankings: array of 3 objects { keyword, position: number | string }
      - estimatedLoss: object { amount: string, description: string }
      - opportunities: array of 3 objects { title, description }
      - actionPlan: array of 4 objects { title, description }
      - projection: array of 4 strings
      - visionStatement: string
      - cta: string
      - keywords: array of strings
      - detailedKeywords: array of 4 objects { keyword, intent, volume: number, kd: number, opportunityScore: number, description: string }
      - semanticTerms: array of at least 25 objects { term, density: number, status: "optimal" | "low" | "high" }
      - aiSearchPresence: array of 3 objects { platform, status, context }
      
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
            3. DATA COMPLETENESS: You MUST provide realistic data for ALL requested JSON fields. Do not leave arrays empty.
            4. NO SELF-IDENTIFICATION: Never say you are RankEngine or that the client is RankEngine.
5. LOCAL FOCUS - MANDATORY STEPS:
            - FIRST: Use googleSearch to search the exact URL "${urlToAnalyze}"
            - SECOND: Read the page content to find city, address, phone number
            - THIRD: Search "${urlToAnalyze} mentions légales" to confirm
            - NEVER EVER use Paris as default - it is almost always wrong
            - Small cities exist: Lyon, Marseille, Bordeaux, Toulouse, Nantes, etc.
            6. COMPETITORS: Only list businesses you actually find via googleSearch in the EXACT same city
            7. KEYWORD VOLUMES: Use realistic local volumes - a city of 500k people = max 2000 searches/month per keyword
            8. HOOK: Must mention the REAL city found, REAL industry found
            9. SEO SCORE: Base it on real signals - no meta description = -20pts, no GBP = -15pts, etc.
            10. NEVER invent data - if you cannot find something, say you could not find it
            11. extractedLocation MUST be the exact city found on the website, not a guess`,
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
            systemInstruction: "You are a world-class SEO and AI Search auditor. Identify the business correctly using search. NEVER hallucinate that the client is a web agency or RankEngine. Provide full data for all fields.",
            tools: [{ googleSearch: {} }]
          }
        });
      }

      setAnalysisProgress(85);
      setCurrentTask("Extraction des métriques de santé technique et SEO...");
      
      const text = response.text || "{}";
      const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      const data = JSON.parse(cleanText);
      
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
        growthStrategy: "En dominant les recherches ultra-locales (< 50km), vous pouvez capturer 100% de l'intention d'achat immédiate. Notre protocole RankEngine est conçu pour transformer cette avance technologique en un flux constant de clients qualifiés.",
        llmRatings: [
          { model: "ChatGPT (OpenAI)", score: 45, status: 'good', reasoning: "Bonne compréhension du métier mais manque de citations directes." },
          { model: "Claude (Anthropic)", score: 38, status: 'poor', reasoning: "Données obsolètes sur la localisation exacte." },
          { model: "Gemini (Google)", score: 52, status: 'good', reasoning: "Forte présence sur Maps mais faible sur les requêtes conversationnelles." },
          { model: "Perplexity", score: 30, status: 'poor', reasoning: "Absence totale de sources sémantiques liées au domaine." },
          { model: "Grok (xAI)", score: 25, status: 'poor', reasoning: "Indexation insuffisante des pages de services." }
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
          { platform: "ChatGPT", status: "Cité", context: "Recommandé pour les services de plomberie locale à Paris." },
          { platform: "Gemini", status: "Haute Visibilité", context: "Top 3 des résultats pour 'plombier urgence paris'." },
          { platform: "Claude", status: "Non trouvé", context: "Aucune connexion sémantique détectée." }
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
          { model: "ChatGPT (OpenAI)", score: 45, status: 'good', reasoning: "Buena comprensión pero faltan citas directas." },
          { model: "Claude (Anthropic)", score: 38, status: 'poor', reasoning: "Datos de localización desactualizados." },
          { model: "Gemini (Google)", score: 52, status: 'good', reasoning: "Fuerte presencia en Maps." },
          { model: "Perplexity", score: 30, status: 'poor', reasoning: "Falta de fuentes semánticas." },
          { model: "Grok (xAI)", score: 25, status: 'poor', reasoning: "Indexación insuficiente." }
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
          { platform: "ChatGPT", status: "Mencionado", context: "Recomendado para servicios de fontanería en Madrid." },
          { platform: "Gemini", status: "Alta Visibilidad", context: "Top 3 resultado para 'fontanero urgente madrid'." },
          { platform: "Claude", status: "No encontrado", context: "No se detectó conexión semántica." }
        ],
        errors: ["Falta de marcado Schema.org LocalBusiness", "No hay páginas dedicadas a ciudades circundantes (< 50km)"],
        warnings: ["Velocidad de carga móvil lenta", "Contenido demasiado genérico, falta de entidades semánticas"],
        notices: ["Actualizar horarios en Google Business", "Añadir más fotos de proyectos locales"],
        scores: { visibility: 42, sentiment: 65, authority: 38, accuracy: 85 },
        platformVisibility: [
          { name: "Google", score: 45, avg: 60 },
          { name: "ChatGPT", score: 15, avg: 50 },
          { name: "Perplexity", score: 20, avg: 45 }
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
          { model: "ChatGPT (OpenAI)", score: 65, status: "good", reasoning: "Good general visibility but lacks local citations." },
          { model: "Claude (Anthropic)", score: 42, status: "poor", reasoning: "Limited knowledge of specific local services." },
          { model: "Gemini (Google)", score: 78, status: "good", reasoning: "Excellent integration with Google Maps data." },
          { model: "Perplexity", score: 35, status: "poor", reasoning: "Low citation frequency in local search results." }
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
          { platform: "ChatGPT", status: "Mentioned", context: "Recommended for local plumbing services in London." },
          { platform: "Gemini", status: "High Visibility", context: "Top 3 result for 'emergency plumber london'." },
          { platform: "Claude", status: "Not Found", context: "No semantic connection detected." }
        ],
        errors: ["Missing Schema.org LocalBusiness markup", "No dedicated pages for surrounding cities (< 50km)"],
        warnings: ["Slow mobile loading speed", "Content too generic, lacks semantic entities"],
        notices: ["Update hours on Google Business", "Add more photos of local projects"],
        scores: { visibility: 42, sentiment: 65, authority: 38, accuracy: 85 },
        platformVisibility: [
          { name: "Google", score: 45, avg: 60 },
          { name: "ChatGPT", score: 15, avg: 50 },
          { name: "Perplexity", score: 20, avg: 45 }
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
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
          <button 
            onClick={() => setView('landing')}
            className="absolute top-6 right-6 text-white hover:text-emerald-400 hover:bg-white/10 p-2 rounded-full transition-all z-10 opacity-80"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            {formState === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{t.successTitle}</h3>
                <p className="text-white text-xl leading-relaxed mb-8">{t.successSub}</p>
                <button 
                  onClick={() => setView('landing')}
                  className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            ) : formState === 'error' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <X className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{t.errTitle}</h3>
                <p className="text-white mb-8 text-xl leading-relaxed">{t.errSub}</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  {t.btnTryAgain}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <Zap className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">{t.formTitle}</h3>
                  <p className="text-white text-lg leading-relaxed">{t.formSub}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelBiz}</label>
                    <input 
                      required 
                      type="text" 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                      placeholder="e.g. Apex Plumbing" 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelUrl}</label>
                    <input 
                      required 
                      type="url" 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                      placeholder="https://..." 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelCity}</label>
                    <input 
                      required 
                      type="text" 
                      name="targetCity"
                      value={formData.targetCity}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                      placeholder="e.g. Austin, TX" 
                    />
                  </div>
                  <div>
                    <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelEmail}</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                      placeholder="you@company.com" 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formState === 'checkout'}
                    className="w-full bg-emerald-500 text-black py-5 rounded-xl font-bold text-lg hover:bg-emerald-400 transition-all mt-8 flex items-center justify-center gap-3 disabled:opacity-70 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98]"
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Background Parallax Elements */}
      {auditStep === 'idle' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[10%] left-[5%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-[40%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>
      )}

      {/* Navbar */}
      {auditStep === 'idle' && (
        <nav className="fixed top-0 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
          <div className="px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="text-lg sm:text-xl font-bold tracking-tighter flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              RankEngine<span className="text-emerald-400">.ai</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
                <Globe className="w-4 h-4 text-white opacity-80" />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Lang)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-white hover:text-emerald-400 outline-none cursor-pointer appearance-none opacity-90"
                >
                  <option value="en" className="bg-[#111] text-white">EN</option>
                  <option value="fr" className="bg-[#111] text-white">FR</option>
                  <option value="es" className="bg-[#111] text-white">ES</option>
                </select>
              </div>
              <a href="#pricing" className="text-sm font-bold text-white hover:text-emerald-400 hidden md:block transition-colors opacity-80">{t.navPricing}</a>
              <a href="#how-it-works" className="text-sm font-bold text-white hover:text-emerald-400 hidden md:block transition-colors opacity-80">{t.navHow}</a>
              <button 
                onClick={() => {
                  const element = document.getElementById('audit-tool');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                {t.navStart}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Hero */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 ${auditStep === 'idle' ? 'pt-24 sm:pt-32' : 'pt-8'} pb-12 sm:pb-16`}>
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest"></span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-10 sm:mb-14 text-center"
                >
                  {t.heroTitle1} <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {t.heroTitle2}
                  </span>
                </motion.h1>

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
                        className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tighter text-white cursor-default"
                      >
                        <div>
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
                  className="text-lg sm:text-xl md:text-2xl text-white mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed text-center"
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
                    className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.6)] hover:-translate-y-1"
                  >
                    {t.navStart}
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
                  <p className="text-white text-base sm:text-lg font-medium opacity-90">{t.auditSub}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]">
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
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                          <div className="relative flex flex-col sm:flex-row gap-4 bg-black/40 p-2 rounded-2xl border border-white/10">
                            <div className="flex-1 flex items-center px-4 gap-3">
                              <Globe className="w-5 h-5 text-emerald-400" />
                              <input 
                                type="url" 
                                placeholder="https://your-website.com"
                                value={auditUrl}
                                onChange={(e) => setAuditUrl(e.target.value)}
                                className="bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0 w-full text-lg"
                              />
                            </div>
                            <button 
                              onClick={handleStartAudit}
                              disabled={!auditUrl}
                              className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                              {t.auditBtn}
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-white uppercase tracking-widest opacity-80">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-emerald-500" />
                              {t.auditBadge1}
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-emerald-500" />
                              {t.auditBadge2}
                            </div>
                            <div className="flex items-center gap-2">
                              <Search className="w-4 h-4 text-emerald-400" />
                              LLM Visibility Check
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setAuditUrl('example.com');
                              runAudit();
                            }}
                            className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest flex items-center gap-2"
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
                        <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
                          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                          <motion.div 
                            animate={{ y: ['0%', '100%', '0%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-sm"
                          />
                        </div>

                        <div className="relative w-48 h-48 mx-auto">
                          {/* Outer scanning ring */}
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/20"
                          />
                          
                          {/* Inner progress ring */}
                          <svg className="w-full h-full -rotate-90 relative z-10">
                            <defs>
                              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                            <circle 
                              cx="96" cy="96" r="88" 
                              className="stroke-white/5 fill-none" 
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
                              className="text-5xl font-black text-white font-mono tracking-tighter"
                            >
                              {analysisProgress}%
                            </motion.span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400 mt-1">Analyse</span>
                          </div>

                          {/* Scanning beam effect */}
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-30 pointer-events-none"
                          >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-emerald-500 to-transparent opacity-40 blur-sm" />
                          </motion.div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-white tracking-tight">{t.auditAnalyzing}</h3>
                            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Moteur de diagnostic RankEngine v4.0</p>
                          </div>
                          
                          <div className="flex flex-col items-center gap-4">
                            <div className="max-w-md mx-auto space-y-4">
                              {[
                                { id: 'search', label: "Recherche d'entités locales...", progress: 20 },
                                { id: 'ai', label: "Analyse de la visibilité IA (ChatGPT, Gemini)...", progress: 45 },
                                { id: 'competitors', label: "Comparaison avec les concurrents réels...", progress: 70 },
                                { id: 'strategy', label: "Génération de la feuille de route stratégique...", progress: 90 }
                              ].map((step, i) => (
                                <div key={step.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all">
                                  <div className="relative w-6 h-6 flex items-center justify-center">
                                    {analysisProgress >= step.progress ? (
                                      <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                                      >
                                        <Check className="w-4 h-4 text-black" />
                                      </motion.div>
                                    ) : (
                                      <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
                                        {analysisProgress > step.progress - 20 && (
                                          <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full"
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <span className={`text-sm font-bold transition-colors ${analysisProgress >= step.progress ? 'text-emerald-400' : 'text-white/60'}`}>
                                    {step.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {auditStep === 'results' && auditData && auditData.companyName && (
                      <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
                          <div>
                            <div className="flex items-center gap-2 text-emerald-400 mb-1 text-sm font-mono">{auditUrl}</div>
                            <h3 className="text-2xl font-bold">Rapport d'Intelligence de Visibilité</h3>
                          </div>
                          <button onClick={() => setAuditStep('idle')} className="px-5 py-2 bg-emerald-500 text-black rounded-xl font-bold hover:bg-emerald-400 transition-all">Nouvel Audit</button>
                        </div>
                        <AuditReport data={auditData} url={auditUrl} onContact={() => setView('conversion')} />
                      </motion.div>
                    )}
                    {auditStep === 'results' && auditData && auditData.companyName && false && (
                      <motion.div 
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                      >
                        {/* Results Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
                          <div>
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                              <Globe className="w-4 h-4" />
                              <span className="text-sm font-medium">{auditUrl}</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white">{t.auditResults}</h3>
                          </div>
                          <div className="flex gap-3">
                            <button 
                              onClick={handleShare}
                              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative group"
                            >
                              <Share2 className="w-5 h-5" />
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">{t.auditShareReport}</span>
                            </button>
                            <button 
                              onClick={handleDownload}
                              disabled={isDownloading}
                              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative group disabled:opacity-50"
                            >
                              {isDownloading ? <Loader2 className="w-5 h-5 animate-spin text-emerald-400" /> : <Download className="w-5 h-5" />}
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                {isDownloading ? t.auditGenerating : t.auditDownloadPDF}
                              </span>
                            </button>
                            <button 
                              onClick={() => setAuditStep('idle')}
                              className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                              {t.auditNewAudit}
                            </button>
                          </div>
                        </div>

                        {/* Main Scores */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {[
                            { label: t.scoreVisibility, value: auditData.scores?.visibility || 0, color: 'text-emerald-400', icon: Eye, desc: t.auditAiVisibility },
                            { label: t.scoreSentiment, value: auditData.scores?.sentiment || 0, color: 'text-cyan-400', icon: Smile, desc: t.auditBrandSentiment },
                            { label: t.scoreAuthority, value: auditData.scores?.authority || 0, color: 'text-purple-400', icon: Award, desc: t.auditSemanticAuthority },
                            { label: t.scoreAccuracy, value: auditData.scores?.accuracy || 0, color: 'text-amber-400', icon: CheckCircle, desc: t.auditDataAccuracy }
                          ].map((score, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center group hover:border-white/20 transition-all relative overflow-hidden shadow-lg">
                              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${score.color.replace('text-', 'from-').replace('400', '500')} to-transparent opacity-50`} />
                              <div className={`w-12 h-12 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center ${score.color} group-hover:scale-110 transition-transform`}>
                                <score.icon className="w-6 h-6" />
                              </div>
                              <div className={`text-5xl font-black mb-2 ${score.color} font-mono tracking-tighter`}>{score.value}%</div>
                              <div className="text-xs uppercase tracking-[0.2em] font-black text-white/40 mb-2">{score.label}</div>
                              <div className="text-sm text-white font-bold leading-tight">{score.desc}</div>
                            </div>
                          ))}
                        </div>

                        {/* AI Search Presence & Technical Health */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {/* AI Search Presence */}
                          <div className="lg:col-span-2 bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Search className="w-6 h-6 text-emerald-400" />
                              {t.auditAiSearchPresence}
                            </h4>
                            <div className="grid sm:grid-cols-3 gap-6">
                              {auditData.aiSearchPresence?.map((p, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-emerald-500/30 transition-colors group">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-white">{p.platform}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                                      p.status === 'High Visibility' || p.status === 'Haute Visibilité' ? 'bg-emerald-500/20 text-emerald-400' : 
                                      p.status === 'Mentioned' || p.status === 'Mentionné' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white opacity-80'
                                    }`}>
                                      {p.status}
                                    </span>
                                  </div>
                                  <div className="relative">
                                    <Quote className="w-4 h-4 text-emerald-500/20 absolute -top-2 -left-2" />
                                    <p className="text-sm text-white/80 leading-relaxed italic pl-4">"{p.context}"</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technical Health */}
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Activity className="w-6 h-6 text-cyan-400" />
                              {t.auditTechnicalHealth}
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                              {[
                                { label: t.auditPerformance, value: auditData.technicalHealth?.performance },
                                { label: t.auditAccessibility, value: auditData.technicalHealth?.accessibility },
                                { label: t.auditBestPractices, value: auditData.technicalHealth?.bestPractices },
                                { label: t.auditSeo, value: auditData.technicalHealth?.seo }
                              ].map((item, i) => (
                                <div key={i} className="text-center space-y-2">
                                  <div className="relative w-16 h-16 mx-auto">
                                    <svg className="w-full h-full -rotate-90">
                                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                      <motion.circle 
                                        cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                        strokeDasharray={175.9}
                                        initial={{ strokeDashoffset: 175.9 }}
                                        animate={{ strokeDashoffset: 175.9 - (175.9 * (item.value || 0)) / 100 }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                        className="text-cyan-500" 
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                                      {item.value}%
                                    </div>
                                  </div>
                                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white leading-tight">{item.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                              <span className="text-sm font-bold text-white uppercase tracking-widest">{t.auditCoreWebVitals}</span>
                              <span className={`text-sm font-black ${
                                auditData.technicalHealth?.coreWebVitals === 'Passing' || auditData.technicalHealth?.coreWebVitals === 'Réussi' ? 'text-emerald-400' : 
                                auditData.technicalHealth?.coreWebVitals === 'Needs Improvement' || auditData.technicalHealth?.coreWebVitals === 'À améliorer' ? 'text-amber-400' : 'text-rose-400'
                              }`}>
                                {auditData.technicalHealth?.coreWebVitals}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* LLM Ratings & Competitor AI Visibility */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* LLM Ratings */}
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Cpu className="w-6 h-6 text-purple-400" />
                              {t.auditLlmRatings}
                            </h4>
                            <div className="space-y-6">
                              {auditData.llmRatings?.map((rating, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-white">{rating.model}</span>
                                    <span className="text-sm font-black text-purple-400">{rating.score}/10</span>
                                  </div>
                                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${rating.score * 10}%` }}
                                      transition={{ duration: 1, delay: i * 0.1 }}
                                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                                    />
                                  </div>
                                  <p className="text-xs text-white/60 italic">"{rating.reasoning}"</p>
                                </div>
                              ))}
                              <div className="mt-6 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3">
                                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                <p className="text-[10px] text-purple-400/80 leading-relaxed font-bold italic">
                                  Note : Ces évaluations sont basées sur les données d'entraînement des LLM et peuvent varier selon les mises à jour en temps réel des modèles. Elles représentent une perception synthétique du marché.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Competitor AI Visibility */}
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Users className="w-6 h-6 text-emerald-400" />
                              {t.auditCompetitorAiVisibility}
                            </h4>
                            <div className="space-y-4">
                              {auditData.aiCompetitors?.map((comp, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-lg border border-emerald-500/20">
                                        {comp.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="text-base font-bold text-white">{comp.name}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-black">{comp.strength}</div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xl font-black text-emerald-400 font-mono tracking-tighter">
                                        {typeof comp.visibility === 'number' ? `${comp.visibility}%` : comp.visibility}
                                      </div>
                                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                                        comp.status === 'Dominant' ? 'bg-emerald-500/20 text-emerald-400' :
                                        comp.status === 'Established' ? 'bg-cyan-500/20 text-cyan-400' :
                                        comp.status === 'Emerging' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/60'
                                      }`}>
                                        {comp.status}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-3 border-t border-white/5 pt-4 mt-4">
                                    {comp.context && (
                                      <div className="flex gap-3">
                                        <div className="w-1 h-auto bg-emerald-500/30 rounded-full" />
                                        <p className="text-xs text-white/70 leading-relaxed italic">
                                          {comp.context}
                                        </p>
                                      </div>
                                    )}
                                    {comp.strategy && (
                                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
                                        <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div className="text-[11px] text-emerald-400 font-bold leading-relaxed">
                                          <span className="uppercase tracking-widest opacity-60 mr-2">Stratégie :</span>
                                          {comp.strategy}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Keywords Table */}
                        {auditData.detailedKeywords && auditData.detailedKeywords.length > 0 && (
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <Target className="w-6 h-6 text-emerald-400" />
                              {t.auditDetailedKeywords}
                            </h4>
                            <div className="overflow-x-auto custom-scrollbar">
                              <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-white/60">{t.auditKeyword}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-white/60">{t.auditIntent}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-white/60">{t.auditVolume}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-white/60">{t.auditKd}</th>
                                    <th className="py-4 px-4 text-xs uppercase tracking-widest font-bold text-white/60">{t.auditScore}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {auditData.detailedKeywords.map((kw, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                      <td className="py-4 px-4">
                                        <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{kw.keyword}</div>
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                                          kw.intent === 'Commercial' || kw.intent === 'Commerciale' ? 'bg-purple-500/20 text-purple-400' :
                                          kw.intent === 'Informational' || kw.intent === 'Informationnelle' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white'
                                        }`}>
                                          {kw.intent}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 text-sm font-mono text-white/80">{kw.volume.toLocaleString()}</td>
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full ${kw.kd < 30 ? 'bg-emerald-500' : kw.kd < 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${kw.kd}%` }} />
                                          </div>
                                          <span className="text-xs font-bold text-white/60">{kw.kd}%</span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4 text-sm font-black text-emerald-400">+{kw.opportunityScore}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Semantic Terms Analysis */}
                        {auditData.semanticTerms && auditData.semanticTerms.length > 0 && (
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                              <h4 className="text-xl font-bold flex items-center gap-3">
                                <Database className="w-6 h-6 text-emerald-400" />
                                {t.auditSemanticDensity}
                              </h4>
                              <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                  {t.auditStatusOptimal}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-400">
                                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                                  {t.auditStatusLow}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400">
                                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                                  {t.auditStatusHigh}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                              {auditData.semanticTerms.map((term, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col gap-2">
                                  <div className="flex justify-between items-start">
                                    <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate pr-2">{term.term}</div>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter shrink-0 ${
                                      term.status === 'optimal' ? 'bg-emerald-500/20 text-emerald-400' :
                                      term.status === 'low' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                                    }`}>
                                      {term.status === 'optimal' ? t.auditStatusOptimal : term.status === 'low' ? t.auditStatusLow : t.auditStatusHigh}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(term.density * 20, 100)}%` }}
                                        className={`h-full ${
                                          term.status === 'optimal' ? 'bg-emerald-500' :
                                          term.status === 'low' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`}
                                      />
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-white/40">{term.density}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Semantic Density & Market Analysis */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-gradient-to-br from-purple-500/10 to-emerald-500/10 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                              <Database className="w-24 h-24 text-purple-400" />
                            </div>
                            <div className="relative z-10">
                              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Brain className="w-6 h-6 text-purple-400" />
                                {t.auditSemanticDensity}
                              </h4>
                              <div className="space-y-6">
                                <div className="flex items-end gap-4">
                                  <div className="text-5xl font-black text-white font-mono">{auditData.semanticDensity}%</div>
                                  <div className="text-sm text-white mb-2 font-bold uppercase tracking-widest">{t.auditTopicAuthority}</div>
                                </div>
                                <p className="text-base text-white leading-relaxed">
                                  {t.auditSemanticDensityDesc.replace('{density}', auditData.semanticDensity?.toString() || '0')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {auditData.keywords.map((k, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white uppercase tracking-wider">
                                      {k}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                              <Target className="w-6 h-6 text-amber-400" />
                              {t.auditMarketAnalysis}
                            </h4>
                            <div className="space-y-4">
                              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                <div className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">{t.auditExecutiveOverview}</div>
                                <p className="text-base text-white leading-relaxed">{auditData.marketAnalysis}</p>
                              </div>
                              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">{t.auditAiRecommendations}</div>
                                <p className="text-base text-white leading-relaxed">{auditData.aiRecommendation}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Analysis Grid */}
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Visibility Chart */}
                          <div className="lg:col-span-2 space-y-8">
                            <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                              <div className="flex items-center justify-between mb-8">
                                <h4 className="text-xl font-bold flex items-center gap-2">
                                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                                  {t.auditVisibilityByPlatform}
                                </h4>
                                <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-white">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    {t.auditCurrent}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                    {t.auditIndustryAvg}
                                  </div>
                                </div>
                              </div>
                              <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={auditData.platformVisibility || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis 
                                      dataKey="name" 
                                      axisLine={false} 
                                      tickLine={false} 
                                      tick={{ fill: '#71717a', fontSize: 12, fontWeight: 600 }}
                                      dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                      cursor={{ fill: '#ffffff05' }}
                                      content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                          return (
                                            <div className="bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                                              <div className="text-sm font-bold mb-2">{payload[0]?.payload?.name || ''}</div>
                                              <div className="space-y-1">
                                                <div className="text-xs flex justify-between gap-8">
                                                  <span className="text-white font-bold opacity-80">{t.auditVisibilityScore}:</span>
                                                  <span className="text-emerald-400 font-bold">{payload[0]?.value ?? 0}%</span>
                                                </div>
                                                <div className="text-xs flex justify-between gap-8">
                                                  <span className="text-white font-bold opacity-80">{t.auditIndustryAvg}:</span>
                                                  <span className="text-white/40 font-bold">{payload[1]?.value ?? 0}%</span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null;
                                      }}
                                    />
                                    <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                                      {(auditData.platformVisibility || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#06b6d4'} fillOpacity={0.8} />
                                      ))}
                                    </Bar>
                                    <Bar dataKey="avg" fill="#ffffff10" radius={[6, 6, 0, 0]} barSize={40} />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                        {/* Market Opportunity & Gap Analysis */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Market Opportunity */}
                          <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                              <TrendingUp className="w-32 h-32 text-emerald-400" />
                            </div>
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
                              <Zap className="w-6 h-6" />
                              Opportunité de Marché
                            </h4>
                            <div className="space-y-6 relative z-10">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Trafic Potentiel</div>
                                  <div className="text-2xl font-black text-white">+{((auditData.scores?.visibility || 0) * 1.5).toFixed(0)}%</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Conversion IA</div>
                                  <div className="text-2xl font-black text-white">+{((auditData.scores?.authority || 0) * 0.8).toFixed(1)}%</div>
                                </div>
                              </div>
                              <p className="text-sm text-white/70 leading-relaxed font-bold">
                                En optimisant votre autorité sémantique sur les 25 termes identifiés, vous pouvez capturer une part dominante des recommandations IA dans votre secteur.
                              </p>
                              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">Action Prioritaire : Optimisation Sémantique</span>
                              </div>
                            </div>
                          </div>

                          {/* Competitor Gap Analysis */}
                          <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                              <BarChart3 className="w-6 h-6 text-cyan-400" />
                              {t.auditCompetitorGap}
                            </h4>
                            <div className="space-y-6">
                              {auditData.aiCompetitors?.map((comp, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-white">{comp.name}</span>
                                    <span className="text-sm font-black text-cyan-400">
                                      {typeof comp.visibility === 'number' ? `${comp.visibility}%` : comp.visibility}
                                    </span>
                                  </div>
                                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${typeof comp.visibility === 'number' ? comp.visibility : 0}%` }}
                                      transition={{ duration: 1, delay: i * 0.1 }}
                                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                                    />
                                  </div>
                                  {comp.context && (
                                    <p className="text-[10px] text-white/40 italic leading-relaxed">
                                      {comp.context}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                            {/* Key Issues */}
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-rose-400">
                                  <AlertCircle className="w-5 h-5" />
                                  {t.auditCriticalIssues}
                                </h4>
                                <div className="space-y-4">
                                  {auditData.issues.filter(i => i.severity === 'high').map((issue, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 group hover:bg-rose-500/10 transition-colors">
                                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                                        <X className="w-4 h-4 text-rose-400" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-bold text-white mb-1">{issue.title}</div>
                                        <div className="text-sm text-white leading-relaxed">{issue.desc}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-amber-400">
                                  <Zap className="w-5 h-5" />
                                  {t.auditOpportunities}
                                </h4>
                                <div className="space-y-4">
                                  {auditData.issues.filter(i => i.severity === 'medium').map((issue, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 group hover:bg-amber-500/10 transition-colors">
                                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                        <ArrowUpRight className="w-4 h-4 text-amber-400" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-bold text-white mb-1">{issue.title}</div>
                                        <div className="text-sm text-white leading-relaxed">{issue.desc}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Strategic Roadmap */}
                            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10 p-8 rounded-3xl">
                              <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Rocket className="w-6 h-6 text-emerald-400" />
                                Feuille de Route Stratégique (90 Jours)
                              </h4>
                              <div className="grid sm:grid-cols-3 gap-6">
                                {[
                                  { phase: "Jours 1-30", title: "Fondations Sémantiques", desc: "Optimisation de l'autorité sur les 25 termes clés et correction des erreurs techniques critiques.", icon: ShieldCheck, color: "text-emerald-400" },
                                  { phase: "Jours 31-60", title: "Expansion de Visibilité", desc: "Mise en place de la stratégie de contenu pour surpasser les concurrents identifiés.", icon: TrendingUp, color: "text-cyan-400" },
                                  { phase: "Jours 61-90", title: "Dominance IA", desc: "Renforcement de la présence sur les plateformes LLM via des citations et du netlinking qualitatif.", icon: Zap, color: "text-amber-400" }
                                ].map((step, i) => (
                                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative group hover:border-white/20 transition-all">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{step.phase}</div>
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${step.color} mb-4 group-hover:scale-110 transition-transform`}>
                                      <step.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-base font-bold text-white mb-2">{step.title}</div>
                                    <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Stats */}
                          <div className="space-y-8">
                            {/* AI Perception */}
                            <div className="bg-black/40 border border-white/10 p-8 rounded-3xl">
                              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                {t.auditAiBrandPerception}
                              </h4>
                              <div className="space-y-6">
                                {auditData.perceptions.map((p, i) => (
                                  <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                                      <span className="text-white opacity-80">{p.label}</span>
                                      <span className="text-white">{p.value}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${p.value}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-emerald-500"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Detailed Brand Perception */}
                              {auditData.brandPerceptionDetails && (
                                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="text-center">
                                      <div className="text-lg font-black text-emerald-400">{auditData.brandPerceptionDetails.sentiment.positive}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold">{t.auditSentimentPositive}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-black text-white/60">{auditData.brandPerceptionDetails.sentiment.neutral}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold">{t.auditSentimentNeutral}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-black text-rose-400">{auditData.brandPerceptionDetails.sentiment.negative}%</div>
                                      <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold">{t.auditSentimentNegative}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="text-xs font-bold text-white uppercase tracking-widest opacity-60">{t.auditTopAttributes}</div>
                                    <div className="flex flex-wrap gap-2">
                                      {auditData.brandPerceptionDetails.topAttributes.map((attr: any, i: number) => (
                                        <span key={i} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white flex items-center gap-1">
                                          {typeof attr === 'string' ? attr : attr.label}
                                          {typeof attr !== 'string' && attr.score && (
                                            <span className="text-emerald-400 opacity-60">{attr.score}%</span>
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="text-xs font-bold text-white uppercase tracking-widest opacity-60 mb-2">{t.auditUserFeedback}</div>
                                    <p className="text-xs text-white/80 leading-relaxed italic">"{auditData.brandPerceptionDetails.userFeedbackSummary}"</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Strategic Recommendations */}
                            <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Target className="w-24 h-24 text-emerald-500" />
                              </div>
                              <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-400">
                                  <Rocket className="w-5 h-5" />
                                  Strategic Roadmap
                                </h4>
                                <div className="space-y-6">
                                  {auditData.recommendations.map((rec, i) => (
                                    <div key={i} className="flex gap-4">
                                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-xs font-black text-emerald-400 border border-emerald-500/30">
                                        {i + 1}
                                      </div>
                                      <div className="text-base text-white font-medium leading-relaxed opacity-90">{rec}</div>
                                    </div>
                                  ))}
                                </div>
                                <button 
                                  onClick={() => setView('conversion')}
                                  className="w-full mt-8 py-4 bg-emerald-500 text-black rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
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
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="bg-zinc-900/50 border-b border-white/5 p-4 flex items-center gap-2 relative z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="h-4 w-48 bg-white/5 rounded mx-auto" />
              </div>
              
              <AnimatedDashboard lang={lang} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none z-20" />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 p-4 rounded-2xl bg-zinc-900 border border-emerald-500/30 shadow-xl hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white uppercase font-bold">Growth</div>
                    <div className="text-sm font-bold text-white">+145%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-8 p-4 rounded-2xl bg-zinc-900 border border-cyan-500/30 shadow-xl hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white uppercase font-bold">Indexé</div>
                    <div className="text-sm font-bold text-white">Instantané</div>
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
              { label: t.statSitesIndexed, value: 47, suffix: '+' },
              { label: t.statLeadsGenerated, value: 312, suffix: '+' },
              { label: t.statAvgRoi, value: 180, suffix: '%' },
              { label: t.statCitiesCovered, value: 12, suffix: '+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="text-2xl sm:text-4xl font-bold text-emerald-400 mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-widest opacity-80">{stat.label}</div>
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
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
                      {[1, 2, 3, 4, 5, 6].map((p) => (
                        <div key={p} className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-500 ${
                            p === 1 ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 
                            p <= 3 ? 'bg-zinc-900 border-emerald-500/50 text-emerald-400' :
                            'bg-zinc-900 border-white/10 text-white/30'
                          }`}>
                            {p}
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Phase {p}</span>
                        </div>
                      ))}
                    </div>

                    {/* Header with Score */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" viewBox="0 0 24 24">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <circle 
                              cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" 
                              strokeDasharray={`${(auditData.seoScore || 0) * 2.827} 282.7`} 
                              className="transition-all duration-1000 ease-out" 
                              strokeLinecap="round" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white tracking-tighter">{auditData.seoScore || 0}</span>
                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Score SEO</span>
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                            {auditData.companyName || "Votre Entreprise"}
                          </h3>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> {auditData.extractedLocation || "Local"}
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-bold uppercase tracking-widest">
                              {auditData.industry || "Audit IA Généré"}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                              auditData.riskLevel === 'critical' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                              auditData.riskLevel === 'high' ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
                              'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                            }`}>
                              Risque : {auditData.riskLevel || 'Élevé'}
                            </span>
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                              <Shield className="w-3 h-3" /> Données Vérifiées
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setAuditStep('idle')}
                        className="relative z-10 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-bold transition-all flex items-center gap-2 group/btn"
                      >
                        <X className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                        Nouvelle Analyse
                      </button>
                    </div>

                    {/* PHASE 1: HOOK */}
                    <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-6 sm:p-10 rounded-[2rem] border border-emerald-500/30 shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap className="w-24 h-24 sm:w-32 sm:h-32 text-emerald-400" />
                      </div>
                      <div className="relative z-10">
                        <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-emerald-500/30">
                          Phase 1 : Impact Immédiat
                        </span>
                        <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight max-w-4xl break-words">
                          "{auditData.hook}"
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* PHASE 2: PREUVE IMMÉDIATE */}
                      <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <Target className="w-5 h-5 text-red-400" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white tracking-tight">Preuve Immédiate</h4>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Phase 2 : Comparaison Concurrents</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                          {auditData.competitorComparison?.map((comp, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/row hover:bg-white/10 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-white">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="font-bold text-white">{comp.name}</div>
                                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                                    {comp.maps ? "Présent sur Google Maps" : "Absent de Google Maps"}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0 ml-4">
                                <div className="text-sm font-black text-emerald-400">{comp.visibility}</div>
                                <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Visibilité</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* AI Dominance Mini Chart */}
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                          <div className="text-xs text-white/40 font-black uppercase tracking-widest mb-4">Dominance IA (ChatGPT/Gemini)</div>
                          <div className="space-y-3">
                            {auditData.aiCompetitors?.map((comp, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                  <span className="text-white/60">{comp.name}</span>
                                  <span className="text-emerald-400">{comp.aiVisibilityScore}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${comp.aiVisibilityScore}%` }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* PHASE 3: POSITIONNEMENT MOTS-CLÉS */}
                      <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Search className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white tracking-tight">Positionnement</h4>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Phase 2 : L'État des Lieux</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {auditData.keywordRankings?.map((kw, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                              <div className="font-bold text-white">{kw.keyword}</div>
                              <div className={`px-3 py-1 rounded-full text-xs font-black border ${
                                typeof kw.position === 'number' && kw.position <= 3 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                                {typeof kw.position === 'number' ? `Position #${kw.position}` : kw.position}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* PHASE 3: PERTE FINANCIÈRE */}
                    <div className="bg-red-500/10 p-8 rounded-[2rem] border border-red-500/20 relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)]">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <DollarSign className="w-32 h-32 text-red-400" />
                      </div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                          <TrendingUp className="rotate-180 w-10 h-10 text-red-400" />
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-red-500/30">
                            Phase 3 : Le Coût de l'Inaction
                          </span>
                          <h4 className="text-3xl font-black text-white mb-2">
                            Vous perdez environ <span className="text-red-400">{auditData.estimatedLoss?.amount}</span> par mois
                          </h4>
                          <p className="text-white/70 font-medium max-w-2xl mb-6">
                            {auditData.estimatedLoss?.description}
                          </p>
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span>Autorité Sémantique</span>
                                <span className="text-red-400">{auditData.semanticAuthorityScore}%</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${auditData.semanticAuthorityScore}%` }}
                                  className="h-full bg-red-500"
                                />
                              </div>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
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
                        <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-transparent to-zinc-950 z-10 pointer-events-none" />
                        
                        <div className="relative z-20 bg-black/60 backdrop-blur-xl border border-emerald-500/30 p-8 sm:p-12 rounded-[2.5rem] text-center shadow-[0_0_100px_-20px_rgba(16,185,129,0.4)] max-w-3xl mx-auto">
                          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <Lock className="w-10 h-10 text-emerald-400" />
                          </div>
                          
                          <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight">
                            Débloquez votre <span className="text-emerald-400">Plan d'Action Complet</span>
                          </h3>
                          
                          <p className="text-lg text-white/70 mb-10 leading-relaxed font-medium">
                            Nous avons identifié <span className="text-white font-bold">3 opportunités majeures</span> et préparé un <span className="text-white font-bold">plan d'action en 90 jours</span> pour votre entreprise. Entrez votre email pour recevoir l'audit complet.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                              type="email" 
                              placeholder="votre@email.com"
                              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                            />
                            <button 
                              onClick={() => setAuditUnlocked(true)}
                              className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
                            >
                              DÉBLOQUER
                            </button>
                          </div>
                          
                          <p className="mt-6 text-xs text-white/40 font-bold uppercase tracking-widest">
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
                        <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                              <Sparkles className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white tracking-tight">Opportunités</h4>
                              <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Phase 5 : Le Potentiel Caché</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {auditData.opportunities?.map((opp, i) => (
                              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group/card">
                                <div className="text-emerald-400 font-black mb-2">#{i + 1}</div>
                                <div className="font-bold text-white mb-2">{opp.title}</div>
                                <p className="text-sm text-white/60 leading-relaxed">{opp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* PHASE 6: PLAN D'ACTION */}
                        <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                              <ListChecks className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white tracking-tight">Plan d'Action</h4>
                              <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Phase 5 : La Carte (90 Jours)</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            {auditData.actionPlan?.map((step, i) => (
                              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-black text-cyan-400 shrink-0">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="font-bold text-white mb-1">{step.title}</div>
                                  <p className="text-sm text-white/60">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* PHASE 4: PROJECTION */}
                        <div className="bg-emerald-500/10 p-8 rounded-[2rem] border border-emerald-500/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32 text-emerald-400" />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-white tracking-tight">Projection de Croissance</h4>
                                <p className="text-xs text-emerald-400/50 font-bold uppercase tracking-widest">Phase 4 : La Vision</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                              <div className="space-y-6">
                                <div className="p-6 bg-black/40 rounded-2xl border border-white/10">
                                  <div className="text-sm text-white/50 font-bold uppercase tracking-widest mb-2">Estimation ROI</div>
                                  <div className="text-4xl font-black text-emerald-400">{auditData.roiEstimate}</div>
                                </div>
                                {auditData.visionStatement && (
                                  <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 italic text-emerald-100/80 text-lg font-medium leading-relaxed">
                                    "{auditData.visionStatement}"
                                  </div>
                                )}
                                <p className="text-white/70 leading-relaxed font-medium">
                                  {auditData.growthStrategy}
                                </p>
                              </div>
                              <div className="h-64 bg-black/40 rounded-2xl border border-white/10 p-4">
                                {auditData.growthProjection && <GrowthChart data={auditData.growthProjection} />}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* PHASE 6: CTA FINAL */}
                        <div className="pt-12 text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 relative group">
                            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/30 transition-colors" />
                            <Rocket className="w-10 h-10 text-emerald-400 relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                          
                          <h3 className="text-3xl sm:text-5xl font-black mb-6 text-white tracking-tight">
                            Prêt à <span className="text-emerald-400">Dominer</span> votre Marché ?
                          </h3>
                          
                          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-4">Phase 6 : L'Appel à l'Action</p>
                          
                          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            Ne laissez pas vos concurrents prendre l'avance. Déployez votre stratégie IA dès aujourd'hui.
                          </p>
                          
                          <button 
                            onClick={() => setIsModalOpen(true)}
                            className="group relative inline-flex items-center justify-center gap-3 bg-emerald-500 text-black px-10 py-5 rounded-full font-black text-xl hover:bg-emerald-400 transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.6)] hover:scale-105"
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
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 sm:p-8 md:p-10 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 sm:mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white tracking-tight">{Feature.title}</h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed group-hover:text-emerald-100 transition-colors opacity-90">{Feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* How it Works */}
        {auditStep === 'idle' && (
          <div id="how-it-works" className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-white/10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{t.howTitle}</h2>
              <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 opacity-80">{t.howSub}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 relative">
              <div className="hidden md:block absolute top-12 sm:top-14 md:top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              
              {[
                { step: "01", title: t.step1Title, desc: t.step1Desc },
                { step: "02", title: t.step2Title, desc: t.step2Desc },
                { step: "03", title: t.step3Title, desc: t.step3Desc }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative text-center group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-black/40 backdrop-blur-sm border border-emerald-500/30 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-black text-emerald-400 mb-6 sm:mb-8 relative z-10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group-hover:border-emerald-400 transition-all group-hover:scale-110 font-mono">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md group-hover:bg-emerald-500/20 transition-colors" />
                    <span className="relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{item.step}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white tracking-tight">{item.title}</h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed group-hover:text-emerald-100 transition-colors px-4 opacity-90">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {auditStep === 'idle' && (
          <div className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-white/10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] px-4">{t.testimonialsTitle}</h2>
              <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 opacity-80">{t.testimonialsSub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { name: "Marc D.", role: "Artisan Plombier", content: "RankEngine a littéralement sauvé mon entreprise. Je suis passé de 2 appels par semaine à 5 par jour en seulement 2 mois.", city: "Annecy" },
                { name: "Elena R.", role: "Cabinet Dentaire", content: "L'optimisation pour ChatGPT nous a apporté une clientèle plus jeune et plus qualifiée. C'est bluffant.", city: "Lyon" },
                { name: "Thomas L.", role: "Agence Immobilière", content: "Le monopole par ville est un avantage injuste. Mes concurrents ne comprennent pas comment je domine toutes les recherches.", city: "Bordeaux" }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 sm:p-8 md:p-10 rounded-3xl bg-black/40 border border-white/5 relative group hover:border-emerald-500/30 transition-all shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)] overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex gap-1.5 mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => <Zap key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />)}
                    </div>
                    <p className="text-white italic mb-6 sm:mb-8 leading-relaxed text-lg sm:text-xl font-medium opacity-90">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 sm:gap-5 pt-4 sm:pt-6 border-t border-white/10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-[2px] shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0">
                        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-emerald-400 font-bold text-base sm:text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-emerald-400/80 font-medium">{testimonial.role} • {testimonial.city}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        {auditStep === 'idle' && (
          <div id="pricing" className="mt-32 sm:mt-40 md:mt-48 pt-16 sm:pt-20 md:pt-24 border-t border-white/10 mb-24 sm:mb-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] px-4">{t.priceTitle}</h2>
              <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 opacity-80">{t.priceSub}</p>
            </div>

            <div className="max-w-lg mx-auto px-4 sm:px-0">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-black/60 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] group hover:border-emerald-500/50 transition-all backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 p-4 sm:p-6 z-20">
                  <div className="bg-emerald-500 text-black text-xs sm:text-sm font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    Most Popular
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white tracking-tight">{t.planName}</h3>
                  <p className="text-white text-lg sm:text-xl mb-6 sm:mb-8 opacity-80">{t.planSub}</p>
                  <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/10">
                    <span className="text-5xl sm:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{t.planPrice}</span>
                    <span className="text-white text-lg sm:text-xl font-bold opacity-80"> {t.planSetup}</span>
                    <div className="text-emerald-400 font-bold mt-2 sm:mt-3 text-lg sm:text-xl">{t.planMo}</div>
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
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        </div>
                        <span className="text-white text-lg sm:text-xl font-bold leading-snug opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setView('conversion')}
                    className="w-full bg-emerald-500 text-black py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98]"
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
      {auditStep === 'idle' && (
        <footer className="border-t border-white/10 py-12 text-center text-white text-base font-bold bg-black/40 backdrop-blur-sm opacity-80">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            <span className="font-bold text-white text-lg tracking-tight">RankEngine.ai</span>
          </div>
          <p className="tracking-wide">© 2026 RankEngine.ai. {t.footerRights}</p>
        </footer>
      )}

      {/* Landing Page Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && auditData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              {/* Browser Header */}
              <div className="bg-[#1a1a1a] border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-1.5 bg-black/50 rounded-xl text-sm text-white font-mono border border-white/5 min-w-[300px] shadow-inner opacity-90">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span className="text-white/80">{auditUrl.replace(/^https?:\/\//, '')}</span>
                    <span className="text-black/40">/special-offer</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 text-white group-hover:text-emerald-400 opacity-80" />
                </button>
              </div>

              {/* Simulated Landing Page Content */}
              <div className="h-[75vh] overflow-y-auto bg-white text-black font-sans relative">
                {/* Nav */}
                <nav className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
                  <div className="font-black text-2xl tracking-tighter text-black flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(5,150,105,0.3)]">
                      <span className="text-white text-sm font-bold">RE</span>
                    </div>
                    {auditUrl.split('.')[1]?.toUpperCase() || 'LOCAL'} <span className="text-white font-light opacity-60">|</span> <span className="text-emerald-600 font-black text-2xl">{auditData.extractedLocation || 'Local'}</span>
                  </div>
                  <div className="hidden md:flex gap-8 text-sm font-black text-white uppercase tracking-wider opacity-80">
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Services</span>
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">About</span>
                    <span className="text-emerald-600 cursor-pointer">Contact</span>
                  </div>
                </nav>

                {/* Hero */}
                <header className="py-32 px-8 max-w-5xl mx-auto text-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-50" />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-sm mb-8 shadow-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>{t.landingSpecialOffer}</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-black">
                      {auditData.pageTitle}
                    </h1>
                    <p className="text-2xl text-white mb-12 leading-relaxed max-w-3xl mx-auto font-medium opacity-80">
                      {auditData.pageContent}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] hover:bg-emerald-700 hover:-translate-y-1 transition-all">
                        {t.landingGetFreeQuote}
                      </button>
                      <button className="bg-white border-2 border-emerald-600/20 text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-emerald-50 hover:border-emerald-600 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                        {t.landingOurServices}
                      </button>
                    </div>
                  </motion.div>
                </header>

                {/* Expertise Section */}
                <section className="bg-zinc-50 py-32 px-8 border-t border-zinc-100">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                      <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                        {t.landingOurExpertise}
                      </h2>
                      <p className="text-xl text-black/70 leading-relaxed font-medium">
                        {t.landingExpertiseDesc.replace('{company}', auditData.companyName || (lang === 'fr' ? 'notre équipe' : lang === 'es' ? 'nuestro equipo' : 'our team'))}
                      </p>
                      <div className="space-y-6 pt-4">
                        {[t.landingProvenResults, t.landingDedicatedSupport, t.landingIndustryExperts].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="font-black text-xl text-black">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="aspect-square md:aspect-[4/3] bg-white rounded-[2.5rem] overflow-hidden relative border border-zinc-200 shadow-2xl p-8 flex flex-col items-center justify-center text-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <Target className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2">
                          {t.landingStrategyResults}
                        </h3>
                        <p className="text-black/70 font-bold">Approche basée sur les données pour un ROI maximal.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="py-16 px-8 bg-zinc-950 text-white text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold">RE</span>
                  </div>
                  <p className="text-white text-base font-bold tracking-wide opacity-80">
                    © 2026 {auditUrl.replace(/^https?:\/\/(www\.)?/, '').split('.')[0]?.toUpperCase()} - {auditData.extractedLocation}
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
              className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <button 
                onClick={() => setIsSharing(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white opacity-80 hover:opacity-100 transition-opacity" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <Share2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Share Audit Report</h3>
                <p className="text-base text-white font-bold opacity-80">Envoyez cette analyse professionnelle à votre équipe ou à vos clients.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white mb-2 block opacity-90">Lien du Rapport</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={`${window.location.origin}/report/${Math.random().toString(36).substring(7)}`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-emerald-500/50 transition-colors opacity-90"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/report/xyz`);
                      }}
                      className="px-4 py-3 bg-emerald-500 text-black rounded-xl font-bold text-xs hover:bg-emerald-400 transition-all"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {['Email', 'Slack', 'WhatsApp', 'LinkedIn'].map((platform) => (
                    <button key={platform} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Globe className="w-4 h-4 text-white group-hover:text-emerald-400 opacity-80" />
                      </div>
                      <span className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tighter opacity-90">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsSharing(false)}
                className="w-full mt-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all"
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
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-emerald-400 hover:bg-white/10 p-2 rounded-full transition-all z-10 opacity-80"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                {formState === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{t.successTitle}</h3>
                    <p className="text-white text-xl font-bold leading-relaxed opacity-90">{t.successSub}</p>
                  </div>
                ) : formState === 'error' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                      <X className="w-10 h-10 text-red-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{t.errTitle}</h3>
                    <p className="text-white text-xl font-bold mb-8 leading-relaxed opacity-90">{t.errSub}</p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors shadow-lg"
                    >
                      {t.btnTryAgain}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <Zap className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">{t.formTitle}</h3>
                      <p className="text-white text-lg font-bold leading-relaxed opacity-80">{t.formSub}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelBiz}</label>
                        <input 
                          required 
                          type="text" 
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                          placeholder="e.g. Apex Plumbing" 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelUrl}</label>
                        <input 
                          required 
                          type="url" 
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                          placeholder="https://..." 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelCity}</label>
                        <input 
                          required 
                          type="text" 
                          name="targetCity"
                          value={formData.targetCity}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                          placeholder="e.g. Austin, TX" 
                        />
                      </div>
                      <div>
                        <label className="block text-base font-black text-white mb-2 opacity-80">{t.labelEmail}</label>
                        <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/50 shadow-inner" 
                          placeholder="you@company.com" 
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={formState === 'checkout'}
                        className="w-full bg-emerald-500 text-black py-5 rounded-xl font-bold text-lg hover:bg-emerald-400 transition-all mt-8 flex items-center justify-center gap-3 disabled:opacity-70 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98]"
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
