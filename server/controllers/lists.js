require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer')().single();
router.use(multer)

router.post('/', (req, res) => {
  console.log('HIT CREATE LIST ROUTE')
  const inputData = JSON.parse(req.body.inputData);
  const modelData = JSON.parse(req.body.modelData);
  db.list.create({
    name: inputData.name,
    userId: modelData.userId
  }).then((list) => {
    list.dataValues.books = []
    res.json({list: list.dataValues})
  }).catch((err) => {
    console.log("ERROR CREATING LIST IN DB")
    res.json({err})
  });
});

router.post('/update', (req, res) => {
  console.log("HIT UPDATE LIST ROUTE")
  console.log(req.body)
  db.list.update(req.body.newData, {
    where: {
      id: req.body.id
    }
  }).then((list) => {
    res.json({list})
  }).catch((err) => {
    console.log("ERROR UPDATING LIST IN DB". err)
    res.json({err})
  })
})

router.delete('/:id', (req, res) => {
  console.log("HIT DELETE LIST ROUTE")
  db.list.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    db.listsBooks.destroy({
      where: {
        listId: req.params.id
      }
    }).then((results) => {
      res.json({results})
    }).catch((err) => {
      console.log("ERROR DESTROYING LISTSBOOKS ASSOCIATION", err)
      res.json({err})
    })
  }).catch((err) => {
    console.log("ERROR DELETING LIST FROM DB", err)
    res.json({err})
  })
});


module.exports = {router}