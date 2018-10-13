const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

// this turns the user into jsut an id for serializing (sending over wire)
passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

// this takes that id and looks up the user in the database
passport.deserializeUser(function(id, cb) {
	db.user.findById(id).then(function(user) {
		cb(null, user);
	}).catch(cb);
});

const localOptions = {usernameField: 'username', passwordField: 'password'};

const localLogin = new LocalStrategy(localOptions, (name, password, cb) => {
  db.user.find({where: {username: name}})
  .then((user) => {
    if(!user) {
      console.log('NO USER OR BAD PASSWORD');
      cb(null, false);
    }
    else {
      bcrypt.compare(password, user.password)
      .then((validPassword) => {
        if(validPassword) {
          return cb(null, user)
        }
        else {
          return cb(null, false)
        }
      })
    }
  }).catch((err) => {cb(err, false)});
});

passport.use(localLogin);

module.exports = passport;