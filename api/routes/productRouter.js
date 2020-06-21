const express = require('express');

const productController = require('../controllers/products');
const validateProductData = require('../middleware/validateSingleProduct');
const cartController = require('../controllers/carts');
const validateCart = require('../middleware/validateCart');
const auth = require('../util/auth');

const productRouter = express.Router();

productRouter
  .route('/products')
  .post(auth.verifyToken, validateProductData, productController.addProduct)
  .get(productController.getProducts);

productRouter
  .route('/products/:id')
  .get(productController.getSingleProduct)
  .delete(auth.verifyToken, productController.deleteProduct)
  .patch(auth.verifyToken, productController.updateProduct);

productRouter
  .route('/products/carts')
  .post(auth.verifyToken, validateCart, cartController.addProductToCart);

productRouter
  .route('/products/carts/:id')
  .delete(auth.verifyToken, cartController.deleteProductFromCart);

module.exports = productRouter;
