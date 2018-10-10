require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(bp.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Hooked on ${port}`);
});