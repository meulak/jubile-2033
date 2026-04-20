import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { searchService } from '../../services/searchService';
import Badge from './Badge';

const SearchBar = ({ placeholder, variant = 'header', autoFocus = false }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const wrapperRef = useRef(null);

  const displayPlaceholder = placeholder || t('common.searchPlaceholder');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync Input if returning to search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const sp = new URLSearchParams(location.search);
      if (sp.get('q') && sp.get('q') !== query) {
        setQuery(sp.get('q'));
      }
    }
  }, [location.search, query]);

  // Debounced search for suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchService.getSuggestions(query.trim());
          setSuggestions(results);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timer = setTimeout(() => {
      if (isFocused) {
        fetchSuggestions();
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, isFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    document.getElementById('search-input-main').focus();
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'article': return '📄';
      case 'resource': return '📦';
      case 'person': return '👤';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'article': return t('common.types.article');
      case 'resource': return t('common.types.resource');
      case 'person': return t('common.types.person');
      default: return type;
    }
  };

  return (
    <div className={`relative ${variant === 'header' ? 'w-full max-w-sm' : 'w-full'}`} ref={wrapperRef}>
      <form 
        onSubmit={handleSubmit}
        className={`
          flex items-center bg-[#F5F3ED] rounded-full overflow-hidden border-2 transition-colors
          ${isFocused ? 'border-[#D4AF37] shadow-md bg-white' : 'border-transparent'}
          ${variant === 'header' ? 'h-10' : 'h-14 shadow-lg'}
        `}
      >
        <button type="submit" className="pl-4 pr-2 text-gray-500 hover:text-[#D4AF37] transition-colors focus:outline-none" aria-label={t('common.searchAria')}>
          <svg className={`text-current ${variant === 'header' ? 'w-4 h-4' : 'w-6 h-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <input 
          id="search-input-main"
          type="text"
          placeholder={displayPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          autoFocus={autoFocus}
          className={`
            w-full bg-transparent border-none focus:outline-none text-[#1B1B4D] font-serif
            ${variant === 'header' ? 'text-sm' : 'text-lg px-2'}
          `}
          aria-label={t('common.searchAria')}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {query.length > 0 && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              type="button" onClick={handleClear} 
              className="px-3 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
              aria-label={t('common.clearSearch')}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {/* DROPDOWN SUGGESTIONS */}
      <AnimatePresence>
        {isFocused && query.length >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {isLoading ? (
               <div className="p-4 text-center font-montserrat text-sm text-gray-400 flex items-center justify-center">
                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 {t('common.loading')}...
               </div>
            ) : suggestions.length > 0 ? (
               <ul className="py-2" role="listbox">
                 {suggestions.map((item, i) => (
                   <li key={item.id} role="option" aria-selected="false">
                     <Link 
                       to={item.url} 
                       onClick={() => setIsFocused(false)}
                       className={`flex items-center gap-3 px-4 py-3 hover:bg-[#F5F3ED]/50 transition-colors ${i !== suggestions.length -1 ? 'border-b border-gray-50' : ''}`}
                     >
                        <span className="text-xl shrink-0 opacity-80">{getTypeIcon(item.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-playfair font-bold text-[#1B1B4D] text-sm truncate">{item.title}</h5>
                          <span className="font-montserrat text-[10px] uppercase tracking-widest text-[#5C5C4C]">{item.category}</span>
                        </div>
                        <Badge label={getTypeLabel(item.type)} variant="default" size="sm" className="hidden sm:inline-flex shrink-0 font-montserrat" />
                     </Link>
                   </li>
                 ))}
                 <li className="border-t border-gray-100 bg-gray-50">
                    <button 
                      onClick={handleSubmit} 
                      className="w-full py-3 text-center font-montserrat font-bold text-xs text-[#1B1B4D] hover:text-[#D4AF37] uppercase tracking-widest transition-colors"
                    >
                       {t('common.viewAllResults', { query })} &rarr;
                    </button>
                 </li>
               </ul>
            ) : (
               <div className="p-4 text-center font-montserrat text-sm text-[#5C5C4C]">
                 {t('common.noSuggestions')}
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
