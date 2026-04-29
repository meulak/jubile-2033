import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Slide data – titles, short texts, CTA and dynamic background images
// Texts are now handled via translation keys
const slidesData = [
  {
    key: "slide1",
    link: "/youth",
    image: "jeune.png",
  },
  {
    key: "slide2",
    link: "/catéchistes",
    image: "église.png",
  },
  {
    key: "slide3",
    link: "/curieux",
    image: "2000.webp",
  },
  {
    key: "slide4",
    link: "/chercheurs",
    image: "st_augustine.png",
  },
  {
    key: "slide5",
    link: "/jubilee",
    image: "lalibela.png",
  },
];

// Animation variants for text
const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.6 } },
};

export default function CarouselHero() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  // Auto‑rotate every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidesData.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slidesData[index];
  const { key, link, image } = currentSlide;

  return (
    <section className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden cinematic-gradient">
      {/* Dynamic Background with cross-fade animation */}
      <div className="absolute inset-0 z-0 bg-[#1B1B4D]">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={`${import.meta.env.BASE_URL}assets/images/${image}`}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Premium Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B4D] via-transparent to-[#1B1B4D]/30 opacity-70"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h1 className="font-playfair text-4xl md:text-[80px] leading-[1.1] font-bold text-white mb-6 text-shadow-premium">
              {t(`heroSlides.${key}.title`)}
            </h1>
            <p className="font-serif text-lg md:text-2xl text-white opacity-90 max-w-3xl mx-auto mb-10 italic leading-relaxed">
              {t(`heroSlides.${key}.text`)}
            </p>
            <Link
              to={link}
              className="inline-block bg-[#D4AF37] text-[#1B1B4D] font-montserrat font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:bg-white hover:text-[#1B1B4D] transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20"
            >
              {t(`heroSlides.${key}.cta`)}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === i ? 'w-10 bg-[#D4AF37]' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
