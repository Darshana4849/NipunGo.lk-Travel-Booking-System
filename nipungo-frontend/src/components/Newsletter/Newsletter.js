import React, { useState } from 'react';
import { FiMail, FiArrowRight, FiCheck, FiGift } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-800 to-primary relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-6">
            <FiGift className="text-accent text-2xl" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-gray-300 font-inter text-lg mb-8 leading-relaxed">
            Subscribe to our newsletter and receive curated Sri Lanka travel deals, insider tips, and early-bird discounts — up to{' '}
            <span className="text-accent font-semibold">30% off</span> select packages.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['Exclusive Deals', 'Travel Guides', 'Seasonal Offers', 'No Spam'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-gray-300 text-sm font-inter">
                <div className="w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center">
                  <FiCheck className="text-success text-xs" />
                </div>
                {b}
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-success/20 border border-success/40 flex items-center justify-center animate-bounce">
                <FiCheck className="text-success text-2xl" />
              </div>
              <p className="text-white text-xl font-semibold font-poppins">You're subscribed!</p>
              <p className="text-gray-300 font-inter">
                Welcome aboard! Check your inbox for a special welcome offer 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email address"
                  className={`w-full pl-11 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border ${
                    error ? 'border-red-400' : 'border-white/20'
                  } text-white placeholder-gray-400 font-inter text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
                />
                {error && <p className="absolute -bottom-5 left-0 text-red-400 text-xs font-inter">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-accent flex items-center justify-center gap-2 py-4 px-7 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-gray-500 text-xs font-inter mt-6">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
