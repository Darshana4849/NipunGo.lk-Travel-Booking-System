import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiAlertCircle } from 'react-icons/fi';
import { packagesAPI } from '../../../services/api';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    packagesAPI.getAll()
      .then(res => setPackages(res.data.data || []))
      .catch(() => setError('Failed to load packages.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await packagesAPI.delete(id);
      setPackages(prev => prev.filter(p => p.id !== id));
      setDeleteId(null);
    } catch { setError('Failed to delete package.'); }
  };

  const filtered = packages.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-primary">Packages</h1>
          <p className="text-gray-500 font-inter text-sm mt-1">{packages.length} total</p>
        </div>
        <Link to="/admin/packages/new" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus /> Add Package
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm font-inter">
          <FiAlertCircle />{error}
        </div>
      )}

      <div className="relative mb-5">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search packages..." value={search}
          onChange={e => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-inter">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiPackage className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-inter mb-4">No packages found</p>
            <Link to="/admin/packages/new" className="btn-primary inline-flex items-center gap-2 text-sm">
              <FiPlus /> Add First Package
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Image','Title','Category','Duration','Price','Featured','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold font-inter text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <img src={pkg.imageUrl || 'https://via.placeholder.com/50'} alt={pkg.title}
                        className="w-12 h-10 rounded-lg object-cover" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold font-poppins text-primary text-sm">{pkg.title}</p>
                      <p className="text-gray-400 text-xs font-inter line-clamp-1">{pkg.tagline}</p>
                    </td>
                    <td className="px-4 py-3"><span className="badge-accent text-xs">{pkg.category}</span></td>
                    <td className="px-4 py-3 text-sm font-inter text-gray-500">{pkg.duration} {pkg.durationUnit}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold font-poppins text-primary">${pkg.price}</p>
                      {pkg.originalPrice && <p className="text-xs text-gray-400 line-through">${pkg.originalPrice}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge text-xs ${pkg.featured ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
                        {pkg.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigate(`/admin/packages/edit/${pkg.id}`)}
                          className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white flex items-center justify-center transition-all">
                          <FiEdit2 className="text-xs" />
                        </button>
                        <button onClick={() => setDeleteId(pkg.id)}
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

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-red-500 text-xl" />
            </div>
            <h3 className="text-lg font-bold font-poppins text-primary text-center mb-2">Delete Package?</h3>
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

export default AdminPackages;
