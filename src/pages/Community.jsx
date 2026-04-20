import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import Textarea from '../components/common/Textarea';
import Select from '../components/common/Select';
import Checkbox from '../components/common/Checkbox';
import Modal from '../components/common/Modal';

// =======================
// MOCK DATA
// =======================
const categories = ['Art', 'Vidéo', 'Musique'];

const mockArtworks = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Création Spirituelle ${i + 1}`,
  artist: `Artiste ${['Mekonnen', 'Koffi', 'Amina', 'Chidi', 'Nkosi'][i % 5]}`,
  category: categories[i % 3],
  votes: Math.floor(Math.random() * 500) + 10,
  img: `https://picsum.photos/seed/artwork${i}/400/${300 + (i % 3) * 100}`,
  date: "12 Avril 2026",
  desc: "Ceci est une description de l'œuvre symbolisant la vision africaine du Christ. L'artiste utilise des éléments inculturés pour exprimer sa foi."
}));

const mockPartners = [
  "Diocèse de Kinshasa", "Université Catholique d'Afrique de l'Ouest", 
  "Fondation Héritage Africain", "Pax Christi International", 
  "Radio Vatican Afrique", "Jeunesse Étudiante Catholique"
];

const mockDiscussions = [
  { id: 1, title: "Comment organiser le Jubilé dans mon diocèse ?", author: "Père Sylvestre", replies: 24, lastUpdate: "Il y a 2 heures", tag: "Organisation" },
  { id: 2, title: "Partage de chants liturgiques en Kinyarwanda", author: "Chorale Céleste", replies: 8, lastUpdate: "Il y a 1 jour", tag: "Musique" },
  { id: 3, title: "Recherche d'archives sur Tertullien", author: "Marie Hist.", replies: 15, lastUpdate: "Il y a 3 jours", tag: "Histoire" },
  { id: 4, title: "Idées de Catéchèse : L'Eunuque Éthiopien", author: "Fr. Thomas", replies: 5, lastUpdate: "Il y a 4 jours", tag: "Bible" },
];

