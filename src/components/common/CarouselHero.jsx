import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Slide data – titles, short texts and CTA
const slides = [
  {
    title: "L'Afrique, la Bible et toi",
    text: "Tu as toujours entendu que ta culture était hors‑Bible ? Découvre qu’elle y a TOUJOURS été.",
    cta: "Voir comment",
    link: "/youth",
  },
  {
    title: "Enseigner une foi authentique",
    text: "Comment montrer à tes élèves que l’Afrique a FAÇONNÉ le christianisme ? Voici comment.",
    cta: "Accéder ressources",
    link: "/catéchistes",
  },
  {
    title: "2000 ans d'histoires oubliées",
    text: "L'histoire du salut s'est écrite en AFRIQUE. Découvre ces histoires jamais racontées.",
    cta: "Explorer",
    link: "/curieux",
  },
  {
    title: "Recherche académique sur l'Afrique chrétienne",
    text: "Articles, sources, données. Tout ce que tu dois savoir sur 2000 ans de présence chrétienne africaine.",
    cta: "Consulter",
    link: "/chercheurs",
  },
  {
    title: "Vers le Jubilé 2033",
    text: "Prépare-toi pour le Jubilé en découvrant les racines africaines de ta foi. C'est ton héritage.",
    cta: "Commencer le voyage",
    link: "/jubilee",
  },
];

// Simple fade‑in/out animation variants
const variants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.6 } },
};

export default function CarouselHero() {
  const [index, setIndex] = useState(0);

  // Auto‑rotate every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const { title, text, cta, link } = slides[index];

  return (
    <section className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden cinematic-gradient">
      {/* Background – keep existing Ndop pattern */}
      <div className="absolute inset-0 z-0 bg-[#1B1B4D] opacity-30" />
      <motion.div
        key={index}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-playfair text-5xl md:text-[84px] leading-[1.1] font-bold text-white mb-6">
          {title}
        </h1>
        <p className="font-serif text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto mb-8 italic">
          {text}
        </p>
        <Link
          to={link}
          className="inline-block bg-[#D4AF37] text-[#1B1B4D] font-montserrat font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#C89F30] transition-colors"
        >
          {cta}
        </Link>
      </motion.div>
    </section>
  );
}
