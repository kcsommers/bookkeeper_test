require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer')().single();
router.use(multer);

router.post('/', (req, res) => {
  console.log("HIT CREATE nOTE ROUTE")
  const inputData = JSON.parse(req.body.inputData);
  const modelData = JSON.parse(req.body.modelData);
  db.note.create({
    content: inputData.content,
    userId: modelData.userId,
    bookId: modelData.bookId
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