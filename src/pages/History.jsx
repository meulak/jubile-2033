import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { motion } from 'framer-motion';

const History = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#F5F3ED] min-h-screen">
      <section className="relative w-full py-24 bg-[#1B1B4D] text-white text-center overflow-hidden">
        <Container className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-[#D4AF37]"
          >
            Notre Histoire
          </motion.h1>
          <p className="font-serif text-xl opacity-90 max-w-3xl mx-auto">
            Une initiative née d'une redécouverte : celle des racines africaines du message universel du Christ.
          </p>
        </Container>
      </section>

      <Section background="white">
        <Container className="max-w-4xl">
          <div className="prose prose-lg font-serif text-[#5C5C4C] mx-auto">
            <h2 className="font-playfair text-3xl text-[#1B1B4D] mb-6">L'Origine du Projet</h2>
            <p className="mb-6">
              Impronte Africane (Empreintes Africaines) est né du constat que l'histoire du christianisme est souvent racontée sans mentionner le rôle décisif du continent africain pendant ses trois premiers siècles. De la formation de Moïse à la théologie d'Augustin, l'Afrique n'a pas seulement accueilli la foi, elle l'a forgée.
            </p>
            <p className="mb-6">
              En préparation du Jubilé 2033, nous avons voulu créer un espace numérique digne de ce patrimoine. Un lieu où l'érudition historique rencontre la dévotion populaire, et où chaque africain (et chaque chrétien) peut se réapproprier cette part de son identité.
            </p>
            <h3 className="font-playfair text-2xl text-[#1B1B4D] mb-4">Notre Mission</h3>
            <p className="mb-8">
              Documenter, illustrer et célébrer. Nous travaillons avec des historiens, des théologiens et des artistes pour offrir un contenu qui soit à la fois scientifiquement rigoureux et spirituellement nourrissant.
            </p>
            <div className="bg-[#1B1B4D]/5 p-8 rounded-2xl border-l-4 border-[#D4AF37] italic">
              "L'Afrique est la patrie spirituelle de tous les chrétiens, car c'est elle qui a préservé la lumière quand elle menaçait de s'éteindre."
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default History;
