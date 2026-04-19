import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-background font-montserrat text-primary flex flex-col">
    <header className="p-4 bg-primary text-background shadow-md">
      <h1 className="font-playfair text-2xl text-accent">Jubilé 2033</h1>
    </header>
    <main className="p-4 flex-grow">{children}</main>
    <footer className="p-4 bg-primary text-background text-center mt-auto">
      <p>&copy; 2033 Jubilé Africain</p>
    </footer>
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl text-primary font-playfair">{t('welcome')}</h2>
      <p className="mt-4">Bienvenue sur le portail officiel célébrant 2000 ans d'histoire chrétienne africaine.</p>
    </motion.div>
  );
};

const Placeholder = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-playfair mb-4">{title}</h2>
    <p>Cette page est en cours de construction.</p>
  </motion.div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Placeholder title="Bible" />} />
          <Route path="/heritage" element={<Placeholder title="Héritage" />} />
          <Route path="/ressources" element={<Placeholder title="Ressources" />} />
          <Route path="/communaute" element={<Placeholder title="Communauté" />} />
          <Route path="*" element={<Placeholder title="404 - Page non trouvée" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
