import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPackage, FiCalendar, FiMapPin, FiDollarSign,
  FiClock, FiCheckCircle, FiXCircle, FiAlertCircle,
  FiFilter, FiArrowRight, FiDownload,
} from 'react-icons/fi';

const allBookings = [
  {
    id: 'BK-2025-001',
    type: 'package',
    name: 'Cultural Triangle Explorer',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    destination: 'Sigiriya, Dambulla, Polonnaruwa',
    dates: 'Apr 12 – Apr 16, 2025',
    guests: 2,
    nights: 5,
    price: 1098,
    status: 'upcoming',
    bookingDate: 'Jan 15, 2025',
    refNo: 'NIP-25-CTE-001',
  },
  {
    id: 'BK-2025-002',
    type: 'hotel',
    name: '98 Acres Resort & Spa',
    image: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=400&q=80',
    destination: 'Ella, Uva Province',
    dates: 'Mar 5 – Mar 8, 2025',
    guests: 2,
    nights: 3,
    price: 585,
    status: 'upcoming',
    bookingDate: 'Dec 20, 2024',
    refNo: 'NIP-25-98A-002',
  },
  {
    id: 'BK-2024-003',
    type: 'package',
    name: 'South Coast Beach Escape',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=400&q=80',
    destination: 'Galle, Mirissa, Tangalle',
    dates: 'Feb 3 – Feb 9, 2025',
    guests: 2,
    nights: 7,
    price: 1398,
    status: 'completed',
    bookingDate: 'Nov 10, 2024',
    refNo: 'NIP-25-SCB-003',
  },
  {
    id: 'BK-2024-004',
    type: 'hotel',
    name: 'Heritance Kandalama',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
    destination: 'Dambulla, Central Province',
    dates: 'Dec 20 – Dec 23, 2024',
    guests: 2,
    nights: 3,
    price: 840,
    status: 'completed',
    bookingDate: 'Oct 5, 2024',
    refNo: 'NIP-24-HK-004',
  },
  {
    id: 'BK-2024-005',
    type: 'package',
    name: 'Hill Country Tea Trail',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=400&q=80',
    destination: 'Kandy, Ella, Nuwara Eliya',
    dates: 'Sep 14 – Sep 19, 2024',
    guests: 1,
    nights: 6,
    price: 620,
    status: 'completed',
    bookingDate: 'Jul 22, 2024',
    refNo: 'NIP-24-HCT-005',
  },
  {
    id: 'BK-2024-006',
    type: 'package',
    name: 'Wildlife Safari Adventure',
    image: 'https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=400&q=80',
    destination: 'Yala, Udawalawe',
    dates: 'Jun 1 – Jun 5, 2024',
    guests: 2,
    nights: 5,
    price: 1590,
    status: 'cancelled',
    bookingDate: 'Apr 3, 2024',
    refNo: 'NIP-24-WSA-006',
  },
];

const statusConfig = {
  upcoming: { label: 'Upcoming', icon: <FiClock />, cls: 'bg-secondary/10 text-secondary border-secondary/20' },
  completed: { label: 'Completed', icon: <FiCheckCircle />, cls: 'bg-success/10 text-success border-success/20' },
  cancelled: { label: 'Cancelled', icon: <FiXCircle />, cls: 'bg-red-100 text-red-500 border-red-200' },
};

const filterTabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeTab === 'All'
    ? allBookings
    : allBookings.filter((b) => b.status === activeTab.toLowerCase());

  const totalSpent = allBookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-secondary-800">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-gray-400 font-inter text-sm mb-1">My Account</p>
              <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">My Bookings</h1>
              <p className="text-gray-400 font-inter text-sm mt-1">
                {allBookings.length} total bookings · ${totalSpent.toLocaleString()} spent
              </p>
            </div>
            <Link to="/packages" className="btn-accent text-sm flex items-center gap-2">
              <FiPackage /> Book New Trip
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Upcoming', count: allBookings.filter(b => b.status === 'upcoming').length, color: 'text-secondary' },
              { label: 'Completed', count: allBookings.filter(b => b.status === 'completed').length, color: 'text-success' },
              { label: 'Cancelled', count: allBookings.filter(b => b.status === 'cancelled').length, color: 'text-red-400' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold font-poppins ${s.color}`}>{s.count}</p>
                <p className="text-white/60 text-xs font-inter mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <FiFilter className="text-gray-400 shrink-0" />
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-secondary text-white shadow-glow-blue'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                }`}
              >
                {tab}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {tab === 'All' ? allBookings.length : allBookings.filter(b => b.status === tab.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-card">
              <FiPackage className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold font-poppins text-primary text-xl mb-2">No bookings found</h3>
              <p className="text-gray-400 font-inter mb-6">You don't have any {activeTab.toLowerCase()} bookings.</p>
              <Link to="/packages" className="btn-primary">Explore Packages</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((booking) => {
                const sc = statusConfig[booking.status];
                const isExpanded = expandedId === booking.id;
                return (
                  <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                    {/* Main Row */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 p-5">
                      <img
                        src={booking.image}
                        alt={booking.name}
                        className="w-full sm:w-24 h-36 sm:h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`badge border text-xs ${sc.cls}`}>
                                {sc.icon} <span className="ml-1">{sc.label}</span>
                              </span>
                              <span className="text-gray-400 text-xs font-inter">{booking.type === 'package' ? '📦 Package' : '🏨 Hotel'}</span>
                            </div>
                            <h3 className="font-bold font-poppins text-primary">{booking.name}</h3>
                            <div className="flex flex-wrap gap-3 mt-1.5">
                              <span className="flex items-center gap-1 text-xs text-gray-500 font-inter">
                                <FiMapPin className="text-accent text-xs" />{booking.destination}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-gray-500 font-inter">
                                <FiCalendar className="text-xs" />{booking.dates}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xl font-bold font-poppins text-primary">${booking.price}</p>
                            <p className="text-gray-400 text-xs font-inter">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="border-t border-gray-50 px-5 py-3 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                        className="text-secondary text-sm font-inter font-medium hover:underline"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>
                      <div className="flex items-center gap-2">
                        {booking.status === 'upcoming' && (
                          <button className="text-red-500 text-xs font-inter hover:underline">Cancel</button>
                        )}
                        <button className="flex items-center gap-1.5 text-gray-500 text-xs font-inter hover:text-secondary transition-colors">
                          <FiDownload className="text-xs" /> Receipt
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: 'Booking Ref', value: booking.refNo },
                          { label: 'Booked On', value: booking.bookingDate },
                          { label: 'Duration', value: `${booking.nights} nights` },
                          { label: 'Total Paid', value: `$${booking.price}` },
                        ].map((d) => (
                          <div key={d.label}>
                            <p className="text-xs text-gray-400 font-inter mb-0.5">{d.label}</p>
                            <p className="text-sm font-semibold font-poppins text-primary">{d.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-10 bg-gradient-to-br from-secondary-800 to-primary rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold font-poppins text-white mb-2">Ready for Your Next Adventure?</h3>
            <p className="text-gray-300 font-inter text-sm mb-5">Discover new destinations and exclusive deals tailored for you.</p>
            <Link to="/packages" className="btn-accent inline-flex items-center gap-2">
              Explore Packages <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBookings;
