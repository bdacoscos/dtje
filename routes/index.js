var express = require('express');
var router = express.Router();
var request = require('request'); 
var passport = require('passport');
var yelp = require('./../utilities/yelp');

const reviewURL = 'https://api.yelp.com/v3/businesses'
const rootURL = 'https://api.yelp.com/v3/businesses/search'
var restaurantsController = require('../controllers/restaurantsController');


router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/show', restaurantsController.show);
router.post('/show', restaurantsController.show);

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

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
