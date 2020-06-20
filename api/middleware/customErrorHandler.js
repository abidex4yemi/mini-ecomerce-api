/* eslint-disable implicit-arrow-linebreak */
const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  GENERIC_ERROR,
  FORBIDDEN,
  UNAUTHORIZED
} = require('../util/error');

/**
 * Handle bad request error
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} err
 */
const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) {
    return next(err);
  }

  // Handle invalid JSON body
  if (err.type && err.type.includes('entity.parse.failed')) {
    return res.status(BAD_REQUEST).json({
      ok: false,
      errors: [
        {
          message: 'Invalid JSON object check request body',
          body: err.body
        }
      ]
    });
  }

  return res.status(BAD_REQUEST).json({
    ok: false,
    errors: {
      message: err.message || 'Bad Request',
      status: err.status
    }
  });
};

const forbidden = (err, req, res, next) => {
  if (err.status !== FORBIDDEN) {
    return next(err);
  }

  return res.status(FORBIDDEN).json({
    ok: false,
    message: err.message || 'Forbidden',
    errors: [err]
  });
};

const unauthorized = (err, req, res, next) => {
  if (err.status !== UNAUTHORIZED) {
    return next(err);
  }

  return res.status(UNAUTHORIZED).json({
    ok: false,
    message: err.message || 'Unauthorized',
    errors: [err]
  });
};

/**
 * Handle resource not found error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) {
    return next(err);
  }

  return res.status(NOT_FOUND).json({
    ok: false,
    message: err.message || 'Resource not found',
    errors: [err]
  });
};

/**
 * Handle resource resource already exist error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const resourceConflict = (err, req, res, next) => {
  if (err.status !== CONFLICT) {
    return next(err);
  }

  return res.status(CONFLICT).json({
    ok: false,
    errors: {
      message: err.message,
      status: err.status
    }
  });
};

/**
 * Handle server error
 *
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
// eslint-disable-next-line no-unused-vars
const genericError = (err, req, res, next) =>
  res.status(GENERIC_ERROR).json({
    ok: false,
    message: err.message || 'Internal server error',
    errors: [err]
  });

/**
 * Package all error handlers as object
 */
const errorsObject = {
  badRequest,
  notFound,
  resourceConflict,
  forbidden,
  unauthorized,
  genericError
};

/**
 * Export all error middleware as an array
 *
 */
const customErrorHandler = () =>
  Object.keys(errorsObject).map((key) => errorsObject[key]);

module.exports = customErrorHandler;
