const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../util/success');
const { createError, GENERIC_ERROR, NOT_FOUND } = require('../../util/error');

const Product = mongoose.model('Product');

/**
 * @description Delete a single product given the id is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid product ID',
        })
      );
    }

    return res.status(OK).json(
      handleResponse({
        data: product,
        message: 'Product deleted successfully',
      })
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid product ID',
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

module.exports = deleteProduct;
