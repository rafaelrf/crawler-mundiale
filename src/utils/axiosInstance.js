const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://lista.mercadolivre.com.br/',
});

module.exports = axiosInstance;
