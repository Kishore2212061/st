// client/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Base URL should be up to the server's root
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
