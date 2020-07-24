const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://lista.mercadolivre.com.br/',
  maxRedirects: 3,
});

module.exports = axiosInstance;
