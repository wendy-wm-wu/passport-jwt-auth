const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../utilities/utils');

router.get('/protected', (req, res, next) => {
  
});

router.post('/login', (req, res, next) => {

});

router.post('/register', (req, res, next) => {

});

module.exports = router;