const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon')
const path = require('path');
const { ensureLoggedIn } = require('connect-ensure-login');
const movieRouter = require('./movie');
const auth = require('./auth');

const app = express();

// Set the view engine to pug
app.set('view engine', 'pug');

// Middleware & Uses
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Auth
auth(app);

// Routes
app.get('/', (req, res) => {
    res.redirect('/movie');
});

// Middleware & Uses
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/movie', movieRouter);
app.use(morgan('common', {immediate: true}))

app.use('/movie', ensureLoggedIn('/login.html'), movieRouter);


app.listen(8989, () => {
    console.log('Server started on http://localhost:8989 🚀');
});