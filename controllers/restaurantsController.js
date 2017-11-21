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
            var savePromise = req.user.save(); 
        } else {
            yelp.getRestaurantById(req.params.yelpId).then(function(rest) {
                Restaurant.create({
                    yelpId: rest.id, 
                    name: rest.name,
                    address: rest.display_address,
                    categories: rest.categories,
                    rating: rest.rating,
                    reviewCount: rest.review_count,
                }, function(restDoc){
                    req.user.favorites.push(restDoc._id); 
                    var savePromise = req.user.save();                    
                });
            });
        }
        savePromise.then(function(){
            res.redirect('/favorites')
        });
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