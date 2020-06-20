/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Cart validation schema
 */
const cartSchema = Joi.object().keys({
  items: Joi.array()
    .items(
      Joi.object()
        .keys({
          _id: Joi.string().trim(),
        })
        .required()
    )
    .required()
    .required(),
});

/**
 * Validate cart data against defined schema
 */
const validateCart = (req, res, next) =>
  joiValidate(req, res, next, cartSchema);

module.exports = validateCart;
