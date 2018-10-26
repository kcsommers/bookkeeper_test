require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log('HIT CREATE ClUB ROUTE')
  db.club.create({
    name: req.body.name,
    description: req.body.description,
    admin: req.body.admin,
    topic: req.body.topic,
    imgUrl: req.body.imgUrl,
    bookImg: req.body.bookImg
  }).then((club) => {
    db.user.findById(req.body.miscData.userId).then((user) => {
      db.book.findById(req.body.miscData.bookId).then((book) => {
        club.addUser(user);
        club.addBook(book).then((result) => {
          club.dataValues.posts = []
          club.dataValues.users = [user]
          res.json({club})
        }).catch((err) => {
          console.log('ERROR ADDING BOOK TO CLUB', err)
        });
      }).catch((err) => {
        console.log('ERROR FINDING BOOK', err) 
        res.json({err})
      })
    }).catch((err) => {
      console.log('ERROR FINDING USER', err)
      res.json({err})
    });
  }).catch((err) => {
    console.log('ERROR CREATING CLUB IN DB', err)
    res.json({err})
  });
});

router.post('/join', (req, res) => {
  console.log('HIT JOIN CLUB ROUTE')
  db.clubsUsers.findOrCreate({
    defaults: {
      userId: req.body.userId,
      clubId: req.body.clubId
    },
    where: {
      clubId: req.body.clubId,
      userId: req.body.userId
    }
  }).spread((results, created) => {
    db.club.find({
      where: {id: req.body.clubId},
      include: [db.user]
    }).then((club) => {
      res.json({club})
    }).catch((err) => {
      console.log('ERROR FINDING CLUB', err)
      res.json({err})
    });
  }).catch((err) => {
    console.log('ERROR JOINING CLUB', err)
    res.json({err})
  });
});

router.get('/', (req, res) => {
  const q = req.query.q;
  db.club.findAll({
    where: {
      $or: [
        {name: {like: '%' + q + '%'}},
        {description: {like: '%' + q + '%'}},
        {topic: {like: '%' + q + '%'}}
      ]
    }
  }).then((clubs) => {
    res.json({items: clubs})
  }).catch((err) => {
    console.log('ERROR FINDING CLUBS', err)
    res.json({err})
  })
});

router.delete('/:id', (req, res) => {
  console.log("HIT DELETE CLUB ROUTE")
  db.club.destroy({
    where: {id: req.params.id}
  }).then((results) => {
    res.json({results})
  }).catch((err) => {
    console.log("ERROR DELETING CLUB FROM DB", err)
    res.json({err})
  })
});


module.exports = {router}