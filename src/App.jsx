import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Section from './components/layout/Section';

// Layout wrapper to easily access useLocation
const AppLayout = ({ children }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background font-montserrat text-primary flex flex-col">
      <Header 
        activeLink={location.pathname} 
        onLanguageChange={handleLanguageChange} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  return (
    <Section 
      title={t('home.heroTitle')} 
      subtitle={t('home.jubileeDesc')}
      background="cream"
    >
      <Container padding="md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-8 font-montserrat">
            {t('home.heroDescription')}
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#D4AF37] text-[#1B1B4D] px-6 py-2 rounded font-bold uppercase text-sm tracking-wider hover:bg-opacity-90 transition-opacity">
              {t('home.heroBtnPrimary')}
            </button>
            <button className="border-2 border-[#1B1B4D] text-[#1B1B4D] px-6 py-2 rounded font-bold uppercase text-sm tracking-wider hover:bg-[#1B1B4D] hover:text-white transition-colors">
              {t('home.heroBtnSecondary')}
            </button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

const Placeholder = ({ title }) => (
  <Section title={title} background="white">
    <Container className="text-center py-20">
      <p>Cette page est en cours de construction.</p>
    </Container>
  </Section>
);

function App() {
  const { t } = useTranslation();
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Placeholder title={t('navigation.bible')} />} />
          <Route path="/heritage" element={<Placeholder title={t('navigation.heritage')} />} />
          <Route path="/ressources" element={<Placeholder title={t('navigation.resources')} />} />
          <Route path="/communaute" element={<Placeholder title={t('navigation.community')} />} />
          <Route path="*" element={<Placeholder title="404 - Page non trouvée" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
