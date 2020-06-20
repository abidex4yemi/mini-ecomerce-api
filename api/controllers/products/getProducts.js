const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../util/success');
const { createError, GENERIC_ERROR } = require('../../util/error');

const Product = mongoose.model('Product');

/**
 * @description Returns 8 product per-page
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const resultPerPage = 8;

    // Get product on demand | limiting the product to 8 per page
    const products = await Product.find()
      .skip(resultPerPage * page - resultPerPage)
      .limit(resultPerPage);

    // return total number of products in store
    const totalNumberOfProduct = await Product.countDocuments();

    const totalPages = Math.ceil(totalNumberOfProduct / resultPerPage);

    return res.status(OK).json(
      handleResponse({
        data: {
          products,
          currentPage: page,
          totalPages,
          numOfResults: products.length,
          totalProducts: totalNumberOfProduct,
        },
      })
    );
  } catch (error) {
    return next(
      createError({
        status: GENERIC_ERROR,
        message: 'Try again something went wrong',
      })
    );
  }
};

module.exports = getProducts;
