const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes');
const connection = require('./database/config');
require('./auth/passport');
require('dotenv').config();

const MongoStore = require('connect-mongo')(session);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000);
