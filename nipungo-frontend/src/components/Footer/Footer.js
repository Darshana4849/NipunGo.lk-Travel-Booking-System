import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiGlobe, FiMail, FiPhone, FiMapPin,
  FiInstagram, FiFacebook, FiTwitter, FiYoutube,
  FiArrowRight,
} from 'react-icons/fi';

const footerLinks = {
  Explore: [
    { label: 'Destinations', path: '/destinations' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Packages', path: '/packages' },
    { label: 'About Us', path: '/about' },
  ],
  Support: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'My Bookings', path: '/bookings' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Sign In', path: '/login' },
  ],
  Destinations: [
    { label: 'Sigiriya', path: '/destinations/1' },
    { label: 'Ella', path: '/destinations/2' },
    { label: 'Kandy', path: '/destinations/4' },
    { label: 'Mirissa', path: '/destinations/5' },
  ],
};

const socialLinks = [
  { icon: <FiInstagram />, href: '#', label: 'Instagram' },
  { icon: <FiFacebook />, href: '#', label: 'Facebook' },
  { icon: <FiTwitter />, href: '#', label: 'Twitter' },
  { icon: <FiYoutube />, href: '#', label: 'YouTube' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
                <FiGlobe className="text-white text-lg" />
              </div>
              <div>
                <span className="text-xl font-bold font-poppins">NIPUNGO</span>
                <p className="text-xs text-white/50 font-inter">Plan. Book. Explore.</p>
              </div>
            </Link>
            <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6 max-w-sm">
              Sri Lanka's premier AI-powered travel booking platform. We connect you with the island's finest destinations, hotels, and curated experiences.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+94112345678" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm font-inter">
                <FiPhone className="text-accent shrink-0" />
                +94 11 234 5678
              </a>
              <a href="mailto:hello@nipungo.lk" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm font-inter">
                <FiMail className="text-accent shrink-0" />
                hello@nipungo.lk
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm font-inter">
                <FiMapPin className="text-accent shrink-0" />
                123 Galle Road, Colombo 03, Sri Lanka
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 hover:text-accent text-gray-400 flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold font-poppins mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent text-sm font-inter transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-inter">
            © {currentYear} NIPUNGO. All rights reserved. Built with ❤️ for Sri Lanka.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 hover:text-gray-300 text-xs font-inter transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
