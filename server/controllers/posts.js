require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer')().single();
router.use(multer);

router.post('/', (req, res) => {
  console.log('HIT CREATE POST ROUTE')
  const inputData = JSON.parse(req.body.inputData);
  const modelData = JSON.parse(req.body.modelData);
  const miscData = JSON.parse(req.body.miscData);
  db.post.create({
    content: inputData.content,
    clubId: modelData.clubId,
    userId: modelData.userId
  }).then((post) => {
    post.dataValues.user = {username: miscData.username}
    console.log(post)
    res.json({post})
  }).catch((err) => {
    console.log('ERROR CREATING POST', err)
    res.json({err})
  })
});


module.exports = {router}