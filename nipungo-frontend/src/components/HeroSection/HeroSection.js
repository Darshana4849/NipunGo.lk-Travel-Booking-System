import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight, FiStar } from 'react-icons/fi';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    location: 'Sigiriya',
    tagline: 'The Eighth Wonder of the World',
  },
  {
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1600&q=80',
    location: 'Ella',
    tagline: 'Heaven in the Hills',
  },
  {
    image: 'https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=1600&q=80',
    location: 'Mirissa',
    tagline: 'Tropical Beach Paradise',
  },
];

const stats = [
  { value: '50+', label: 'Destinations' },
  { value: '200+', label: 'Hotels' },
  { value: '10K+', label: 'Happy Travelers' },
  { value: '4.9★', label: 'Average Rating' },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.location}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom w-full pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <FiMapPin className="text-accent text-sm" />
            <span className="text-white/90 text-sm font-inter">
              Discover Sri Lanka — {heroSlides[current].location}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins text-white leading-tight mb-6 animate-slide-up">
            Your Dream{' '}
            <span className="bg-gradient-to-r from-accent to-secondary-300 bg-clip-text text-transparent">
              Sri Lanka
            </span>
            <br />
            Journey Awaits
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-inter max-w-xl mb-10 leading-relaxed animate-fade-in">
            Plan unforgettable experiences across the Pearl of the Indian Ocean — from ancient ruins to pristine beaches, wildlife safaris to misty highlands.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-12 animate-slide-up">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search destinations, hotels, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-primary placeholder-gray-400 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="btn-accent flex items-center justify-center gap-2 py-4 px-8 rounded-2xl text-base shadow-glow"
            >
              <FiSearch />
              Search
            </button>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-16 animate-fade-in">
            {['Sigiriya', 'Ella', 'Mirissa', 'Yala Safari', 'Kandy'].map((dest) => (
              <button
                key={dest}
                onClick={() => navigate(`/destinations?search=${dest}`)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-inter px-4 py-2 rounded-full transition-all duration-200 hover:border-white/40"
              >
                <FiMapPin className="text-accent text-xs" />
                {dest}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-3xl font-bold font-poppins text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-inter tracking-widest rotate-90 mb-4">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
