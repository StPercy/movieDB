const https = require('https');
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

//more Middleware & Uses
app.use(morgan('common', {immediate: true}))
app.use('/movie', movieRouter);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const options = {
    key: fs.readFileSync(''),
    cert: fs.readFileSync('')
};
// get a certificate from e.g. letsencrypt.org
https.createServer(options, app).listen(8080, () => {
    console.log('Server started on https://localhost:8080 🚀');
});