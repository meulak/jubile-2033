import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Section from './components/layout/Section';

// --- LAZY-LOADED COMPONENTS ---
const Home = lazy(() => import('./pages/Home'));
const AfricaInBible = lazy(() => import('./pages/AfricaInBible'));
const Heritage = lazy(() => import('./pages/Heritage'));
const Resources = lazy(() => import('./pages/Resources'));
const Community = lazy(() => import('./pages/Community'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const NewsletterPreferences = lazy(() => import('./pages/NewsletterPreferences'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AdminComments = lazy(() => import('./pages/AdminComments'));
const History = lazy(() => import('./pages/History'));
const Vision = lazy(() => import('./pages/Vision'));


// Loading Fallback
const PageLoading = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
        <Suspense fallback={<PageLoading />}>
          {children}
        </Suspense>
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
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<AfricaInBible />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/preferences/newsletter" element={<NewsletterPreferences />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/comments" element={<AdminComments />} />
          <Route path="/histoire" element={<History />} />
          <Route path="/vision" element={<Vision />} />

          <Route path="*" element={<Placeholder title="404 - Page non trouvée" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
