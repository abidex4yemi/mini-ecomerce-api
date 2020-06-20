/**
 * Application Main file
 */
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('./models');
const { NOT_FOUND } = require('./util/error');
const customErrorHandler = require('./middleware/customErrorHandler');
const { handleResponse, OK } = require('./util/success');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');

const app = express();

/**
 * Set up middleware
 */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(OK).json(
    handleResponse({
      message: 'Welcome to API root...',
      data: {
        login_url: '/api/v1/auth/login',
        sign_up_url: '/api/v1/auth/signup',
        products_url: {
          add_product: '/api/v1/products',
        },
        categories_url: {
          add_category: '/api/v1/categories',
        },
      },
    })
  );
});

app.use('/api/v1', [userRouter, productRouter, categoryRouter]);

// Handle invalid request
app.all('*', (req, res) => {
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Route does not exist...',
    body: [],
  });
});

// handle all application level error
// eslint-disable-next-line max-len
app.use(customErrorHandler());

module.exports = app;
