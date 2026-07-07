import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGlobe, FiArrowRight, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Sri Lanka"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <FiGlobe className="text-white text-2xl" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold font-poppins text-white tracking-tight">NIPUNGO</h1>
            <p className="text-white/60 text-sm font-inter">Plan. Book. Explore.</p>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold font-poppins text-white leading-tight mb-4">
          Discover the Magic of{' '}
          <span className="bg-gradient-to-r from-accent to-secondary-300 bg-clip-text text-transparent">
            Sri Lanka
          </span>
        </h2>
        <p className="text-white/70 font-inter text-lg mb-10 leading-relaxed">
          Your AI-powered travel companion for unforgettable Sri Lankan adventures.
          Plan, book, and explore with ease.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-10">
          {[
            { icon: <FiMapPin />, value: '50+', label: 'Destinations' },
            { icon: <FiStar />, value: '4.9★', label: 'Rating' },
            { icon: <FiUsers />, value: '10K+', label: 'Travelers' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">{s.icon}</div>
              <p className="text-white font-bold font-poppins text-xl">{s.value}</p>
              <p className="text-white/50 font-inter text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="btn-accent text-base px-10 py-4 flex items-center justify-center gap-2 rounded-2xl shadow-glow"
          >
            Get Started Free <FiArrowRight />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-4 rounded-2xl transition-all duration-200 font-poppins"
          >
            Sign In
          </button>
        </div>

        <p className="text-white/40 font-inter text-xs mt-6">
          No credit card required · Free to join · Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default Welcome;