import axios, { type AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    headers: {
        "Content-Type": "application/json",
    }
});

export default API;
