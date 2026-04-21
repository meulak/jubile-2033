import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchBar from '../common/SearchBar';

/**
 * Main application navigation header.
 * @param {Object} props
 * @param {string} [props.activeLink] - Current active navigation link
 * @param {Function} [props.onLanguageChange] - Callback when language is changed
 */
const Header = ({ activeLink = '/', onLanguageChange = () => {} }) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use current language directly from i18n, default to FR if not resolved yet
  const currentLang = i18n.resolvedLanguage ? i18n.resolvedLanguage.toUpperCase() : 'FR';

  const navLinks = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.bible'), path: '/bible' },
    { name: t('navigation.heritage'), path: '/heritage' },
    { name: t('navigation.resources'), path: '/ressources' },
    { name: t('navigation.community'), path: '/communaute' }
  ];

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    onLanguageChange(lang);
  };

  // Subtle Ndop pattern simulation class using CSS gradients
  const ndopPatternStyle = {
    backgroundImage: `radial-gradient(#ffffff15 1px, transparent 1px)`,
    backgroundSize: '16px 16px'
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-[#1B1B4D] text-white shadow-md">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={ndopPatternStyle}></div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Impronte Africane – Accueil" className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/logo.png`}
            alt="Logo Impronte Africane"
            className="h-12 w-12 object-contain rounded-full border-2 border-[#D4AF37]/40 shadow-md"
          />
          <span className="font-playfair text-xl text-[#D4AF37] font-semibold tracking-wide hidden sm:inline">
            Impronte Africane
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-montserrat text-sm font-medium uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1 py-1
                ${activeLink === link.path 
                  ? 'font-bold border-b-2 border-[#D4AF37]' 
                  : 'text-white border-b-2 border-transparent hover:border-[#D4AF37] opacity-80 hover:opacity-100'
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <SearchBar variant="header" placeholder={t('common.searchPlaceholder')} />
          {/* Language Selector Desktop */}
          <div className="flex items-center space-x-2 font-montserrat text-sm font-medium">
            {['EN', 'FR', 'IT'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1
                  ${currentLang === lang ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}
                `}
                aria-label={`Change language to ${lang}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden relative z-10 w-full bg-[#1B1B4D] border-t border-[#ffffff20]">
          <ul className="flex flex-col py-4 px-6 space-y-4 m-0 p-0 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block font-montserrat text-sm font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded
                    ${activeLink === link.path ? 'text-[#D4AF37] font-bold' : 'text-white'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-[#ffffff20] flex space-x-4">
              {['EN', 'FR', 'IT'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`font-montserrat text-sm font-medium hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded
                    ${currentLang === lang ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}
                  `}
                >
                  {lang}
                </button>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  activeLink: PropTypes.string,
  onLanguageChange: PropTypes.func,
};

export default Header;
