const express = require('express');

const productController = require('../controllers/products');
const validateProductData = require('../middleware/validateSingleProduct');
const auth = require('../util/auth');

const productRouter = express.Router();

productRouter
  .route('/products')
  .post(auth.verifyToken, validateProductData, productController.addProduct)
  .get(productController.getProducts);

module.exports = productRouter;
