import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { packagesAPI } from '../../../services/api';

const CATEGORIES  = ['Heritage','Beach','Nature','Wildlife','Grand Tour','Romantic','Wellness','Adventure','Family','Photography'];
const DIFFICULTIES = ['Easy','Moderate','Easy to Moderate','Moderate to Challenging','Challenging'];
const BADGES       = ['','Best Seller','Most Popular','Scenic Route','Adventure Pick','Epic Journey','Romantic','Wellness','Thrill Seeker','Family Choice','Expert Led'];

const EMPTY = {
  title: '', tagline: '', description: '', duration: '',
  durationUnit: 'days', price: '', originalPrice: '', imageUrl: '',
  category: 'Heritage', difficulty: 'Easy', groupSize: '',
  badge: '', rating: '', reviewCount: '', featured: false, popular: false,
};

const PackageForm = () => {
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
    packagesAPI.getById(id)
      .then(res => {
        const p = res.data.data;
        setForm({
          title: p.title || '', tagline: p.tagline || '',
          description: p.description || '', duration: p.duration || '',
          durationUnit: p.durationUnit || 'days', price: p.price || '',
          originalPrice: p.originalPrice || '', imageUrl: p.imageUrl || '',
          category: p.category || 'Heritage', difficulty: p.difficulty || 'Easy',
          groupSize: p.groupSize || '', badge: p.badge || '',
          rating: p.rating || '', reviewCount: p.reviewCount || '',
          featured: p.featured || false, popular: p.popular || false,
        });
      })
      .catch(() => setServerError('Failed to load package data.'))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim())   errs.title    = 'Title is required.';
    if (!form.tagline.trim()) errs.tagline  = 'Tagline is required.';
    if (!form.duration)       errs.duration = 'Duration is required.';
    if (!form.price)          errs.price    = 'Price is required.';
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
        duration:      parseInt(form.duration),
        price:         parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        rating:        form.rating        ? parseFloat(form.rating)        : 0,
        reviewCount:   form.reviewCount   ? parseInt(form.reviewCount)     : 0,
      };
      if (isEdit) await packagesAPI.update(id, payload);
      else        await packagesAPI.create(payload);
      setSuccess(true);
      setTimeout(() => navigate('/admin/packages'), 1000);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save package.');
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="text-center py-20 text-gray-400 font-inter">Loading...</div>;

  const Err = ({ name }) => errors[name]
    ? <p className="text-red-500 text-xs mt-1 font-inter flex items-center gap-1"><FiAlertCircle className="text-xs" />{errors[name]}</p>
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/packages')} className="text-gray-400 hover:text-primary transition-colors">
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-poppins text-primary">
            {isEdit ? 'Edit Package' : 'Add New Package'}
          </h1>
          <p className="text-gray-500 font-inter text-sm">
            {isEdit ? 'Update package details' : 'Create a new travel package'}
          </p>
        </div>
      </div>

      {serverError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm font-inter">
          <FiAlertCircle className="shrink-0" />{serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Package Title <span className="text-red-400">*</span></label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Cultural Triangle Explorer"
            className={`input-field ${errors.title ? 'border-red-400' : ''}`} />
          <Err name="title" />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Tagline <span className="text-red-400">*</span></label>
          <input name="tagline" value={form.tagline} onChange={handleChange}
            placeholder="e.g. Uncover 2,500 Years of Civilization"
            className={`input-field ${errors.tagline ? 'border-red-400' : ''}`} />
          <Err name="tagline" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            rows={4} placeholder="Describe this travel package..."
            className="input-field resize-none" />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
            placeholder="https://images.unsplash.com/..." className="input-field" />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="preview"
              className="mt-2 h-32 w-full object-cover rounded-xl"
              onError={e => e.target.style.display = 'none'} />
          )}
        </div>

        {/* Category + Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className="input-field">
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Duration + Unit + Group Size */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Duration <span className="text-red-400">*</span></label>
            <input name="duration" type="number" min="1" value={form.duration}
              onChange={handleChange} placeholder="5"
              className={`input-field ${errors.duration ? 'border-red-400' : ''}`} />
            <Err name="duration" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Unit</label>
            <select name="durationUnit" value={form.durationUnit} onChange={handleChange} className="input-field">
              <option value="days">Days</option>
              <option value="nights">Nights</option>
              <option value="hours">Hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Group Size</label>
            <input name="groupSize" value={form.groupSize} onChange={handleChange}
              placeholder="2-12 people" className="input-field" />
          </div>
        </div>

        {/* Price + Original Price + Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Price (USD) <span className="text-red-400">*</span></label>
            <input name="price" type="number" min="0" value={form.price}
              onChange={handleChange} placeholder="549"
              className={`input-field ${errors.price ? 'border-red-400' : ''}`} />
            <Err name="price" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Original Price (optional)</label>
            <input name="originalPrice" type="number" min="0" value={form.originalPrice}
              onChange={handleChange} placeholder="720" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Badge</label>
            <select name="badge" value={form.badge} onChange={handleChange} className="input-field">
              {BADGES.map(b => <option key={b} value={b}>{b || '-- No Badge --'}</option>)}
            </select>
          </div>
        </div>

        {/* Rating + Review Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Rating (0–5)</label>
            <input name="rating" type="number" min="0" max="5" step="0.1"
              value={form.rating} onChange={handleChange} placeholder="4.9" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Review Count</label>
            <input name="reviewCount" type="number" min="0"
              value={form.reviewCount} onChange={handleChange} placeholder="342" className="input-field" />
          </div>
        </div>

        {/* Featured + Popular */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <input type="checkbox" id="pkgFeatured" name="featured"
              checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-secondary" />
            <label htmlFor="pkgFeatured" className="text-sm font-medium font-inter text-gray-700 cursor-pointer">
              Featured Package
            </label>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <input type="checkbox" id="pkgPopular" name="popular"
              checked={form.popular} onChange={handleChange} className="w-4 h-4 accent-secondary" />
            <label htmlFor="pkgPopular" className="text-sm font-medium font-inter text-gray-700 cursor-pointer">
              Popular Package
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading || success}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-poppins transition-all disabled:opacity-70 ${success ? 'bg-success text-white' : 'btn-primary'}`}>
          {loading
            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : success ? <><FiCheck /> Saved!</>
            : <><FiSave /> {isEdit ? 'Update Package' : 'Add Package'}</>}
        </button>
      </form>
    </div>
  );
};

export default PackageForm;
