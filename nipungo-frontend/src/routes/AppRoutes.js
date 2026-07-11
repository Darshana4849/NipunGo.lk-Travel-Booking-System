import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';

import Welcome from '../pages/Welcome/Welcome';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Destinations from '../pages/Destinations/Destinations';
import DestinationDetails from '../pages/DestinationDetails/DestinationDetails';
import Hotels from '../pages/Hotels/Hotels';
import HotelDetails from '../pages/HotelDetails/HotelDetails';
import Packages from '../pages/Packages/Packages';
import PackageDetails from '../pages/PackageDetails/PackageDetails';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Contact from '../pages/Contact/Contact';
import Dashboard from '../pages/Dashboard/Dashboard';
import MyBookings from '../pages/MyBookings/MyBookings';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';

// Admin pages
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminDestinations from '../pages/Admin/Destinations/AdminDestinations';
import DestinationForm from '../pages/Admin/Destinations/DestinationForm';
import AdminHotels from '../pages/Admin/Hotels/AdminHotels';
import HotelForm from '../pages/Admin/Hotels/HotelForm';
import AdminPackages from '../pages/Admin/Packages/AdminPackages';
import PackageForm from '../pages/Admin/Packages/PackageForm';

// Protected — must be logged in
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('nipungo_user');
  if (!user) return <Navigate to="/welcome" replace />;
  return children;
};

// Admin only — must be ROLE_ADMIN
const AdminRoute = ({ children }) => {
  const userStr = localStorage.getItem('nipungo_user');
  if (!userStr) return <Navigate to="/welcome" replace />;
  const user = JSON.parse(userStr);
  if (user.role !== 'ROLE_ADMIN') return <Navigate to="/home" replace />;
  return children;
};

// Guest only — already logged in → home
const GuestRoute = ({ children }) => {
  const user = localStorage.getItem('nipungo_user');
  if (user) return <Navigate to="/home" replace />;
  return children;
};

const AppRoutes = () => {
  const isLoggedIn = Boolean(localStorage.getItem('nipungo_user'));

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/home' : '/welcome'} replace />}
        />

        {/* Guest only — no Navbar/Footer */}
        <Route path="/welcome" element={<GuestRoute><Welcome /></GuestRoute>} />
        <Route path="/login"   element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Admin Panel — separate layout */}
        <Route
          path="/admin"
          element={<AdminRoute><AdminLayout /></AdminRoute>}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="destinations/new" element={<DestinationForm />} />
          <Route path="destinations/edit/:id" element={<DestinationForm />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="hotels/new" element={<HotelForm />} />
          <Route path="hotels/edit/:id" element={<HotelForm />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="packages/new" element={<PackageForm />} />
          <Route path="packages/edit/:id" element={<PackageForm />} />
        </Route>

        {/* Main layout — Navbar + Footer */}
        <Route element={<MainLayout />}>
          {/* Protected pages */}
          <Route path="/home"      element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bookings"  element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Public pages */}
          <Route path="/about"               element={<About />} />
          <Route path="/destinations"        element={<Destinations />} />
          <Route path="/destinations/:id"    element={<DestinationDetails />} />
          <Route path="/hotels"              element={<Hotels />} />
          <Route path="/hotels/:id"          element={<HotelDetails />} />
          <Route path="/packages"            element={<Packages />} />
          <Route path="/packages/:id"        element={<PackageDetails />} />
          <Route path="/contact"             element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
