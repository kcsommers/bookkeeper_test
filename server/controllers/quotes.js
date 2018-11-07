require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer')().single();
router.use(multer);

router.post('/', (req, res) => {
  console.log("HIT CREATE QUOTE ROUTE")
  const inputData = JSON.parse(req.body.inputData);
  const modelData = JSON.parse(req.body.modelData);
  db.quote.create({
    content: inputData.content,
    page: inputData.page,
    userId: modelData.userId,
    bookId: modelData.bookId
  }).then((quote) => {
    res.json({quote})
  }).catch((err) => {
    console.log('ERROR CREATING QUOTE IN DB', err)
    res.json({err})
  });
});

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE QUOTE ROUTE')
  db.quote.destroy({
    where: {id: req.params.id}
  }).then((result) => {
    res.json({result})
  }).catch((err) => {
    console.log('ERROR DELETING QUOTE FROM DB', err)
    res.json({err})
  });
});


module.exports = {router}