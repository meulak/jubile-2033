import { searchIndex } from '../data/searchIndex';

// Simulating network latency for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchService = {
  // Returns quick top 5 results for the dropdown
  getSuggestions: async (query) => {
    await delay(300);
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5); // Return top 5 maximum
  },

  // Returns full results for the search page
  search: async (query, filters = {}, sortOptions = 'pertinence') => {
    await delay(600);
    let results = [...searchIndex];
    
    // Text search
    if (query && query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.content.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Type Filter (checkboxes)
    if (filters.types && filters.types.length > 0) {
      results = results.filter(item => filters.types.includes(item.type));
    }
    
    // Category Filter (select dropdown)
    if (filters.category && filters.category !== 'Tous') {
      results = results.filter(item => item.category === filters.category);
    }

    // Sort Logic
    if (sortOptions === 'az') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOptions === 'recent') {
      // Mock logic as dates aren't fully normalized in test set
      results = results.reverse();
    } // pertinence is just the order returned by filter

    // Calculate distributions for sidebar
    const counts = {
      total: results.length,
      article: results.filter(r => r.type === 'article').length,
      resource: results.filter(r => r.type === 'resource').length,
      person: results.filter(r => r.type === 'person').length
    };
    
    return { results, counts };
  }
};
