const express = require('express');
const cors = require('cors');

const router = require('./routes/routes');
const products = require('./routes/products');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(router);
app.use(products);

module.exports = app;
