import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SEOMeta from '../components/common/SEOMeta';
import InteractiveMap from '../components/common/InteractiveMap';
import ResponsiveImage from '../components/common/ResponsiveImage';
import { getOrganizationSchema } from '../utils/schemaHelpers';

// --- MOCK DATA ---
const getMockArticles = (t) => [
  { 
    id: 1, 
    date: '12 Oct 2026', 
    title: t('home.articles.art1.title'), 
    excerpt: t('home.articles.art1.excerpt'), 
    category: t('common.categories.history'),
    emoji: '🏺'
  },
  { 
    id: 2, 
    date: '05 Nov 2026', 
    title: t('home.articles.art2.title'), 
    excerpt: t('home.articles.art2.excerpt'), 
    category: t('common.categories.community'),
    emoji: '👥'
  },
  { 
    id: 3, 
    date: '20 Déc 2026', 
    title: t('home.articles.art3.title'), 
    excerpt: t('home.articles.art3.excerpt'), 
    category: t('common.categories.bible'),
    emoji: '📖'
  },
  { 
    id: 4, 
    date: '15 Jan 2027', 
    title: t('home.articles.art4.title'), 
    excerpt: t('home.articles.art4.excerpt'), 
    category: t('common.categories.resources'),
    emoji: '🏛️'
  },
];

const getMockStats = (t) => [
  { number: '2033', description: t('home.stats.year') },
  { number: '2000 ans', description: t('home.stats.presence') },
  { number: '5', description: t('home.stats.regions') },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Home = () => {
  const { t } = useTranslation();
  const mockArticles = getMockArticles(t);
  const mockStats = getMockStats(t);

  return (
    <div className="w-full bg-[#F5F3ED]">
      <SEOMeta 
        title={t('navigation.home')}
        description={t('home.heroDescription')}
        schema={getOrganizationSchema()}
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden cinematic-gradient">
        {/* Background Image with Parallax & Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={`${import.meta.env.BASE_URL}/assets/images/lalibela.png`}
            alt="Lalibela Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B4D] via-transparent to-transparent opacity-60"></div>
        </div>
        
        {/* Animated Background Elements (Floating Symbols) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#D4AF37]/20 blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              opacity: [0.05, 0.2, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#B85D3E]/10 blur-[100px]"
          ></motion.div>
        </div>

        {/* Content */}
        <Container className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm font-montserrat text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]"
            >
              Impronte Africane • Jubilé 2033
            </motion.div>

            <h1 className="font-playfair text-5xl md:text-[84px] leading-[1.1] font-bold mb-8 text-shadow-premium">
              {t('home.heroTitle')}
            </h1>
            
            <p className="font-serif text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed italic border-l-2 border-[#D4AF37]/50 pl-6 text-left md:text-center md:border-none">
              {t('home.heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full glow-accent px-10 py-5 transition-transform hover:scale-105 active:scale-95">
                {t('home.heroBtnPrimary')}
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-white/30 text-white hover:bg-white/10 px-10 py-5">
                {t('home.heroBtnSecondary')}
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Explorer</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. JUBILÉE STATISTICS & VISION (PREMIUM CARD) */}
      <section className="relative -mt-20 z-20 pb-20">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white rounded-[40px] shadow-2xl p-10 md:p-20 border border-gray-100 flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1">
              <h3 className="font-playfair text-[#1B1B4D] text-3xl md:text-[44px] leading-tight font-bold mb-6">
                {t('home.jubileeTitle')}
              </h3>
              <p className="font-serif text-gray-500 text-lg leading-relaxed mb-8">
                {t('home.jubileeDesc')}
              </p>
              <Link to="/vision">
                <Button variant="tertiary" className="text-[#B85D3E] font-bold group">
                  Découvrir notre vision <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full lg:w-max shrink-0">
              {mockStats.map((stat, idx) => (
                <div key={idx} className="text-center p-6 rounded-3xl bg-[#F5F3ED] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[#D4AF37] text-4xl font-bold mb-2 font-playfair">{stat.number}</div>
                  <div className="text-[10px] text-[#1B1B4D] font-bold uppercase tracking-widest leading-tight">{stat.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. PREMIUM INTERACTIVE MAP */}
      <Section 
        title={t('home.mapTitle')} 
        subtitle="Voyagez à travers les époques et les royaumes qui ont façonné la foi africaine."
        background="cream"
        className="pt-10 pb-32"
      >
        <Container>
           <InteractiveMap />
        </Container>
      </Section>

      {/* 4. ACTUALITÉS & RÉCITS */}
      <Section title={t('home.newsTitle')} background="white" className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <p className="font-serif text-gray-500 text-lg">
                Derniers articles, recherches et témoignages de la communauté.
              </p>
            </div>
            <Link to="/articles">
              <Button variant="secondary" className="rounded-full">Tout lire</Button>
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {mockArticles.map((article) => (
              <Card 
                key={article.id}
                title={article.title}
                description={article.excerpt}
                category={article.category}
                link={`/articles/${article.slug}`}
                className="h-full transform transition-transform hover:-translate-y-2"
              />
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 5. CINEMATIC CTA SECTION */}
      <section className="w-full relative py-32 overflow-hidden bg-[#1B1B4D]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <Container>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-[#F5F3ED]"
          >
            <h3 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
              {t('home.ctaTitle')}
            </h3>
            <p className="font-serif text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('home.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-12 py-5 glow-accent">
                {t('home.ctaBtn')}
              </Button>
              <Link to="/community" className="font-montserrat text-sm font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
                Voir la communauté &rarr;
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};


export default Home;
