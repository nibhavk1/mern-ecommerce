import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.put('/auth/profile', data)
};

// Products API
export const productsAPI = {
    getAll: (filters = {}) => api.get('/products', { params: filters }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    updateStock: (id, data) => api.put(`/products/${id}/stock`, data)
};

// Orders API
export const ordersAPI = {
    create: (data) => api.post('/orders', data),
    getByUserId: (userId) => api.get(`/orders/user/${userId}`),
    getById: (id) => api.get(`/orders/${id}`),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
    getAll: () => api.get('/orders/admin/all')
};

// Wishlist API
export const wishlistAPI = {
    get: () => api.get('/wishlist'),
    add: (productId) => api.post('/wishlist', { productId }),
    remove: (productId) => api.delete(`/wishlist/${productId}`)
};

// Reviews API
export const reviewsAPI = {
    create: (data) => api.post('/reviews', data),
    getByProductId: (productId) => api.get(`/reviews/product/${productId}`)
};

export default api;
