const mongoose = require('mongoose');

const { handleResponse, CREATED } = require('../../util/success');
const { createError, GENERIC_ERROR, CONFLICT } = require('../../util/error');

const Category = mongoose.model('Category');

/**
 * @description Add new category
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addCategory = async (req, res, next) => {
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
    const { name } = req.body;

    const category = await Category.findOne({ name });

    if (category && category.name === name) {
      return next(
        createError({
          status: CONFLICT,
          message: `A category with '${category.name}' already exist`,
        })
      );
    }

    const newCategory = await Category.create({ name });

    return res.status(CREATED).json(
      handleResponse({
        data: newCategory,
        message: 'New category created successfully',
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

module.exports = addCategory;
