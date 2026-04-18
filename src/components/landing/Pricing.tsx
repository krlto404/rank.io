import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  t: any;
  billingCycle: 'monthly' | 'annual';
  setBillingCycle: (cycle: 'monthly' | 'annual') => void;
  setView: (view: any) => void;
}

export const Pricing = ({ t, billingCycle, setBillingCycle, setView }: PricingProps) => {
  const plans = [
    {
      name: t.priceStarter,
      price: billingCycle === 'monthly' ? "49" : "39",
      desc: t.priceStarterDesc,
      features: [t.priceStarterF1, t.priceStarterF2, t.priceStarterF3, t.priceStarterF4],
      btn: t.priceStarterBtn,
      popular: false
    },
    {
      name: t.pricePro,
      price: billingCycle === 'monthly' ? "99" : "79",
      desc: t.priceProDesc,
      features: [t.priceProF1, t.priceProF2, t.priceProF3, t.priceProF4, t.priceProF5],
      btn: t.priceProBtn,
      popular: true
    },
    {
      name: t.priceEnterprise,
      price: "Sur devis",
      desc: t.priceEnterpriseDesc,
      features: [t.priceEnterpriseF1, t.priceEnterpriseF2, t.priceEnterpriseF3, t.priceEnterpriseF4],
      btn: t.priceEnterpriseBtn,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            {t.priceMainTitle}
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-text' : 'text-text-secondary'}`}>Mensuel</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-7 bg-bg-secondary border border-border rounded-full relative p-1 transition-colors"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                className="w-5 h-5 bg-primary rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-text' : 'text-text-secondary'}`}>
              Annuel <span className="text-success text-[10px] ml-1">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-8 relative flex flex-col ${plan.popular ? 'border-primary ring-1 ring-primary/20 scale-105 z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Plus Populaire
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price !== "Sur devis" ? "€" : ""}{plan.price}</span>
                  {plan.price !== "Sur devis" && <span className="text-text-secondary font-bold">/mois</span>}
                </div>
                <p className="text-sm text-text-secondary mt-4 font-medium">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-sm text-text-secondary font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setView('conversion')}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular ? 'btn-primary' : 'bg-bg-secondary border border-border text-text hover:border-primary/30'
                }`}
              >
                {plan.btn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
