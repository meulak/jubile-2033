import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Coordonnées approximatives pour le viewport SVG 1000x1200
const hotspots = [
  { id: 'alexandrie', x: 740, y: 140, city: 'Alexandrie', country: 'Égypte', infoKey: 'home.map.alexandria' },
  { id: 'carthage', x: 550, y: 130, city: 'Carthage', country: 'Tunisie', infoKey: 'home.map.carthage' },
  { id: 'hippone', x: 505, y: 135, city: 'Hippone', country: 'Algérie', infoKey: 'home.map.hippo' },
  { id: 'axoum', x: 805, y: 440, city: 'Axoum', country: 'Éthiopie', infoKey: 'home.map.axum' },
  { id: 'lalibela', x: 810, y: 485, city: 'Lalibela', country: 'Éthiopie', infoKey: 'home.map.lalibela' },
  { id: 'meroe', x: 770, y: 390, city: 'Méroé', country: 'Soudan', infoKey: 'home.map.meroe' },
  { id: 'cirene', x: 620, y: 155, city: 'Cyrène', country: 'Libye', infoKey: 'home.map.cyrene' },
];

const InteractiveMap = () => {
  const { t } = useTranslation();
  const [activeSpot, setActiveSpot] = useState(null);

  // Tracé simplifié de l'Afrique pour un viewport 1000x1200
  const africaPath = "M460,80 L520,70 L600,85 L750,110 L820,130 L880,180 L850,300 L950,450 L880,650 L750,850 L650,1050 L580,1150 L500,1100 L400,900 L300,750 L150,600 L80,500 L50,420 L70,300 L150,250 L250,220 L380,200 Z";

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[16/9] bg-[#F5F3ED] rounded-3xl overflow-hidden shadow-inner border border-gray-200 group">
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMEw0MCA0ME00MCAwTDAgNDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')]"></div>

      {/* SVG Map */}
      <svg 
        viewBox="0 0 1000 1200" 
        className="w-full h-full drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main Africa Shape */}
        <motion.path
          d={africaPath}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          fill="white"
          stroke="#1B1B4D"
          strokeWidth="4"
          className="filter drop-shadow-sm"
        />

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <g 
            key={spot.id} 
            className="cursor-pointer"
            onMouseEnter={() => setActiveSpot(spot)}
            onMouseLeave={() => setActiveSpot(null)}
            onClick={() => setActiveSpot(activeSpot === spot ? null : spot)}
          >
            {/* Outer pulse */}
            <circle cx={spot.x} cy={spot.y} r="15" fill="#D4AF37" className="animate-pulse-slow opacity-30" />
            
            {/* Inner steady point */}
            <motion.circle 
              cx={spot.x} cy={spot.y} r="8" 
              fill={activeSpot?.id === spot.id ? "#B85D3E" : "#1B1B4D"}
              stroke="white"
              strokeWidth="2"
              whileHover={{ scale: 1.5 }}
            />

            {/* Label discrets sur desktop au survol */}
            <foreignObject x={spot.x + 15} y={spot.y - 10} width="120" height="30" className="pointer-events-none">
              <span className={`text-[10px] font-montserrat font-bold uppercase tracking-widest text-[#1B1B4D] transition-opacity duration-300 ${activeSpot?.id === spot.id ? 'opacity-100' : 'opacity-0'}`}>
                {spot.city}
              </span>
            </foreignObject>
          </g>
        ))}
      </svg>

      {/* Glassmorphism Info Panel */}
      <AnimatePresence>
        {activeSpot && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-6 right-6 w-72 p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl z-20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-playfair text-2xl font-bold text-[#1B1B4D]">{activeSpot.city}</h4>
                <p className="font-montserrat text-xs text-[#D4AF37] font-bold uppercase tracking-widest">{activeSpot.country}</p>
              </div>
              <button onClick={() => setActiveSpot(null)} className="text-gray-400 hover:text-[#B85D3E]">&times;</button>
            </div>
            <p className="font-serif text-sm text-[#5C5C4C] leading-relaxed mb-6">
              {t(activeSpot.infoKey, "Chargement des détails historiques...")}
            </p>
            <Link 
              to="/heritage" 
              className="inline-block w-full text-center py-3 bg-[#1B1B4D] text-white rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1B1B4D] transition-colors"
            >
              En savoir plus
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend / Instructions */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B1B4D]/40">
          Survoler les points pour explorer l'histoire
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;
