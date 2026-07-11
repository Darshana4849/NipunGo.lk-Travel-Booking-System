import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiHome, FiPackage, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { destinationsAPI, hotelsAPI, packagesAPI } from '../../services/api';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ destinations: 0, hotels: 0, packages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [d, h, p] = await Promise.all([
          destinationsAPI.getAll(),
          hotelsAPI.getAll(),
          packagesAPI.getAll(),
        ]);
        setCounts({
          destinations: d.data.data?.length || 0,
          hotels:       h.data.data?.length || 0,
          packages:     p.data.data?.length || 0,
        });
      } catch (err) {
        console.error('Failed to fetch counts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: 'Destinations', count: counts.destinations, icon: <FiMapPin className="text-2xl" />, path: '/admin/destinations', color: 'bg-secondary/10 text-secondary' },
    { label: 'Hotels',       count: counts.hotels,       icon: <FiHome    className="text-2xl" />, path: '/admin/hotels',       color: 'bg-accent/10 text-accent'       },
    { label: 'Packages',     count: counts.packages,     icon: <FiPackage className="text-2xl" />, path: '/admin/packages',     color: 'bg-success/10 text-success'     },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-poppins text-primary">Admin Dashboard</h1>
        <p className="text-gray-500 font-inter text-sm mt-1">Manage your NIPUNGO travel content</p>
      </div>

      {/* Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <p className="text-3xl font-bold font-poppins text-primary mb-1">
              {loading ? '...' : card.count}
            </p>
            <p className="text-gray-500 font-inter text-sm mb-4">{card.label}</p>
            <Link to={card.path} className="flex items-center gap-2 text-secondary text-sm font-inter font-medium hover:gap-3 transition-all">
              Manage <FiArrowRight className="text-xs" />
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <FiTrendingUp className="text-secondary text-lg" />
          <h2 className="font-bold font-poppins text-primary">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/admin/destinations/new" className="btn-primary text-center text-sm">+ Add Destination</Link>
          <Link to="/admin/hotels/new"       className="btn-accent  text-center text-sm">+ Add Hotel</Link>
          <Link to="/admin/packages/new"     className="btn-secondary text-center text-sm">+ Add Package</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
