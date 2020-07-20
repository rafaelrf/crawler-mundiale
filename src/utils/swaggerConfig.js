const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const router = express.Router();

// swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Web crawler Mercado Livre',
    version: '1.0.0',
    description:
                'API para coletar produtos registrados no site Mercado Livre.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*'],
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/api-docs.json', (req, res) => { // line 41
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;
