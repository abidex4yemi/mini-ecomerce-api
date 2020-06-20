const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Users login validation schema
 */
const loginSchema = Joi.object().keys({
  email: Joi.string().label('Email').trim().required(),
  password: Joi.string().min(6).max(30).label('Password').trim().required(),
});

/**
 * Validate login body against defined schema
 */
const validateLoginCredential = (req, res, next) => {
  joiValidate(req, res, next, loginSchema);
};

module.exports = validateLoginCredential;
