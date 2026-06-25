import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiWifi, FiArrowRight } from 'react-icons/fi';

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`text-xs ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
      />
    ))}
  </div>
);

const HotelCard = ({ hotel }) => {
  const {
    id, name, location, image, rating, reviewCount,
    pricePerNight, currency, stars, category, amenities,
  } = hotel;

  const displayAmenities = amenities?.slice(0, 3) || [];

  return (
    <Link to={`/hotels/${id}`} className="card group block">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-60" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/95 text-primary text-xs">{category}</span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary text-white rounded-full px-2.5 py-1">
          <FiStar className="text-xs fill-white" />
          <span className="text-xs font-bold font-inter">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <StarRating count={stars} />
            <h3 className="font-bold font-poppins text-primary text-lg leading-tight mt-1">
              {name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3 font-inter">
          <FiMapPin className="text-xs text-accent" />
          {location}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayAmenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md font-inter"
            >
              {amenity}
            </span>
          ))}
          {amenities?.length > 3 && (
            <span className="text-xs text-gray-400 font-inter px-2 py-1">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 font-inter">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-poppins text-primary">
                ${pricePerNight}
              </span>
              <span className="text-xs text-gray-400 font-inter">/night</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-inter">{reviewCount} reviews</span>
            <div className="w-9 h-9 rounded-xl bg-secondary/10 group-hover:bg-secondary flex items-center justify-center text-secondary group-hover:text-white transition-all duration-300">
              <FiArrowRight className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
