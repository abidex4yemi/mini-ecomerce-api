const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../util/success');
const { createError, GENERIC_ERROR } = require('../../util/error');

const Category = mongoose.model('Category');

/**
 * @description Returns all categories
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.status(OK).json(
      handleResponse({
        data: {
          categories,
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

module.exports = getCategories;
