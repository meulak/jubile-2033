import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Custom Hook for detecting mobile screens
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

// --- HOTSPOTS (Recalibrés pour le nouveau tracé haute-fidélité) ---
const hotspots = [
  { id: 'alexandrie', x: 745, y: 145, city: 'Alexandrie', country: 'Égypte', infoKey: 'home.map.alexandria' },
  { id: 'carthage', x: 540, y: 130, city: 'Carthage', country: 'Tunisie', infoKey: 'home.map.carthage' },
  { id: 'hippone', x: 495, y: 135, city: 'Hippone', country: 'Algérie', infoKey: 'home.map.hippo' },
  { id: 'axoum', x: 800, y: 445, city: 'Axoum', country: 'Éthiopie', infoKey: 'home.map.axum' },
  { id: 'lalibela', x: 805, y: 490, city: 'Lalibela', country: 'Éthiopie', infoKey: 'home.map.lalibela' },
  { id: 'meroe', x: 765, y: 395, city: 'Méroé', country: 'Soudan', infoKey: 'home.map.meroe' },
  { id: 'cirene', x: 610, y: 145, city: 'Cyrène', country: 'Libye', infoKey: 'home.map.cyrene' },
];

const InteractiveMap = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [activeSpot, setActiveSpot] = useState(null);

  // Tracé Haute-Fidélité (Silhouette réaliste de l'Afrique)
  const africaPathHifi = "M462,82 C483,75 510,72 538,76 C558,79 580,82 605,88 C645,98 675,108 710,118 C755,130 780,140 820,155 C845,170 860,185 870,210 C885,250 880,280 870,320 C860,360 880,400 910,480 C935,550 900,620 860,700 C820,780 770,850 740,900 C710,950 680,1020 640,1080 C610,1130 580,1150 540,1120 C500,1090 420,980 380,880 C340,780 280,680 220,620 C160,560 100,500 70,450 C40,400 30,350 45,300 C60,250 120,230 200,210 C280,190 350,180 430,130 Z";

  const handleSpotClick = (spot) => {
    setActiveSpot(activeSpot?.id === spot.id ? null : spot);
  };

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-[16/9] bg-[#F5F3ED] rounded-[40px] overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)] border border-gray-200 group">
      
      {/* Background Decor (Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1B1B4D_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* SVG Map Container with responsive scaling */}
      <div className="w-full h-full p-6 md:p-12 flex items-center justify-center">
        <svg 
          viewBox="0 0 1000 1200" 
          className="w-full h-full max-h-[85%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-1000"
          preserveAspectRatio="xMidYMid meet"
          style={{ 
            transform: isMobile && activeSpot ? `scale(1.5) translate(${-(activeSpot.x - 500) / 4}px, ${-(activeSpot.y - 600) / 4}px)` : 'scale(1)' 
          }}
        >
          {/* Main Africa Shape */}
          <motion.path
            d={africaPathHifi}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            fill="white"
            stroke="#1B1B4D"
            strokeWidth="3"
            className="filter drop-shadow-sm"
          />

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <g 
              key={spot.id} 
              className="cursor-pointer"
              onClick={() => handleSpotClick(spot)}
            >
              {/* Tap Target (Invisible but large) */}
              <circle cx={spot.x} cy={spot.y} r="40" fill="transparent" />

              {/* Visual Ring */}
              <motion.circle 
                cx={spot.x} cy={spot.y} 
                initial={{ r: 5 }}
                animate={{ r: [8, 15, 8] }}
                transition={{ duration: 3, repeat: Infinity }}
                fill="#D4AF37" 
                className="opacity-20" 
              />
              
              {/* Center point */}
              <motion.circle 
                cx={spot.x} cy={spot.y} r="6" 
                fill={activeSpot?.id === spot.id ? "#B85D3E" : "#1B1B4D"}
                stroke="white"
                strokeWidth="2"
                whileHover={{ scale: 1.8 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {!isMobile && (
                <foreignObject x={spot.x + 12} y={spot.y - 12} width="150" height="30" className="pointer-events-none">
                  <span className={`text-[10px] font-montserrat font-bold uppercase tracking-widest text-[#1B1B4D] transition-all duration-300 ${activeSpot?.id === spot.id ? 'opacity-100 translate-x-2' : 'opacity-0'}`}>
                    {spot.city}
                  </span>
                </foreignObject>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Responsive Panels */}
      <AnimatePresence>
        {activeSpot && (
          isMobile ? (
            /* MOBILE BOTTOM SHEET */
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(_, info) => info.offset.y > 100 && setActiveSpot(null)}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-50 border-t border-gray-100"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-[#1B1B4D]">{activeSpot.city}</h4>
                  <p className="font-montserrat text-xs text-[#D4AF37] font-bold uppercase tracking-[0.2em]">{activeSpot.country}</p>
                </div>
                <button 
                  onClick={() => setActiveSpot(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  &times;
                </button>
              </div>
              <p className="font-serif text-base text-[#5C5C4C] leading-relaxed mb-8">
                {t(activeSpot.infoKey)}
              </p>
              <Link 
                to="/heritage" 
                className="flex items-center justify-center w-full py-4 bg-[#1B1B4D] text-white rounded-2xl font-montserrat text-sm font-bold uppercase tracking-widest active:scale-95 transition-transform"
              >
                Explorer le récit &rarr;
              </Link>
            </motion.div>
          ) : (
            /* DESKTOP SIDE PANEL (Glassmorphism) */
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="absolute top-10 right-10 w-[380px] p-10 rounded-[32px] bg-white/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.15)] z-20"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-[#1B1B4D] leading-tight mb-1">{activeSpot.city}</h4>
                  <p className="font-montserrat text-[11px] text-[#D4AF37] font-bold uppercase tracking-[0.3em]">{activeSpot.country}</p>
                </div>
                <button onClick={() => setActiveSpot(null)} className="text-gray-400 hover:text-[#B85D3E] text-2xl p-2 transition-colors">&times;</button>
              </div>
              <p className="font-serif text-[15px] text-[#5C5C4C] leading-relaxed mb-8 border-l-2 border-[#D4AF37]/30 pl-6">
                {t(activeSpot.infoKey)}
              </p>
              <Link 
                to="/heritage" 
                className="group flex items-center justify-center w-full py-4 bg-[#1B1B4D] text-white rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#1B1B4D] transition-all duration-300"
              >
                En savoir plus 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Legend / Instructions */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B1B4D]/30 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#1B1B4D]/20"></span>
          {isMobile ? "Appuyez sur un point pour explorer" : "Survolez les hotspots historiques"}
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;

