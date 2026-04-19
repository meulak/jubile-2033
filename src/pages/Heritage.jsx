import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

// --- MOCK DATA ---
const mockTimeline = [
  { id: 1, year: '50 AD', title: "L'Eunuque Éthiopien", desc: "Le ministre de la Candace est baptisé par l'apôtre Philippe, plantant les toutes premières graines de l'Évangile au cœur du continent africain.", category: 'Antiquité' },
  { id: 2, year: '180 AD', title: 'Les Martyrs Scillitains', desc: 'Premières traces documentées du christianisme florissant en Afrique du Nord, tragiquement scellées par le martyre de 12 héroïques chrétiens à Carthage.', category: 'Antiquité' },
  { id: 3, year: '251 AD', title: 'Cyprien de Carthage', desc: "Élu brillant évêque de Carthage, il unifie l'Église africaine lors des brutales persécutions de Dèce et structure magistralement la théologie ecclésiologique.", category: 'Antiquité' },
  { id: 4, year: '354-430', title: "Saint Augustin d'Hippone", desc: "Le plus grand penseur de l'Antiquité chrétienne. Ses immenses œuvres, comme La Cité de Dieu, façonnent encore aujourd'hui toute la théologie occidentale.", category: 'Antiquité' },
  { id: 5, year: '451 AD', title: 'Le Concile de Chalcédoine', desc: "Grand schisme impliquant la puissante Église Copte d'Égypte qui maintient indéfectiblement sa propre lignée théologique (miaphysisme) à travers les siècles.", category: 'Antiquité' },
  { id: 6, year: '700-1400', title: 'La Période Médiévale', desc: "Expansion fulgurante de l'Islam en Afrique du Nord. La majestueuse Église orthodoxe éthiopienne continue de prospérer, isolée dans ses montagnes (églises rupestres de Lalibela).", category: 'Moyen-Âge' },
  { id: 7, year: '1500-1800', title: 'Les Premières Missions Modernes', desc: "Arrivée de missionnaires catholiques européens sur les côtes (notamment au Kongo), entraînant un christianisme de cour et de nouvelles christianisations complexes.", category: 'Moderne' },
  { id: 8, year: '1900-2000', title: 'Renouveau et Indépendance', desc: "Émergence forte et vibrante des Églises d'Institution Africaine (EIA), réappropriation de la foi et incroyable explosion démographique du christianisme sur le continent.", category: 'Moderne' },
  { id: 9, year: '2033', title: 'Jubilé de la Rédemption', desc: "Célébration spirituelle mondiale des 2000 ans du salut chrétien. L'Afrique se positionne définitivement comme le cœur battant et l'avenir de la chrétienté universelle.", category: 'Moderne' },
];

const mockFathers = [
  { id: 1, name: "Saint Augustin d'Hippone", dates: "354 - 430", bio: "Philosophe et théologien chrétien majeur, évêque d'Hippone (actuelle Annaba, Algérie). Ses écrits ont posé les fondations intellectuelles de l'Occident.", quote: "Tard je t'ai aimée, beauté ancienne et si nouvelle !" },
  { id: 2, name: "Tertullien de Carthage", dates: "155 - 220", bio: "Le père fulgurant de la terminologie de la théologie latine. Il a forgé le concept de la Trinité et a ardemment défendu la foi face aux persécutions païennes.", quote: "Le sang des martyrs est une semence de chrétiens." },
  { id: 3, name: "Cyprien de Carthage", dates: "200 - 258", bio: "Évêque brillant et martyr. Défenseur zélé de l'unité de l'Église face aux divisions intestines et grand organisateur des œuvres de charité.", quote: "Nul ne peut avoir Dieu pour Père, qui n'a l'Église pour Mère." }
];

