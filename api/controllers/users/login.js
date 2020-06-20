const mongoose = require('mongoose');

const auth = require('../../util/auth');
const hashHelper = require('../../util/hashHelper');
const { handleResponse, OK } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  UNAUTHORIZED,
} = require('../../util/error');

const User = mongoose.model('User');

/**
 * Log existing user in
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(
        createError({
          message: 'Please provide a valid username/password.',
          status: UNAUTHORIZED,
        })
      );
    }

    const isPasswordValid = await hashHelper.verifyHash(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return next(
        createError({
          message: 'Please provide a valid username/password.',
          status: UNAUTHORIZED,
        })
      );
    }

    const payload = {
      id: user.id,
    };

    const options = {
      expiresIn: '24h',
    };

    const token = auth.generateToken(payload, options);

    user.password = undefined;

    return res.status(OK).json(
      handleResponse({
        message: 'Log in succeeded',
        data: {
          token,
          user,
        },
      })
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not log user in',
        status: GENERIC_ERROR,
      })
    );
  }
};

module.exports = login;
