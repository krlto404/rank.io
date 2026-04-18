import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, ChevronRight, Share2, Bookmark, Home } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'aeo-vs-seo',
    title: "L'Ère de l'AEO : Pourquoi Google n'est plus votre seul terrain de jeu",
    excerpt: "Découvrez comment l'Answer Engine Optimization transforme la visibilité en ligne et pourquoi vous devez adapter votre stratégie dès maintenant.",
    content: `
      Le SEO traditionnel tel que nous le connaissons est en pleine mutation. Avec l'avènement de ChatGPT, Gemini et Claude, les utilisateurs ne cherchent plus seulement des listes de liens, mais des réponses directes. C'est là qu'intervient l'AEO.

      ### Qu'est-ce que l'AEO ?
      L'AEO (Answer Engine Optimization) consiste à optimiser votre contenu pour qu'il soit la source privilégiée des moteurs de réponse. Contrairement au SEO qui vise un classement dans les SERP (Search Engine Results Pages), l'AEO vise à être cité par l'IA comme la réponse faisant autorité.

      ### Pourquoi est-ce vital en 2026 ?
      1. **Changement de comportement** : Plus de 40% des recherches se font désormais via des interfaces conversationnelles.
      2. **Visibilité Zéro-Clic** : Les IA fournissent l'information sans que l'utilisateur n'ait besoin de cliquer sur un site. Être la source citée devient le seul moyen de maintenir sa notoriété.
      3. **Crédibilité** : Être recommandé par une IA renforce instantanément la confiance de l'utilisateur envers votre marque.

      ### Comment optimiser pour l'AEO ?
      - **Structurez vos données** : Utilisez des schémas JSON-LD précis.
      - **Répondez directement** : Adoptez un style clair, concis et factuel.
      - **Autorité thématique** : Devenez l'expert incontesté sur votre niche locale.
    `,
    date: "12 Avril 2026",
    author: "L'Équipe Renk",
    readTime: "5 min",
    category: "Stratégie IA",
    image: "https://picsum.photos/seed/aeo-ai/800/400"
  },
  {
    id: 'geo-generative-engine-optimization',
    title: "GEO : Comment optimiser votre site pour les moteurs génératifs",
    excerpt: "Le Generative Engine Optimization est la nouvelle frontière. Apprenez les techniques pour rester visible dans les réponses générées par l'IA.",
    content: `
      Le GEO (Generative Engine Optimization) est l'évolution logique du SEO. Il s'agit de comprendre comment les modèles de langage (LLM) traitent et synthétisent l'information pour s'assurer que votre entreprise fait partie de leur "base de connaissances".

      ### Les piliers du GEO
      1. **La Citabilité** : Plus votre contenu est cité par des sources d'autorité, plus l'IA le considérera comme fiable.
      2. **La Clarté Sémantique** : Utilisez un langage que les machines peuvent facilement indexer et relier à des concepts clés.
      3. **L'Actualité** : Les IA modernes ont accès au web en temps réel. Une information fraîche et vérifiée est priorisée.

      ### Stratégies concrètes
      - **Optimisation des FAQ** : Créez des sections questions-réponses qui correspondent aux requêtes naturelles des utilisateurs.
      - **Preuve Sociale Digitale** : Les avis clients et les mentions sur les réseaux sociaux sont des signaux forts pour les moteurs génératifs.
      - **Données Structurées Avancées** : Ne vous contentez pas du minimum. Détaillez chaque aspect de votre service.
    `,
    date: "10 Avril 2026",
    author: "Expert SEO Renk",
    readTime: "4 min",
    category: "Technique",
    image: "https://picsum.photos/seed/neural-network/800/400"
  },
  {
    id: 'seo-local-ia',
    title: "SEO Local en 2026 : Le guide ultime pour dominer votre ville",
    excerpt: "La proximité ne suffit plus. Découvrez comment l'IA redéfinit la recherche locale et comment en tirer profit pour votre commerce.",
    content: `
      Le SEO local ne se limite plus à Google Maps. Aujourd'hui, un utilisateur demande à son assistant : \"Où puis-je trouver un plombier fiable et disponible immédiatement à Annecy ?\". 

      ### L'impact de l'IA sur le local
      L'IA analyse non seulement votre position, mais aussi votre réputation, vos horaires réels, et même le ton de vos réponses aux avis.

      ### 3 étapes pour dominer votre secteur
      1. **Exclusivité Sémantique** : Chez Renk, nous vous aidons à posséder les mots-clés liés à votre métier dans votre zone géographique.
      2. **Cohérence Multicanale** : Vos informations doivent être identiques partout (Google, Apple, Bing, annuaires spécialisés).
      3. **Engagement IA** : Optimisez votre profil pour qu'il réponde aux critères de sélection des agents IA.
    `,
    date: "08 Avril 2026",
    author: "Consultant Local",
    readTime: "6 min",
    category: "SEO Local",
    image: "https://picsum.photos/seed/city-map/800/400"
  },
  {
    id: 'voice-search-impact',
    title: "Recherche Vocale : L'impact invisible sur votre trafic local",
    excerpt: "Siri, Alexa et Google Assistant dictent désormais les choix des consommateurs. Votre entreprise est-elle prête à être 'entendue' ?",
    content: `
      La recherche vocale n'est plus un gadget. C'est le mode d'interaction privilégié en situation de mobilité. Pour une entreprise locale, ne pas être optimisé pour la voix, c'est être invisible pour 50% des utilisateurs de smartphones.

      ### Pourquoi la voix change tout ?
      Les requêtes vocales sont plus longues, plus naturelles et souvent formulées sous forme de questions complètes. L'IA doit extraire la réponse la plus pertinente en une fraction de seconde.

      ### Nos conseils pour la voix
      - **Utilisez le langage naturel** : Écrivez comme vous parlez.
      - **Optimisez pour les 'Featured Snippets'** : Soyez la réponse courte que l'assistant lira à haute voix.
      - **Vitesse de chargement** : Un assistant n'attendra pas 5 secondes que votre page se charge.
    `,
    date: "05 Avril 2026",
    author: "Stratège Digital",
    readTime: "4 min",
    category: "Innovation",
    image: "https://picsum.photos/seed/voice-assistant/800/400"
  },
  {
    id: 'structured-data-ai',
    title: "Données Structurées : Le langage secret que les IA adorent",
    excerpt: "Plongez dans les coulisses du code. Découvrez comment le Schema.org transforme votre site en une base de données lisible par les LLM.",
    content: `
      Si le contenu est roi, les données structurées sont le trône. Sans elles, les IA doivent deviner ce que vous faites. Avec elles, vous leur donnez les clés de votre entreprise sur un plateau d'argent.

      ### Qu'est-ce qu'une donnée structurée ?
      C'est un code invisible pour l'utilisateur mais essentiel pour les machines. Il définit précisément votre métier, vos prix, vos avis et votre localisation.

      ### L'avantage Renk
      Nous implémentons des schémas personnalisés qui vont bien au-delà des standards de Google, pour parler directement aux algorithmes de ChatGPT et Claude.
    `,
    date: "03 Avril 2026",
    author: "Développeur SEO",
    readTime: "7 min",
    category: "Technique",
    image: "https://picsum.photos/seed/code-data/800/400"
  },
  {
    id: 'ux-ai-trust',
    title: "UX & IA : Pourquoi l'expérience utilisateur est le nouveau signal de confiance",
    excerpt: "Les IA ne regardent pas seulement vos mots-clés, elles analysent comment les humains interagissent avec vous. L'UX est devenu un pilier du SEO moderne.",
    content: `
      L'intelligence artificielle est devenue incroyablement douée pour détecter la qualité. Un site lent, mal conçu ou difficile à naviguer est un signal négatif immédiat pour les moteurs de réponse.

      ### L'UX au service de l'autorité
      Une bonne expérience utilisateur réduit le taux de rebond et augmente le temps passé sur le site. Ces signaux indiquent aux IA que votre contenu est réellement utile.

      ### Les points clés de l'UX en 2026
      1. **Accessibilité Totale** : Votre site doit être utilisable par tous, partout.
      2. **Design Intuitif** : Moins de clics, plus de réponses.
      3. **Performance Mobile** : Le mobile n'est plus une option, c'est la norme absolue.
    `,
    date: "01 Avril 2026",
    author: "Designer UX",
    readTime: "5 min",
    category: "Design",
    image: "https://picsum.photos/seed/user-experience/800/400"
  }
];

