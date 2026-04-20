import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import Modal from '../components/common/Modal';

// =======================
// MOCK DATA
// =======================
const getMockTools = (t) => [
  { id: 1, title: "L'Héritage d'Aksoum", desc: "Guide d'étude sur l'une des plus vieilles Bibles au monde (Garima) et l'introduction du christianisme en Éthiopie.", level: t('resources.outils.filters.levels.adults'), theme: t('resources.outils.filters.themes.history'), size: "4.5 MB", date: "2024-01-15" },
  { id: 2, title: "Abraham : L'Appel Africain", desc: "Fiche pédagogique pour la catéchèse explorant le séjour d'Abraham en Égypte comme moment de bénédiction.", level: t('resources.outils.filters.levels.children'), theme: t('resources.outils.filters.themes.bible'), size: "1.2 MB", date: "2024-02-10" },
  { id: 3, title: "Le Missel Zaïrois Expliqué", desc: "Manuel complet sur la participation active du corps et l'annonce de la Parole dans le rite inculturé congolais.", level: t('resources.outils.filters.levels.adults'), theme: t('resources.outils.filters.themes.practice'), size: "3.8 MB", date: "2023-11-20" },
  { id: 4, title: "L'Eunuque et Philippe", desc: "Matériel d'animation pour adolescents sur le premier baptême des nations selon le livre des Actes.", level: t('resources.outils.filters.levels.teens'), theme: t('resources.outils.filters.themes.bible'), size: "2.1 MB", date: "2024-03-05" },
  { id: 5, title: "Les Pères du Désert égyptien", desc: "Recueil de paroles de sagesse (Apophtegmes) des premiers moines chrétiens de la Thébaïde.", level: t('resources.outils.filters.levels.adults'), theme: t('resources.outils.filters.themes.history'), size: "2.5 MB", date: "2024-01-01" },
  { id: 6, title: "Chants de Louange en Swahili", desc: "Livret de partitions et traductions pour chorales cherchant à explorer les hymnes d'Afrique de l'Est.", level: t('resources.outils.filters.levels.all'), theme: t('resources.outils.filters.themes.practice'), size: "3.2 MB", date: "2023-10-15" },
];

const mockVideos = [
  { id: 'v1', ytid: 'J---aiyznGQ', title: "L'Afrique : Cœur de la Chrétienté Antique", views: "128K vues", duration: "18:45", date: "Il y a 2 mois", desc: "Une conférence magistrale sur le rôle des évêques africains dans la définition du dogme chrétien." },
  { id: 'v2', ytid: 'lx2JdF4zpoE', title: "Splendeur du Rite Congolais", views: "75K vues", duration: "12:10", date: "Il y a 5 mois", desc: "Documentaire sur la beauté de la liturgie inculturée à Kinshasa : danse, rythme et ferveur." },
  { id: 'v3', ytid: '9bZkp7q19f0', title: "Sur les traces de Reine de Saba", views: "210K vues", duration: "32:20", date: "Il y a 1 an", desc: "Le mystère de l'Arche d'Alliance et les liens millénaires entre Jérusalem et Aksoum." },
];

const mockSpotifyShows = [
  { id: '0ofXAdFIQQRsCYj9754UFx', title: 'Théologie Africaine Episode 1', desc: 'Introduction aux Pères du désert et la spiritualité monastique.', duration: '45 min' },
  { id: '6y0igZArWVu6I53VczYv24', title: 'Théologie Africaine Episode 2', desc: 'Les origines mariales en Égypte et dans la Corne de \'Afrique.', duration: '38 min' }
];

const mockSpotifyPlaylists = [
  { id: '37i9dQZF1DWWMOmoXKqHTD', title: 'Chants Liturgiques Africains' },
  { id: '37i9dQZF1DXcBWIGoYBM5M', title: 'Louange et Adoration Congolaise' }
];

const mockChants = [
  { id: 1, title: "Nzambe Muloko", lang: "Lingala", lyrics: "Nzambe muloko, to kumisi yo... (Dieu de l'univers, nous t'exaltons...)", author: "Traditionnel RDC" },
  { id: 2, title: "Tenk You Jesu", lang: "Pidgin", lyrics: "Tenk you Jesu, you too much well... (Merci Jésus, tu es souverain...)", author: "Liturgie Ouest-Africaine" },
  { id: 3, title: "Taw Tšeneng", lang: "Sotho", lyrics: "Taw tšeneng tsa Modimo... (Le Lion de Juda triomphe...)", author: "Hymne Sud-Africain" },
  { id: 4, title: "Amezaliwa", lang: "Swahili", lyrics: "Amezaliwa leo, Mwokozi wetu... (Aujourd'hui est né notre Sauveur...)", author: "Prière Est-Africaine" },
];

