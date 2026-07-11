import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { destinationsAPI } from '../../../services/api';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await destinationsAPI.getAll();
        setDestinations(res.data.data || []);
      } catch { setError('Failed to load destinations.'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await destinationsAPI.delete(id);
      setDestinations(prev => prev.filter(d => d.id !== id));
      setDeleteId(null);
    } catch { setError('Failed to delete destination.'); }
  };

  const filtered = destinations.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.district?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-primary">Destinations</h1>
          <p className="text-gray-500 font-inter text-sm mt-1">{destinations.length} total</p>
        </div>
        <Link to="/admin/destinations/new" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus /> Add Destination
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm font-inter">
          <FiAlertCircle />{error}
        </div>
      )}

      <div className="relative mb-5">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search destinations..." value={search}
          onChange={e => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-inter">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiMapPin className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-inter mb-4">No destinations found</p>
            <Link to="/admin/destinations/new" className="btn-primary inline-flex items-center gap-2 text-sm">
              <FiPlus /> Add First Destination
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Image','Name','District','Category','Rating','Featured','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold font-inter text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(dest => (
                  <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <img src={dest.imageUrl || 'https://via.placeholder.com/50'} alt={dest.name}
                        className="w-12 h-10 rounded-lg object-cover" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold font-poppins text-primary text-sm">{dest.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-inter text-gray-500">{dest.district}</td>
                    <td className="px-4 py-3"><span className="badge-primary text-xs">{dest.category}</span></td>
                    <td className="px-4 py-3 text-sm font-inter text-gray-600">⭐ {dest.rating}</td>
                    <td className="px-4 py-3">
                      <span className={`badge text-xs ${dest.featured ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
                        {dest.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigate(`/admin/destinations/edit/${dest.id}`)}
                          className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white flex items-center justify-center transition-all">
                          <FiEdit2 className="text-xs" />
                        </button>
                        <button onClick={() => setDeleteId(dest.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                          <FiTrash2 className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-red-500 text-xl" />
            </div>
            <h3 className="text-lg font-bold font-poppins text-primary text-center mb-2">Delete Destination?</h3>
            <p className="text-gray-500 font-inter text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-xl transition-colors font-poppins">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;
