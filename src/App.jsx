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
      title={t('welcome') || "Bienvenue au Jubilé 2033"} 
      subtitle="Célébrant 2000 ans d'histoire chrétienne africaine."
      background="cream"
    >
      <Container padding="md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Explorez les racines profondes de notre héritage, depuis les premiers siècles de l'Église jusqu'au rassemblement du jubilé continental.
          </p>
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
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Placeholder title="Bible" />} />
          <Route path="/heritage" element={<Placeholder title="Héritage" />} />
          <Route path="/ressources" element={<Placeholder title="Ressources" />} />
          <Route path="/communaute" element={<Placeholder title="Communauté" />} />
          <Route path="*" element={<Placeholder title="404 - Page non trouvée" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
