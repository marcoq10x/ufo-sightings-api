const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/database');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Set up the session so the user can stay logged in
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Turn on passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({ origin: '*' }));

app.use('/', require('./routes'));

// Configure the GitHub login strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const db = mongodb.getDb().db();
    // Check if the user is already in our database to prevent duplicates
    const user = await db.collection('users').findOne({ githubId: profile.id });
    if (user) {
      return done(null, user);
    }
    
    // If this is a brand new user, we save their info to the database
    const newUser = {
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName || profile.username,
      profileUrl: profile.profileUrl
    };
    await db.collection('users').insertOne(newUser);
    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});