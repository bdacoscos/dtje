var express = require('express');
var passport = require('passport');
var router = express.Router();
var request = require('request'); 
const rootURL = 'https://api.yelp.com/v3/businesses/search'
var restaurantsController = require('../controllers/restaurantsController');





router.post('/', function(req, res) {
  var options = {
    url: 'https://api.yelp.com/v3/businesses/search?=restaurant&location=boulder',
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  request(options, function(err, response, body) {
    console.log('hi')
  });
});








// router.get('/', function(req, res, next) {
//   res.render('index', {user: req.user});
// });

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
