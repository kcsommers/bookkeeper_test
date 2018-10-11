require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const db = require('../models');
// const passport = require('../config/passportConfig');

router.post('/signup', (req, res) => {
  console.log("HIT SIGNUP ROUTE")
  console.log(req.body)
  res.sendStatus(200)
});


module.exports = {router}