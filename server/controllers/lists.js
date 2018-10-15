require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  const listData = req.body
  db.list.create({
    name: listData.name,
    userId: listData.userId
  }).then((list) => {
    res.json({list})
  }).catch((err) => {
    console.log("ERROR CREATING LIST IN DB")
    res.json({err})
  });
});


module.exports = {router}