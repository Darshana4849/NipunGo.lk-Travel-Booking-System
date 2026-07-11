import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { hotelsAPI, destinationsAPI } from '../../../services/api';

const CATEGORIES = ['Luxury Resort','Boutique Resort','Beach Resort','Eco-Luxury','City Luxury','Heritage Hotel','Jungle Resort','Ultra Luxury','Beach Boutique','Exclusive Bungalow','Boutique Villa'];

const EMPTY = {
  name: '', location: '', province: '', description: '', imageUrl: '',
  pricePerNight: '', rating: '', reviewCount: '', stars: '3',
  category: 'Luxury Resort', checkIn: '14:00', checkOut: '12:00',
  featured: false, destinationId: '',
};

const HotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Load destinations for the dropdown
  useEffect(() => {
    destinationsAPI.getAll()
      .then(res => setDestinations(res.data.data || []))
      .catch(() => {});
  }, []);

  // Load hotel data if editing
  useEffect(() => {
    if (!isEdit) return;
    hotelsAPI.getById(id)
      .then(res => {
        const h = res.data.data;
        setForm({
          name: h.name || '', location: h.location || '',
          province: h.province || '', description: h.description || '',
          imageUrl: h.imageUrl || '', pricePerNight: h.pricePerNight || '',
          rating: h.rating || '', reviewCount: h.reviewCount || '',
          stars: String(h.stars || 3), category: h.category || 'Luxury Resort',
          checkIn: h.checkIn || '14:00', checkOut: h.checkOut || '12:00',
          featured: h.featured || false,
          destinationId: h.destinationId ? String(h.destinationId) : '',
        });
      })
      .catch(() => setServerError('Failed to load hotel data.'))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.location.trim()) errs.location = 'Location is required.';
    if (!form.province.trim()) errs.province = 'Province is required.';
    if (!form.pricePerNight) errs.pricePerNight = 'Price is required.';
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
        pricePerNight: parseFloat(form.pricePerNight),
        rating: form.rating ? parseFloat(form.rating) : 0,
        reviewCount: form.reviewCount ? parseInt(form.reviewCount) : 0,
        stars: parseInt(form.stars),
        destinationId: form.destinationId ? parseInt(form.destinationId) : null,
      };
      if (isEdit) await hotelsAPI.update(id, payload);
      else await hotelsAPI.create(payload);
      setSuccess(true);
      setTimeout(() => navigate('/admin/hotels'), 1000);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save hotel.');
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="text-center py-20 text-gray-400 font-inter">Loading...</div>;

  const Err = ({ name }) => errors[name]
    ? <p className="text-red-500 text-xs mt-1 font-inter flex items-center gap-1"><FiAlertCircle className="text-xs" />{errors[name]}</p>
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/hotels')} className="text-gray-400 hover:text-primary transition-colors">
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-poppins text-primary">
            {isEdit ? 'Edit Hotel' : 'Add New Hotel'}
          </h1>
          <p className="text-gray-500 font-inter text-sm">
            {isEdit ? 'Update hotel details' : 'Create a new hotel listing'}
          </p>
        </div>
      </div>

      {serverError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm font-inter">
          <FiAlertCircle className="shrink-0" />{serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Hotel Name <span className="text-red-400">*</span></label>
          <input name="name" value={form.name} onChange={handleChange}
            placeholder="e.g. Heritance Kandalama"
            className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
          <Err name="name" />
        </div>

        {/* Location + Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Location <span className="text-red-400">*</span></label>
            <input name="location" value={form.location} onChange={handleChange}
              placeholder="e.g. Dambulla"
              className={`input-field ${errors.location ? 'border-red-400' : ''}`} />
            <Err name="location" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Province <span className="text-red-400">*</span></label>
            <input name="province" value={form.province} onChange={handleChange}
              placeholder="e.g. Central Province"
              className={`input-field ${errors.province ? 'border-red-400' : ''}`} />
            <Err name="province" />
          </div>
        </div>

        {/* Category + Stars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Star Rating</label>
            <select name="stars" value={form.stars} onChange={handleChange} className="input-field">
              {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} Star{s > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            rows={4} placeholder="Describe this hotel..."
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

        {/* Price + Rating + Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Price/Night (USD) <span className="text-red-400">*</span></label>
            <input name="pricePerNight" type="number" min="0" value={form.pricePerNight}
              onChange={handleChange} placeholder="150"
              className={`input-field ${errors.pricePerNight ? 'border-red-400' : ''}`} />
            <Err name="pricePerNight" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Rating (0–5)</label>
            <input name="rating" type="number" min="0" max="5" step="0.1"
              value={form.rating} onChange={handleChange} placeholder="4.8" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Review Count</label>
            <input name="reviewCount" type="number" min="0"
              value={form.reviewCount} onChange={handleChange} placeholder="500" className="input-field" />
          </div>
        </div>

        {/* Check In / Out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Check-In Time</label>
            <input name="checkIn" value={form.checkIn} onChange={handleChange} placeholder="14:00" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Check-Out Time</label>
            <input name="checkOut" value={form.checkOut} onChange={handleChange} placeholder="12:00" className="input-field" />
          </div>
        </div>

        {/* Linked Destination */}
        <div>
          <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Linked Destination</label>
          <select name="destinationId" value={form.destinationId} onChange={handleChange} className="input-field">
            <option value="">-- Select Destination (optional) --</option>
            {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <input type="checkbox" id="hotelFeatured" name="featured"
            checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-secondary" />
          <label htmlFor="hotelFeatured" className="text-sm font-medium font-inter text-gray-700 cursor-pointer">
            Show as Featured Hotel on Home page
          </label>
        </div>

        <button type="submit" disabled={loading || success}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-poppins transition-all disabled:opacity-70 ${success ? 'bg-success text-white' : 'btn-primary'}`}>
          {loading
            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : success ? <><FiCheck /> Saved!</>
            : <><FiSave /> {isEdit ? 'Update Hotel' : 'Add Hotel'}</>}
        </button>
      </form>
    </div>
  );
};

export default HotelForm;
