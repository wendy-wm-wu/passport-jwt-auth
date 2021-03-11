const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

require ('dotenv').config();

const app = express();
const port = process.env.PORT;
require('./config/database');
require('./models/user');
require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.use(require('./routes'));

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
