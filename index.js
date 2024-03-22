const spdy = require('spdy');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon')
const morgan = require('morgan');
const path = require('path');
const movieRouter = require('./movie');

const app = express();

// Middleware & Uses
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/movie');
});

// Middleware & Uses
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan('common', {immediate: true}))
app.use('/movie', movieRouter);

const options = {
    key: fs.readFileSync(__dirname + '/cert/localhost.key'),
    cert: fs.readFileSync(__dirname + '/cert/localhost.crt')
};

spdy.createServer(options, app).listen(8989, () => {
    console.log('Server started on https://localhost:8989 🚀');
});