interface BlogProps {
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogProps> = ({ onBack, onSelectPost }) => {
  return (
    <div className="min-h-screen bg-landing pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            L'Observatoire <span className="text-primary">IA</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Analyses, stratégies et prospective sur la visibilité à l'ère de l'intelligence artificielle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-soft hover:shadow-premium transition-all cursor-pointer group will-change-transform"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  Lire l'article
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ArticleProps {
  post: BlogPost;
  onBack: () => void;
  onHome: () => void;
}

export const ArticleView: React.FC<ArticleProps> = ({ post, onBack, onHome }) => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-12">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au blog
            </button>
            <button 
              onClick={onHome}
              className="inline-flex items-center gap-2 text-gray-400 font-bold hover:text-primary transition-all text-sm"
            >
              <Home className="w-4 h-4" />
              Accueil
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest mb-6">
              <span className="bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 mb-12">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{post.author}</div>
                <div className="text-xs text-gray-400 font-medium">Expert en Stratégie Digitale</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-primary">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-primary">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
            {post.content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('###')) {
                return <h3 key={i} className="text-2xl font-bold text-gray-900 mt-12 mb-6">{paragraph.replace('###', '').trim()}</h3>;
              }
              if (paragraph.startsWith('##')) {
                return <h2 key={i} className="text-3xl font-black text-gray-900 mt-16 mb-8">{paragraph.replace('##', '').trim()}</h2>;
              }
              if (paragraph.startsWith('-')) {
                return <li key={i} className="ml-6 mb-2 list-disc">{paragraph.replace('-', '').trim()}</li>;
              }
              if (paragraph.trim() === '') return null;
              return <p key={i} className="mb-6">{paragraph.trim()}</p>;
            })}
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100">
            <div className="bg-primary/5 rounded-[3rem] p-8 sm:p-12 text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Prêt à dominer l'ère de l'IA ?</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Ne laissez pas vos concurrents prendre l'avantage. Obtenez votre premier audit gratuit et découvrez votre potentiel de visibilité.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary px-10 py-4"
              >
                Lancer mon audit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
