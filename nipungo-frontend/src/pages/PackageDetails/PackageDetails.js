import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiArrowLeft, FiCalendar, FiUsers, FiCheck, FiX,
  FiStar, FiChevronRight, FiMapPin, FiTag, FiChevronDown,
} from 'react-icons/fi';
import { getPackageById } from '../../data/packages';
import { bookingsAPI } from '../../services/api';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pkg = getPackageById(id);

  const [guests, setGuests] = useState(2);
  const [openDay, setOpenDay] = useState(1);

  // Booking Modal state
  const [showBooking, setShowBooking] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <h2 className="text-2xl font-bold font-poppins text-primary">Package Not Found</h2>
        <Link to="/packages" className="btn-primary">Browse Packages</Link>
      </div>
    );
  }

  const total = pkg.price * guests;
  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null;

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleBookClick = () => {
    const user = localStorage.getItem('nipungo_user');
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    setShowBooking(true);
  };

  const handleCloseModal = () => {
    setShowBooking(false);
    setBookingError('');
    setBookingSuccess(false);
    setTravelDate('');
    setSpecialRequests('');
  };

  const handleConfirmBooking = async () => {
    if (!travelDate) {
      setBookingError('Travel date select කරන්න.');
      return;
    }
    setBookingLoading(true);
    setBookingError('');
    try {
      const response = await bookingsAPI.create({
        packageId: pkg.id,
        numberOfGuests: guests,
        travelDate: travelDate,
        specialRequests: specialRequests,
      });
      const ref = response.data?.data?.referenceNumber || '';
      setBookingRef(ref);
      setBookingSuccess(true);
    } catch (err) {
      setBookingError(
        err.response?.data?.message || 'Booking failed. Please try again.'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
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

            {/* Left Content */}
            <div className="lg:col-span-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-secondary font-inter text-sm mb-6 transition-colors"
              >
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
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">{pkg.name}</h1>
                  <p className="text-white/80 font-inter text-sm mt-1">{pkg.tagline}</p>
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
                    <div className="flex items-center gap-1.5 text-accent text-sm mb-1">
                      {item.icon}
                      <span className="text-gray-400 text-xs font-inter">{item.label}</span>
                    </div>
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
                          <p className="font-semibold font-poppins text-primary text-sm text-left">{day.title}</p>
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

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold font-poppins text-primary">${pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-gray-400 line-through font-inter text-sm">${pkg.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm font-inter">per person</span>
                </div>

                {/* Guests */}
                <div className="mb-5">
                  <label className="block text-sm font-medium font-inter text-gray-600 mb-2">Number of Guests</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">−</button>
                    <span className="font-semibold font-poppins text-primary w-6 text-center">{guests}</span>
                    <button onClick={() => setGuests(guests + 1)} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">+</button>
                  </div>
                </div>

                {/* Price Summary */}
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

                {/* Book Button */}
                <button
                  onClick={handleBookClick}
                  className="btn-primary w-full mb-3"
                >
                  Book This Package
                </button>
                <Link to="/contact" className="btn-secondary w-full text-center block text-sm">
                  Customize This Trip
                </Link>

                {/* Trust Badges */}
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

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-slide-up">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <FiX />
            </button>

            {bookingSuccess ? (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-success text-2xl" />
                </div>
                <h3 className="text-xl font-bold font-poppins text-primary mb-2">Booking Confirmed! 🎉</h3>
                {bookingRef && (
                  <div className="bg-secondary/10 rounded-xl px-4 py-2 mb-3 inline-block">
                    <p className="text-secondary font-bold font-poppins text-sm">{bookingRef}</p>
                  </div>
                )}
                <p className="text-gray-500 font-inter text-sm mb-6 leading-relaxed">
                  ඔයාගේ booking successfully submit වුනා!<br />
                  My Bookings page එකෙන් status check කරන්න.
                </p>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate('/bookings')} className="btn-primary w-full">
                    View My Bookings
                  </button>
                  <button onClick={handleCloseModal} className="btn-secondary w-full text-sm">
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <>
                <div className="mb-5">
                  <h3 className="text-xl font-bold font-poppins text-primary mb-1">Complete Your Booking</h3>
                  <p className="text-gray-500 font-inter text-sm line-clamp-1">{pkg.title}</p>
                </div>

                {bookingError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm font-inter flex items-start gap-2">
                    <FiX className="shrink-0 mt-0.5" />{bookingError}
                  </div>
                )}

                <div className="space-y-4 mb-5">
                  {/* Travel Date */}
                  <div>
                    <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">
                      Travel Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      min={tomorrow}
                      onChange={(e) => { setTravelDate(e.target.value); setBookingError(''); }}
                      className="input-field"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600">−</button>
                      <span className="font-semibold font-poppins text-primary w-6 text-center">{guests}</span>
                      <button onClick={() => setGuests(guests + 1)} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600">+</button>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">
                      Special Requests <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      placeholder="Dietary requirements, accessibility needs, etc."
                      className="input-field resize-none text-sm"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm font-inter text-gray-600">
                    <span>${pkg.price} × {guests} guests</span>
                    <span>${pkg.price * guests}</span>
                  </div>
                  {discount && (
                    <div className="flex justify-between text-sm font-inter text-success">
                      <span>Savings ({discount}% off)</span>
                      <span>-${(pkg.originalPrice - pkg.price) * guests}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold font-poppins text-primary">
                    <span>Total</span>
                    <span>${pkg.price * guests}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={bookingLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mb-2"
                >
                  {bookingLoading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><FiCheck /> Confirm Booking</>}
                </button>
                <button onClick={handleCloseModal} className="btn-secondary w-full text-sm">
                  Cancel
                </button>
                <p className="text-center text-xs text-gray-400 font-inter mt-3">
                  Free cancellation up to 30 days before travel date
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetails;