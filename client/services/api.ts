import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            toast.error('Cannot connect to server. Please ensure the backend is running.');
        } else if (error.response?.data?.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('An unexpected error occurred.');
        }
        return Promise.reject(error);
    }
);

export default api;
