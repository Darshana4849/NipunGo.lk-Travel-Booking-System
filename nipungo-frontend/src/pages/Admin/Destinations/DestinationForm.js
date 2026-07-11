import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { destinationsAPI } from '../../../services/api';

const CATEGORIES = ['Heritage', 'Nature', 'Beach', 'Wildlife', 'Culture', 'Hill Country'];

const EMPTY = {
  name: '', district: '', description: '', imageUrl: '',
  category: 'Heritage', tagline: '', bestTime: '', duration: '',
  rating: '', reviewCount: '', featured: false,
};

const DestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    destinationsAPI.getById(id)
      .then(res => {
        const d = res.data.data;
        setForm({
          name: d.name || '', district: d.district || '',
          description: d.description || '', imageUrl: d.imageUrl || '',
          category: d.category || 'Heritage', tagline: d.tagline || '',
          bestTime: d.bestTime || '', duration: d.duration || '',
          rating: d.rating || '', reviewCount: d.reviewCount || '',
          featured: d.featured || false,
        });
      })
      .catch(() => setServerError('Failed to load destination.'))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.district.trim()) errs.district = 'District is required.';
    if (!form.category) errs.category = 'Category is required.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const payload = {
        ...form,
        rating: form.rating ? parseFloat(form.rating) : 0,
        reviewCount: form.reviewCount ? parseInt(form.reviewCount) : 0,
      };
      if (isEdit) await destinationsAPI.update(id, payload);
      else await destinationsAPI.create(payload);
      setSuccess(true);
      setTimeout(() => navigate('/admin/destinations'), 1000);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save destination.');
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="text-center py-20 text-gray-400 font-inter">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/destinations')} className="text-gray-400 hover:text-primary transition-colors">
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-poppins text-primary">
            {isEdit ? 'Edit Destination' : 'Add New Destination'}
          </h1>
          <p className="text-gray-500 font-inter text-sm">
            {isEdit ? 'Update destination details' : 'Create a new Sri Lanka destination'}
          </p>
        </div>
      </div>

      {serverError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm font-inter">
          <FiAlertCircle className="shrink-0" />{serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Name <span className="text-red-400">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sigiriya"
              className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-inter flex items-center gap-1"><FiAlertCircle className="text-xs" />{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">District <span className="text-red-400">*</span></label>
            <input name="district" value={form.district} onChange={handleChange} placeholder="e.g. Matale"
              className={`input-field ${errors.district ? 'border-red-400' : ''}`} />
            {errors.district && <p className="text-red-500 text-xs mt-1 font-inter flex items-center gap-1"><FiAlertCircle className="text-xs" />{errors.district}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Category <span className="text-red-400">*</span></label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Tagline</label>
          <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="e.g. The Eighth Wonder of the World" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4}
            placeholder="Describe this destination..." className="input-field resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="input-field" />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl"
              onError={e => e.target.style.display = 'none'} />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Best Time to Visit</label>
            <input name="bestTime" value={form.bestTime} onChange={handleChange} placeholder="e.g. December to April" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Recommended Duration</label>
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 1-2 days" className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Rating (0.0 – 5.0)</label>
            <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} placeholder="4.9" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Review Count</label>
            <input name="reviewCount" type="number" min="0" value={form.reviewCount} onChange={handleChange} placeholder="1250" className="input-field" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-secondary" />
          <label htmlFor="featured" className="text-sm font-medium font-inter text-gray-700 cursor-pointer">
            Show as Featured Destination on Home page
          </label>
        </div>

        <button type="submit" disabled={loading || success}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-poppins transition-all disabled:opacity-70 ${success ? 'bg-success text-white' : 'btn-primary'}`}>
          {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : success ? <><FiCheck /> Saved!</>
            : <><FiSave /> {isEdit ? 'Update Destination' : 'Add Destination'}</>}
        </button>
      </form>
    </div>
  );
};

export default DestinationForm;
