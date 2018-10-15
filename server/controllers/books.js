require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log('HIT CREATE BOOK ROUTE')
  const bookData = req.body.bookData
  const list = req.body.list
  db.book.create({
    title: bookData.title,
    authors: bookData.authors,
    description: bookData.description,
    imgUrl: bookData.imgUrl,
    banner: bookData.banner,
    userId: bookData.userId
  }).then((book) => {
    book.addList(list).then((list) => {
      res.json({book})
    }).catch((err) => {
      console.log('ERROR ADDING LIST TO BOOK', err)
      res.json({err})
    })
  }).catch((err) => {
    console.log('ERROR CREATING BOOK IN DB')
    res.json({err})
  });
});


module.exports = {router}