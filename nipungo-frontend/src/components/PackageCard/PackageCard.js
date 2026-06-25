import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiStar, FiArrowRight, FiTag } from 'react-icons/fi';

const badgeColors = {
  'Best Seller': 'bg-amber-100 text-amber-700',
  'Most Popular': 'bg-secondary/10 text-secondary',
  'Scenic Route': 'bg-green-100 text-green-700',
  'Adventure Pick': 'bg-orange-100 text-orange-700',
  'Epic Journey': 'bg-purple-100 text-purple-700',
  'Romantic': 'bg-pink-100 text-pink-700',
  'Wellness': 'bg-teal-100 text-teal-700',
  'Thrill Seeker': 'bg-red-100 text-red-700',
  'Family Choice': 'bg-blue-100 text-blue-700',
  'Expert Led': 'bg-indigo-100 text-indigo-700',
};

const PackageCard = ({ pkg }) => {
  const {
    id, name, tagline, image, duration, durationUnit,
    groupSize, price, originalPrice, currency, category,
    rating, reviewCount, highlights, badge,
  } = pkg;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <Link to={`/packages/${id}`} className="card group block">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-50" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`badge text-xs ${badgeColors[badge] || 'bg-gray-100 text-gray-600'}`}>
              <FiTag className="text-xs mr-1" />
              {badge}
            </span>
          </div>
        )}

        {/* Discount */}
        {discount && (
          <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-full font-inter">
            {discount}% OFF
          </div>
        )}

        {/* Duration overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-inter">
          <FiCalendar className="text-accent" />
          {duration} {durationUnit}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="badge-accent text-xs">{category}</span>
          <div className="flex items-center gap-1">
            <FiStar className="text-amber-400 text-xs fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700 font-inter">{rating}</span>
            <span className="text-xs text-gray-400 font-inter">({reviewCount})</span>
          </div>
        </div>

        <h3 className="font-bold font-poppins text-primary text-lg leading-tight mt-2 mb-1">
          {name}
        </h3>
        <p className="text-gray-500 text-sm font-inter mb-3 line-clamp-2">{tagline}</p>

        {/* Highlights */}
        <div className="flex flex-col gap-1 mb-4">
          {highlights?.slice(0, 2).map((h) => (
            <div key={h} className="flex items-center gap-2 text-xs text-gray-500 font-inter">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {h}
            </div>
          ))}
        </div>

        {/* Group Size */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-inter mb-4">
          <FiUsers className="text-xs" />
          {groupSize}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-poppins text-primary">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through font-inter">
                  ${originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400 font-inter">per person</span>
          </div>
          <div className="flex items-center gap-1.5 text-secondary text-sm font-semibold font-inter group-hover:gap-2.5 transition-all duration-200">
            View
            <FiArrowRight className="text-sm" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
