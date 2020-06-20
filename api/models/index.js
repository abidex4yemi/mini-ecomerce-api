const mongoose = require('mongoose');

const { mongoURI, dbName } = require('../config/keys');

const connection = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: dbName,
});

module.exports = connection;
