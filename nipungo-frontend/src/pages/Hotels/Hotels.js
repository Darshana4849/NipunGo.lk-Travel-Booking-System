import React, { useState, useEffect } from 'react';
import { FiFilter, FiStar, FiSearch } from 'react-icons/fi';
import HotelCard from '../../components/HotelCard/HotelCard';
import { hotelsAPI } from '../../services/api';

const CATEGORIES = ['All', 'Luxury Resort', 'Boutique Resort', 'Beach Resort', 'Eco-Luxury', 'City Luxury', 'Heritage Hotel', 'Jungle Resort'];

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await hotelsAPI.getAll();
        const data = res.data.data || [];
        setHotels(data);
        setFiltered(data);
      } catch {
        setError('Failed to load hotels. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    let result = [...hotels];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(h =>
        h.name?.toLowerCase().includes(q) ||
        h.location?.toLowerCase().includes(q) ||
        h.category?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') result = result.filter(h => h.category === activeCategory);
    if (sortBy === 'price-asc') result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    setFiltered(result);
  }, [query, activeCategory, sortBy, hotels]);

  // Map backend DTO to card shape
  const mapHotel = (h) => ({
    id: h.id,
    name: h.name,
    location: h.location,
    image: h.imageUrl,
    rating: h.rating,
    reviewCount: h.reviewCount,
    pricePerNight: h.pricePerNight,
    currency: 'USD',
    stars: h.stars,
    category: h.category,
    amenities: [],
  });

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary-600 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiStar className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Where to Stay</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">Find Your Perfect Stay</h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-8">
            From ultra-luxury resorts to charming boutique hotels.
          </p>
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-primary placeholder-gray-400 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <FiFilter className="text-gray-400 shrink-0" />
              {CATEGORIES.slice(0, 6).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-inter transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-secondary text-white shadow-glow-blue'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field w-auto text-sm py-2">
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 font-inter text-sm">{error}</div>
          )}

          <p className="text-gray-500 text-sm font-inter mb-6">{filtered.length} hotel{filtered.length !== 1 ? 's' : ''} found</p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(hotel => (
                <HotelCard key={hotel.id} hotel={mapHotel(hotel)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiStar className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold font-poppins text-primary text-xl mb-2">No hotels found</h3>
              <p className="text-gray-400 font-inter mb-6">Try adjusting your search or filters.</p>
              <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="btn-secondary">Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Hotels;
