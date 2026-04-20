import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SEOMeta from '../components/common/SEOMeta';
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
    <div className="w-full">
      <SEOMeta 
        title={t('navigation.home')}
        description={t('home.heroDescription')}
        schema={getOrganizationSchema()}
      />
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B1B4D] via-[#1B1B4D]/90 to-[#B85D3E]">
        {/* Background Image with Parallax-like zoom */}
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={`${import.meta.env.BASE_URL}/assets/images/lalibela.png`}
          alt="Lalibela Rock Churches Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* Ndop subtle stripe overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #FFF 0, #FFF 2px, transparent 2px, transparent 15px)' 
          }}
        ></div>
        
        <Container className="relative z-10 text-center text-white px-4">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-playfair text-4xl md:text-[56px] leading-tight font-bold mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="font-montserrat text-base md:text-lg opacity-95 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {t('home.heroBtnPrimary')}
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {t('home.heroBtnSecondary')}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. JUBILÉE INFO BOX */}
      <section className="w-full bg-gradient-to-r from-[#1B1B4D] to-[#2B2B6D] text-[#F5F3ED] py-12 md:py-16">
        <Container padding="lg">
          <div className="text-center font-montserrat">
            <h3 className="font-playfair text-[#D4AF37] text-2xl md:text-[32px] font-bold mb-4">
              {t('home.jubileeTitle')}
            </h3>
            <p className="opacity-90 max-w-3xl mx-auto mb-10 text-lg">
              {t('home.jubileeDesc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-8">
              {mockStats.map((stat, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  key={idx} 
                  className="flex flex-col items-center justify-center p-4"
                >
                  <span className="text-[#D4AF37] text-[28px] font-bold mb-2 font-playfair">{stat.number}</span>
                  <span className="text-sm text-gray-300 uppercase tracking-wider">{stat.description}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAP SECTION */}
      <Section 
        title={t('home.mapTitle')} 
        background="cream"
      >
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[400px] md:h-[500px] rounded-xl shadow-md border border-[#D1D5DB] overflow-hidden"
          >
            {/* L'image "sample" est mondiale sur tous les environnements de test Cloudinary (cloudId "demo") */}
            <ResponsiveImage 
              src="sample" 
              alt={t('home.mapPlaceholder')} 
              priority={false}
            />
          </motion.div>
        </Container>
      </Section>

      {/* 4. ACTUALITÉS FEED */}
      <Section title={t('home.newsTitle')} background="white">
        <Container>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {mockArticles.map((article) => (
              <Card 
                key={article.id}
                title={article.title}
                description={article.excerpt}
                category={article.category}
                link="#"
                className="h-full"
              />
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 5. CTA SECTION */}
      <section className="w-full bg-[#1B1B4D] text-[#F5F3ED] py-16">
        <Container>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center font-montserrat"
          >
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.ctaTitle')}
            </h3>
            <p className="opacity-80 max-w-2xl mx-auto mb-8 text-lg">
              {t('home.ctaDesc')}
            </p>
            <Button variant="primary" size="lg" className="rounded-full">
              {t('home.ctaBtn')}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
