import React from 'react';
import { motion } from 'motion/react';
import { TypingSearch } from './TypingSearch';

interface HeroProps {
  y2: any;
  opacity: any;
  t: any;
  aiLogos: any[];
}

export const Hero = ({ y2, opacity, t, aiLogos }: HeroProps) => {
  return (
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
            <img 
              src="/logo-renk.png" 
              alt="Renk Logo" 
              className="h-64 sm:h-96 w-auto relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              referrerPolicy="no-referrer"
            />
            
            <motion.div 
              initial={{ x: -300, y: 20, opacity: 0, rotate: -15 }}
              animate={{ 
                x: [-300, -50, 50, 300], 
                y: [20, -10, -10, 30],
                opacity: [0, 1, 1, 0],
                rotate: [-15, 0, 5, 15]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                repeatDelay: 1.5,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1]
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none will-change-transform"
            >
              <div className="relative w-[120px] h-[120px] sm:w-40 sm:h-40 drop-shadow-2xl">
                <div className="absolute top-[42.85%] left-[42.85%] -translate-x-1/2 -translate-y-1/2 w-[64.28%] h-[64.28%] rounded-full overflow-hidden border border-white/30 bg-white/10 backdrop-blur-[4px] shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
                </div>

                <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="renk-io-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="25%" stopColor="#9B72CB" />
                      <stop offset="50%" stopColor="#D96570" />
                      <stop offset="75%" stopColor="#FBBC05" />
                      <stop offset="100%" stopColor="#34A853" />
                    </linearGradient>
                  </defs>
                  <path d="M100 100 L130 130" stroke="url(#renk-io-grad)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M105 105 L125 125" stroke="white" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="45" stroke="url(#renk-io-grad)" strokeWidth="8" />
                  <path d="M35 35 Q 45 25 60 25" stroke="white" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-1 text-center px-6"
          >
            {t.heroTitle1}
          </motion.h1>

          <div className="mb-10 sm:mb-24">
            <TypingSearch />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-xl md:text-2xl text-black mb-8 sm:mb-14 max-w-2xl mx-auto leading-relaxed text-center font-bold px-6"
          >
            {t.heroSub}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 sm:mt-20 mb-12 sm:mb-24 flex items-center justify-center overflow-hidden w-full mask-fade-out will-change-transform"
          >
            <div className="flex animate-marquee whitespace-nowrap items-center w-max will-change-transform" style={{ animationDuration: '60s' }}>
              {[1, 2].map((group) => (
                <div key={group} className="flex gap-20 items-center pr-20">
                  {aiLogos.map((platform, i) => (
                    <div
                      key={`${group}-${i}`}
                      className="flex items-center gap-4 text-xl md:text-3xl font-black tracking-tighter text-text cursor-default"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        {platform.svg}
                      </div>
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
