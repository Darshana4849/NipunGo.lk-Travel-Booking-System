import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiMapPin } from 'react-icons/fi';
import SearchBar from '../../components/SearchBar/SearchBar';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import { destinations, categories, searchDestinations, getDestinationsByCategory } from '../../data/destinations';

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [filtered, setFiltered] = useState(destinations);

  useEffect(() => {
    let result = destinations;
    if (query.trim()) result = searchDestinations(query);
    if (activeCategory !== 'All') result = result.filter((d) => d.category === activeCategory);
    setFiltered(result);
  }, [query, activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary-600 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiMapPin className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Explore Sri Lanka</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">
            Discover Destinations
          </h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-8">
            From ancient rock fortresses to pristine beaches — find your perfect Sri Lankan destination.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar
              placeholder="Search destinations..."
              initialValue={query}
              onSearch={setQuery}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <FiFilter className="text-gray-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-secondary text-white shadow-glow-blue'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm font-inter">
              {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
              {query && ` for "${query}"`}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiMapPin className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold font-poppins text-primary text-xl mb-2">No destinations found</h3>
              <p className="text-gray-400 font-inter mb-6">Try a different search term or category.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Destinations;
