require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const uploader = multer({dest: 'uploads/'});
const uploadToCloudinary = require('../sharedFunctions').uploadToCloudinary;

router.post('/', (req, res) => {
  console.log('HIT CREATE BOOK ROUTE')
  const bookData = req.body.bookData
  const listData = req.body.list
  db.book.create({
    title: bookData.title,
    authors: bookData.authors,
    description: bookData.description,
    imgUrl: bookData.imgUrl,
    current: bookData.current,
    banner: 'https://res.cloudinary.com/kcsommers/image/upload/v1530509212/lflbvvr8kjmgae9suzov.jpg'
  }).then((book) => {
    db.list.findById(listData.id).then((list) => {
      list.addBook(book).then((lB) => {
        db.user.findById(bookData.userId).then((user) => {
          user.addBook(book).then((uB) => {
            book.dataValues.listsBooks = {listId: list.id, bookId: book.id};
            book.dataValues.quotes = [];
            book.dataValues.notes = [];
            res.json({book});
          }).catch((err) => {
            console.log("ERROR ADDING BOOK TO USER", err)
            res.json({err})
          });
        }).catch((err) => {
          console.log("ERROR FINDING USER IN DB", err)
          res.json({err})
        });
      }).catch((err) => {
        console.log("ERROR ADD BOOK TO LIST", err)
        res.json({err})
      });
    });
  }).catch((err) => {
    console.log("ERROR CREATING BOOK IN DB", err)
    res.json({err})
  });
});

router.get('/', (req, res) => {
  console.log('HIT GET BOOKS ROUTE')
  const term = req.query.q;
  db.book.findAll({
    where: {
      $or: [
        {title: {like: '%' + term + '%'}},
        {authors: {like: '%' + term + '%'}}
      ]
    },
    include: [db.user]
  }).then((books) => {
    res.json({items: books})
  }).catch((err) => {
    console.log("ERROR FINDING BOOKS IN DB", err)
    res.json({err});
  });
});

router.post('/update', uploader.fields([{name: 'image'}, {name: 'banner'}]), (req, res) => {
  console.log('HIT UPDAT BOOK ROUTE')

  let miscData = JSON.parse(req.body.miscData)
  let newData = JSON.parse(req.body.inputData)

  if(req.files) {
    uploadToCloudinary(req.files).then((imgUrls) => {
      newData = Object.assign(newData, imgUrls);
      db.book.update(newData, {
        where: {id: miscData.bookId}
      }).then((bookResult) => {
        res.json({success: bookResult, miscData, newData, type: "book"});
      }).catch((err) => {
        console.log("ERROR UPDATING BOOK IN DB", err);
        res.json({err});
      });
    }).catch((err) => {
      console.log("CONTROLLER, ERROR UPLOADING TO CLOUDINARY", err)
      res.json({err});
    });
  }
  else{
    console.log("NO IMAGES", req.body)
  }
});

router.delete('/:id', (req, res) => {
  console.log("HIT DELETE BOOK ROUTE")
  db.book.destroy({
    where: {id: req.params.id}
  }).then((bookResults) => {
    db.usersBooks.destroy({
      where: {bookId: req.params.id}
    }).then((results) => {
      res.json({results})
    }).catch((err) => {
      console.log("ERROR DELETING BOOK ASSOCIATIONS", err)
      res.json({err})
    })
  }).catch((err) => {
    console.log("ERROR DELETING BOOK FROM DB", err)
    res.json({err})
  })
})


module.exports = {router}