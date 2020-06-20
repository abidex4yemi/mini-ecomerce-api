// const mongoose = require('mongoose');

// const { handleResponse, CREATED } = require('../../util/success');
// const {
//   createError,
//   GENERIC_ERROR,
//   NOT_FOUND,
//   UNAUTHORIZED,
// } = require('../../util/error');

// const Cart = mongoose.model('Cart');

// /**
//  * @description update cart
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// const updateCart = async (req, res, next) => {
//   // Note: this make the application stateful
//   // but since it's a simple app, there's nothing to worry about

//   if (!req.user) {
//     return next(
//       createError({
//         status: UNAUTHORIZED,
//         message: 'Unauthorized!, you have to login',
//       })
//     );
//   }

//   try {
//     const userHasItemInCart = await Cart.find({ user: req.user._id }).populate(
//       'items'
//     );

//     res.json(userHasItemInCart);

//     // userHasItemInCart.push()

//     // const { items } = req.body;
//     // const user = req.user;

//     // const newCart = await Cart.create({
//     //   user,
//     //   items,
//     // });

//     // const newCartToObject = newCart.toObject({ versionKey: false });

//     // return res.status(CREATED).json(
//     //   handleResponse({
//     //     data: newCartToObject,
//     //     message: 'Product added to cart successfully',
//     //   })
//     // );
//   } catch (error) {
//     if (error.errors && error.errors.items) {
//       return next(
//         createError({
//           status: NOT_FOUND,
//           message: `Invalid product ID ${error.errors.items.stringValue}`,
//         })
//       );
//     }

//     return next(
//       createError({
//         status: GENERIC_ERROR,
//         message: 'Try again something went wrong',
//       })
//     );
//   }
// };

// module.exports = updateCart;
