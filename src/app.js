const express = require('express');
const cors = require('cors');

const router = require('./routes/routes');
const products = require('./routes/products');
const swagger = require('./utils/swaggerConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use('/', router);
app.use('/api', products);
app.use(swagger);

module.exports = app;
