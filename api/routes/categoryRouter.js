const express = require('express');
const categoryController = require('../controllers/categories');
const validateCategoryData = require('../middleware/validateCategoryData');
const auth = require('../util/auth');

const categoryRouter = express.Router();

categoryRouter
  .route('/categories')
  .get(categoryController.getCategories)
  .post(auth.verifyToken, validateCategoryData, categoryController.addCategory);

module.exports = categoryRouter;
