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
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile/Profile';


// Protected route — login නැත්නම් welcome page redirect
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('nipungo_user');
  if (!user) return <Navigate to="/welcome" replace />;
  return children;
};

// Guest route — already logged in නම් home redirect
const GuestRoute = ({ children }) => {
  const user = localStorage.getItem('nipungo_user');
  if (user) return <Navigate to="/home" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root → welcome or home based on auth */}
        <Route
          path="/"
          element={
            localStorage.getItem('nipungo_user')
              ? <Navigate to="/home" replace />
              : <Navigate to="/welcome" replace />
          }
        />

        {/* Guest only pages — no layout */}
        <Route
          path="/welcome"
          element={
            <GuestRoute>
              <Welcome />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route path="/profile" 
        element={
        <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        } 
        />

        {/* Main layout pages */}
        <Route element={<MainLayout />}>
          {/* Protected — must be logged in */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

          {/* Public — anyone can view */}
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;