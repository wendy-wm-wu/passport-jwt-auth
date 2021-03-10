const mongoose = require('mongoose');

require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const connection = mongoose.createConnection({
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: string
});

const User = connection.model('User', UserSchema);

module.exports = connection;
