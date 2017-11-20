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

module.exports = {
    show
}