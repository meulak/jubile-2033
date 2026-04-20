import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import SearchBar from '../components/common/SearchBar';
import Checkbox from '../components/common/Checkbox';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { searchService } from '../services/searchService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [counts, setCounts] = useState({ total: 0, article: 0, resource: 0, person: 0 });
  const [loading, setLoading] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    types: [], // empty means all
    category: 'Tous'
  });
  const [sortOption, setSortOption] = useState('pertinence');
  
  // Pagination
  const resultsPerPage = 10;
  const [visibleCount, setVisibleCount] = useState(resultsPerPage);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await searchService.search(query, filters, sortOption);
      setResults(data.results);
      setCounts(data.counts);
      // Reset pagination when search changes
      setVisibleCount(resultsPerPage);
    } catch (e) {
      console.error("Search error", e);
    } finally {
      setLoading(false);
    }
  };

  // Re-run search anytime query, filters, or sort changes
  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sortOption]);

  const handleTypeToggle = (type) => {
    setFilters(prev => {
      const current = [...prev.types];
      const index = current.indexOf(type);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(type);
      }
      return { ...prev, types: current };
    });
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'article': return 'Article';
      case 'resource': return 'Ressource';
      case 'person': return 'Personnalité';
      default: return type;
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-[#D4AF37]/30 text-[#1B1B4D] font-bold rounded px-1">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="w-full bg-[#F5F3ED] min-h-[calc(100vh-100px)] py-12">
      <Container>
        
        {/* Main Search Query Area */}
        <div className="mb-12">
          <SearchBar placeholder="Lancer une nouvelle recherche..." variant="page" />
          <h1 className="font-playfair text-3xl font-bold text-[#1B1B4D] mt-8">
            {query ? (
               <span>Résultats pour "<span className="text-[#D4AF37]">{query}</span>"</span>
            ) : (
               <span>Recherche Exploratoire</span>
            )}
          </h1>
          <p className="font-montserrat text-sm text-[#5C5C4C] mt-2">
            {loading ? "Recherche en cours..." : `${counts.total} résultat${counts.total > 1 ? 's' : ''} trouvé${counts.total > 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-[280px] shrink-0 space-y-8 bg-white p-6 rounded-2xl shadow-sm h-max lg:sticky lg:top-24 border border-gray-100">
             
             <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-montserrat font-bold text-lg text-[#1B1B4D]">Filtres</h3>
                <button 
                  onClick={() => setFilters({ types: [], category: 'Tous' })}
                  className="font-montserrat text-xs font-bold text-gray-400 uppercase hover:text-red-500 transition-colors"
                >Effacer</button>
             </div>

             <div className="space-y-4">
                <h4 className="font-serif font-bold text-[#1B1B4D] bg-[#F5F3ED] px-3 py-1 rounded">Type de contenu</h4>
                <Checkbox label={`Articles (${counts.article})`} checked={filters.types.includes('article')} onChange={() => handleTypeToggle('article')} />
                <Checkbox label={`Ressources (${counts.resource})`} checked={filters.types.includes('resource')} onChange={() => handleTypeToggle('resource')} />
                <Checkbox label={`Personnalités (${counts.person})`} checked={filters.types.includes('person')} onChange={() => handleTypeToggle('person')} />
             </div>

             <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-serif font-bold text-[#1B1B4D] bg-[#F5F3ED] px-3 py-1 rounded">Catégorie</h4>
                <Select 
                  name="category"
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                  options={[
                    {label: "Toutes les catégories", value: "Tous"},
                    {label: "Bible", value: "Bible"},
                    {label: "Histoire", value: "Histoire"},
                    {label: "Liturgie", value: "Liturgie"},
                    {label: "Pères de l'Église", value: "Pères de l'Église"}
                  ]}
                />
             </div>
          </aside>

          {/* MAIN RESULTS LIST */}
          <main className="flex-1">
             <div className="flex justify-between items-center bg-white py-3 px-6 rounded-xl border border-gray-100 mb-6 shadow-sm">
                <span className="font-montserrat text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:inline">Tri:</span>
                <Select 
                  name="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  options={[
                    {label: "Pertinence", value: "pertinence"},
                    {label: "Plus Récent", value: "recent"},
                    {label: "Ordre Alphabétique", value: "az"}
                  ]}
                  className="w-[200px] mb-0 ml-auto"
                />
             </div>

             {loading ? (
                <div className="w-full py-20 flex flex-col items-center justify-center">
                   <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
                   <p className="font-serif text-[#5C5C4C]">Exploration des vastes archives en cours...</p>
                </div>
             ) : results.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-sm">
                   <div className="text-6xl mb-4">🏜️</div>
                   <h3 className="font-playfair text-2xl font-bold text-[#1B1B4D] mb-3">Aucun résultat trouvé</h3>
                   <p className="font-serif text-[#5C5C4C] max-w-md mx-auto mb-6">La requête "{query}" n'a retourné aucun manuel, article ni document. Essayez d'élargir vos termes de recherche.</p>
                   <Button variant="secondary" onClick={() => {setSearchParams({}); setFilters({types:[], category: 'Tous'})}}>Voir Tout le Contenu</Button>
                </div>
             ) : (
                <div aria-live="polite">
                   <AnimatePresence>
                     {results.slice(0, visibleCount).map((res, index) => (
                       <motion.div 
                         key={res.id} 
                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                         className="bg-white p-6 rounded-2xl mb-4 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#D4AF37]/50 transition-all group"
                       >
                         <Link to={res.url} className="flex flex-col md:flex-row gap-6">
                            
                            {/* Thumbnail si l'image existe */}
                            <div className="w-full md:w-[200px] shrink-0">
                               {res.image ? (
                                 <img src={res.image} alt="" className="w-full h-[140px] rounded-xl object-cover" />
                               ) : (
                                 <div className="w-full h-[140px] rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                   <span className="text-4xl text-gray-300">
                                     {res.type === 'person' ? '👤' : res.type === 'resource' ? '📦' : '📄'}
                                   </span>
                                 </div>
                               )}
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                               <div className="flex flex-wrap gap-2 mb-2 items-center">
                                 <Badge label={getTypeLabel(res.type)} variant={res.type === 'article' ? 'default' : res.type === 'person' ? 'primary' : 'warning'} size="sm" />
                                 <span className="font-montserrat text-[10px] text-gray-400 uppercase font-bold tracking-widest">{res.category}</span>
                               </div>
                               <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#1B1B4D] mb-3 group-hover:text-[#B85D3E] transition-colors leading-tight">
                                 {highlightText(res.title, query)}
                               </h3>
                               <p className="font-serif text-[15px] text-[#5C5C4C] leading-relaxed line-clamp-2">
                                 {highlightText(res.content, query)}
                               </p>
                               <div className="mt-4 pt-4 border-t border-gray-50 font-montserrat text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center group-hover:text-[#1B1B4D] transition-colors">
                                 Consulter {res.type === 'person' ? 'le profil' : 'la ressource'} &rarr;
                               </div>
                            </div>
                         </Link>
                       </motion.div>
                     ))}
                   </AnimatePresence>

                   {visibleCount < results.length && (
                     <div className="mt-12 text-center">
                       <Button variant="secondary" onClick={() => setVisibleCount(vc => vc + resultsPerPage)} className="px-10">
                         Charger {Math.min(resultsPerPage, results.length - visibleCount)} résultats de plus
                       </Button>
                     </div>
                   )}
                </div>
             )}

          </main>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;
