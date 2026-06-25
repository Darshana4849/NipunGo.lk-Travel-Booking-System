import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiMapPin, FiShield, FiHeadphones,
  FiAward, FiZap,
} from 'react-icons/fi';

import HeroSection from '../../components/HeroSection/HeroSection';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import HotelCard from '../../components/HotelCard/HotelCard';
import PackageCard from '../../components/PackageCard/PackageCard';
import Testimonials from '../../components/Testimonials/Testimonials';
import Newsletter from '../../components/Newsletter/Newsletter';

import { getFeaturedDestinations } from '../../data/destinations';
import { getFeaturedHotels } from '../../data/hotels';
import { getFeaturedPackages } from '../../data/packages';

const features = [
  {
    icon: <FiZap className="text-2xl text-accent" />,
    title: 'AI-Powered Planning',
    desc: 'Get personalized itineraries and recommendations powered by advanced AI technology.',
  },
  {
    icon: <FiShield className="text-2xl text-accent" />,
    title: 'Secure Booking',
    desc: 'Your payments and personal data are protected with industry-leading encryption.',
  },
  {
    icon: <FiHeadphones className="text-2xl text-accent" />,
    title: '24/7 Support',
    desc: 'Our travel experts are available around the clock to assist you at any time.',
  },
  {
    icon: <FiAward className="text-2xl text-accent" />,
    title: 'Best Price Guarantee',
    desc: 'Found a lower price? We\'ll match it and give you an extra 5% off.',
  },
];

const SectionHeader = ({ badge, title, subtitle, cta, ctaPath }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
    <div>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5 mb-3">
          <FiMapPin className="text-secondary text-xs" />
          <span className="text-secondary text-xs font-semibold font-inter uppercase tracking-wide">{badge}</span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {cta && ctaPath && (
      <Link
        to={ctaPath}
        className="flex items-center gap-2 text-secondary font-semibold font-inter text-sm hover:gap-3 transition-all duration-200 shrink-0"
      >
        {cta} <FiArrowRight />
      </Link>
    )}
  </div>
);

const Home = () => {
  const featuredDests = getFeaturedDestinations();
  const featuredHotels = getFeaturedHotels().slice(0, 4);
  const featuredPackages = getFeaturedPackages().slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Features Strip */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-semibold font-poppins text-primary text-sm mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-xs font-inter leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Must-Visit Places"
            title="Popular Destinations"
            subtitle="Discover the most breathtaking locations across the Pearl of the Indian Ocean."
            cta="View All Destinations"
            ctaPath="/destinations"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDests.slice(0, 6).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Where to Stay"
            title="Featured Hotels"
            subtitle="Hand-picked luxury and boutique hotels for an unforgettable stay."
            cta="Browse All Hotels"
            ctaPath="/hotels"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Packages */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Curated Experiences"
            title="Travel Packages"
            subtitle="All-inclusive packages designed for every type of traveler."
            cta="View All Packages"
            ctaPath="/packages"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="section-padding bg-gradient-to-br from-secondary-800 via-primary to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiAward className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Sri Lanka's #1 Travel Platform</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-6 max-w-3xl mx-auto leading-tight">
            Start Your Sri Lanka Adventure Today
          </h2>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto mb-10">
            Join over 10,000 travelers who have discovered the magic of Sri Lanka with NIPUNGO. Your dream journey is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="btn-accent text-base px-8 py-4">
              Explore Packages
            </Link>
            <Link to="/contact" className="btn-secondary text-base px-8 py-4">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
