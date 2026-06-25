import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiMapPin, FiSearch } from 'react-icons/fi';

const quickLinks = [
  { label: 'Destinations', path: '/destinations', icon: <FiMapPin /> },
  { label: 'Hotels', path: '/hotels', icon: <FiHome /> },
  { label: 'Packages', path: '/packages', icon: <FiSearch /> },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Large 404 */}
        <div className="relative mb-6">
          <p className="text-[9rem] md:text-[12rem] font-black font-poppins text-gray-100 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="text-primary font-bold font-poppins text-xl">Page Not Found</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary mb-3">
          Looks Like You're Off the Map!
        </h1>
        <p className="text-gray-500 font-inter text-base mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track to your next Sri Lanka adventure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <FiHome /> Back to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-gray-400 text-sm font-inter mb-4">Or explore these popular sections:</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-2 bg-white border border-gray-200 hover:border-secondary hover:text-secondary text-gray-600 text-sm font-inter px-4 py-2.5 rounded-xl transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-40">
          <span className="text-sm font-bold font-poppins text-primary">NIPUNGO</span>
          <span className="text-gray-400 text-xs font-inter">· Plan. Book. Explore.</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