const mockContemporary = [
  { id: 1, name: "Jean-Marc Ela", role: "Théologien du Libérationnisme", bio: "Prêtre camerounais qui a développé la théologie sous l'arbre, reconnectant l'Évangile aux luttes paysannes et à la pauvreté.", emoji: "✍️" },
  { id: 2, name: "John Mbiti", role: "Philosophe des Religions", bio: "Théologien kényan, pionnier monumental de l'étude des religions traditionnelles africaines en lien avec la foi chrétienne.", emoji: "📚" },
  { id: 3, name: "Kwame Bediako", role: "Historien de l'Identité", bio: "Affinant la théologie interculturelle au Ghana, il démontrait que l'Africain trouve dans le Christ la plénitude de sa propre identité.", emoji: "🌍" },
  { id: 4, name: "Mercy Amba Oduyoye", role: "Théologie Féministe", bio: "Fondatrice ghanéenne du Cercle des Théologiennes Africaines, ouvrant la voie à la voix des femmes dans la théologie continentale.", emoji: "🕊️" }
];

// --- SUB-COMPONENTS ---
const TimelineItemDesktop = ({ item, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="hidden md:flex items-center justify-between w-full mb-12 relative z-10"
    >
      {/* Left side */}
      <div className={`w-5/12 ${isEven ? 'order-1 flex justify-end text-right' : 'order-3 text-left'}`}>
        <div className={`bg-white p-6 rounded-xl shadow-lg border-t-[3px] border-[#D4AF37] hover:-translate-y-2 transition-transform duration-300 group max-w-lg ${isEven ? 'mr-4' : 'ml-4'}`}>
          <div className={`text-[#D4AF37] font-playfair font-bold text-2xl mb-2 ${isEven ? 'text-right' : 'text-left'}`}>
            {item.year}
          </div>
          <h3 className={`font-montserrat text-[#1B1B4D] font-bold text-lg mb-3 ${isEven ? 'text-right' : 'text-left'}`}>
            {item.title}
          </h3>
          <p className="font-serif text-[#5C5C4C] text-sm leading-relaxed mb-4">
            {item.desc}
          </p>
          <div className={`flex ${isEven ? 'justify-end' : 'justify-start'}`}>
            <Badge label={item.category} variant={item.category === 'Antiquité' ? 'default' : item.category === 'Moyen-Âge' ? 'warning' : 'primary'} size="sm" />
          </div>
        </div>
      </div>
      
      {/* Center line dot */}
      <div className="z-20 order-2 w-2/12 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-[#1B1B4D] border-4 border-[#F5F3ED] shadow ring-2 ring-[#D4AF37] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItemMobile = ({ item }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex-shrink-0 w-[280px] snap-center"
  >
    <div className="bg-white h-full p-6 rounded-xl shadow-md border-t-[3px] border-[#D4AF37] flex flex-col">
      <div className="text-[#D4AF37] font-playfair font-bold text-xl mb-2">
        {item.year}
      </div>
      <h3 className="font-montserrat text-[#1B1B4D] font-bold text-base mb-3">
        {item.title}
      </h3>
      <p className="font-serif text-[#5C5C4C] text-sm leading-relaxed mb-4 flex-grow">
        {item.desc}
      </p>
      <div className="mt-auto">
        <Badge label={item.category} variant={item.category === 'Antiquité' ? 'default' : item.category === 'Moyen-Âge' ? 'warning' : 'primary'} size="sm" />
      </div>
    </div>
  </motion.div>
);


const Heritage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'Antiquité', 'Moyen-Âge', 'Moderne'];

  const filteredTimeline = activeFilter === 'Tous' 
    ? mockTimeline 
    : mockTimeline.filter(item => item.category === activeFilter);

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 bg-[#1B1B4D] text-white flex flex-col items-center justify-center text-center overflow-hidden z-0">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
        <Container className="relative z-10">
          <div className="mb-4 text-[#D4AF37] font-montserrat text-xs font-bold tracking-widest uppercase flex items-center justify-center">
            <Link to="/" className="hover:underline opacity-80 hover:opacity-100">Accueil</Link> 
            <span className="mx-2">&gt;</span> 
            <span>Héritage</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-[#D4AF37]"
          >
            {t('heritage.title', 'Héritage et Histoire')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-lg lg:text-xl max-w-2xl mx-auto opacity-90 mb-12"
          >
            {t('heritage.subtitle', 'Explorez la fascinante chronologie de 2000 ans de présence chrétienne continue sur le continent africain.')}
          </motion.p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 py-2 rounded-full font-montserrat text-sm font-bold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                  ${activeFilter === filter 
                    ? 'bg-[#D4AF37] text-[#1B1B4D] shadow-lg' 
                    : 'bg-transparent border border-white/30 text-white hover:bg-white/10'}
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. TIMELINE SECTION */}
      <Container className="py-20 overflow-hidden">
        
        {/* Desktop Vertical Timeline */}
        <div className="hidden md:block relative w-full py-10 max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-[#D4AF37]/50 rounded-full"></div>
          
          <AnimatePresence mode="popLayout">
            {filteredTimeline.map((item, index) => (
              <TimelineItemDesktop key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Horizontal Timeline */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-12 pt-6 hide-scrollbar -mx-4 px-4 w-[100vw]">
          <AnimatePresence>
            {filteredTimeline.map(item => (
              <TimelineItemMobile key={`mob-${item.id}`} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </Container>

      {/* 3. PÈRES DE L'ÉGLISE SECTION */}
      <Section title="Les Grands Penseurs de l'Antiquité" background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockFathers.map((father, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={father.id}
                className="bg-[#F5F3ED] rounded-xl border border-[#D4AF37]/20 p-8 flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-full flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#1B1B4D] border-4 border-[#D4AF37] flex items-center justify-center overflow-hidden shadow-lg">
                    <span className="text-3xl text-[#D4AF37] font-playfair">{father.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h4 className="font-playfair text-xl font-bold text-[#1B1B4D] mb-1">{father.name}</h4>
                  <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{father.dates}</span>
                </div>
                <p className="font-serif text-[#5C5C4C] text-sm text-center mb-6 flex-grow">{father.bio}</p>
                
                <blockquote className="border-l-[3px] border-[#D4AF37] pl-4 italic text-[#B85D3E] font-playfair font-medium text-sm mb-6">
                  "{father.quote}"
                </blockquote>

                <Link to="#" className="w-full text-center mt-auto font-montserrat text-sm font-bold uppercase tracking-wider text-[#1B1B4D] hover:text-[#D4AF37] transition-colors border-t border-[#D4AF37]/20 pt-4">
                  Lire la biographie
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. THÉOLOGIENS CONTEMPORAINS SECTION */}
      <Section title="Théologiens Contemporains" subtitle="Penseurs d'aujourd'hui façonnant la pensée chrétienne africaine" background="cream">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockContemporary.map((person, idx) => (
              <Card
                key={person.id}
                title={person.name}
                category={person.role}
                description={person.bio}
                footer={
                  <Link to="#" className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#1B1B4D] transition-colors">
                    Découvrir travaux &rarr;
                  </Link>
                }
                hoverable
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. HISTORY MAP SECTION */}
      <Section background="blue" className="py-20 text-white">
        <Container>
          <div className="text-center mb-10">
            <h3 className="font-playfair text-4xl font-bold text-[#D4AF37] mb-4">La Carte Historique</h3>
            <p className="font-montserrat text-white/80 max-w-2xl mx-auto">Explorez visuellement les grandes métropoles religieuses de Carthage à Alexandrie en passant par Aksoum.</p>
          </div>
          
          <div className="w-full h-[300px] md:h-[500px] bg-[#F5F3ED] rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 border-4 border-[#D4AF37] group">
            {/* Visual map placeholder overlay */}
            <span className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🌍</span>
            <p className="text-[#1B1B4D] font-playfair text-2xl font-bold mb-2">Leaflet Interactive Map</p>
            <p className="text-[#5C5C4C] font-montserrat text-sm text-center max-w-md">La prochaine étape intégrera la cartographie interactive permettant de cliquer sur Carthage, Hippone, l'Éthiopie, et l'Égypte pour de riches détails historiques.</p>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Heritage;
