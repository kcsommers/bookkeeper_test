require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) => {
  console.log(req.body)
})


module.exports = {router}