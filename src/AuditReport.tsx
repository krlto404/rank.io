import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function AuditReport({ data, url, onContact }: { data: any, url: string, onContact: () => void }) {
  const company = data.companyName || "Votre Entreprise";
  const location = data.extractedLocation || "Votre ville";
  const seoScore = data.seoScore || 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20 pb-20">

      {/* HERO */}
      <div className="text-center py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Audit de visibilité
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6 leading-tight">
            {data.hook || "Vous êtes"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">invisible</span> sur Google
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Pendant que vous lisez cette page, vos concurrents captent les clients qui vous cherchent à {location}.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-xl font-mono text-sm text-white/60 mb-10">
            <span className="w-2 h-2 rounded-full bg-red-500" />{url}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: seoScore + "/100", label: "Score SEO" },
              { value: data.scores?.visibility + "%", label: "Visibilité IA" },
              { value: data.keywordRankings?.length || "0", label: "Mots-clés analysés" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-red-400 font-mono">{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1 font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONCURRENTS */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 01 — Concurrence</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">Vos concurrents dominent.<br />Pas vous.</h2>
          <p className="text-white/50 max-w-2xl">Voici les entreprises qui captent vos clients en ce moment sur Google et Google Maps à {location}.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.competitorComparison?.map((c: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 relative transition-all">
              <span className="absolute top-4 right-4 text-xs font-black text-white/30 bg-white/5 px-2 py-1 rounded-lg">#{i+1}</span>
              <h3 className="font-bold text-white mb-1">{c.name}</h3>
              <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg mb-3">★ {c.visibility}</div>
              <p className="text-white/50 text-sm leading-relaxed mb-3">{c.context}</p>
              <span className={`text-xs font-black uppercase px-2 py-1 rounded-full ${c.status === "Dominant" ? "bg-emerald-500/20 text-emerald-400" : c.status === "Established" ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white/40"}`}>{c.status}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POSITIONS */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-orange-400 bg-orange-500/10 border border-orange-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 02 — Positions</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">Vos positions actuelles</h2>
          <p className="text-white/50 max-w-2xl">Sur les mots-clés qui comptent, chaque ligne rouge est un flux de clients perdu.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-white/40">Mot-clé</th>
                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-white/40">Position</th>
                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-white/40">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.keywordRankings?.map((k: any, i: number) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white text-sm">{k.keyword}</td>
                  <td className="px-6 py-4 font-mono text-white/60 text-sm">{k.position}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${typeof k.position === "number" && k.position <= 3 ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                      {typeof k.position === "number" && k.position <= 3 ? "Top 3" : "Introuvable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PERTES */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 03 — Ce que vous perdez</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">L&apos;impact réel de votre invisibilité</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔍", value: data.estimatedLoss?.amount, label: "Perte estimée / mois" },
            { icon: "👤", value: data.scores?.visibility + "%", label: "Visibilité actuelle" },
            { icon: "📋", value: data.localVisibilityScore + "/100", label: "Score local" },
            { icon: "💰", value: data.roiEstimate, label: "ROI potentiel" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xl font-black text-red-400 font-mono mb-1">{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <p className="text-white/70 leading-relaxed">{data.estimatedLoss?.description}</p>
        </div>
      </div>

      {/* DIAGNOSTIC */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-orange-400 bg-orange-500/10 border border-orange-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 04 — Diagnostic technique</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">Pourquoi Google ne vous référence pas</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.issues?.map((issue: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-6 border ${issue.severity === "high" ? "bg-red-500/5 border-red-500/20" : "bg-orange-500/5 border-orange-500/20"}`}>
              <span className={`text-xs font-black uppercase px-2 py-1 rounded mb-3 inline-block ${issue.severity === "high" ? "text-red-400 bg-red-500/10" : "text-orange-400 bg-orange-500/10"}`}>
                {issue.severity === "high" ? "CRITIQUE" : "MAJEUR"}
              </span>
              <h3 className="font-bold text-white mb-2">{issue.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{issue.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OPPORTUNITES */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 05 — Opportunités</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">Les quick wins à saisir immédiatement</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.opportunities?.map((o: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 transition-all">
              <h4 className="font-bold text-white mb-2 text-sm">{o.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{o.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PLAN ACTION */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 06 — Plan d&apos;action</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">La roadmap pour dominer {location}</h2>
        </div>
        <div className="space-y-4">
          {data.actionPlan?.map((step: any, i: number) => (
            <div key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-black text-blue-400 shrink-0">{i+1}</div>
              <div>
                <div className="font-bold text-white mb-1">{step.title}</div>
                <p className="text-white/50 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTION */}
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 text-purple-400 bg-purple-500/10 border border-purple-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Bloc 07 — Projection</span>
          <h2 className="text-3xl font-black tracking-tight mb-2">Vos résultats projetés</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.projection?.map((p: string, i: number) => (
            <div key={i} className={`bg-white/5 border rounded-2xl p-6 ${i === 0 ? "border-orange-500/30" : i === 1 ? "border-blue-500/30" : "border-emerald-500/30"}`}>
              <div className={`text-xs font-black uppercase tracking-widest mb-4 ${i === 0 ? "text-orange-400" : i === 1 ? "text-blue-400" : "text-emerald-400"}`}>
                {i === 0 ? "Court terme" : i === 1 ? "Moyen terme" : "Long terme"}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <div className="text-3xl font-black text-emerald-400 mb-2">{data.roiEstimate}</div>
          <p className="text-white/60">{data.visionStatement}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-4">Prêt à dominer {location} ?</h2>
          <p className="text-white/50 text-lg mb-8">{data.cta}</p>
          <button onClick={onContact} className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105">
            Lancer ma stratégie SEO
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="mt-4 text-xs text-white/30">Réponse sous 24h · Sans engagement</div>
        </div>
      </div>

    </motion.div>
  );
}
