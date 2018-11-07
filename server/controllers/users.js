require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const uploader = multer({dest: 'uploads/'});
const uploadToCloudinary = require('../sharedFunctions').uploadToCloudinary;

router.post('/update', uploader.fields([{name: 'image'}, {name: 'banner'}]), (req, res) => {
  console.log("HIT UPDATE USER ROUTE")
  let miscData = JSON.parse(req.body.miscData)
  let newData = JSON.parse(req.body.inputData)
  if(req.files) {
    uploadToCloudinary(req.files).then((imgUrls) => {
      newData = Object.assign(newData, imgUrls)
      db.user.update(newData, {
        where: {id: miscData.userId}
      }).then((userResult) => {
        res.json({success: userResult, miscData, newData, type: 'user'});
      }).catch((err) => {
        console.log('ERROR UPDATUBG USER', err)
        res.json({err});
      });
    }).catch((err) => {
      console.log('ERROR IN POST, UPLOADING TO CLOUDINARY', err)
      res.json({err})
    });
  }
  else {
    console.log('reqbody', req.body)
  }
});


module.exports = {router}