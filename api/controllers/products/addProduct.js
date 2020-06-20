const mongoose = require('mongoose');

const { handleResponse, CREATED } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} = require('../../util/error');

const Category = mongoose.model('Category');
const Product = mongoose.model('Product');

/**
 * @description Add new product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addProduct = async (req, res, next) => {
  // Note: this make the application stateful
  // but since it's a simple app, there's nothing to worry about

  if (!req.user) {
    return next(
      createError({
        status: UNAUTHORIZED,
        message: 'Unauthorized!, you have to login',
      })
    );
  }

  try {
    const newProductDetails = req.body;

    const { category } = newProductDetails;

    const productCategory = await Category.findOne({ _id: category.id });

    if (!productCategory) {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide valid product category ID',
        })
      );
    }

    const newProduct = await Product.create({
      ...newProductDetails,
      category: productCategory,
    });

    const newProductToObject = newProduct.toObject({ versionKey: false });

    const productCategoryToObject = productCategory.toObject({
      versionKey: false,
    });

    return res.status(CREATED).json(
      handleResponse({
        data: { ...newProductToObject, category: productCategoryToObject },
        message: 'New product created successfully',
      })
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid product category ID',
        })
      );
    }

    return next(
      createError({
        status: GENERIC_ERROR,
        message: 'Try again something went wrong',
      })
    );
  }
};

module.exports = addProduct;
