var express = require('express');
var router = express.Router();
var request = require('request'); 
var passport = require('passport');

const rootURL = 'https://api.yelp.com/v3/businesses/search'
var restaurantsController = require('../controllers/restaurantsController');



router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/show', function(req, res, next) {
  res.render('show', {user: req.user});
});


router.post('/show', function(req, res) {
  var options = {
    url: `${rootURL}?=restaurant&location=boulder`,
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  request(options, function (err, response, body) {
    var restaurantData = JSON.parse(body);
    res.render('show', { restaurantData, user: req.user });
    console.log(restaurantData);
  });
});


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


// router.post('/', function(req, res) {
//   request(
//     rootURL + '' + req.body + 
//       '?Bearer ' + process.env.access_token,
//     function(err, response, body) {
//       res.render('index', {restaurant: body});
//     }
//   );
// });


module.exports = router;
