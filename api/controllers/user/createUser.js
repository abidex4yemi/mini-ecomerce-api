const mongoose = require('mongoose');

const auth = require('../../util/auth');
const hashHelper = require('../../util/hashHelper');
const { handleResponse, CREATED } = require('../../util/success');
const { createError, CONFLICT, GENERIC_ERROR } = require('../../util/error');

const User = mongoose.model('User');

/**
 * Create new user profile account
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUser = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return next(
        createError({
          message:
            'An account with this email address already exists. Please login to continue.',
          status: CONFLICT,
        })
      );
    }

    req.body.password = hashHelper.hash(req.body.password);

    const user = await User.create(req.body);

    user.password = undefined;

    const payload = {
      id: user._id,
    };

    const options = {
      expiresIn: '24h',
    };

    const token = auth.generateToken(payload, options);

    return res.status(CREATED).json(
      handleResponse({
        message: 'Account created successfully',
        data: {
          token,
          user,
        },
      })
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not create new user',
        status: GENERIC_ERROR,
      })
    );
  }
};

module.exports = createUser;
