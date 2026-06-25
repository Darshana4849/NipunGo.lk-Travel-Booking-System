import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiArrowRight, FiClock } from 'react-icons/fi';

const DestinationCard = ({ destination, featured = false }) => {
  const {
    id, name, province, tagline, image, rating, reviewCount,
    category, duration, bestTime,
  } = destination;

  return (
    <Link
      to={`/destinations/${id}`}
      className={`card group block card-image-zoom ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-52'}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-card" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge-primary text-xs">{category}</span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1">
          <FiStar className="text-amber-400 text-xs fill-amber-400" />
          <span className="text-xs font-semibold text-gray-800 font-inter">{rating}</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-white font-bold font-poppins text-xl leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <FiMapPin className="text-accent text-xs" />
                <span className="text-white/80 text-xs font-inter">{province}</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
              <FiArrowRight className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-500 text-sm font-inter line-clamp-2 leading-relaxed mb-3">
          {tagline}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 font-inter">
          <div className="flex items-center gap-1">
            <FiClock className="text-xs" />
            <span>{duration}</span>
          </div>
          <span className="text-gray-400">{reviewCount?.toLocaleString()} reviews</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
