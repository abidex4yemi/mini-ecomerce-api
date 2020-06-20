const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { secretKey } = require('../config/keys');

const {
  createError,
  GENERIC_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('./error');

const User = mongoose.model('User');

class Auth {
  /**
   * Generate token using provided payload.
   *
   * @param {*} payload
   * @param {*} options
   */
  generateToken(payload = {}, options = {}) {
    const token = jwt.sign(payload, secretKey, options);

    return token;
  }

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async verifyToken(req, res, next) {
    req.user = null;

    const token = req.get('Authorization');

    // check if token is provided
    if (!token) {
      return next(
        createError({
          status: UNAUTHORIZED,
          message: 'Unauthorized!, you have to login',
        })
      );
    }

    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, secretKey);

      const user = await User.findById({
        _id: decoded.id,
      });

      // check for valid app users
      if (!user) {
        return next(
          createError({
            status: UNAUTHORIZED,
            message: 'The token you provided is invalid',
          })
        );
      }

      // makes user object available through request object
      req.user = user;

      return next();
    } catch (errors) {
      if (errors.name && errors.name === 'TokenExpiredError') {
        return next(
          createError({
            status: BAD_REQUEST,
            message: 'Token expired, login again.',
          })
        );
      }

      return next(
        createError({
          message: 'The token you provided is invalid',
          status: GENERIC_ERROR,
        })
      );
    }
  }
}

module.exports = new Auth();
