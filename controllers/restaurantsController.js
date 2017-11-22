var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var yelp = require('../utilities/yelp');


function show(req, res, next) {
  var location = req.body.location || req.query.location || "90057";
  yelp.randomRestaurant(location).then(function(restaurant) {
    res.render('show', { user: req.user, restaurant, location, mapKey: process.env.GOOGLE_MAPS });
  });
}

function like(req, res) {
  Restaurant.findOne({yelpId: req.params.yelpId}, function(err, restaurant){
    if (restaurant) {
      req.user.favorites.push(restaurant._id);
      req.user.save(function(err) {
          res.redirect('/favorites')
      }); 
    } else {
      yelp.getRestaurantById(req.params.yelpId).then(function(rest) {
        Restaurant.create({
          yelpId: rest.id, 
          name: rest.name,
          address: rest.location.display_address.join(', '),
          categories: rest.categories.map(cat => cat.title),
          coordinates: {latitude: rest.coordinates.latitude, longitude: rest.coordinates.longitude}, 
          rating: rest.rating,
          reviewCount: rest.review_count,
        }, function(err, restDoc){
          req.user.favorites.push(restDoc._id); 
          req.user.save(function(err) {
            res.redirect('/favorites')
          }); 
        });
      });
    }
  });
}

function unlike(req, res){
  req.user.favorites.remove(req.params.id);
  req.user.save(function(err, user) {
    res.redirect('/favorites'); 
  })
}

function favorites(req, res) {
  req.user.populate('favorites', function(err, user) {
    res.render('users/favorites', { user }); 
  });
}

function postNote(req, res) {
  Restaurant.findById(req.params.id, function(err, rest) {
    rest.notes.push({content: 'hi', user: req.user})
    rest.save();
    res.redirect('/favorites');
  });
  
}

module.exports = {
  show,
  like,
  favorites,
  unlike,
  postNote
}