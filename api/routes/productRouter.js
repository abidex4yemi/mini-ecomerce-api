const express = require('express');

const productController = require('../controllers/products');
const validateProductData = require('../middleware/validateSingleProduct');
const auth = require('../util/auth');

const productRouter = express.Router();

productRouter
  .route('/products')
  .post(auth.verifyToken, validateProductData, productController.addProduct)
  .get(productController.getProducts);

productRouter
  .route('/products/:id')
  .get(productController.getSingleProduct)
  .delete(auth.verifyToken, productController.deleteProduct);

module.exports = productRouter;
