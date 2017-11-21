var Restaurant = require('../models/restaurant');
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
         res.render('show', { user: req.user, restaurant, location });
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


function favorites(req, res) { 
    req.user.populate('favorites', function(err, user) {
        console.log(user);
        res.render('user/favorites', {user}); 
    });
}

module.exports = {
    show,
    like,
    favorites
}