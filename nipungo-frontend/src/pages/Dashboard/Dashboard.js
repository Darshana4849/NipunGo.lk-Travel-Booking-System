import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMapPin, FiCalendar, FiStar, FiPackage,
  FiTrendingUp, FiHeart, FiArrowRight, FiClock,
  FiDollarSign, FiUser, FiGrid, FiBell,
} from 'react-icons/fi';
import { destinations } from '../../data/destinations';
import { packages } from '../../data/packages';

const stats = [
  { label: 'Total Trips', value: '4', change: '+1 this year', icon: <FiMapPin />, color: 'bg-secondary/10 text-secondary' },
  { label: 'Upcoming', value: '2', change: 'Next: June 2025', icon: <FiCalendar />, color: 'bg-accent/10 text-accent' },
  { label: 'Total Spent', value: '$3,240', change: 'Across 4 bookings', icon: <FiDollarSign />, color: 'bg-success/10 text-success' },
  { label: 'Points Earned', value: '1,620', change: 'Silver Member', icon: <FiStar />, color: 'bg-amber-100 text-amber-600' },
];

const recentBookings = [
  { id: 'BK001', name: 'Cultural Triangle Explorer', date: 'Apr 12–16, 2025', status: 'upcoming', price: 1098 },
  { id: 'BK002', name: 'South Coast Beach Escape', date: 'Feb 3–9, 2025', status: 'completed', price: 1398 },
  { id: 'BK003', name: 'Heritance Kandalama · 3 nights', date: 'Dec 20–23, 2024', status: 'completed', price: 840 },
];

const statusStyles = {
  upcoming: 'bg-secondary/10 text-secondary',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-red-100 text-red-500',
};

const quickActions = [
  { label: 'Browse Destinations', path: '/destinations', icon: <FiMapPin />, color: 'bg-secondary' },
  { label: 'View Packages', path: '/packages', icon: <FiPackage />, color: 'bg-accent' },
  { label: 'My Bookings', path: '/bookings', icon: <FiGrid />, color: 'bg-success' },
  { label: 'Contact Support', path: '/contact', icon: <FiBell />, color: 'bg-amber-500' },
];

const Dashboard = () => {
  const wishlist = destinations.slice(0, 3);
  const recommended = packages.filter((p) => p.featured).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-secondary-800">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 font-inter text-sm mb-1">Welcome back 👋</p>
              <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">John Traveler</h1>
              <p className="text-gray-400 font-inter text-sm mt-1">Silver Member · Joined January 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contact" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-inter px-4 py-2 rounded-xl transition-all">
                <FiBell className="text-sm" /> Support
              </Link>
              <Link to="/register" className="btn-accent text-sm">
                <FiUser className="inline mr-2" />Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-2xl font-bold font-poppins text-primary">{s.value}</p>
                <p className="text-gray-500 text-sm font-inter mt-0.5">{s.label}</p>
                <p className="text-gray-400 text-xs font-inter mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-bold font-poppins text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((a) => (
                <Link
                  key={a.label}
                  to={a.path}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center gap-3 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${a.color} text-white flex items-center justify-center text-lg`}>
                    {a.icon}
                  </div>
                  <span className="text-sm font-medium font-inter text-gray-700">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-bold font-poppins text-primary">Recent Bookings</h2>
                <Link to="/bookings" className="text-secondary text-sm font-inter hover:underline flex items-center gap-1">
                  View all <FiArrowRight className="text-xs" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentBookings.map((b) => (
                  <div key={b.id} className="flex items-start sm:items-center justify-between gap-4 p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <FiPackage className="text-secondary text-sm" />
                      </div>
                      <div>
                        <p className="font-semibold font-poppins text-primary text-sm">{b.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <FiClock className="text-gray-400 text-xs" />
                          <span className="text-gray-400 text-xs font-inter">{b.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                      <span className={`badge text-xs ${statusStyles[b.status]}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                      <span className="font-bold font-poppins text-primary text-sm">${b.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Stats sidebar */}
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center text-white font-bold font-poppins text-lg">
                    JT
                  </div>
                  <div>
                    <p className="font-bold font-poppins text-primary">John Traveler</p>
                    <p className="text-gray-400 text-xs font-inter">john@example.com</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-600 font-inter">Member Status</p>
                    <p className="font-bold font-poppins text-amber-700">Silver Member ✦</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600 font-inter">Points</p>
                    <p className="font-bold font-poppins text-amber-700">1,620</p>
                  </div>
                </div>
              </div>

              {/* Wishlist Preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-bold font-poppins text-primary text-sm flex items-center gap-2">
                    <FiHeart className="text-red-400" /> Wishlist
                  </h3>
                  <Link to="/destinations" className="text-secondary text-xs font-inter hover:underline">View all</Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {wishlist.map((d) => (
                    <Link key={d.id} to={`/destinations/${d.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                      <img src={d.image} alt={d.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold font-poppins text-primary truncate">{d.name}</p>
                        <p className="text-xs text-gray-400 font-inter">{d.category}</p>
                      </div>
                      <FiArrowRight className="text-gray-300 shrink-0 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Packages */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-poppins text-primary flex items-center gap-2">
                <FiTrendingUp className="text-secondary" /> Recommended for You
              </h2>
              <Link to="/packages" className="text-secondary text-sm font-inter hover:underline flex items-center gap-1">
                Browse all <FiArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recommended.map((pkg) => (
                <Link key={pkg.id} to={`/packages/${pkg.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex gap-4 p-4">
                  <img src={pkg.image} alt={pkg.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold font-poppins text-primary text-sm truncate">{pkg.name}</p>
                    <p className="text-gray-400 text-xs font-inter mt-1">{pkg.duration} days · {pkg.category}</p>
                    <p className="text-secondary font-bold font-poppins mt-2">${pkg.price} <span className="text-gray-400 font-inter font-normal text-xs">/ person</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
