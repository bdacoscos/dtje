var express = require('express');
var router = express.Router();
var request = require('request'); 
var passport = require('passport');
var yelp = require('./../utilities/yelp');

const reviewURL = 'https://api.yelp.com/v3/businesses'
const rootURL = 'https://api.yelp.com/v3/businesses/search'
var restaurantsController = require('../controllers/restaurantsController');

/* Landing Page */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/show', restaurantsController.show);
router.post('/show', restaurantsController.show);
router.get('/favorites', isLoggedIn, restaurantsController.favorites);
router.post('/restaurants/:yelpId/like', isLoggedIn, restaurantsController.like);
router.delete('/restaurants/:id/unlike', isLoggedIn, restaurantsController.unlike);
router.post('/favorites/:id', isLoggedIn, restaurantsController.postNote);
router.put('/favorites/:restId/notes/:noteId', isLoggedIn, restaurantsController.updateNote);
router.delete('/favorites/:restId/notes/:noteId', isLoggedIn, restaurantsController.deleteNote);

/* Google OAuth */ 
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;