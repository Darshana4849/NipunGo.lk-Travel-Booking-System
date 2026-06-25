import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiGlobe, FiAlertCircle, FiCheck,
} from 'react-icons/fi';
import { authAPI } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!form.confirm) errs.confirm = 'Please confirm your password.';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';
    if (!agreed) errs.agreed = 'You must agree to the terms.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    const nameParts = form.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName  = nameParts.slice(1).join(' ') || nameParts[0];

    try {
      const response = await authAPI.register({
        firstName,
        lastName,
        email:    form.email,
        password: form.password,
      });
      const { data } = response.data;
      localStorage.setItem('nipungo_token', data.accessToken);
      localStorage.setItem('nipungo_refresh', data.refreshToken);
      localStorage.setItem('nipungo_user', JSON.stringify({
        id:        data.userId,
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        role:      data.role,
      }));
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        'Registration failed. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const strengthLevel = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = strengthLevel();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-success'][strength];

  return (
    <div className="min-h-screen flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=1200&q=80"
          alt="Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
              <FiGlobe className="text-white" />
            </div>
            <span className="text-xl font-bold font-poppins text-white">NIPUNGO</span>
          </Link>
          <div>
            <h2 className="text-3xl font-bold font-poppins text-white mb-4 leading-snug">
              Start Your Sri Lanka Journey Today
            </h2>
            <div className="space-y-3">
              {[
                'Personalized AI travel recommendations',
                'Exclusive member-only deals',
                'Manage all bookings in one place',
                '24/7 dedicated travel support',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center shrink-0">
                    <FiCheck className="text-success text-xs" />
                  </div>
                  <span className="text-white/80 font-inter text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center py-20 px-6 md:px-12 lg:px-16 bg-background overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
                <FiGlobe className="text-white" />
              </div>
              <span className="text-xl font-bold font-poppins text-primary">NIPUNGO</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold font-poppins text-primary mb-2">Create Your Account</h1>
          <p className="text-gray-500 font-inter mb-8">Join 10,000+ travelers exploring Sri Lanka with NIPUNGO.</p>

          {/* Server Error */}
          {serverError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 font-inter text-sm">
              <FiAlertCircle className="shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`input-field pl-11 ${errors.name ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.name && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter"><FiAlertCircle className="text-xs" />{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field pl-11 ${errors.email ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.email && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter"><FiAlertCircle className="text-xs" />{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-400' : ''}`}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs font-inter text-gray-500">Password strength: <span className="font-medium text-gray-700">{strengthLabel}</span></p>
                </div>
              )}
              {errors.password && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter"><FiAlertCircle className="text-xs" />{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`input-field pl-11 pr-11 ${errors.confirm ? 'border-red-400' : form.confirm && form.confirm === form.password ? 'border-success' : ''}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
                {form.confirm && form.confirm === form.password && (
                  <FiCheck className="absolute right-10 top-1/2 -translate-y-1/2 text-success" />
                )}
              </div>
              {errors.confirm && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter"><FiAlertCircle className="text-xs" />{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors({ ...errors, agreed: '' }); }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-secondary accent-secondary"
                />
                <span className="text-sm font-inter text-gray-600">
                  I agree to NIPUNGO's{' '}
                  <button type="button" className="text-secondary hover:underline">Terms of Service</button>{' '}
                  and{' '}
                  <button type="button" className="text-secondary hover:underline">Privacy Policy</button>
                </span>
              </label>
              {errors.agreed && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter"><FiAlertCircle className="text-xs" />{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-sm font-inter text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;