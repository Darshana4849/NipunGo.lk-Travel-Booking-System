import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiGlobe, FiUser, FiChevronDown,
  FiMapPin, FiHome, FiPackage, FiPhone, FiGrid,
} from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/', icon: <FiHome /> },
  { label: 'Destinations', path: '/destinations', icon: <FiMapPin /> },
  { label: 'Hotels', path: '/hotels', icon: <FiGlobe /> },
  { label: 'Packages', path: '/packages', icon: <FiPackage /> },
  { label: 'About', path: '/about', icon: <FiGrid /> },
  { label: 'Contact', path: '/contact', icon: <FiPhone /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-nav border-b border-gray-100'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:shadow-glow-blue transition-all duration-300">
              <FiGlobe className="text-white text-lg" />
            </div>
            <div>
              <span
                className={`text-xl font-bold font-poppins tracking-tight transition-colors duration-300 ${
                  isTransparent ? 'text-white' : 'text-primary'
                }`}
              >
                NIPUNGO
              </span>
              <p
                className={`text-xs font-inter leading-none transition-colors duration-300 ${
                  isTransparent ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                Plan. Book. Explore.
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium font-inter transition-all duration-200 ${
                    isActive
                      ? isTransparent
                        ? 'text-white bg-white/20'
                        : 'text-secondary bg-secondary/10'
                      : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium font-inter rounded-lg transition-all duration-200 ${
                isTransparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
              }`}
            >
              <FiUser className="text-base" />
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-sm px-5 py-2.5">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-primary hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-gray-100`}
      >
        <div className="container-custom py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter transition-all duration-200 ${
                  isActive
                    ? 'text-secondary bg-secondary/10'
                    : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium font-inter text-gray-600 hover:text-secondary hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              <FiUser />
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-sm text-center">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
