import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Section wrapper component with standardized padding, background, title, and animations.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content of the section
 * @param {string} [props.title] - Optional section title
 * @param {string} [props.subtitle] - Optional section subtitle
 * @param {'cream'|'blue'|'white'} [props.background='cream'] - Background color variant
 * @param {string} [props.className] - Additional CSS classes
 */
const Section = ({ 
  children, 
  title, 
  subtitle, 
  background = 'cream', 
  className = '' 
}) => {
  const bgClasses = {
    cream: 'bg-[#F5F3ED]',
    blue: 'bg-[#1B1B4D] text-[#F5F3ED]',
    white: 'bg-white',
  };

  const selectedBg = bgClasses[background] || bgClasses.cream;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full py-8 px-4 md:py-16 md:px-6 ${selectedBg} ${className}`}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="font-playfair text-4xl mb-2 relative inline-block">
                {title}
                <span className="block w-1/2 h-[2px] bg-[#D4AF37] mt-2 mx-auto"></span>
              </h2>
            )}
            {subtitle && (
              <p className={`mt-2 ${background === 'blue' ? 'text-gray-300' : 'text-gray-600'} font-montserrat`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  background: PropTypes.oneOf(['cream', 'blue', 'white']),
  className: PropTypes.string,
};

export default Section;

/*
// Example Usage:
import Section from './Section';

const App = () => (
  <Section 
    title="Notre Histoire" 
    subtitle="2000 ans de présence chrétienne" 
    background="cream"
  >
    <p>Texte de la section...</p>
  </Section>
);
*/
