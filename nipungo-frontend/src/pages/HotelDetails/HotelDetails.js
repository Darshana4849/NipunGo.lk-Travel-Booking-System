import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiMapPin, FiStar, FiWifi, FiArrowLeft, FiCheck,
  FiChevronRight, FiHeart, FiShare2, FiCalendar,
  FiUsers, FiDollarSign,
} from 'react-icons/fi';
import { getHotelById } from '../../data/hotels';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <h2 className="text-2xl font-bold font-poppins text-primary">Hotel Not Found</h2>
        <Link to="/hotels" className="btn-primary">Browse Hotels</Link>
      </div>
    );
  }

  const allImages = [hotel.image, ...(hotel.gallery || [])];
  const room = selectedRoom ?? hotel.roomTypes?.[0];
  const total = (room?.price ?? hotel.pricePerNight) * nights;

  const StarRow = ({ count }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} className={`text-sm ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );

  return (
    <>
      <div className="pt-24 pb-4 bg-white border-b border-gray-100">
        <div className="container-custom flex items-center gap-2 text-sm font-inter text-gray-500">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <FiChevronRight className="text-xs" />
          <Link to="/hotels" className="hover:text-secondary">Hotels</Link>
          <FiChevronRight className="text-xs" />
          <span className="text-primary font-medium">{hotel.name}</span>
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

              {/* Gallery */}
              <div className="mb-6">
                <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 mb-3">
                  <img src={allImages[activeImage]} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => setLiked(!liked)} className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'}`}>
                      <FiHeart className={liked ? 'fill-white' : ''} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-secondary">
                      <FiShare2 />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden ring-2 transition-all ${i === activeImage ? 'ring-secondary' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Header */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <StarRow count={hotel.stars} />
                    <h1 className="text-3xl font-bold font-poppins text-primary mt-2">{hotel.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <FiMapPin className="text-accent text-sm" />
                      <span className="text-gray-500 font-inter text-sm">{hotel.location}, {hotel.province}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 shrink-0">
                    <FiStar className="text-amber-400 fill-amber-400 text-sm" />
                    <span className="font-bold font-poppins text-amber-700">{hotel.rating}</span>
                    <span className="text-amber-600 text-xs font-inter">({hotel.reviewCount})</span>
                  </div>
                </div>
                <p className="text-gray-600 font-inter leading-relaxed">{hotel.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities?.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm font-inter text-gray-600">
                      <FiCheck className="text-success shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                <h2 className="text-xl font-bold font-poppins text-primary mb-4">Room Types</h2>
                <div className="space-y-3">
                  {hotel.roomTypes?.map((r) => (
                    <button
                      key={r.type}
                      onClick={() => setSelectedRoom(r)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        room?.type === r.type ? 'border-secondary bg-secondary/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-semibold font-poppins text-primary">{r.type}</p>
                        <p className="text-gray-400 text-sm font-inter">Up to {r.maxGuests} guests</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold font-poppins text-primary">${r.price}</p>
                        <p className="text-gray-400 text-xs font-inter">per night</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card sticky top-24">
                <h3 className="font-bold font-poppins text-primary text-xl mb-1">Book Your Stay</h3>
                <p className="text-gray-400 text-sm font-inter mb-5">Check-in: {hotel.checkIn} · Check-out: {hotel.checkOut}</p>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium font-inter text-gray-600 mb-1.5">Nights</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">−</button>
                      <span className="font-semibold font-poppins text-primary w-6 text-center">{nights}</span>
                      <button onClick={() => setNights(nights + 1)} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-inter text-gray-600 mb-1.5">Guests</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">−</button>
                      <span className="font-semibold font-poppins text-primary w-6 text-center">{guests}</span>
                      <button onClick={() => setGuests(guests + 1)} className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold text-gray-600 transition-colors">+</button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm font-inter text-gray-600">
                    <span>${room?.price ?? hotel.pricePerNight} × {nights} nights</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-sm font-inter text-gray-600">
                    <span>Taxes & fees</span>
                    <span>${Math.round(total * 0.12)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold font-poppins text-primary">
                    <span>Total</span>
                    <span>${total + Math.round(total * 0.12)}</span>
                  </div>
                </div>

                <Link to="/register" className="btn-primary w-full text-center block mb-3">
                  Reserve Now
                </Link>
                <Link to="/contact" className="btn-secondary w-full text-center block text-sm">
                  Ask About Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelDetails;
