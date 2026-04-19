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
const mockTools = [
  { id: 1, title: "Abraham en Afrique", desc: "Fiche pédagogique catéchèse avec coloriages et quiz pour éveiller la foi.", level: "Enfants", theme: "Bible", size: "2.4 MB", date: "2024-01-15" },
  { id: 2, title: "La Reine de Saba", desc: "Étude textuelle et historique de la rencontre diplomatique et spirituelle avec Salomon.", level: "Ados", theme: "Histoire", size: "1.8 MB", date: "2024-02-10" },
  { id: 3, title: "Pères de l'Église Africaine", desc: "Livre d'étude complet sur la monumentale théologie d'Augustin et Tertullien.", level: "Adultes", theme: "Histoire", size: "5.1 MB", date: "2023-11-20" },
  { id: 4, title: "Liturgie et Inculturation", desc: "Manuel pratique pour intégrer harmonieusement les éléments locaux dans la messe.", level: "Adultes", theme: "Pratique", size: "3.2 MB", date: "2024-03-05" },
  { id: 5, title: "Frise Chronologique 2000 ans", desc: "Infographie haute résolution (format A3) prête à imprimer pour la classe.", level: "Tous", theme: "Histoire", size: "8.5 MB", date: "2024-01-01" },
  { id: 6, title: "L'Eunuque Éthiopien", desc: "Jeu de rôle catéchistique en équipe pour comprendre le premier baptême africain.", level: "Ados", theme: "Bible", size: "1.2 MB", date: "2023-10-15" },
  { id: 7, title: "Chants de la Messe Zairoise", desc: "Partitions complètes et paroles avec traductions littérales en français.", level: "Tous", theme: "Pratique", size: "4.0 MB", date: "2024-04-12" },
  { id: 8, title: "Préparer le Jubilé 2033", desc: "Guide de l'animateur spirituel : comment préparer les jeunes au grand jubilé.", level: "Adultes", theme: "Pratique", size: "2.9 MB", date: "2024-05-01" },
];

const mockVideos = [
  { id: 'v1', ytid: 'J---aiyznGQ', title: "L'Histoire oubliée des Pères Africains", views: "45K vues", duration: "14:20", date: "Il y a 2 mois", desc: "Découvrez l'influence majeure d'Augustin et Tertullien sur l'Église universelle." },
  { id: 'v2', ytid: 'lx2JdF4zpoE', title: "Le Rite Zairois expliqué", views: "12K vues", duration: "08:15", date: "Il y a 5 mois", desc: "Une plongée magnifique dans l'inculturation liturgique du rite congolais approuvé par Rome." },
  { id: 'v3', ytid: '9bZkp7q19f0', title: "L'Éthiopie : Aux sources du Christianisme", views: "110K vues", duration: "25:40", date: "Il y a 1 an", desc: "Visite des églises monolithiques rupestres de Lalibela et des traditions anciennes." },
  { id: 'v4', ytid: 'kJQP7kiw5Fk', title: "Les défis de la théologie fricaine demain", views: "8K vues", duration: "18:05", date: "Il y a 1 mois", desc: "Table ronde sur le futur de la pensée chrétienne sur le continent africain." },
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

const mockRegions = [
  { id: 'est', name: "Afrique de l'Est", culture: "Culture Éthiopienne & Copte", desc: "Berceau du christianisme orthodoxe tewahedo. Les liturgies sont chantées en Ge'ez, accompagnées des tambours kebero et des sistres. La fête de Timkat (Épiphanie) est l'une des plus grandioses au monde.", img: "🌍" },
  { id: 'ouest', name: "Afrique de l'Ouest", culture: "Inculturation Joyeuse", desc: "Une ferveur vibrante caractérise les messes d'Afrique de l'Ouest, mêlant instruments traditionnels (djembé, balafon), chorales massives habillées de pagnes unifiés, et la danse processionale.", img: "🥁" },
  { id: 'centre', name: "Afrique Centrale", culture: "Le Rite Congolais (Zaïrois)", desc: "Seul rite inculturé officiellement reconnu par le Vatican. Il intègre l'appel de l'Esprit Saint avec un annonceur, la participation physique de l'assemblée, et une structure d'homélie dialoguée.", img: "🌾" },
  { id: 'sud', name: "Afrique Australe", culture: "L'Héritage Ubuntu", desc: "La théologie de l'Ubuntu imprègne la vie communautaire ecclésiale. Chants a cappella puissants à plusieurs voix, fortement liés aux luttes historiques de libération spirituelle et sociale.", img: "🤝" }
];

const mockGallery = Array(12).fill(null).map((_, i) => ({
  id: `img_${i}`,
  src: `https://picsum.photos/seed/africa${i}/600/${400 + (Math.random() > 0.5 ? 200 : 0)}`,
  caption: `Célébration litugique ${i+1} en communauté locale. Moments d'inculturation et de joie partagée.`
}));

// =======================
// MAIN COMPONENT
// =======================
const Resources = () => {
  const { t } = useTranslation();
  
  // States
  const [activeTab, setActiveTab] = useState('outils');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Outils States
  const [outilFilterLevel, setOutilFilterLevel] = useState('Tous');
  const [outilFilterTheme, setOutilFilterTheme] = useState('Tous');
  
  // Multimedia States
  const [activeMediaTab, setActiveMediaTab] = useState('videos');

  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState(null);

  const mainTabs = [
    { id: 'outils', label: 'Boîte à Outils' },
    { id: 'multimedia', label: 'Multimédia' },
    { id: 'inculturation', label: 'Inculturation' },
  ];

  // Filtering Outils
  const filteredTools = useMemo(() => {
    return mockTools.filter(tool => {
      const matchLevel = outilFilterLevel === 'Tous' || tool.level === outilFilterLevel || tool.level === 'Tous';
      const matchTheme = outilFilterTheme === 'Tous' || tool.theme === outilFilterTheme;
      const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchTheme && matchSearch;
    });
  }, [outilFilterLevel, outilFilterTheme, searchQuery]);


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
          <span className="font-montserrat text-sm font-bold text-[#1B1B4D] uppercase tracking-wider">Filtres :</span>
          <select 
            className="border border-[#D4AF37]/50 rounded font-serif px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm text-[#1B1B4D] bg-[#F5F3ED]"
            value={outilFilterLevel} onChange={(e) => setOutilFilterLevel(e.target.value)}
          >
            <option value="Tous">Tous Niveaux</option>
            <option value="Enfants">Enfants</option>
            <option value="Ados">Ados</option>
            <option value="Adultes">Adultes</option>
          </select>
          <select 
            className="border border-[#D4AF37]/50 rounded font-serif px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm text-[#1B1B4D] bg-[#F5F3ED]"
            value={outilFilterTheme} onChange={(e) => setOutilFilterTheme(e.target.value)}
          >
            <option value="Tous">Tous Sujets</option>
            <option value="Bible">Bible</option>
            <option value="Histoire">Histoire</option>
            <option value="Pratique">Pratique</option>
          </select>
        </div>
        <div className="text-xs font-montserrat text-[#5C5C4C] font-bold">
          {filteredTools.length} Ressource(s) trouvée(s)
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
           Aucune ressource ne correspond à votre recherche.
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
              {tab === 'videos' ? 'Vidéos (YouTube)' : tab === 'podcasts' ? 'Podcasts' : 'Playlists Musicales'}
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
          <h2 className="font-playfair text-4xl font-bold text-[#1B1B4D] mb-6">Le Rite Zaïrois (Congolais)</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
          <p className="font-serif text-[#5C5C4C] text-[17px] leading-[1.9] mb-4">
            Le Missel Romain pour les Diocèses du Zaïre, promulgué en 1988 par Saint Jean-Paul II, constitue l'exemple le plus éclatant d'inculturation liturgique réussie et officiellement approuvée par le Saint-Siège.
          </p>
          <p className="font-serif text-[#5C5C4C] text-[17px] leading-[1.9] mb-8">
            Son génie réside dans l'intégration harmonieuse de l'âme africaine : l'entrée triomphale rythmée, l'invocations des ancêtres au cœur droit justifiés en Christ, et la forme dialoguée de l'homélie. Le corps tout entier prie, la danse devient liturgie.
          </p>
          <Button variant="primary">Télécharger le Missel (PDF)</Button>
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
            {t('resources.title', 'Espace Ressources')}
          </h1>
          <p className="font-serif text-base lg:text-lg max-w-3xl mx-auto opacity-90 mb-10 leading-relaxed text-[#E5E3DD]">
            {t('resources.subtitle', "Explorez, lisez, écoutez et téléchargez nos précieuses boîtes à outils, fiches pédagogiques et nos fantastiques répertoires multimédias inculturés.")}
          </p>

          {/* Global Search Bar */}
          <div className="w-full max-w-2xl relative shadow-2xl rounded-full overflow-hidden flex bg-white p-2">
            <svg className="w-6 h-6 text-gray-400 absolute left-6 top-1/2 transform -translate-y-1/2 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Rechercher un thème, une vidéo, un chant..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-4 font-serif text-[#1B1B4D] text-lg outline-none rounded-full bg-transparent border-none placeholder-gray-400"
            />
            <Button variant="primary" className="rounded-full px-8 whitespace-nowrap hidden sm:block">Chercher</Button>
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
        title="Galerie d'Inculturation"
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
