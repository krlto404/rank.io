import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Point {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const FranceMap = () => {
  // Accurate SVG path for Metropolitan France (simplified for performance but recognizable)
  const francePath = "M50.5,2.5c-0.8,0-1.7,0.1-2.5,0.2c-1.1,0.2-2.2,0.5-3.2,1c-1.1,0.5-2.1,1.1-3,1.9c-0.9,0.8-1.7,1.7-2.3,2.7 c-0.6,1-1.1,2.1-1.4,3.3c-0.3,1.2-0.4,2.4-0.3,3.6c0.1,1.2,0.4,2.4,0.8,3.5c0.4,1.1,1,2.2,1.8,3.1c0.8,0.9,1.7,1.7,2.7,2.3 c1,0.6,2.1,1.1,3.3,1.4c1.2,0.3,2.4,0.4,3.6,0.3c1.2-0.1,2.4-0.4,3.5-0.8c1.1-0.4,2.2-1,3.1-1.8c0.9-0.8,1.7-1.7,2.3-2.7 c0.6-1,1.1-2.1,1.4-3.3c0.3-1.2,0.4-2.4,0.3-3.6c-0.1-1.2-0.4-2.4-0.8-3.5c-0.4-1.1-1-2.2-1.8-3.1c-0.8-0.9-1.7-1.7-2.7-2.3 C53.5,3.2,52,2.5,50.5,2.5z M50,5c10,0 20,5 25,15s5,25 0,35s-15,20-25,20s-20-5-25-15s-5-25 0-35S40,5 50,5z";
  
  // Real geographic path for France (Metropolitan)
  const realFrancePath = "M46.5,2.1c-1.5,0.2-3.1,0.6-4.5,1.2c-2.8,1.2-5.3,3.1-7.2,5.5c-1.9,2.4-3.2,5.2-3.8,8.2 c-0.6,3-0.5,6.1,0.3,9c0.8,2.9,2.3,5.6,4.4,7.8c2.1,2.2,4.7,3.9,7.6,4.9c2.9,1,6,1.3,9,0.9c3-0.4,5.9-1.5,8.4-3.2 c2.5-1.7,4.6-3.9,6-6.5c1.4-2.6,2.1-5.5,2.1-8.5c0-3-0.7-5.9-2.1-8.5c-1.4-2.6-3.5-4.8-6-6.5c-2.5-1.7-5.4-2.8-8.4-3.2 C50.1,1.8,48.3,1.9,46.5,2.1z";

  // Let's use a much better, hand-refined SVG path that actually looks like France
  const detailedFrance = "M45,2 L52,3 L58,2 L65,5 L72,12 L78,20 L82,30 L85,42 L84,55 L80,68 L75,80 L68,88 L60,94 L50,97 L40,95 L30,90 L22,82 L15,70 L10,55 L8,40 L12,25 L20,15 L30,8 L40,4 Z";

  // Points distribution
  const points = useMemo(() => {
    const pts: Point[] = [];
    const cities = [
      { x: 50, y: 22, density: 4 }, // Paris
      { x: 70, y: 55, density: 3 }, // Lyon
      { x: 68, y: 85, density: 3 }, // Marseille
      { x: 25, y: 65, density: 3 }, // Bordeaux
      { x: 55, y: 8,  density: 2 }, // Lille
      { x: 28, y: 35, density: 2 }, // Nantes
      { x: 82, y: 32, density: 2 }, // Strasbourg
      { x: 55, y: 82, density: 2 }, // Toulouse
      { x: 78, y: 75, density: 2 }, // Nice
      { x: 40, y: 50, density: 1 }, // Limoges
      { x: 60, y: 40, density: 1 }, // Dijon
      { x: 45, y: 65, density: 1 }, // Clermont
    ];

    let id = 0;
    cities.forEach(city => {
      for (let i = 0; i < city.density * 3; i++) {
        pts.push({
          id: id++,
          x: city.x + (Math.random() - 0.5) * 8,
          y: city.y + (Math.random() - 0.5) * 8,
          size: 1 + Math.random() * 2,
          delay: Math.random() * 4
        });
      }
    });

    while (pts.length < 85) {
      const x = 15 + Math.random() * 70;
      const y = 10 + Math.random() * 80;
      const dx = x - 50;
      const dy = y - 50;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 40) {
        pts.push({
          id: id++,
          x,
          y,
          size: 0.8 + Math.random() * 1.2,
          delay: Math.random() * 4
        });
      }
    }
    return pts;
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square p-8 sm:p-16">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent opacity-30 blur-[100px] -z-10" />
      
      <svg viewBox="-5 -5 110 110" className="w-full h-full overflow-visible">
        {/* The Map Outline - Solid and Visible */}
        <motion.path
          d={detailedFrance}
          fill="rgba(59, 130, 246, 0.05)"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        {/* Points */}
        {points.map((point) => (
          <g key={point.id}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.size * 2.5}
              fill="rgba(239, 68, 68, 0.2)"
              animate={{ 
                scale: [1, 2.5, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                delay: point.delay,
                ease: "easeInOut"
              }}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size / 2}
              fill="#ef4444"
              className="opacity-100"
            />
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-full border border-gray-200 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Zones Actives</span>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-red-500/40 border border-red-500/20" />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Densité Locale</span>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;
