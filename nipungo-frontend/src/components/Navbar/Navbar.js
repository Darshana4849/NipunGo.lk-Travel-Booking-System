import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu, FiX, FiGlobe, FiMapPin, FiHome,
  FiPackage, FiPhone, FiGrid, FiUser,
  FiLogOut, FiBookOpen, FiSettings, FiChevronDown,
  FiShield,
} from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/home', icon: <FiHome /> },
  { label: 'Destinations', path: '/destinations', icon: <FiMapPin /> },
  { label: 'Hotels', path: '/hotels', icon: <FiGlobe /> },
  { label: 'Packages', path: '/packages', icon: <FiPackage /> },
  { label: 'About', path: '/about', icon: <FiGrid /> },
  { label: 'Contact', path: '/contact', icon: <FiPhone /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isHome = pathname === '/home';
  const isTransparent = isHome && !scrolled;

  const userStr = localStorage.getItem('nipungo_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setShowAccount(false); }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowAccount(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nipungo_token');
    localStorage.removeItem('nipungo_refresh');
    localStorage.removeItem('nipungo_user');
    navigate('/welcome');
  };

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-nav border-b border-gray-100'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
              <FiGlobe className="text-white text-lg" />
            </div>
            <div>
              <span className={`text-xl font-bold font-poppins tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary'}`}>
                NIPUNGO
              </span>
              <p className={`text-xs font-inter leading-none transition-colors duration-300 ${isTransparent ? 'text-white/70' : 'text-gray-400'}`}>
                Plan. Book. Explore.
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium font-inter transition-all duration-200 ${
                    isActive
                      ? isTransparent ? 'text-white bg-white/20' : 'text-secondary bg-secondary/10'
                      : isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Account Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowAccount(!showAccount)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-xs font-bold font-poppins">
                    {initials}
                  </div>
                  <span className="text-sm font-medium font-inter">{user.firstName}</span>
                  <FiChevronDown className={`text-xs transition-transform duration-200 ${showAccount ? 'rotate-180' : ''}`} />
                </button>

                {showAccount && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-gray-100 overflow-hidden animate-slide-down">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="font-semibold font-poppins text-primary text-sm">{user.firstName} {user.lastName}</p>
                      <p className="text-gray-400 font-inter text-xs truncate">{user.email}</p>
                      {isAdmin && <span className="badge-primary text-xs mt-1 inline-block">Admin</span>}
                    </div>

                    <div className="py-1">
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-inter text-gray-600 hover:bg-gray-50 hover:text-secondary transition-colors">
                        <FiGrid className="text-gray-400" /> Dashboard
                      </Link>
                      <Link to="/bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-inter text-gray-600 hover:bg-gray-50 hover:text-secondary transition-colors">
                        <FiBookOpen className="text-gray-400" /> My Bookings
                      </Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-inter text-gray-600 hover:bg-gray-50 hover:text-secondary transition-colors">
                        <FiSettings className="text-gray-400" /> Edit Profile
                      </Link>
                      {/* Admin Panel Link */}
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-inter text-accent hover:bg-accent/5 transition-colors">
                          <FiShield className="text-accent" /> Admin Panel
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-inter text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={`flex items-center gap-2 px-4 py-2 text-sm font-medium font-inter rounded-lg transition-all duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
                }`}>
                  <FiUser className="text-base" /> Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2.5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-gray-100'
            }`}
          >
            {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} bg-white border-t border-gray-100`}>
        <div className="container-custom py-4 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter transition-all duration-200 ${
                  isActive ? 'text-secondary bg-secondary/10' : 'text-gray-600 hover:text-secondary hover:bg-gray-50'
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-sm font-bold font-poppins">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold font-poppins text-primary text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-xs font-inter">{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter text-gray-600 hover:bg-gray-50"><FiGrid /> Dashboard</Link>
                <Link to="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter text-gray-600 hover:bg-gray-50"><FiBookOpen /> My Bookings</Link>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter text-gray-600 hover:bg-gray-50"><FiSettings /> Edit Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter text-accent hover:bg-accent/5"><FiShield /> Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter text-red-500 hover:bg-red-50">
                  <FiLogOut /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium font-inter text-gray-600 hover:text-secondary hover:bg-gray-50 rounded-xl">
                  <FiUser /> Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm text-center">Get Started Free</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
