import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiMapPin, FiStar, FiClock, FiCalendar, FiDollarSign,
  FiArrowLeft, FiCheck, FiChevronRight, FiShare2, FiHeart,
} from 'react-icons/fi';
import { getDestinationById, destinations } from '../../data/destinations';
import DestinationCard from '../../components/DestinationCard/DestinationCard';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = getDestinationById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!dest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <FiMapPin className="text-5xl text-gray-300" />
        <h2 className="text-2xl font-bold font-poppins text-primary">Destination Not Found</h2>
        <p className="text-gray-500 font-inter">This destination doesn't exist or has been removed.</p>
        <Link to="/destinations" className="btn-primary">Browse Destinations</Link>
      </div>
    );
  }

  const allImages = [dest.image, ...(dest.gallery || [])];
  const related = destinations.filter((d) => d.id !== dest.id && d.category === dest.category).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-white border-b border-gray-100">
        <div className="container-custom flex items-center gap-2 text-sm font-inter text-gray-500">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <FiChevronRight className="text-xs" />
          <Link to="/destinations" className="hover:text-secondary transition-colors">Destinations</Link>
          <FiChevronRight className="text-xs" />
          <span className="text-primary font-medium">{dest.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — Main Content */}
            <div className="lg:col-span-2">
              {/* Back */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-secondary font-inter text-sm mb-6 transition-colors"
              >
                <FiArrowLeft /> Back
              </button>

              {/* Image Gallery */}
              <div className="mb-6">
                <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 mb-3">
                  <img
                    src={allImages[activeImage]}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                        liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <FiHeart className={liked ? 'fill-white' : ''} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-secondary transition-colors">
                      <FiShare2 />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="badge-primary">{dest.category}</span>
                  </div>
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden ring-2 transition-all ${
                          i === activeImage ? 'ring-secondary' : 'ring-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-poppins text-primary">{dest.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <FiMapPin className="text-accent text-sm" />
                    <span className="text-gray-500 font-inter text-sm">{dest.province}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 shrink-0">
                  <FiStar className="text-amber-400 fill-amber-400 text-sm" />
                  <span className="font-bold font-poppins text-amber-700">{dest.rating}</span>
                  <span className="text-amber-600 text-xs font-inter">({dest.reviewCount?.toLocaleString()})</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: <FiClock />, label: 'Duration', value: dest.duration },
                  { icon: <FiCalendar />, label: 'Best Time', value: dest.bestTime },
                  { icon: <FiMapPin />, label: 'Difficulty', value: dest.difficulty },
                  { icon: <FiDollarSign />, label: 'Entry', value: dest.entryFee },
                ].map((info) => (
                  <div key={info.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-card">
                    <div className="flex items-center gap-2 text-accent text-sm mb-1">{info.icon}<span className="text-gray-400 text-xs font-inter">{info.label}</span></div>
                    <p className="text-primary text-sm font-medium font-inter">{info.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-3">About {dest.name}</h2>
                <p className="text-gray-600 font-inter leading-relaxed">{dest.description}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-4">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.highlights?.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-success text-xs" />
                      </div>
                      <span className="text-gray-600 text-sm font-inter">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attractions */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card mb-6">
                <h2 className="text-xl font-bold font-poppins text-primary mb-4">Top Attractions</h2>
                <div className="space-y-4">
                  {dest.attractions?.map((a, i) => (
                    <div key={a.name} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 font-bold text-sm font-poppins">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold font-poppins text-primary text-sm mb-1">{a.name}</h4>
                        <p className="text-gray-500 text-sm font-inter">{a.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Book CTA */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card sticky top-24">
                <h3 className="font-bold font-poppins text-primary text-xl mb-2">Plan Your Visit</h3>
                <p className="text-gray-500 text-sm font-inter mb-5">Let our experts craft a personalized itinerary for {dest.name}.</p>
                <div className="space-y-3">
                  <Link to="/packages" className="btn-primary w-full text-center block">
                    View Packages
                  </Link>
                  <Link to="/contact" className="btn-secondary w-full text-center block">
                    Talk to an Expert
                  </Link>
                </div>
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                  {[
                    `Best time: ${dest.bestTime}`,
                    `Recommended: ${dest.duration}`,
                    `Entry: ${dest.entryFee}`,
                  ].map((info) => (
                    <div key={info} className="flex items-center gap-2 text-sm font-inter text-gray-500">
                      <FiCheck className="text-success shrink-0" />
                      {info}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold font-poppins text-primary mb-6">Similar Destinations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((d) => <DestinationCard key={d.id} destination={d} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DestinationDetails;
