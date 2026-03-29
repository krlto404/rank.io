import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  // Transform mouse position to a range for translation
  const tx1 = useTransform(dx, [-0.5, 0.5], [-100, 100]);
  const ty1 = useTransform(dy, [-0.5, 0.5], [-100, 100]);
  
  const tx2 = useTransform(dx, [-0.5, 0.5], [120, -120]);
  const ty2 = useTransform(dy, [-0.5, 0.5], [120, -120]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-visible pointer-events-none flex items-center justify-center">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.2 + 0.05,
              scale: Math.random() * 0.4 + 0.2
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 400 + "px"],
              x: [null, (Math.random() - 0.5) * 400 + "px"],
              opacity: [null, Math.random() * 0.1 + 0.05, Math.random() * 0.2 + 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse"
            }}
            className="absolute w-1 h-1 bg-emerald-500/30 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative w-[1200px] h-[1200px] opacity-10">
        {/* Blob 1 - Emerald */}
        <motion.div
          style={{
            x: tx1,
            y: ty1,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-emerald-500/5 blur-[200px]"
        />
        
        {/* Blob 2 - Cyan */}
        <motion.div
          style={{
            x: tx2,
            y: ty2,
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [0, -180, 0],
            borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-cyan-500/5 blur-[200px]"
        />
      </div>
    </div>
  );
};
