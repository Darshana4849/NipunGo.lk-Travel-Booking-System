import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nipungo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nipungo_token');
      localStorage.removeItem('nipungo_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  refresh:  (data) => api.post('/auth/refresh', data),
};

export const destinationsAPI = {
  getAll:      (params) => api.get('/destinations', { params }),
  getById:     (id)     => api.get(`/destinations/${id}`),
  getFeatured: ()       => api.get('/destinations/featured'),
};

export const hotelsAPI = {
  getAll:      (params) => api.get('/hotels', { params }),
  getById:     (id)     => api.get(`/hotels/${id}`),
  getFeatured: ()       => api.get('/hotels/featured'),
};

export const packagesAPI = {
  getAll:      (params) => api.get('/packages', { params }),
  getById:     (id)     => api.get(`/packages/${id}`),
  getFeatured: ()       => api.get('/packages/featured'),
  getPopular:  ()       => api.get('/packages/popular'),
};

export const bookingsAPI = {
  getMyBookings: ()       => api.get('/bookings/my'),
  getById:       (id)     => api.get(`/bookings/${id}`),
  create:        (data)   => api.post('/bookings', data),
  updateStatus:  (id, st) => api.put(`/bookings/${id}/status?status=${st}`),
};

export const reviewsAPI = {
  getByHotel: (hotelId) => api.get(`/reviews/hotel/${hotelId}`),
  create:     (data)    => api.post('/reviews', data),
};

export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
};

export default api;