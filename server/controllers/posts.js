require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log('HIT CREATE POST ROUTE')
  db.post.create({
    content: req.body.content,
    clubId: req.body.clubId,
    userId: req.body.userId
  }).then((post) => {
    res.json({post})
  }).catch((err) => {
    console.log('ERROR CREATING POST', err)
    res.json({err})
  })
});


module.exports = {router}