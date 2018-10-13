require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./controllers/auth');
const passport = require('./config/passportConfig.js')
app.use(express.static(__dirname + 'static'));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use('/auth', auth.router);

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Hooked on ${port}`);
});