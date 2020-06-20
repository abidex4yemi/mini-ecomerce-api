/**
 * Application Main file
 */
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { NOT_FOUND } = require('./util/error');
const customErrorHandler = require('./middleware/customErrorHandler');
const { handleSuccessResponse, OK } = require('./util/success');

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

app.get('/', (req, res) =>
  res.status(OK).json(
    handleSuccessResponse({
      message: 'Welcome to API root...',
      data: [],
    })
  )
);

// Handle invalid request
app.all('*', (req, res) =>
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Route does not exist...',
    body: [],
  })
);

// handle all application level error
// eslint-disable-next-line max-len
app.use(customErrorHandler());

module.exports = app;
