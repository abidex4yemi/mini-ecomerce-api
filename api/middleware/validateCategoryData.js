/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Product validation schema
 */
const categorySchema = Joi.object().keys({
  name: Joi.string().trim().required(),
});

/**
 * Validate product data against defined schema
 */
const validateCategoryData = (req, res, next) =>
  joiValidate(req, res, next, categorySchema);

module.exports = validateCategoryData;
