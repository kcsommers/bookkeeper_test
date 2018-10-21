require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log('HIT CREATE LIST ROUTE')
  const listData = req.body
  db.list.create({
    name: listData.name,
    userId: listData.userId
  }).then((list) => {
    list.dataValues.books = []
    res.json({list: list.dataValues})
  }).catch((err) => {
    console.log("ERROR CREATING LIST IN DB")
    res.json({err})
  });
});


module.exports = {router}