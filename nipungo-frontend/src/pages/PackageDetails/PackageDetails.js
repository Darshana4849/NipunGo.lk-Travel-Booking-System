import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiCalendar, FiUsers, FiCheck, FiX,
  FiStar, FiChevronRight, FiMapPin, FiTag, FiChevronDown,
} from 'react-icons/fi';
import { getPackageById } from '../../data/packages';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = getPackageById(id);
  const [guests, setGuests] = useState(2);
  const [openDay, setOpenDay] = useState(1);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <h2 className="text-2xl font-bold font-poppins text-primary">Package Not Found</h2>
        <Link to="/packages" className="btn-primary">Browse Packages</Link>
      </div>
    );
  }

  const total = pkg.price * guests;
  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : null;

  return (
    <>
      <div className="pt-24 pb-4 bg-white border-b border-gray-100">
        <div className="container-custom flex items-center gap-2 text-sm font-inter text-gray-500">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <FiChevronRight className="text-xs" />
          <Link to="/packages" className="hover:text-secondary">Packages</Link>
          <FiChevronRight className="text-xs" />
          <span className="text-primary font-medium line-clamp-1">{pkg.name}</span>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-secondary font-inter text-sm mb-6 transition-colors">
                <FiArrowLeft /> Back
              </button>

              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-6">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-card" />
                {pkg.badge && (
                  <div className="absolute top-4 left-4 badge bg-white text-primary text-sm font-semibold px-3 py-1.5">
                    <FiTag className="text-secondary mr-1.5" />{pkg.badge}
                  </div>
                )}
                {discount && (
                  <div className="absolute top-4 right-4 bg-success text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    {discount}% OFF
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">{pkg.name}</h1>
                    <p className="text-white/80 font-inter text-sm mt-1">{pkg.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: <FiCalendar />, label: 'Duration', value: `${pkg.duration} ${pkg.durationUnit}` },
                  { icon: <FiUsers />, label: 'Group Size', value: pkg.groupSize },
                  { icon: <FiStar />, label: 'Rating', value: `${pkg.rating} (${pkg.reviewCount})` },
                  { icon: <FiMapPin />, label: 'Difficulty', value: pkg.difficulty },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-card">
                    <div className="flex items-center gap-1.5 text-accent text-sm mb-1">{item.icon}<span className="text-gray-400 text-xs font-inter">{item.label}</span></div>
                    <p className="text-primary text-sm font-medium font-inter">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-3">About This Package</h2>
                <p className="text-gray-600 font-inter leading-relaxed mb-4">{pkg.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations?.map((d) => (
                    <span key={d} className="badge-accent text-xs">{d}</span>
                  ))}
                </div>
              </div>

              {/* Includes / Excludes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                  <h3 className="font-bold font-poppins text-primary mb-4 flex items-center gap-2">
                    <FiCheck className="text-success" /> What's Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.priceIncludes?.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm font-inter text-gray-600">
                        <FiCheck className="text-success shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                  <h3 className="font-bold font-poppins text-primary mb-4 flex items-center gap-2">
                    <FiX className="text-red-400" /> Not Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.priceExcludes?.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm font-inter text-gray-500">
                        <FiX className="text-red-400 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-4">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights?.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-accent text-xs" />
                      </div>
                      <span className="text-gray-600 text-sm font-inter">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                <h2 className="text-xl font-bold font-poppins text-primary mb-5">Day-by-Day Itinerary</h2>
                <div className="space-y-3">
                  {pkg.itinerary?.map((day) => (
                    <div key={day.day} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center text-xs font-bold font-poppins shrink-0">
                            {day.day}
                          </span>
                          <div className="text-left">
                            <p className="font-semibold font-poppins text-primary text-sm">{day.title}</p>
                          </div>
                        </div>
                        <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${openDay === day.day ? 'rotate-180' : ''}`} />
                      </button>
                      {openDay === day.day && (
                        <div className="px-4 pb-4 text-gray-600 font-inter text-sm leading-relaxed border-t border-gray-50 pt-3">
                          {day.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card sticky top-24">
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold font-poppins text-primary">${pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-gray-400 line-through font-inter text-sm">${pkg.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm font-inter">per person</span>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium font-inter text-gray-600 mb-2">Number of Guests</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">−</button>
                    <span className="font-semibold font-poppins text-primary w-6 text-center">{guests}</span>
                    <button onClick={() => setGuests(guests + 1)} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">+</button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm font-inter text-gray-600">
                    <span>${pkg.price} × {guests} guests</span>
                    <span>${total}</span>
                  </div>
                  {discount && (
                    <div className="flex justify-between text-sm font-inter text-success">
                      <span>Savings ({discount}% off)</span>
                      <span>-${(pkg.originalPrice - pkg.price) * guests}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold font-poppins text-primary">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <Link to="/register" className="btn-primary w-full text-center block mb-3">
                  Book This Package
                </Link>
                <Link to="/contact" className="btn-secondary w-full text-center block text-sm">
                  Customize This Trip
                </Link>

                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                  {['Free cancellation up to 30 days', 'Instant confirmation', 'Best price guaranteed', '24/7 support included'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs font-inter text-gray-500">
                      <FiCheck className="text-success shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageDetails;
