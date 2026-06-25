import React, { useState, useEffect } from 'react';
import { FiFilter, FiPackage } from 'react-icons/fi';
import PackageCard from '../../components/PackageCard/PackageCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { packages, packageCategories } from '../../data/packages';

const Packages = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [filtered, setFiltered] = useState(packages);

  useEffect(() => {
    let result = [...packages];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.destinations?.some((d) => d.toLowerCase().includes(q))
      );
    }
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory);
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'duration') result.sort((a, b) => a.duration - b.duration);
    else result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    setFiltered(result);
  }, [query, activeCategory, sortBy]);

  return (
    <>
      {/* Hero */}
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
            All-inclusive Sri Lanka travel packages designed for every type of traveler. Choose yours and let's go!
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar placeholder="Search packages..." initialValue={query} onSearch={setQuery} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <FiFilter className="text-gray-400 shrink-0" />
              {packageCategories.slice(0, 7).map((cat) => (
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
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-auto text-sm py-2 pr-8">
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Shortest First</option>
            </select>
          </div>

          <p className="text-gray-500 text-sm font-inter mb-6">{filtered.length} package{filtered.length !== 1 ? 's' : ''} found</p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
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
