import React, { useState, useEffect } from 'react';
import { FiFilter, FiPackage, FiSearch } from 'react-icons/fi';
import PackageCard from '../../components/PackageCard/PackageCard';
import { packagesAPI } from '../../services/api';

const CATEGORIES = ['All', 'Heritage', 'Beach', 'Nature', 'Wildlife', 'Grand Tour', 'Romantic', 'Wellness', 'Adventure', 'Family', 'Photography'];

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const res = await packagesAPI.getAll();
        const data = res.data.data || [];
        setPackages(data);
        setFiltered(data);
      } catch {
        setError('Failed to load packages. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let result = [...packages];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'duration') result.sort((a, b) => a.duration - b.duration);
    else result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    setFiltered(result);
  }, [query, activeCategory, sortBy, packages]);

  // Map backend DTO to card shape
  const mapPackage = (p) => ({
    id: p.id,
    name: p.title,
    title: p.title,
    tagline: p.tagline,
    image: p.imageUrl,
    duration: p.duration,
    durationUnit: p.durationUnit || 'days',
    groupSize: p.groupSize,
    price: p.price,
    originalPrice: p.originalPrice,
    currency: 'USD',
    category: p.category,
    rating: p.rating,
    reviewCount: p.reviewCount,
    highlights: [],
    badge: p.badge,
    featured: p.featured,
    popular: p.popular,
  });

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary-600 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiPackage className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Curated Experiences</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">Travel Packages</h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-8">
            All-inclusive Sri Lanka travel packages designed for every type of traveler.
          </p>
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
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
              {CATEGORIES.slice(0, 7).map(cat => (
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
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Shortest First</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 font-inter text-sm">{error}</div>
          )}

          <p className="text-gray-500 text-sm font-inter mb-6">{filtered.length} package{filtered.length !== 1 ? 's' : ''} found</p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(pkg => (
                <PackageCard key={pkg.id} pkg={mapPackage(pkg)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiPackage className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold font-poppins text-primary text-xl mb-2">No packages found</h3>
              <p className="text-gray-400 font-inter mb-6">Try a different search or category.</p>
              <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="btn-secondary">Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Packages;
