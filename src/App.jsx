import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Section from './components/layout/Section';
import Home from './pages/Home';

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
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const Placeholder = ({ title }) => (
  <Section title={title} background="white" className="flex-grow flex items-center justify-center">
    <Container className="text-center py-20">
      <p className="font-montserrat text-lg text-gray-600">Cette page est en cours de construction.</p>
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
