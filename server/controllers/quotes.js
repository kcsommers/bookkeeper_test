require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log("HIT CREATE QUOTE ROUTE")
  db.quote.create({
    content: req.body.content,
    page: req.body.page,
    userId: req.body.userId,
    bookId: req.body.bookId
  }).then((quote) => {
    res.json({quote})
  }).catch((err) => {
    console.log('ERROR CREATING QUOTE IN DB', err)
    res.json({err})
  });
})


module.exports = {router}