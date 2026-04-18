import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, TrendingUp, Shield, BarChart3, Globe } from 'lucide-react';

interface FeaturesProps {
  t: any;
}

export const Features = ({ t }: FeaturesProps) => {
  const features = [
    { icon: Target, title: t.feat1Title, desc: t.feat1Desc, color: "text-primary", bg: "bg-primary/5" },
    { icon: Zap, title: t.feat2Title, desc: t.feat2Desc, color: "text-info", bg: "bg-info/5" },
    { icon: TrendingUp, title: t.feat3Title, desc: t.feat3Desc, color: "text-success", bg: "bg-success/5" },
    { icon: Shield, title: t.feat4Title, desc: t.feat4Desc, color: "text-warning", bg: "bg-warning/5" },
    { icon: BarChart3, title: t.feat5Title, desc: t.feat5Desc, color: "text-primary", bg: "bg-primary/5" },
    { icon: Globe, title: t.feat6Title, desc: t.feat6Desc, color: "text-info", bg: "bg-info/5" },
  ];

  return (
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            {t.featMainTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto font-medium"
          >
            {t.featMainSub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-8 group hover:border-primary/30 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
