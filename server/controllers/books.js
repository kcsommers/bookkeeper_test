require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log('HIT CREATE BOOK ROUTE')
  const bookData = req.body.bookData
  const listData = req.body.list
  db.book.create({
    title: bookData.title,
    authors: bookData.authors,
    description: bookData.description,
    imgUrl: bookData.imgUrl,
    banner: bookData.banner,
    userId: bookData.userId
  }).then((book) => {
    db.list.findById(listData.id).then((list) => {
      list.addBook(book).then((data) => {
        res.json({list})
      }).catch((err) => {
        console.log("ERROR ADDING BOOK TO LIST", err)
        res.json({err})
      })
    }).catch((err) => {
      console.log("ERROR FIND LIST IN DB", err)
      res.json({err})
    })
  }).catch((err) => {
    console.log("ERROR CREATING BOOK IN DB", err)
    res.json({err})
  });
});


module.exports = {router}