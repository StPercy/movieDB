const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((id, done) => {
        const user = {
            username: 'spertschi',
            firstname: 'Stefan',
            lastname: 'Pertschi',
        };
        done(null, user);
    });

    passport.use(
        new LocalStrategy((username, password, done) => {
        if (username === 'spertschi' && password === 'topsecret') {
            return done(null, {
                username: 'spertschi',
                firstname: 'Stefan',
                lastname: 'Pertschi',
            });
        } else {
            return done(null, false, { message: 'Incorrect credentials.' });
        }
    }),
    );

    app.use(expressSession({ 
        secret: 'topsecret',
        resave: false,
        saveUninitialized: false,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login.html'}),
    (req, res) => {
        res.redirect('/');
    });
    app.get('/logout', (req, res) => {
        req.logout(() => {
            res.redirect('/login.html');
        });
    });
    
};