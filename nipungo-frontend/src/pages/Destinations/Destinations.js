import React, { useState, useEffect } from 'react';
import { FiFilter, FiMapPin, FiSearch } from 'react-icons/fi';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import { destinationsAPI } from '../../services/api';

const CATEGORIES = ['All', 'Heritage', 'Nature', 'Beach', 'Wildlife', 'Culture', 'Hill Country'];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const res = await destinationsAPI.getAll();
        const data = res.data.data || [];
        setDestinations(data);
        setFiltered(data);
      } catch (err) {
        setError('Failed to load destinations. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    let result = [...destinations];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(d =>
        d.name?.toLowerCase().includes(q) ||
        d.district?.toLowerCase().includes(q) ||
        d.category?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') {
      result = result.filter(d => d.category === activeCategory);
    }
    setFiltered(result);
  }, [query, activeCategory, destinations]);

  // Map backend DTO to card-compatible shape
  const mapDestination = (d) => ({
    id: d.id,
    name: d.name,
    province: d.district,
    tagline: d.tagline,
    image: d.imageUrl,
    rating: d.rating,
    reviewCount: d.reviewCount,
    category: d.category,
    duration: d.duration,
    bestTime: d.bestTime,
    featured: d.featured,
  });

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
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">Discover Destinations</h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-8">
            From ancient rock fortresses to pristine beaches — find your perfect Sri Lankan destination.
          </p>
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-primary placeholder-gray-400 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <FiFilter className="text-gray-400 shrink-0" />
            {CATEGORIES.map(cat => (
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

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 font-inter text-sm">
              {error}
            </div>
          )}

          {/* Results */}
          <p className="text-gray-500 text-sm font-inter mb-6">
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => (
                <DestinationCard key={dest.id} destination={mapDestination(dest)} />
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
