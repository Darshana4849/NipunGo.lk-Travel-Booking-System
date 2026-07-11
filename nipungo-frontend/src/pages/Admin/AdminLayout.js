import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  FiGrid, FiMapPin, FiHome, FiPackage,
  FiMenu, FiX, FiGlobe, FiLogOut, FiChevronRight,
} from 'react-icons/fi';

const sideLinks = [
  { label: 'Dashboard',    path: '/admin',             icon: <FiGrid />,    exact: true },
  { label: 'Destinations', path: '/admin/destinations', icon: <FiMapPin /> },
  { label: 'Hotels',       path: '/admin/hotels',       icon: <FiHome /> },
  { label: 'Packages',     path: '/admin/packages',     icon: <FiPackage /> },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  const userStr = localStorage.getItem('nipungo_user');
  const user = userStr ? JSON.parse(userStr) : {};

  const handleLogout = () => {
    localStorage.removeItem('nipungo_token');
    localStorage.removeItem('nipungo_refresh');
    localStorage.removeItem('nipungo_user');
    navigate('/welcome');
  };

  const isActive = (path, exact) =>
    exact ? pathname === path : pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary flex flex-col transition-transform duration-300
        ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
            <FiGlobe className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold font-poppins text-lg leading-none">NIPUNGO</p>
            <p className="text-white/40 text-xs font-inter">Admin Panel</p>
          </div>
          <button onClick={() => setSideOpen(false)} className="ml-auto text-white/40 hover:text-white lg:hidden">
            <FiX />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sideLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSideOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter font-medium transition-all duration-200 ${
                isActive(link.path, link.exact)
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
              {isActive(link.path, link.exact) && (
                <FiChevronRight className="ml-auto text-accent text-xs" />
              )}
            </Link>
          ))}
        </nav>

        {/* User + Actions */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-xs font-bold font-poppins">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-poppins font-semibold truncate">{user.firstName} {user.lastName}</p>
              <p className="text-white/40 text-xs font-inter truncate">{user.email}</p>
            </div>
          </div>
          <Link to="/home" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-inter text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <FiGlobe /> View Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-inter text-red-400 hover:bg-red-500/10 transition-all">
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sideOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setSideOpen(true)} className="lg:hidden text-gray-500 hover:text-primary">
            <FiMenu className="text-xl" />
          </button>
          <div className="flex items-center gap-2 text-sm font-inter text-gray-400">
            <span>Admin</span>
            <FiChevronRight className="text-xs" />
            <span className="text-primary font-medium capitalize">
              {pathname.split('/').filter(Boolean).pop() || 'Dashboard'}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
