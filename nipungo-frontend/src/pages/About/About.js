import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTarget, FiEye, FiHeart, FiUsers, FiAward,
  FiGlobe, FiShield, FiStar, FiArrowRight,
} from 'react-icons/fi';

const stats = [
  { value: '10,000+', label: 'Happy Travelers', icon: <FiUsers /> },
  { value: '50+', label: 'Destinations', icon: <FiGlobe /> },
  { value: '4.9/5', label: 'Average Rating', icon: <FiStar /> },
  { value: '8 Years', label: 'Experience', icon: <FiAward /> },
];

const values = [
  {
    icon: <FiHeart className="text-2xl text-accent" />,
    title: 'Passion for Travel',
    desc: 'We are Sri Lankans who love our island deeply. Every itinerary is crafted with genuine passion and insider knowledge that only locals possess.',
  },
  {
    icon: <FiShield className="text-2xl text-accent" />,
    title: 'Trust & Transparency',
    desc: 'No hidden fees, no surprises. We believe in complete transparency at every step — from pricing to what\'s included in your experience.',
  },
  {
    icon: <FiUsers className="text-2xl text-accent" />,
    title: 'People First',
    desc: 'Our travelers are our family. We go beyond service delivery to create personal connections and memories that last a lifetime.',
  },
  {
    icon: <FiGlobe className="text-2xl text-accent" />,
    title: 'Sustainable Tourism',
    desc: 'We are committed to responsible travel that protects Sri Lanka\'s natural wonders, supports local communities, and preserves cultural heritage.',
  },
];

const team = [
  { name: 'Nipun Perera', role: 'Founder & CEO', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', bio: '15+ years in Sri Lanka tourism' },
  { name: 'Amara Silva', role: 'Head of Experiences', avatar: 'https://randomuser.me/api/portraits/women/29.jpg', bio: 'Expert in cultural heritage tours' },
  { name: 'Kasun Fernando', role: 'Chief Technology Officer', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', bio: 'Building the future of travel tech' },
  { name: 'Dilini Jayawardena', role: 'Customer Experience Lead', avatar: 'https://randomuser.me/api/portraits/women/48.jpg', bio: 'Ensuring every journey is perfect' },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-600 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full border border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiHeart className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-white mb-6">
            We Are <span className="gradient-text">NIPUNGO</span>
          </h1>
          <p className="text-gray-300 font-inter text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Born in Sri Lanka, built for the world — we're passionate travel experts on a mission to make the Pearl of the Indian Ocean accessible, affordable, and absolutely unforgettable for every traveler.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-3 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <div className="text-3xl font-bold font-poppins text-primary mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm font-inter">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
                <FiTarget className="text-secondary text-xs" />
                <span className="text-secondary text-xs font-semibold font-inter uppercase tracking-wide">Our Purpose</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary mb-6">
                Connecting You to the Soul of Sri Lanka
              </h2>
              <p className="text-gray-600 font-inter leading-relaxed mb-6">
                NIPUNGO was founded in 2016 by Nipun Perera, a Sri Lankan travel guide who noticed a gap between what tourists experienced and what the island truly had to offer. He believed that technology and local knowledge together could create something extraordinary.
              </p>
              <p className="text-gray-600 font-inter leading-relaxed mb-8">
                Today, NIPUNGO is Sri Lanka's most innovative travel platform — combining AI-powered personalization with deep local expertise to deliver journeys that go beyond the guidebook. We don't just book trips; we craft life-changing experiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                    <FiTarget className="text-secondary" />
                  </div>
                  <h4 className="font-semibold font-poppins text-primary mb-2">Our Mission</h4>
                  <p className="text-gray-500 text-sm font-inter leading-relaxed">
                    To make authentic Sri Lankan experiences accessible to every traveler through innovative technology and human expertise.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                    <FiEye className="text-accent" />
                  </div>
                  <h4 className="font-semibold font-poppins text-primary mb-2">Our Vision</h4>
                  <p className="text-gray-500 text-sm font-inter leading-relaxed">
                    To be the world's most trusted Sri Lanka travel platform and a beacon of sustainable, community-powered tourism.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"
                alt="About NIPUNGO"
                className="rounded-3xl w-full h-96 object-cover shadow-card-hover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-card-hover border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <FiAward className="text-success text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold font-poppins text-primary text-sm">#1 Sri Lanka Travel Platform</p>
                    <p className="text-gray-400 text-xs font-inter">Asia Travel Awards 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h4 className="font-semibold font-poppins text-primary mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm font-inter leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Meet Our Team</h2>
            <p className="section-subtitle">Passionate experts dedicated to your perfect journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center group hover:-translate-y-1 transition-transform duration-300">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 ring-4 ring-gray-100 group-hover:ring-accent/30 transition-all"
                />
                <h4 className="font-semibold font-poppins text-primary mb-1">{member.name}</h4>
                <p className="text-secondary text-sm font-inter mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs font-inter">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="text-gray-300 font-inter text-lg mb-8 max-w-xl mx-auto">
            Let our team craft your perfect Sri Lankan adventure. Start planning today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="btn-accent px-8 py-4 text-base">
              View Packages <FiArrowRight className="inline ml-2" />
            </Link>
            <Link to="/contact" className="btn-secondary px-8 py-4 text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