const getMockRegions = (t) => [
  { id: 'est', name: t('resources.inculturation.regions.east.name'), culture: t('resources.inculturation.regions.east.culture'), desc: t('resources.inculturation.regions.east.desc'), img: "🌍" },
  { id: 'ouest', name: t('resources.inculturation.regions.west.name'), culture: t('resources.inculturation.regions.west.culture'), desc: t('resources.inculturation.regions.west.desc'), img: "🥁" },
  { id: 'centre', name: t('resources.inculturation.regions.center.name'), culture: t('resources.inculturation.regions.center.culture'), desc: t('resources.inculturation.regions.center.desc'), img: "🌾" },
  { id: 'sud', name: t('resources.inculturation.regions.south.name'), culture: t('resources.inculturation.regions.south.culture'), desc: t('resources.inculturation.regions.south.desc'), img: "🤝" }
];

const mockGallery = [
  { id: 'img_1', src: "https://picsum.photos/seed/africa_faith_1/800/600", caption: "Procession solennelle des fidèles portant des icônes éthiopiennes traditionnelles lors de la fête de Timkat." },
  { id: 'img_2', src: "https://picsum.photos/seed/africa_faith_2/800/1000", caption: "Chorale de jeunes filles en Afrique de l'Ouest, portant l'habit traditionnel pour la messe du Jubilé." },
  { id: 'img_3', src: "https://picsum.photos/seed/africa_faith_3/800/600", caption: "Reproduction d'une mosaïque carthaginoise représentant les premiers symboles du christianisme en Afrique du Nord." },
  { id: 'img_4', src: "https://picsum.photos/seed/africa_faith_4/800/500", caption: "Intérieur d'une église éthiopienne monolithique, où la spiritualité rencontre la pierre millénaire." }
];

