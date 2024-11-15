import axios, { type AxiosInstance } from 'axios';

const APITOKEN: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    headers: {
        "Content-Type": "application/json",
    }
});

APITOKEN.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default APITOKEN;
