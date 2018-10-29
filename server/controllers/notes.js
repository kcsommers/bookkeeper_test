require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log("HIT CREATE nOTE ROUTE")
  db.note.create({
    content: req.body.content,
    userId: req.body.userId,
    bookId: req.body.bookId
  }).then((note) => {
    res.json({note})
  }).catch((err) => {
    console.log('ERROR CREATING nOTE IN DB', err)
    res.json({err})
  });
});

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE NOTE ROUTE')
  db.note.destroy({
    where: {id: req.params.id}
  }).then((result) => {
    res.json({result})
  }).catch((err) => {
    console.log('ERROR DELETING NOTE FROM DB', err)
    res.json({err})
  });
});


module.exports = {router}