// =======================
// MAIN COMPONENT
// =======================
// =======================
// MAIN COMPONENT
// =======================
const Community = () => {
  const { t } = useTranslation();

  // --- GALLERY STATES ---
  const [activeFilter, setActiveFilter] = useState(t('heritage.filters.all'));
  const [activeSort, setActiveSort] = useState(t('community.concours.sort.recent', 'Récent'));
  const [lightboxItem, setLightboxItem] = useState(null);

  // ... (rest of states)

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 bg-gradient-to-br from-[#B85D3E] to-[#1B1B4D] text-white flex flex-col items-center justify-center text-center overflow-hidden z-0">
        <Container className="relative z-10">
          <div className="mb-4 text-[#D4AF37] font-montserrat text-xs font-bold tracking-widest uppercase flex items-center justify-center">
            <Link to="/" className="hover:underline opacity-80 hover:opacity-100">{t('navigation.home')}</Link> 
            <span className="mx-2">&gt;</span> 
            <span>{t('navigation.community')}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          >
            {t('community.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-lg max-w-2xl mx-auto opacity-90 mb-10 leading-relaxed text-[#F5F3ED]"
          >
            {t('community.heroSubtitle')}
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => document.getElementById('concours').scrollIntoView({ behavior: 'smooth' })}>
              {t('community.btnParticipate')}
            </Button>
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#1B1B4D]" onClick={() => document.getElementById('galerie').scrollIntoView({ behavior: 'smooth' })}>
              {t('community.btnGallery')}
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. CONCOURS ARTISTIQUE SECTION */}
      <Section id="concours" background="cream">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-[#1B1B4D] mb-4">{t('community.concours.title')}</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="font-montserrat text-[#5C5C4C] max-w-3xl mx-auto text-lg leading-relaxed">
              {t('community.concours.desc')}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#D4AF37]/20">
            {/* A) RÈGLEMENT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6 border-r border-gray-100 pr-0 lg:pr-8">
              <h3 className="font-playfair text-2xl font-bold text-[#1B1B4D]">{t('community.concours.datesTitle')}</h3>
              <ul className="space-y-4 font-serif text-[#5C5C4C]">
                <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-[#D4AF37] mr-3"></span><strong>{t('community.concours.open')}</strong> 1er Janvier 2026</li>
                <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-[#EF4444] mr-3"></span><strong>{t('community.concours.close')}</strong> 31 Décembre 2026</li>
                <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-[#22C55E] mr-3"></span><strong>{t('community.concours.results')}</strong> Pâques 2027</li>
              </ul>
              <div className="bg-[#1B1B4D]/5 p-6 rounded-xl border-l-[3px] border-[#D4AF37] mt-4">
                <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-xs tracking-widest mb-2">{t('community.concours.prize')}</h4>
                <p className="font-playfair text-3xl font-bold text-[#B85D3E]">500 €</p>
                <p className="font-serif text-sm text-[#5C5C4C] mt-2">{t('community.concours.prizeDesc')}</p>
              </div>
              <Button variant="tertiary" className="text-[#1B1B4D] border border-[#1B1B4D]/20 mt-4 justify-center">
                 {t('community.concours.downloadRules')}
              </Button>
            </div>

            {/* B) FORM SOUMISSION CONCOURS */}
            <div className="w-full lg:w-2/3">
              <h3 className="font-playfair text-2xl font-bold text-[#1B1B4D] mb-6">{t('community.concours.form.title')}</h3>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#22C55E]/10 border border-[#22C55E]/50 p-8 rounded-xl text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="font-playfair text-2xl font-bold text-[#1B1B4D] mb-2">{t('community.concours.form.success')}</h4>
                    <p className="font-serif text-[#5C5C4C]">{t('community.concours.form.successDesc')}</p>
                  </motion.div>
                ) : (
                  <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleFormSubmit} className="space-y-6">
                    {/* ... (inputs) */}
                    
                    {/* File Upload Placeholder */}
                    <div className="w-full border-2 border-dashed border-[#D4AF37]/50 rounded-xl p-8 text-center bg-[#F5F3ED] hover:bg-white transition-colors cursor-pointer group">
                       <svg className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                       <p className="font-montserrat text-sm text-[#1B1B4D] font-bold">{t('community.concours.form.uploadPlaceholder')}</p>
                       <p className="font-serif text-xs text-[#5C5C4C] mt-2">{t('community.concours.form.uploadFormats')}</p>
                    </div>

                    <Checkbox label={t('community.concours.form.consent')} name="consent" checked={formData.consent} onChange={handleInputChange} required className={formErrors.consent ? "text-red-500" : ""} />
                    {formErrors.consent && <p className="text-red-500 text-xs mt-1 -translate-y-3 font-montserrat">{formErrors.consent}</p>}

                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto relative overflow-hidden">
                        {isSubmitting ? (
                          <div className="flex items-center px-4">
                            <span className="absolute left-0 bottom-0 h-1 bg-white/50 transition-all duration-200" style={{ width: `${uploadProgress}%` }}></span>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            {t('community.concours.form.submitting')} ({uploadProgress}%)
                          </div>
                        ) : t('community.concours.form.submit')}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Section>

      {/* GALERIE SECTION */}
      <Section id="galerie">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-[#D4AF37]/30">
            <h2 className="font-playfair text-3xl font-bold text-[#1B1B4D]">{t('community.concours.galleryTitle', 'Galerie des Soumissions')}</h2>
            
            {/* Gallery Filters */}
            <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
               <Select 
                 name="filter" label={t('resources.outils.filters.label')} 
                 value={activeFilter} onChange={(e) => setActiveFilter(e.value || e.target?.value)} 
                 options={[{label: t('community.concours.allArts', 'Tous les Arts'), value: t('heritage.filters.all')}, {label: t('heritage.filters.art', 'Art Visuel'), value: 'Art'}, {label: t('heritage.filters.video', 'Vidéo'), value: 'Vidéo'}, {label: t('heritage.filters.music', 'Musique'), value: 'Musique'}]} 
                 className="w-[180px] mb-0" 
               />
               <Select 
                 name="sort" label={t('community.concours.sortBy', 'Trier par')} 
                 value={activeSort} onChange={(e) => setActiveSort(e.value || e.target?.value)} 
                 options={[{label: t('community.concours.sort.recent', 'Plus Récents'), value: 'Récent'}, {label: t('community.concours.sort.popular', 'Plus Populaires'), value: 'Populaire'}]} 
                 className="w-[180px] mb-0" 
               />
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredArtworks.map(art => (
                <motion.div key={art.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="break-inside-avoid shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100 group relative">
                   {/* Badge Catégorie Absolute */}
                   <div className="absolute top-3 right-3 z-10 shadow-sm">
                      <Badge label={art.category} variant={art.category === 'Art' ? 'default' : art.category === 'Vidéo' ? 'error' : 'primary'} size="sm" />
                   </div>
                   
                   <div className="w-full relative overflow-hidden cursor-pointer" onClick={() => setLightboxItem(art)}>
                     <img src={art.img} alt={art.title} className="w-full h-auto object-cover transform group-hover:scale-[1.05] transition-transform duration-500" loading="lazy" />
                     {art.category === 'Vidéo' && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                         <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg pl-1 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                           <svg className="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                         </div>
                       </div>
                     )}
                     {art.category === 'Musique' && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                         <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                           <span className="text-xl">🎵</span>
                         </div>
                       </div>
                     )}
                   </div>
                   
                   <div className="p-5">
                      <h4 className="font-playfair text-xl font-bold text-[#1B1B4D] mb-1 line-clamp-1 group-hover:text-[#B85D3E] transition-colors">{art.title}</h4>
                      <p className="font-montserrat text-xs text-[#D4AF37] font-bold uppercase tracking-widest mb-3">Par {art.artist}</p>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-[11px] text-gray-400 font-montserrat">{art.date}</span>
                        <div className="flex items-center text-[#B85D3E]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                          <span className="text-xs font-bold">{art.votes}</span>
                        </div>
                      </div>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
             <Button variant="secondary" className="px-12">Charger plus d'œuvres</Button>
          </div>
        </Container>
      </Section>

      {/* 4. FORUM DISCUSSION SECTION */}
      <Section background="blue" className="py-20 text-white">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-playfair text-3xl font-bold text-[#D4AF37]">{t('community.forum.title')}</h2>
            <Button variant="primary" size="sm">{t('community.forum.openThread')}</Button>
          </div>
          
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
             {mockDiscussions.map((disc, idx) => (
                <div key={disc.id} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-colors cursor-pointer ${idx !== mockDiscussions.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <Badge label={disc.tag} variant="default" className="text-[10px] bg-white/20 text-white border-transparent" />
                       <span className="text-xs text-gray-400 font-montserrat">{disc.lastUpdate}</span>
                    </div>
                    <h4 className="font-montserrat font-bold text-lg mb-1 text-white hover:text-[#D4AF37] transition-colors">{disc.title}</h4>
                    <p className="font-serif text-sm text-gray-300">Lancé par {disc.author}</p>
                  </div>
                  <div className="flex items-center md:flex-col justify-between md:justify-center bg-black/20 p-3 rounded-lg min-w-[80px] text-center shrink-0">
                    <span className="font-playfair text-2xl font-bold text-[#D4AF37] leading-none">{disc.replies}</span>
                    <span className="text-[10px] uppercase font-montserrat text-gray-400 mt-1">{t('community.forum.replies')}</span>
                  </div>
                </div>
             ))}
             <div className="p-4 text-center border-t border-white/10">
                <Link to="#" className="font-montserrat text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">{t('community.forum.explore')} &rarr;</Link>
             </div>
          </div>
        </Container>
      </Section>

      {/* 5. PARTNERS/SPONSORS SECTION */}
      <Section background="white">
        <Container>
           <h3 className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#5C5C4C] text-center mb-8">{t('community.partners')}</h3>
           <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 opacity-50 grayscale">
              {mockPartners.map((partner, i) => (
                <div key={i} className="font-playfair font-bold text-xl hover:grayscale-0 hover:text-[#D4AF37] hover:scale-105 transition-all cursor-pointer">
                  {partner.includes('Université') ? 'UCAO' : partner} Logo
                </div>
              ))}
           </div>
        </Container>
      </Section>

      {/* Modal Lightbox Concours */}
      <Modal 
        isOpen={!!lightboxItem} 
        onClose={() => setLightboxItem(null)} 
        size="lg"
      >
        {lightboxItem && (
          <div className="flex flex-col">
            <div className="relative w-full bg-black rounded-lg overflow-hidden mb-6 flex items-center justify-center max-h-[500px]">
              <img src={lightboxItem.img} alt={lightboxItem.title} className="max-w-full max-h-[500px] object-contain" />
              <Badge label={lightboxItem.category} variant="primary" className="absolute top-4 right-4 z-10 shadow-lg" />
            </div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="font-playfair text-3xl font-bold text-[#1B1B4D] mb-1">{lightboxItem.title}</h3>
                <p className="font-montserrat text-sm text-[#D4AF37] font-bold uppercase tracking-widest">Une œuvre de {lightboxItem.artist}</p>
              </div>
              <Button variant="primary" className="shrink-0 group">
                Voter 
                <svg className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform text-white inline-block" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              </Button>
            </div>
            <p className="font-serif text-[#5C5C4C] leading-relaxed mb-6">
              {lightboxItem.desc}
            </p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <span className="text-xs text-gray-400 font-montserrat tracking-wide">Soumis le {lightboxItem.date}</span>
              <div className="flex gap-2">
                 <button className="p-2 rounded-full bg-[#1B1B4D]/5 hover:bg-[#D4AF37]/20 text-[#1B1B4D] transition-colors" title="Partager">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                 </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Community;
