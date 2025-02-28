import axios from 'axios';
const API_HOST = process.env.API_HOST;

export const api = axios.create({
    baseURL: `https://${API_HOST}`,
    headers: {
        'Content-Type': 'application/json',
    },
});