import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiStar } from 'react-icons/fi';
import SearchBar from '../../components/SearchBar/SearchBar';
import HotelCard from '../../components/HotelCard/HotelCard';
import { hotels, hotelCategories, searchHotels } from '../../data/hotels';

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filtered, setFiltered] = useState(hotels);

  useEffect(() => {
    let result = [...hotels];
    if (query.trim()) result = searchHotels(query);
    if (activeCategory !== 'All') result = result.filter((h) => h.category === activeCategory);
    if (sortBy === 'price-asc') result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
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
            <FiStar className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Where to Stay</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-8">
            From ultra-luxury resorts to charming boutique hotels — find accommodation that fits your style and budget.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar
              placeholder="Search hotels by name, location..."
              initialValue={query}
              onSearch={setQuery}
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <FiFilter className="text-gray-400 shrink-0" />
              {hotelCategories.slice(0, 6).map((cat) => (
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto text-sm py-2 pr-8"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Results */}
          <p className="text-gray-500 text-sm font-inter mb-6">
            {filtered.length} hotel{filtered.length !== 1 ? 's' : ''} found
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiStar className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold font-poppins text-primary text-xl mb-2">No hotels found</h3>
              <p className="text-gray-400 font-inter mb-6">Try adjusting your search or filters.</p>
              <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Hotels;
