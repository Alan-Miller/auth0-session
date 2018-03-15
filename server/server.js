// REQUIRES
require('dotenv').config(); // allows environment variables
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , app = express()
    , api = require('./api')
    , { CONNECTION_STRING, 
        SESSION_SECRET,   
        PORT, 
        AUTH_DOMAIN, 
        AUTH_CLIENT_ID, 
        AUTH_CLIENT_SECRET, 
        AUTH_CALLBACK_URL 
      } = process.env;

// MIDDLEWARE
// app.use(express.static(`${__dirname}/../public/build`));
app.use(bodyParser.json());
massive(CONNECTION_STRING).then(db => app.set('db', db));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 900000 } // sesson lasts 5 minutes
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy(
  {
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // Use profile user_id to get user from db
    app.get('db').GET_user_by_auth_id([profile.identities[0].user_id])
    // If there is a user, store the user id
    .then(user => { 
      if (user[0]) done(null, user[0].id); 
    });
  }
));

// AUTH ENDPOINTS
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', 
  {
    successRedirect: 'http://localhost:3401/#/Dashboard/',
    failureRedirect: '/auth',
    failureFlash: true
  }
));

app.get('/auth/me', (req, res) => {
  if (!req.user) res.status(404).send('User not found!');
  else res.status(200).send(req.user);
});

app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(302, 'http://localhost:3401/');
});

passport.serializeUser((id, done) => done(null, id));
passport.deserializeUser((id, done) => {
  app.get('db').GET_user_by_id([id])
  .then(user => done(null, user[0]));
});

// API ENDPOINTS
api(app);

app.listen(PORT, _ => console.log(`Server listening on ${PORT}.`));