import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';

// --- MOCK DATA ---
const mockArticles = [
  { 
    id: 1, 
    date: '12 Oct 2026', 
    title: 'Découverte en Égypte', 
    excerpt: 'Nouvelles fouilles révélant d\'anciens manuscrits chrétiens près de la mer Rouge.', 
    category: 'Histoire',
    emoji: '🏺'
  },
  { 
    id: 2, 
    date: '05 Nov 2026', 
    title: 'Synode Africain', 
    excerpt: 'Les évêques se réunissent pour préparer le grand Jubilé 2033.', 
    category: 'Communauté',
    emoji: '👥'
  },
  { 
    id: 3, 
    date: '20 Déc 2026', 
    title: 'Traductions Bibliques', 
    excerpt: 'Publication des textes sacrés en 5 nouvelles langues locales.', 
    category: 'Bible',
    emoji: '📖'
  },
  { 
    id: 4, 
    date: '15 Jan 2027', 
    title: 'Parcours des Martyrs', 
    excerpt: 'Exposition virtuelle sur l\'héritage des premiers chrétiens d\'Afrique du Nord.', 
    category: 'Ressources',
    emoji: '🏛️'
  },
];

const mockStats = [
  { number: '2033', description: 'Année du Jubilé' },
  { number: '2000 ans', description: 'De Présence Chrétienne' },
  { number: '5', description: 'Régions Continentales' },
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

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B1B4D] to-[#B85D3E]">
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
              <button className="w-full sm:w-auto bg-[#D4AF37] text-[#1B1B4D] px-8 py-3 rounded font-bold uppercase text-sm tracking-wider hover:bg-opacity-90 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {t('home.heroBtnPrimary')}
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded font-bold uppercase text-sm tracking-wider hover:bg-[#D4AF37] hover:text-[#1B1B4D] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {t('home.heroBtnSecondary')}
              </button>
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
            className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-[#F5F3ED] to-[#E5E3DD] rounded-xl shadow-md border border-[#D1D5DB] flex flex-col items-center justify-center overflow-hidden"
          >
            <span className="text-5xl mb-4" role="img" aria-label="Carte Afrique">🗺️</span>
            <p className="text-[#5C5C4C] font-montserrat text-center px-4">
              Carte interactive des sites bibliques africains (Leaflet.js)
            </p>
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
              <motion.article 
                key={article.id} 
                variants={itemVariants}
                className="group bg-[#F5F3ED] rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-transparent hover:border-[#D4AF37]"
              >
                <div className="text-4xl mb-4 p-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-sm">
                  <span role="img" aria-label={article.category}>{article.emoji}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#D4AF37] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded">{article.category}</span>
                  <span className="text-xs text-[#9B9B8B] font-montserrat">{article.date}</span>
                </div>
                <h4 className="font-playfair text-xl font-bold text-[#1B1B4D] mb-3 group-hover:text-[#B85D3E] transition-colors">{article.title}</h4>
                <p className="font-montserrat text-sm text-[#5C5C4C] mb-6 flex-grow">{article.excerpt}</p>
                <Link to="#" className="text-left font-montserrat text-sm font-bold text-[#D4AF37] hover:text-[#1B1B4D] transition-colors mt-auto inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1B4D] rounded pt-4 border-t border-[#D1D5DB]">
                  Lire plus
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.article>
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
              Rejoignez ce mouvement historique. Que ce soit par la prière, le soutien ou l'étude, vous avez une place dans le Jubilé 2033.
            </p>
            <button className="bg-[#D4AF37] text-[#1B1B4D] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg">
              Découvrir Comment
            </button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
