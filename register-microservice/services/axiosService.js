const axios = require('axios');

const apiClient = axios.create({
    baseURL: process.env.BASE_API_URL,
    timeout: 5000
});

module.exports = apiClient;
