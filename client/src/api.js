// client/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://st-1-y99x.onrender.com/', // Base URL should be up to the server's root
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
