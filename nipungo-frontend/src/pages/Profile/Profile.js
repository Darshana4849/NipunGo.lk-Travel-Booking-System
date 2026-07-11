import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiSave, FiArrowLeft, FiCheck } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('nipungo_user');
  const user = userStr ? JSON.parse(userStr) : {};

  const [form, setForm] = useState({
    firstName: user.firstName || '',
    lastName:  user.lastName  || '',
    email:     user.email     || '',
    phone:     user.phone     || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    const updated = { ...user, firstName: form.firstName, lastName: form.lastName, phone: form.phone };
    localStorage.setItem('nipungo_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <>
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-secondary-800">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white font-inter text-sm mb-4 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">Edit Profile</h1>
          <p className="text-gray-400 font-inter text-sm mt-1">Update your personal information</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-xl">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold font-poppins">
                {form.firstName?.[0]}{form.lastName?.[0]}
              </div>
              <div>
                <p className="font-bold font-poppins text-primary">{form.firstName} {form.lastName}</p>
                <p className="text-gray-400 font-inter text-sm">{form.email}</p>
                {user.role === 'ROLE_ADMIN' && (
                  <span className="badge-primary text-xs mt-1 inline-block">Admin</span>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">First Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="input-field pl-11"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Last Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="input-field pl-11"
                  />
                </div>
              </div>

              {/* Email — readonly */}
              <div>
                <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">
                  Email Address <span className="text-gray-400 font-normal">(cannot change)</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="input-field pl-11 bg-gray-50 cursor-not-allowed text-gray-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium font-inter text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="input-field pl-11"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-poppins transition-all duration-200 ${
                  saved ? 'bg-success text-white' : 'btn-primary'
                }`}
              >
                {saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
