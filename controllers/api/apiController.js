var Restaurant = require('./../../models/restaurant');

function getAllRestaurants(req, res) {
  Restaurant.find({}, function (err, restaurants) {
    res.status(200).json(restaurants);
  });
}

module.exports = {
  getAllRestaurants
}