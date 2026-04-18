import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Quelle est la différence entre SEO, AEO et GEO ?",
    a: "Le SEO (Search Engine Optimization) optimise pour les moteurs de recherche classiques (Google). L'AEO (Answer Engine Optimization) cible les réponses directes. Le GEO (Generative Engine Optimization) est la nouvelle discipline qui optimise votre contenu pour qu'il soit cité et recommandé par les IA génératives comme ChatGPT, Claude et Gemini."
  },
  {
    q: "Comment Renk optimise-t-il mon site pour ChatGPT et Gemini ?",
    a: "Nous utilisons le 'Semantic Mapping' pour structurer vos données de manière à ce que les LLM (Large Language Models) identifient votre entreprise comme l'autorité de référence dans votre zone géographique. Cela inclut l'optimisation des citations, des entités nommées et du maillage sémantique."
  },
  {
    q: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
    a: "Le GEO consiste à adapter votre présence en ligne pour les nouveaux moteurs de recherche conversationnels. Contrairement au SEO qui se base sur des mots-clés, le GEO se base sur la pertinence sémantique, la fiabilité des sources et la clarté des réponses pour être choisi par l'IA comme source principale."
  },
  {
    q: "Pourquoi l'exclusivité locale est-elle si importante ?",
    a: "Les IA tendent à recommander une seule solution 'évidente' pour une requête locale. En vous garantissant l'exclusivité sur 50km, Renk s'assure que tous nos efforts d'optimisation GEO et AEO convergent vers votre entreprise, empêchant vos concurrents directs de parasiter votre autorité sémantique."
  },
  {
    q: "Mon site actuel est-il compatible avec l'AEO ?",
    a: "La plupart des sites classiques ne sont pas structurés pour l'ère de l'IA. Notre audit gratuit analyse votre 'AI Readiness'. Si votre site est obsolète, notre Pack d'Ouverture crée une infrastructure sémantique moderne (JSON-LD avancé, FAQ structurées, pages piliers) compatible avec tous les chatbots."
  },
  {
    q: "Comment mesurez-vous la visibilité sur les moteurs IA ?",
    a: "Nous suivons les mentions de marque, les citations de sources dans les réponses générées et le trafic provenant de plateformes comme Perplexity ou ChatGPT. Notre tableau de bord vous donne un 'AI Visibility Score' en temps réel pour comparer votre dominance face à la concurrence."
  },
  {
    q: "L'optimisation pour l'IA remplace-t-elle le SEO Google ?",
    a: "Non, elle le complète. Google utilise lui-même l'IA (SGE) pour générer ses réponses. En optimisant pour les LLM (GEO/AEO), vous améliorez naturellement votre SEO traditionnel car Google valorise désormais les mêmes critères d'autorité et de clarté que les IA."
  },
  {
    q: "Quels sont les LLM et Chatbots couverts par votre stratégie ?",
    a: "Notre technologie optimise votre présence pour l'ensemble de l'écosystème : OpenAI (ChatGPT), Google (Gemini/SGE), Anthropic (Claude), Perplexity AI, Meta AI et même les moteurs open-source comme Llama, assurant une visibilité universelle."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" className="mt-12 sm:mt-16 md:mt-20 pt-12 sm:pt-16 border-t border-gray-100 relative max-w-4xl mx-auto px-4 sm:px-6">
      {/* Schema Markup for AEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="text-center mb-12 sm:mb-20 md:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          Base de Connaissances IA
        </motion.div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900 px-4">
          Questions Fréquentes
        </h2>
        <p className="text-gray-500 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-6 font-medium">
          Tout ce que vous devez savoir sur le SEO, l'AEO, le GEO et l'optimisation pour les LLM.
        </p>
      </div>

      <div className="relative z-10 pb-24">
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={index} 
              className={`group relative bg-white border ${openIndex === index ? 'border-blue-200' : 'border-gray-100'} rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-100 shadow-sm hover:shadow-md`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 sm:px-8 sm:py-7 flex items-center justify-between text-left focus:outline-none relative z-10"
              >
                <span className={`text-base sm:text-xl font-bold tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-gray-900 group-hover:text-black'}`}>{faq.q}</span>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ml-4 ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-gray-500 text-sm sm:text-lg leading-relaxed font-medium border-t border-gray-50 pt-4 sm:pt-6 relative">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
    </section>
  );
}
