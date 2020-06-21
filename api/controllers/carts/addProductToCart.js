const mongoose = require('mongoose');

const { handleResponse, CREATED } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
  OK,
} = require('../../util/error');

const Cart = mongoose.model('Cart');

/**
 * @description Add new item to cart
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addProductToCart = async (req, res, next) => {
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

  //Note: cart would be added to the database if only user didn't checkout
  // or left the page without checking out which in turn
  // would be a great way to email their cart within a specified expiry date

  try {
    const userHasItemInCart = await Cart.find({ user: req.user._id }).populate(
      'items'
    );

    const { items } = req.body;
    const user = req.user;

    // update cart
    if (userHasItemInCart.length > 0) {
      const updatedCart = await Cart.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { items } },
        { new: true }
      );

      return res.json(
        handleResponse({
          message: 'cart updated successfully',
          data: updatedCart,
        })
      );
    }

    // create new product to cart
    const newCart = await Cart.create({
      user,
      items,
    });

    const newCartToObject = newCart.toObject({ versionKey: false });

    return res.status(CREATED).json(
      handleResponse({
        data: newCartToObject,
        message: 'Product added to cart successfully',
      })
    );
  } catch (error) {
    if (error.errors && error.errors.items) {
      return next(
        createError({
          status: NOT_FOUND,
          message: `Invalid product ID ${error.errors.items.stringValue}`,
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

module.exports = addProductToCart;
