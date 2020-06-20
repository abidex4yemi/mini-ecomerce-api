const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../../util/error');

const Product = mongoose.model('Product');

/**
 * @description Update a single product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateProduct = async (req, res, next) => {
  if (!req.user) {
    return next(
      createError({
        status: UNAUTHORIZED,
        message: 'Unauthorized!, you have to login',
      })
    );
  }

  try {
    const anyFieldIsEmpty = Object.values(req.body).some(
      (value) => value === null || value.trim() === ''
    );

    if (anyFieldIsEmpty) {
      return next(
        createError({
          status: BAD_REQUEST,
          message: 'Request body cant be empty and key and value must exist',
        })
      );
    }

    const productId = req.params.id;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );

    return res.status(OK).json(
      handleResponse({
        data: updatedProduct,
      })
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Product with the specified ID not found',
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

module.exports = updateProduct;
