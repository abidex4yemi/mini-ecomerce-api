const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} = require('../../util/error');

const Cart = mongoose.model('Cart');

/**
 * @description Remove a product from cart given the cart id is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteProductFromCart = async (req, res, next) => {
  if (!req.user) {
    return next(
      createError({
        status: UNAUTHORIZED,
        message: 'Unauthorized!, you have to login',
      })
    );
  }

  try {
    const cartId = req.params.id;

    const cart = await Cart.findOneAndDelete({
      user: req.user._id,
      _id: cartId,
    });

    if (!cart || !cart._id) {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid cart ID',
        })
      );
    }

    return res.status(OK).json(
      handleResponse({
        data: cart,
        message: 'Cart deleted successfully',
      })
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid cart ID',
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

module.exports = deleteProductFromCart;
