import React, { useState } from 'react';
import {
  FiMail, FiPhone, FiMapPin, FiClock, FiSend,
  FiCheck, FiAlertCircle, FiMessageSquare,
} from 'react-icons/fi';
import { contactAPI } from '../../services/api';

const contactDetails = [
  { icon: <FiPhone className="text-accent text-xl" />, label: 'Phone', value: '+94 11 234 5678', sub: 'Mon–Sat, 8am–8pm' },
  { icon: <FiMail className="text-accent text-xl" />, label: 'Email', value: 'hello@nipungo.lk', sub: 'We reply within 2 hours' },
  { icon: <FiMapPin className="text-accent text-xl" />, label: 'Office', value: '123 Galle Road, Colombo 03', sub: 'Sri Lanka' },
  { icon: <FiClock className="text-accent text-xl" />, label: 'Hours', value: 'Mon–Sat: 8am–8pm', sub: 'Sun: 9am–5pm' },
];

const subjects = [
  'General Inquiry',
  'Package Booking',
  'Hotel Reservation',
  'Custom Itinerary',
  'Group Travel',
  'Honeymoon Planning',
  'Feedback / Complaint',
  'Other',
];

// ✅ Field moved OUTSIDE of Contact (module/top level).
// This is the fix: previously Field was defined inside the Contact component body,
// which meant a brand-new Field function (and therefore a brand-new component type)
// was created on every re-render (i.e. on every keystroke since handleChange calls
// setForm/setErrors). React then unmounted the old Field subtree (including the
// <input>/<textarea>/<select> inside it) and mounted a fresh one, which made the
// focused element lose focus after every single character — causing the
// "type one letter, focus drops" behavior.
const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && (
      <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 font-inter">
        <FiAlertCircle className="text-xs shrink-0" />{error}
      </p>
    )}
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.subject) errs.subject = 'Please select a subject.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 20) errs.message = 'Please enter at least 20 characters.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await contactAPI.sendMessage({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      setErrors({ submit: 'Message send වුනේ නෑ. Another try කරන්න.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary-600 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <FiMessageSquare className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 font-inter text-lg max-w-xl mx-auto">
            Have a question about your trip? Our travel experts are ready to help you plan the perfect Sri Lanka adventure.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-5">
              <div>
                <h2 className="text-2xl font-bold font-poppins text-primary mb-2">Let's Talk</h2>
                <p className="text-gray-500 font-inter text-sm leading-relaxed">
                  Whether you need help planning an itinerary, have questions about a package, or simply want to learn more about Sri Lanka — we're here for you.
                </p>
              </div>

              {contactDetails.map((c) => (
                <div key={c.label} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-inter mb-0.5">{c.label}</p>
                    <p className="font-semibold font-poppins text-primary text-sm">{c.value}</p>
                    <p className="text-gray-400 text-xs font-inter">{c.sub}</p>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-card">
                <iframe
                  title="NIPUNGO Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d79.856!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMzguOCJOIDc5wrA1MScyMS42IkU!5e0!3m2!1sen!2slk!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-6">
                      <FiCheck className="text-success text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-primary mb-3">Message Sent!</h3>
                    <p className="text-gray-500 font-inter max-w-sm mx-auto mb-6">
                      Thank you for reaching out! A NIPUNGO travel expert will get back to you within 2 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold font-poppins text-primary mb-6">Send Us a Message</h2>

                    {/* Submit error */}
                    {errors.submit && (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 font-inter text-sm">
                        <FiAlertCircle className="shrink-0" />
                        {errors.submit}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Your Name *" error={errors.name}>
                          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                        </Field>
                        <Field label="Email Address *" error={errors.email}>
                          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Phone Number" error={errors.phone}>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+94 77 000 0000" className="input-field" />
                        </Field>
                        <Field label="Subject *" error={errors.subject}>
                          <select name="subject" value={form.subject} onChange={handleChange} className={`input-field ${errors.subject ? 'border-red-400' : ''}`}>
                            <option value="">Select a subject...</option>
                            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </Field>
                      </div>

                      <Field label="Your Message *" error={errors.message}>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us about your travel plans, questions, or requirements..."
                          className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                        />
                        <p className="text-xs text-gray-400 font-inter mt-1 text-right">{form.message.length} / 500</p>
                      </Field>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <><FiSend /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;