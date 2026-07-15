const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/sightings', require('./sightings'));

// Send the user to GitHub to log in
router.get('/login', passport.authenticate('github'), (req, res) => {});

// GitHub sends the user back here after they log in
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/api-docs');
});

// Destroy the session and log the user out
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/api-docs');
  });
});

module.exports = router;