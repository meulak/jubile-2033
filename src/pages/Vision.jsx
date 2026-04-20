import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { motion } from 'framer-motion';

const Vision = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen">
      <section className="relative w-full py-24 bg-[#B85D3E] text-white text-center overflow-hidden">
        <Container className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Vision 2033
          </motion.h1>
          <p className="font-serif text-xl opacity-90 max-w-3xl mx-auto">
            Marcher ensemble vers le bimillénaire de la Rédemption, avec l'Afrique comme phare spirituel.
          </p>
        </Container>
      </section>

      <Section background="white">
        <Container className="max-w-4xl text-center">
          <h2 className="font-playfair text-3xl text-[#1B1B4D] mb-8">Pourquoi 2033 ?</h2>
          <p className="font-serif text-lg text-[#5C5C4C] leading-relaxed mb-12">
            En 2033, nous fêterons les 2000 ans de la Résurrection du Christ. Ce jubilé exceptionnel est une occasion unique de réconciliation mondiale et de renouveau de la foi. Impronte Africane s'inscrit dans cette dynamique en préparant les esprits et les cœurs à cette rencontre historique.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-[#F5F3ED] rounded-xl border border-[#D4AF37]/20">
              <span className="text-4xl mb-4 block">🕊️</span>
              <h4 className="font-montserrat font-bold text-[#1B1B4D] mb-2 uppercase text-sm tracking-widest">Unité</h4>
              <p className="font-serif text-sm text-[#5C5C4C]">Rassembler les chrétiens d'Afrique et de la diaspora autour d'un socle historique commun.</p>
            </div>
            <div className="p-6 bg-[#F5F3ED] rounded-xl border border-[#D4AF37]/20">
              <span className="text-4xl mb-4 block">📚</span>
              <h4 className="font-montserrat font-bold text-[#1B1B4D] mb-2 uppercase text-sm tracking-widest">Éducation</h4>
              <p className="font-serif text-sm text-[#5C5C4C]">Enseigner les trésors cachés de la patristique africaine aux nouvelles générations.</p>
            </div>
            <div className="p-6 bg-[#F5F3ED] rounded-xl border border-[#D4AF37]/20">
              <span className="text-4xl mb-4 block">🌍</span>
              <h4 className="font-montserrat font-bold text-[#1B1B4D] mb-2 uppercase text-sm tracking-widest">Avenir</h4>
              <p className="font-serif text-sm text-[#5C5C4C]">Faire de l'Afrique le moteur de la nouvelle évangélisation mondiale d'ici 2033.</p>
            </div>
          </div>

          <div className="bg-[#1B1B4D] text-white p-10 rounded-3xl shadow-2xl">
             <h3 className="font-playfair text-2xl mb-4 text-[#D4AF37]">Un Appel à la Créativité</h3>
             <p className="font-serif mb-8 opacity-90">
               Nous croyons que 2033 doit être célébré par la beauté. C'est pourquoi nous lançons des appels aux artistes, musiciens et cinéastes pour que l'empreinte africaine de 2033 soit la plus belle possible.
             </p>
             <button className="bg-[#D4AF37] text-[#1B1B4D] px-8 py-3 rounded-full font-montserrat font-bold uppercase tracking-widest hover:bg-white transition-colors">
               Nous Rejoindre
             </button>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Vision;
