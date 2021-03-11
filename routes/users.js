const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../utilities/utils');

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.status(200).json({ success: true, message: "you are authorized" });
});

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {

      if (!user) {
        res.status(401).json({ success: false, message: "could not find user" });
      }

      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {

        const tokenObject = utils.issueJWT(user);

        res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });

      } else {

        res.status(401).json({ success: false, message: "you entered the wrong password" });

      }
    })
    .catch(err => next(err));
});

router.post('/register', (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const hash = saltHash.hash;
  const salt = saltHash.salt;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt
  });

  newUser.save()
    .then((user) => {

      const jwt = utils.issueJWT(user);

      res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
    })
    .catch(err => next(err));
});

module.exports = router;