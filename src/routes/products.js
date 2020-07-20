const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciar produtos do Mercado Livre
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *    summary: Buscar uma lista de produtos no Mercado Livre.
 *    tags:
 *      - Products
 *    consumes:
 *       - application/json
 *    parameters:
 *      - in: body
 *        name: Produto Buscado
 *        description: Termo utilizado na busca e a quantidade de produtos na lista.
 *        schema:
 *          type: object
 *          required:
 *              - search
 *              - limit
 *          properties:
 *              search:
 *                  type: string
 *                  description: Termo utilizado na busca.
 *              limit:
 *                  type: integer
 *                  description: Quantidade de produtos na lista.
 *          example:
 *              search: cadeado
 *              limit: 10
 *   responses:
 *       200:
 *        description: Produto Encontrado
 */
router.post('/products', productsController.findProducts);

module.exports = router;
