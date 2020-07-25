const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./routes/routes');
const products = require('./routes/products');
const swagger = require('./utils/swaggerConfig');
const logger = require('./utils/loggerConfig');

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());

app.use('/', router);
app.use('/api', products);
app.use(swagger);

module.exports = app;