// =======================
// MAIN COMPONENT
// =======================
const Resources = () => {
  const { t } = useTranslation();
  
  // States
  const [activeTab, setActiveTab] = useState('outils');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Outils States
  const [outilFilterLevel, setOutilFilterLevel] = useState(t('resources.outils.filters.levels.all'));
  const [outilFilterTheme, setOutilFilterTheme] = useState(t('resources.outils.filters.themes.all'));
  
  // Multimedia States
  const [activeMediaTab, setActiveMediaTab] = useState('videos');

  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState(null);

  const mockTools = getMockTools(t);
  const mockRegions = getMockRegions(t);

  const mainTabs = [
    { id: 'outils', label: t('resources.tabs.tools') },
    { id: 'multimedia', label: t('resources.tabs.multimedia') },
    { id: 'inculturation', label: t('resources.tabs.inculturation') },
  ];

  // Filtering Outils
  const filteredTools = useMemo(() => {
    return mockTools.filter(tool => {
      const matchLevel = outilFilterLevel === t('resources.outils.filters.levels.all') || tool.level === outilFilterLevel || tool.level === t('resources.outils.filters.levels.all');
      const matchTheme = outilFilterTheme === t('resources.outils.filters.themes.all') || tool.theme === outilFilterTheme;
      const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchTheme && matchSearch;
    });
  }, [outilFilterLevel, outilFilterTheme, searchQuery, mockTools, t]);


  // =======================
  // TAB 1: OUTILS
  // =======================
  const renderOutils = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="w-full flex-grow flex flex-col gap-6"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D4AF37]/20 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-montserrat text-sm font-bold text-[#1B1B4D] uppercase tracking-wider">{t('resources.outils.filters.label', 'Filtres :')}</span>
          <select 
            className="border border-[#D4AF37]/50 rounded font-serif px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm text-[#1B1B4D] bg-[#F5F3ED]"
            value={outilFilterLevel} onChange={(e) => setOutilFilterLevel(e.target.value)}
          >
            <option value={t('resources.outils.filters.levels.all')}>{t('resources.outils.filters.levels.all')}</option>
            <option value={t('resources.outils.filters.levels.children')}>{t('resources.outils.filters.levels.children')}</option>
            <option value={t('resources.outils.filters.levels.teens')}>{t('resources.outils.filters.levels.teens')}</option>
            <option value={t('resources.outils.filters.levels.adults')}>{t('resources.outils.filters.levels.adults')}</option>
          </select>
          <select 
            className="border border-[#D4AF37]/50 rounded font-serif px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm text-[#1B1B4D] bg-[#F5F3ED]"
            value={outilFilterTheme} onChange={(e) => setOutilFilterTheme(e.target.value)}
          >
            <option value={t('resources.outils.filters.themes.all')}>{t('resources.outils.filters.themes.all')}</option>
            <option value={t('resources.outils.filters.themes.bible')}>{t('resources.outils.filters.themes.bible')}</option>
            <option value={t('resources.outils.filters.themes.history')}>{t('resources.outils.filters.themes.history')}</option>
            <option value={t('resources.outils.filters.themes.practice')}>{t('resources.outils.filters.themes.practice')}</option>
          </select>
        </div>
        <div className="text-xs font-montserrat text-[#5C5C4C] font-bold">
          {filteredTools.length} {t('resources.outils.results')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredTools.map((tool) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={tool.id}>
              <Card 
                title={tool.title} 
                description={tool.desc}
                category={tool.theme}
                hoverable
                className="h-full border-t-[3px] border-t-[#D4AF37]"
                footer={
                  <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-gray-100">
                    <span className="text-xs font-montserrat font-bold bg-[#1B1B4D]/5 text-[#1B1B4D] px-2 py-1 rounded">{tool.level}</span>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400 font-serif text-xs">{tool.size}</span>
                      <button className="flex items-center justify-center p-2 rounded-full bg-[#1B1B4D] text-white hover:bg-[#D4AF37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" aria-label="Télécharger PDF">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredTools.length === 0 && (
         <div className="py-20 text-center font-montserrat text-[#5C5C4C]">
           {t('resources.outils.noResults')}
         </div>
      )}
    </motion.div>
  );

  // =======================
  // TAB 2: MULTIMEDIA
  // =======================
  const renderMultimedia = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex-grow flex flex-col gap-8">
      {/* Sub Tabs */}
      <div className="flex justify-center border-b border-[#D4AF37]/30 pb-4">
        <div className="flex space-x-6">
          {['videos', 'podcasts', 'playlists'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveMediaTab(tab)}
              className={`font-montserrat text-sm font-bold uppercase tracking-wider pb-2 transition-all relative
                ${activeMediaTab === tab ? 'text-[#D4AF37]' : 'text-[#1B1B4D] opacity-70 hover:opacity-100'}
              `}
            >
              {tab === 'videos' ? t('resources.multimedia.tabs.videos') : tab === 'podcasts' ? t('resources.multimedia.tabs.podcasts') : t('resources.multimedia.tabs.playlists')}
              {activeMediaTab === tab && <motion.div layoutId="mediatab" className="absolute bottom-[-17px] left-0 right-0 h-[3px] bg-[#D4AF37]" />}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIDEOS */}
        {activeMediaTab === 'videos' && (
          <motion.div key="videos" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {mockVideos.map(vid => (
              <div key={vid.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
                  {/* Fake Youtube thumbnail with standard format */}
                  <img src={`https://img.youtube.com/vi/${vid.ytid}/hqdefault.jpg`} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white pl-1 group-hover:bg-red-500 transition-colors cursor-pointer">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">{vid.duration}</span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-playfair font-bold text-lg text-[#1B1B4D] mb-2 line-clamp-2 leading-tight">{vid.title}</h4>
                  <p className="font-serif text-sm text-[#5C5C4C] mb-4 line-clamp-2 flex-grow">{vid.desc}</p>
                  <div className="flex items-center justify-between text-[11px] font-montserrat font-bold text-gray-400 mt-auto pt-3 border-t border-gray-100">
                    <span>{vid.views}</span>
                    <span>{vid.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* PODCASTS */}
        {activeMediaTab === 'podcasts' && (
          <motion.div key="podcasts" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockSpotifyShows.map(show => (
              <div key={show.id} className="bg-white rounded-xl shadow border border-[#D4AF37]/10 p-6 flex flex-col hover:border-[#D4AF37] transition-all group">
                <h4 className="font-playfair font-bold text-xl text-[#1B1B4D] mb-2">{show.title}</h4>
                <p className="font-serif text-sm text-[#5C5C4C] mb-6">{show.desc}</p>
                <div className="w-full mt-auto rounded-lg overflow-hidden bg-gray-100 aspect-[5/2] relative flex items-center justify-center">
                  <span className="font-montserrat text-sm text-gray-500 font-bold">Spotify Embed Placeholder</span>
                  {/* Real embed code would be here but Spotify needs a valid ID. We mock it for visual presentation. */}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* PLAYLISTS */}
        {activeMediaTab === 'playlists' && (
          <motion.div key="playlists" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockSpotifyPlaylists.map(playlist => (
              <div key={playlist.id} className="bg-[#1B1B4D] rounded-xl shadow-xl overflow-hidden p-6 flex flex-col hover:scale-[1.02] transition-transform text-white border border-white/10">
                <div className="w-full aspect-square bg-[#D4AF37]/20 rounded-lg mb-6 flex items-center justify-center">
                   <span className="text-5xl">🎵</span>
                </div>
                <h4 className="font-playfair font-bold text-xl text-[#D4AF37] mb-2">{playlist.title}</h4>
                <p className="font-montserrat text-xs opacity-70 mb-6">Explorez la puissance des chorales et de l'inculturation musicale.</p>
                <Button variant="secondary" className="w-full text-white border-white hover:bg-white hover:text-[#1B1B4D]">Écouter sur Spotify</Button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // =======================
  // TAB 3: INCULTURATION
  // =======================
  const renderInculturation = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex-grow flex flex-col gap-24">
      
      {/* SECTION A: Rite Congolais */}
      <section className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="font-playfair text-4xl font-bold text-[#1B1B4D] mb-6">{t('resources.inculturation.riteCongolais.title')}</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
          <p className="font-serif text-[#5C5C4C] text-[17px] leading-[1.9] mb-4">
            {t('resources.inculturation.riteCongolais.p1')}
          </p>
          <p className="font-serif text-[#5C5C4C] text-[17px] leading-[1.9] mb-8">
            {t('resources.inculturation.riteCongolais.p2')}
          </p>
          <Button variant="primary">{t('resources.inculturation.riteCongolais.cta')}</Button>
        </div>
        <div className="w-full lg:w-[500px] flex gap-4">
           {/* Double Image Staggered Layout */}
           <div className="w-1/2 mt-12 bg-gray-200 rounded-xl overflow-hidden shadow-lg h-[300px]">
             <img src="https://picsum.photos/seed/z1/400/600" className="w-full h-full object-cover" alt="Danse liturgique" />
           </div>
           <div className="w-1/2 bg-gray-200 rounded-xl overflow-hidden shadow-lg h-[300px] -mt-4">
             <img src="https://picsum.photos/seed/z2/400/600" className="w-full h-full object-cover" alt="Prêtre encensant" />
           </div>
        </div>
      </section>

      {/* SECTION B: Chants Liturgiques */}
      <section className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#D4AF37]/20">
        <h3 className="font-playfair text-3xl font-bold text-[#1B1B4D] mb-10 text-center">Bibliothèque de Chants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockChants.map(chant => (
            <div key={chant.id} className="bg-[#F5F3ED] p-6 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex flex-col group">
              <Badge label={chant.lang} variant="warning" className="w-max mb-4 shadow-sm" />
              <h4 className="font-playfair text-xl font-bold text-[#1B1B4D] mb-3 group-hover:text-[#B85D3E] transition-colors">{chant.title}</h4>
              <p className="font-serif italic text-sm text-[#5C5C4C] mb-6 flex-grow">"{chant.lyrics}"</p>
              
              {/* Fake Audio Player UI */}
              <div className="w-full bg-[#1B1B4D]/10 h-8 rounded-full flex items-center justify-between px-3 mt-auto cursor-pointer group-hover:bg-[#1B1B4D]/20 transition-colors">
                <svg className="w-4 h-4 text-[#1B1B4D]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                <div className="w-2/3 h-1 bg-white rounded-full overflow-hidden"><div className="w-1/3 h-full bg-[#D4AF37]"></div></div>
                <span className="text-[9px] font-bold text-[#1B1B4D] font-montserrat">0:45</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: Traditions par Région */}
      <section>
        <h3 className="font-playfair text-3xl font-bold text-[#1B1B4D] mb-10">Diversité des Traditions Locales</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockRegions.map(region => (
            <div key={region.id} className="group">
              <div className="w-full h-32 bg-[#1B1B4D] rounded-t-xl flex items-center justify-center text-4xl text-white transform group-hover:-translate-y-2 transition-transform duration-300 shadow-xl border-b-4 border-[#D4AF37]">
                {region.img}
              </div>
              <div className="bg-white p-6 rounded-b-xl shadow-lg border border-t-0 border-[#D4AF37]/20 border-t-transparent">
                <h4 className="font-playfair font-bold text-lg text-[#1B1B4D] mb-1">{region.name}</h4>
                <p className="font-montserrat text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">{region.culture}</p>
                <p className="font-serif text-sm text-[#5C5C4C] leading-relaxed mb-4">{region.desc}</p>
                <Button variant="tertiary" className="text-xs p-0 m-0">Explorer la région &rarr;</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D: Galerie Masonry */}
      <section>
        <h3 className="font-playfair text-3xl font-bold text-[#1B1B4D] mb-10 border-t border-[#D4AF37]/30 pt-10">Galerie Inspirante</h3>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {mockGallery.map(img => (
            <div key={img.id} className="relative group break-inside-avoid shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => setLightboxImg(img)}>
               <img src={img.src} alt={img.caption} className="w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out" loading="lazy" />
               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end h-1/2">
                 <p className="text-white font-serif text-xs line-clamp-3">{img.caption}</p>
                 <span className="mt-2 text-[#D4AF37] font-montserrat font-bold text-[10px] uppercase tracking-wider">Agrandir</span>
               </div>
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  );

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 bg-gradient-to-br from-[#1B1B4D] to-[#2B2B6D] text-white flex flex-col items-center justify-center text-center overflow-hidden z-0">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <Container className="relative z-10 flex flex-col items-center">
          <div className="mb-4 text-[#D4AF37] font-montserrat text-xs font-bold tracking-widest uppercase flex items-center justify-center">
            <Link to="/" className="hover:underline opacity-80 hover:opacity-100">Accueil</Link> 
            <span className="mx-2">&gt;</span> 
            <span>Ressources</span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F3ED] drop-shadow-lg">
            {t('resources.title')}
          </h1>
          <p className="font-serif text-base lg:text-lg max-w-3xl mx-auto opacity-90 mb-10 leading-relaxed text-[#E5E3DD]">
            {t('resources.subtitle')}
          </p>

          {/* Global Search Bar */}
          <div className="w-full max-w-2xl relative shadow-2xl rounded-full overflow-hidden flex bg-white p-2">
            <svg className="w-6 h-6 text-gray-400 absolute left-6 top-1/2 transform -translate-y-1/2 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder={t('resources.searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-4 font-serif text-[#1B1B4D] text-lg outline-none rounded-full bg-transparent border-none placeholder-gray-400"
            />
            <Button variant="primary" className="rounded-full px-8 whitespace-nowrap hidden sm:block">{t('common.search')}</Button>
          </div>
        </Container>
      </section>

      <Container className="mt-8">
        {/* 2. TABS MAIN NAVIGATION */}
        <nav 
          className="w-full mb-12 border-b border-[#D4AF37]/30 flex flex-nowrap overflow-x-auto hide-scrollbar sm:justify-center"
          aria-label="Navigation des ressources"
        >
          {mainTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-8 py-4 font-montserrat font-bold text-sm lg:text-base uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap relative
                ${activeTab === tab.id ? 'text-[#1B1B4D]' : 'text-[#5C5C4C] hover:text-[#1B1B4D]'}
              `}
            >
              {tab.label}
              {/* Active animated bottom border indicator */}
              {activeTab === tab.id && (
                <motion.div layoutId="maintab" className="absolute bottom-[-1px] left-0 right-0 h-[4px] bg-[#D4AF37] z-10 rounded-t-lg" />
              )}
            </button>
          ))}
        </nav>

        {/* Dynamic Content rendering */}
        <div className="w-full relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'outils' && <motion.div key="1" className="w-full">{renderOutils()}</motion.div>}
            {activeTab === 'multimedia' && <motion.div key="2" className="w-full">{renderMultimedia()}</motion.div>}
            {activeTab === 'inculturation' && <motion.div key="3" className="w-full">{renderInculturation()}</motion.div>}
          </AnimatePresence>
        </div>
      </Container>

      {/* Lightbox Modal pour la Galerie */}
      <Modal 
        isOpen={!!lightboxImg} 
        onClose={() => setLightboxImg(null)} 
        size="lg"
        title={t('resources.inculturation.galleryTitle')}
      >
        {lightboxImg && (
          <div className="w-full flex flex-col items-center">
            <img src={lightboxImg.src} alt={lightboxImg.caption} className="w-full bg-black rounded-lg max-h-[60vh] object-contain shadow-2xl border border-gray-200" />
            <p className="mt-6 font-serif text-[#1B1B4D] text-lg text-center italic">
              "{lightboxImg.caption}"
            </p>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Resources;
