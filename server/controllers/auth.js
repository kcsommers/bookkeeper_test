require('dotenv').config();
const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('../config/passportConfig.js')

// Create user with hashed password
const createUser = (userData, hash) => {
  const response = {user: null, error: null};

  return db.user.findOrCreate({
    defaults: {
      username: userData.username,
      email: userData.email,
      password: hash
    },
    where: {
      username: userData.username,
      email: userData.email
    }
  }).spread((user, created) => {
    if(created) {
      return {user}
    }
    else {
      return {error: {
        message: 'Sorry, the username or email you provided is already taken'
      }}
    }
  });
};

// MIDDLEWARE - bcrypt hash password
const hashPassword = (req, res, next) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  if(!userData.username || !userData.email || !userData.password) {
    res.status(422).send({error: 'Whoa there, you must provide a name, email and password'});
  }

  bcrypt.hash(userData.password, 12).then((hash) => {
    return createUser(userData, hash).then((response) => {
      if(response.user) {
        res.locals.username = response.user.dataValues.username
        res.locals.email = response.user.dataValues.email
        res.locals.password = response.user.dataValues.password
      }
      else {
        res.locals.error = response.error
      }
      next()
    }).catch((err) => {
      res.json({error: 'Error creating user', err})
    })
  }).catch((err) => {
    next(err)
  });
};

// MIDDLEWARE - GET TOKEN FROM REQ
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1]
    req.token = token;
    next();
  }
  else {
    res.sendStatus(403)
  }
};

// TOKEN VERIFICATION ROUTE
router.get('/verify', verifyToken, (req, res) => {
  console.log('HIT VERIFY TOKEN ROUTE')
  jwt.verify(req.token, process.env.AUTH_SECRET, (err, authData) => {
    if(!err) {
      db.user.find({
        where: {username: authData.user},
        include: [{
          model: db.list,
          include: [db.book]
        }]
      }).then((user) => {
        db.quote.findAll({
          where: {userId: user.id}
        }).then((quotes) => {
          db.note.findAll({
            where: {userId: user.id}
          }).then((notes) => {
            console.log(user.dataValues)
            user.dataValues.lists.forEach((list) => {
              list.books.forEach((book) => {
                book.dataValues.notes = [];
                book.dataValues.quotes = [];
              })
            })

            notes.forEach((note) => {
              user.dataValues.lists.forEach((list) => {
                list.books.forEach((book) => {
                  if(book.id === note.bookId) {
                    book.dataValues.notes.push(note)
                  }
                })
              })  
            })

            quotes.forEach((quote) => {
              user.dataValues.lists.forEach((list) => {
                list.books.forEach((book) => {
                  if(book.id === quote.bookId) {
                    book.dataValues.quotes.push(quote)
                  }
                })
              })  
            })

            res.json({authUser: user, verified: true});
          })
        })
      });
    }
    else {
      res.json({err, verified: false});
    }
  })
});

// LOGIN ROUTE
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  console.log("HIT LOGIN ROUTE")
  jwt.sign(
    {user: req.body.username}, 
    process.env.AUTH_SECRET,
    {expiresIn: '1h'},
    (err, token) => {
      if(!err) {
        db.user.find({
          where: {username: req.body.username},
          include: [{
            model: db.list,
            include: [db.book]  
          }]
        }).then((user) => {
          res.json({authUser: user.dataValues, token})
        })
      }
      else {
        console.log('ERRRRRRR', err)
        res.json({err})
      }
    });
});

// SIGNUP ROUTE
router.post('/signup', hashPassword, (req, res) => {
  console.log("HIT SIGNUP ROUTE")
  if(!res.locals.error) {
    jwt.sign(
      {user: res.locals}, 
      process.env.AUTH_SECRET, 
      {expiresIn: '1h'}, 
      (err, token) => {
        if(!err) {
          res.json({token})
        }
        else {
          res.json({err})
        }
      });
  }
  else {
    res.json({error: res.locals.error})
  }
});


module.exports = {router}