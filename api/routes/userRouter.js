const express = require('express');

const userController = require('../controllers/user');
const validateSignupData = require('../middleware/validateSignupData');

const userRouter = express.Router();

userRouter
  .route('/auth/signup')
  .post(validateSignupData, userController.createUser);

module.exports = userRouter;
