var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var yelp = require('../utilities/yelp');


// function index (req,res){
//     // Restaurant.findById({yelpId}, function(err, restaurant){
//     //     if (err) return res.status(err.statusCode || 500).json(err);
//     //     res.json(restaurant);
//     // });
// }

function show(req, res, next) {
    var location = req.body.location || req.query.location || "90057";
    yelp.randomRestaurant(location).then(function(restaurant) {
         res.render('show', { user: req.user, restaurant, location, mapKey: process.env.GOOGLE_MAPS });
         console.log(restaurant); 
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
                    console.log(restDoc);
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
        req.user.save(function(err, data) {
            res.render('user/favorites', {data}); 
        })
    }; 


function favorites(req, res) { 
    req.user.populate('favorites', function(err, user) {
        console.log(user);
        res.render('user/favorites', {user}); 
    });
}

module.exports = {
    show,
    like,
    favorites,
    unlike
}