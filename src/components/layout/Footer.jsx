import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Main application footer component.
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 */
const Footer = ({ className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <footer className={`w-full bg-[#1B1B4D] text-[#F5F3ED] font-montserrat ${className}`}>
      
      {/* 4 Columns Top Section */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: À Propos */}
        <div>
          <h4 className="text-[#D4AF37] text-sm uppercase font-semibold mb-4 tracking-wider font-montserrat">{t('footer.about')}</h4>
          <ul className="space-y-2 text-sm opacity-80 list-none p-0 m-0">
            <li><Link to="/histoire" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.history')}</Link></li>
            <li><Link to="/vision" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.vision')}</Link></li>
            <li><Link to="/equipe" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.team')}</Link></li>
          </ul>
        </div>

        {/* Column 2: Contenu */}
        <div>
          <h4 className="text-[#D4AF37] text-sm uppercase font-semibold mb-4 tracking-wider font-montserrat">{t('footer.content')}</h4>
          <ul className="space-y-2 text-sm opacity-80 list-none p-0 m-0">
            <li><Link to="/bible" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('navigation.bible')}</Link></li>
            <li><Link to="/heritage" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('navigation.heritage')}</Link></li>
            <li><Link to="/ressources" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('navigation.resources')}</Link></li>
          </ul>
        </div>

        {/* Column 3: Engagement */}
        <div>
          <h4 className="text-[#D4AF37] text-sm uppercase font-semibold mb-4 tracking-wider font-montserrat">{t('footer.engagement')}</h4>
          <ul className="space-y-2 text-sm opacity-80 list-none p-0 m-0">
            <li><Link to="/communaute" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.join')}</Link></li>
            <li><Link to="/evenements" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.events')}</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.links.contact')}</Link></li>
          </ul>
        </div>

        {/* Column 4: Réseaux Sociaux */}
        <div>
          <h4 className="text-[#D4AF37] text-sm uppercase font-semibold mb-4 tracking-wider font-montserrat">{t('footer.social')}</h4>
          <ul className="space-y-2 text-sm opacity-80 list-none p-0 m-0">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">Twitter / X</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-6 border-t border-[#ffffff20] text-xs text-center md:flex md:justify-between opacity-60">
        <p>{t('footer.copyright')}</p>
        <div className="mt-4 md:mt-0 space-x-4">
          <Link to="/mentions-legales" className="hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.legal.mentions')}</Link>
          <Link to="/confidentialite" className="hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded">{t('footer.legal.privacy')}</Link>
        </div>
      </div>
      
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
