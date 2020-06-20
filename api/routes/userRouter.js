const express = require('express');

const userController = require('../controllers/user');
const validateSignupData = require('../middleware/validateSignupData');
const validateLoginCredential = require('../middleware/validateLoginData');

const userRouter = express.Router();

userRouter
  .route('/auth/signup')
  .post(validateSignupData, userController.createUser);

userRouter
  .route('/auth/login')
  .post(validateLoginCredential, userController.login);

module.exports = userRouter;
