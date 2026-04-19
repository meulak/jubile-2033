import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import { Link } from 'react-router-dom';

const BibleTabContent = ({ title, content, quotes, align = 'left', cta }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex-grow bg-white p-6 md:p-10 rounded-2xl shadow-xl flex flex-col xl:flex-row gap-10"
    >
      <div className={`flex-1 flex flex-col ${align === 'right' ? 'xl:order-last' : ''}`}>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1B1B4D] mb-8 relative inline-block">
          {title}
          <span className="block w-16 h-[3px] bg-[#D4AF37] mt-4"></span>
        </h2>
        
        <div className="font-serif text-[#5C5C4C] space-y-6 leading-[1.9] text-base lg:text-[17px] w-full max-w-[70ch]">
          {content.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-10">
          <Button variant="primary" size="lg">{cta}</Button>
        </div>
      </div>

      <div className={`w-full xl:w-[400px] flex-shrink-0 flex flex-col gap-6 ${align === 'right' ? 'xl:order-first' : ''}`}>
        {/* Abstract/Image representation with lazy load concept */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[300px] bg-gradient-to-br from-[#F5F3ED] to-[#E5E3DD] rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/20 shadow-inner relative overflow-hidden group"
        >
          {/* Subtle Ndop overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, #fff 2px, #fff 10px)' }}></div>
          <span className="text-6xl opacity-70 z-10 group-hover:scale-110 transition-transform duration-500">🏜️</span>
          <span className="text-xs text-gray-400 mt-4 z-10 font-montserrat uppercase tracking-widest">(Image Source Placeholder)</span>
        </motion.div>
        
        {/* Citations block */}
        <div className="bg-[#1B1B4D]/5 p-6 rounded-xl border-l-[4px] border-[#D4AF37] shadow-sm transform transition-all hover:translate-x-1">
          <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-[11px] tracking-widest mb-4">Citations Bibliques</h4>
          <div className="space-y-5">
            {quotes.map((q, i) => (
              <blockquote key={i} className="font-playfair italic text-[#B85D3E] text-[17px] leading-relaxed">
                "{q.text}"
                <footer className="font-montserrat text-xs text-[#1B1B4D] mt-2 font-bold">— {q.ref}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AfricaInBible = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('racines');

  const tabs = [
    { id: 'racines', label: t('bible.tab1', 'Les Racines') },
    { id: 'sagesse', label: t('bible.tab2', 'La Sagesse') },
    { id: 'exil', label: t('bible.tab3', "L'Exil") },
    { id: 'premices', label: t('bible.tab4', 'Les Prémices') },
  ];

  const tabData = {
    racines: {
      title: t('bible.racines.title', "Les Racines : Abraham et L'Égypte"),
      content: [
        t('bible.racines.p1', "L'histoire foisonnante du continent africain est profondément ancrée dans les récits des patriarches. Abraham a trouvé refuge en Égypte lors de la famine, marquant ainsi le premier lien d'interdépendance fort entre la promesse originelle d'Israël et la vaste terre protectrice d'Afrique."),
        t('bible.racines.p2', "À travers les siècles, la nation d'Israël s'est développée au sein de la puissante Égypte antique, s'imprégnant inévitablement de sa culture, de son architecture et de sa sagesse avant d'entamer le grand Exode salvateur vers la Terre Promise."),
        t('bible.racines.p3', "Le Sinaï et le désert brûlant, ce pont mystique qui relie géographiquement et religieusement l'Afrique au Moyen-Orient, sont devenus le berceau majestueux de la Loi, de la Révélation et de l'Alliance divine éternelle.")
      ],
      quotes: [
        { text: "Le Seigneur dit à Abram : « Quitte ton pays, ta parenté et la maison de ton père, et va vers le pays que je te montrerai. »", ref: "Genèse 12:1" },
        { text: "Voici les noms des fils d'Israël qui vinrent en Égypte...", ref: "Exode 1:1-5" }
      ],
      cta: t('bible.racines.cta', "Lire l'Article Complet"),
      align: "left"
    },
    sagesse: {
      title: t('bible.sagesse.title', "La Sagesse : La Reine de Saba et Salomon"),
      content: [
        t('bible.sagesse.p1', "La rencontre somptueuse et légendaire entre le prestigieux Roi Salomon, doté d'une sagesse divine, et la Reine de Saba marque une alliance diplomatique, économique, mais aussi profondément spirituelle entre la rayonnante Jérusalem et la riche corne de l'Afrique."),
        t('bible.sagesse.p2', "Au-delà de l'or, des pierres précieuses et des aromates dont la Bible détaille profusionnement le transport, ces échanges ont fusionné et modelé un imaginaire religieux et savant profondément partagé par les deux peuples."),
        t('bible.sagesse.p3', "Cet héritage politico-religieux demeure extrêmement vivace de nos jours, tout particulièrement dans les traditions éthiopiennes ancestrales qui rattachent et lient fidèlement leur puissante lignée royale (les Négus) à cette majestueuse rencontre biblique au croisement de deux mondes.")
      ],
      quotes: [
        { text: "La reine de Saba apprit la renommée que Salomon devait au nom du Seigneur. Elle vint donc l'éprouver par des énigmes. Elle arriva à Jérusalem avec une suite imposante...", ref: "1 Rois 10:1-13" }
      ],
      cta: t('bible.sagesse.cta', "Voir la Biographie"),
      align: "right"
    },
    exil: {
      title: t('bible.exil.title', "L'Exil et l'Accueil : Jésus en Égypte"),
      content: [
        t('bible.exil.p1', "La Fuite en Égypte est l'un des moments fondateurs et des plus symboliques de l'aube du Nouveau Testament. Face à la folie destructrice et jalousie mortelle du roi Hérode, c'est l'Afrique bienveillante qui offre instantanément le refuge salvateur à la Sainte Famille."),
        t('bible.exil.p2', "L'Afrique a de tous temps été célébrée comme la terre d'asile par excellence dans la Bible, l'endroit providentiel où le divin et l'humain innocents et acculés trouvent réconfort, ressources et protection ultime pour garantir et préserver la lignée."),
        t('bible.exil.p3', "Cette symbolique spirituelle d'une puissance inouïe résonne encore de nos jours : la terre de l'exil d'hier est le socle originel de demain. Le continent africain est glorifié pour avoir protégé physiquement Celui qui venait en esprit pour protéger et sauver le monde entier.")
      ],
      quotes: [
        { text: "Après leur départ, voici que l'Ange du Seigneur apparaît en songe à Joseph et lui dit : « Lève-toi ; prends l'enfant et sa mère, et fuis en Égypte. Reste là-bas jusqu'à ce que je t'avertisse... »", ref: "Matthieu 2:13-15" }
      ],
      cta: t('bible.exil.cta', "Découvrir la Symbolique"),
      align: "left"
    },
    premices: {
      title: t('bible.premices.title', "Les Prémices du Salut : L'Eunuque Éthiopien"),
      content: [
        t('bible.premices.p1', "Sur la route poussiéreuse et déserte descendant de Jérusalem vers Gaza, une rencontre fondatrice ordonnée par l'Esprit Saint se produit entre l'apôtre Philippe et un haut dignitaire magnifiquement vêtu : l'eunuque, le puissant ministre de la Candace, reine d'Éthiopie."),
        t('bible.premices.p2', "Cherchant ardemment et avec humilité à comprendre les vieux et complexes textes du prophète Isaïe depuis le siège de son char royal, la lumière totale lui fut soudainement révélée et donnée par l'apôtre enthousiaste."),
        t('bible.premices.p3', "Dès sa descente sereine dans l'eau providentielle, il devient le premier haut-représentant Africain formellement baptisé tel que rapporté par les Actes, emportant fièrement avec lui la toute première graine vivace du christianisme pour la transplanter vers le cœur profond de l'Afrique pour sa fulgurante expansion millénaire future.")
      ],
      quotes: [
        { text: "Or, se trouvait là un Éthiopien, un eunuque, haut fonctionnaire de Candace, reine d'Éthiopie, et surintendant de tous ses trésors. Il était venu à Jérusalem pour adorer...", ref: "Actes 8:26-40" }
      ],
      cta: t('bible.premices.cta', "Lire le Chapitre des Actes"),
      align: "right"
    }
  };

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen pb-20 fade-in-section">
      <header>
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gradient-to-br from-[#1B1B4D] to-[#B85D3E] overflow-hidden text-center z-0 shadow-lg">
          <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
          <Container className="relative z-10 text-white">
            <div className="mb-6 text-[#D4AF37] font-montserrat text-xs font-bold tracking-widest uppercase opacity-90 flex items-center justify-center">
              <Link to="/" className="hover:underline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 rounded p-1">{t('navigation.home', 'Accueil')}</Link> 
              <span className="mx-2">&gt;</span> 
              <span>{t('navigation.bible', 'Bible')}</span>
            </div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-playfair text-4xl md:text-[50px] leading-tight font-bold mb-4 drop-shadow-xl"
            >
              {t('bible.heroTitle', "L'Afrique dans la Bible")}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto font-montserrat text-sm md:text-base opacity-90 drop-shadow-md leading-relaxed"
            >
              {t('bible.heroSubtitle', "Découvrez comment l'Afrique et ses peuples sont intimement liés à l'histoire sainte, formant les origines d'une foi millénaire inébranlable.")}
            </motion.p>
          </Container>
        </section>
      </header>

      {/* Main Content Layout */}
      <Container className="pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Column */}
          <main className="flex-1 w-full flex flex-col min-w-0">
            {/* 2. TABBED NAVIGATION */}
            <nav 
              className="w-full overflow-x-auto hide-scrollbar bg-[#1B1B4D] p-2 rounded-xl mb-12 shadow-md lg:flex lg:justify-center"
              aria-label="Sections Bibliques"
            >
              <ul className="flex space-x-2 min-w-max mx-auto px-2 m-0 list-none">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      aria-selected={activeTab === tab.id}
                      role="tab"
                      className={`
                        px-6 py-3 font-montserrat font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B4D] whitespace-nowrap
                        ${activeTab === tab.id 
                          ? 'bg-[#D4AF37] text-[#1B1B4D] shadow-lg' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'}
                      `}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 3. CONTENT SECTIONS (Animated Switcher) */}
            <div className="w-full relative z-10 min-h-[500px]" role="tabpanel">
              <AnimatePresence mode="wait">
                <BibleTabContent key={activeTab} {...tabData[activeTab]} />
              </AnimatePresence>
            </div>

            {/* 4. RELATED CONTENT SECTION */}
            <section className="w-full mt-24">
              <h3 className="font-playfair text-3xl text-[#1B1B4D] font-bold mb-10 border-b border-[#D4AF37]/30 pb-4">
                {t('bible.related.title', 'Vous pourriez aussi lire')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                 <Card 
                  title="St-Augustin de Thagaste"
                  description="Découvrez l'apport monumental et incontournable de la théologie africaine nordique sur la dogmatique de l'Église."
                  category="Héritage"
                  hoverable
                 />
                 <Card 
                  title="Manuscrits de Timbuktu"
                  description="Plongée sidérante dans la préservation acharnée des écritures sacrées au cœur des sables millénaires du Mali."
                  category="Ressources"
                  hoverable
                 />
                 <Card 
                  title="Art Paléochrétien"
                  description="Comment les mosaïques romaines dépeignaient la chrétienté africaine vibrante des premiers siècles."
                  category="Culture"
                  hoverable
                 />
              </div>
            </section>
          </main>

          {/* 5. SIDEBAR / ASIDE */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-8 pb-10">
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#D4AF37]/10">
              <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-xs tracking-widest mb-4 border-b border-gray-100 pb-3">
                {t('sidebar.toc', 'Sommaire Rapide')}
              </h4>
              <nav aria-label="Sommaire de la page">
                <ul className="space-y-4 m-0 p-0 list-none">
                  {tabs.map((tab) => (
                    <li key={`toc-${tab.id}`}>
                      <button 
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-montserrat text-sm transition-colors text-left flex items-center w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded p-1
                          ${activeTab === tab.id ? 'text-[#D4AF37] font-bold' : 'text-[#5C5C4C] hover:text-[#1B1B4D]'}
                        `}
                      >
                        <span className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 transition-colors ${activeTab === tab.id ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}></span>
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#1B1B4D] to-[#2B2B6D] text-white p-8 rounded-2xl shadow-[0_8px_20px_rgba(27,27,77,0.2)]">
              <h4 className="font-montserrat font-bold text-[#D4AF37] uppercase text-xs tracking-widest mb-4">
                {t('sidebar.newsletter.title', "S'inscrire à la Newsletter")}
              </h4>
              <p className="text-sm opacity-80 mb-6 font-montserrat leading-relaxed">
                Recevez nos dernières découvertes historiques et réflexions théologiques directement dans votre boîte mail.
              </p>
              <form className="flex flex-col gap-4 max-w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  aria-label="Adresse email"
                  placeholder="votre@email.com" 
                  required
                  className="w-full py-3 px-4 rounded text-[#1B1B4D] font-serif text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] border-none shadow-inner"
                />
                <Button type="submit" variant="primary" fullWidth size="md">
                  Rejoindre
                </Button>
              </form>
            </div>

            {/* Social Share */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#D4AF37]/10">
              <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-xs tracking-widest mb-4">
                {t('sidebar.share', "Partager")}
              </h4>
              <div className="flex flex-wrap gap-3">
                <Tag label="Facebook" className="cursor-pointer hover:bg-blue-50 border-gray-200" />
                <Tag label="Twitter / X" className="cursor-pointer hover:bg-gray-50 border-gray-200" />
                <Tag label="Email" className="cursor-pointer hover:bg-gray-50 border-gray-200" />
              </div>
            </div>
          </aside>

        </div>
      </Container>
    </div>
  );
};

export default AfricaInBible;
