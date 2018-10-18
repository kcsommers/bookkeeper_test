require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + 'static'));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use('/auth', require('./controllers/auth').router);
app.use('/books', require('./controllers/books').router);
app.use('/lists', require('./controllers/lists').router);
app.use('/notes', require('./controllers/notes').router);
app.use('/quotes', require('./controllers/quotes').router);

app.listen(port, () => {console.log(`Hooked on ${port}`);});

