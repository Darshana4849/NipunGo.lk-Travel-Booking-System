import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiGlobe, FiAlertCircle } from 'react-icons/fi';
import { authAPI } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    if (serverError) setServerError('');
  };

  const saveAndRedirect = (data) => {
    localStorage.setItem('nipungo_token', data.accessToken);
    localStorage.setItem('nipungo_refresh', data.refreshToken);
    localStorage.setItem('nipungo_user', JSON.stringify({
      id:        data.userId,
      firstName: data.firstName,
      lastName:  data.lastName,
      email:     data.email,
      role:      data.role,
    }));
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError('');
    try {
      const response = await authAPI.login({ email: form.email, password: form.password });
      saveAndRedirect(response.data.data);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email, password) => {
    setLoading(true);
    setServerError('');
    try {
      const response = await authAPI.login({ email, password });
      saveAndRedirect(response.data.data);
    } catch (err) {
      setServerError('Demo login failed. Make sure the backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center py-20 px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-md w-full mx-auto">

          <Link to="/" className="flex items-center gap-2 mb-10 w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
              <FiGlobe className="text-white" />
            </div>
            <span className="text-xl font-bold font-poppins text-primary">NIPUNGO</span>
          </Link>

          <h1 className="text-3xl font-bold font-poppins text-primary mb-2">Welcome back</h1>
          <p className="text-gray-500 font-inter mb-8">Sign in to access your travel dashboard.</p>

          {/* Redirect notice — shows when coming from booking */}
          {from !== '/dashboard' && (
            <div className="bg-secondary/10 border border-secondary/20 text-secondary px-4 py-3 rounded-xl mb-5 font-inter text-sm">
              🔐 Sign in to complete your booking
            </div>
          )}

          {serverError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 font-inter text-sm">
              <FiAlertCircle className="shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
              {errors.email && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter">
                  <FiAlertCircle className="text-xs" />{errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium font-inter text-gray-700">Password</label>
                <Link to="/contact" className="text-xs text-secondary hover:underline font-inter">Forgot password?</Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-400' : ''}`}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter">
                  <FiAlertCircle className="text-xs" />{errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-inter">or try a demo</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('user@nipungo.com', 'User123@')}
              disabled={loading}
              className="btn-secondary text-sm py-2.5 disabled:opacity-60"
            >
              Demo User
            </button>
            <button
              onClick={() => handleDemoLogin('admin@nipungo.com', 'Admin123@')}
              disabled={loading}
              className="btn-secondary text-sm py-2.5 disabled:opacity-60"
            >
              Demo Admin
            </button>
          </div>

          <p className="text-center text-sm font-inter text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-secondary font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>

      {/* Right — Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
          alt="Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <blockquote className="text-white text-2xl font-bold font-poppins leading-snug mb-4">
            "Sri Lanka will capture your heart and never let go."
          </blockquote>
          <p className="text-white/60 font-inter">— NIPUNGO Travelers</p>
          <div className="flex gap-2 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 rounded-full ${i === 1 ? 'w-8 bg-accent' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;