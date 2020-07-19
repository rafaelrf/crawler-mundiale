const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

router.post('/products', productsController.findProducts);

module.exports = router;
