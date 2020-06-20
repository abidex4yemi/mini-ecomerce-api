const mongoose = require('mongoose');

const { mongoURI, dbName } = require('../config/keys');
const userSchema = require('./user');

mongoose.model('User', userSchema);

const connectDB = (mongoUri, dbName) => {
  const mongooseOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: dbName,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected`);
  });
};

connectDB(mongoURI, dbName);
