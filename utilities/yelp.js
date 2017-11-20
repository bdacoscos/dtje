var request = require('request'); 
const rootURL = 'https://api.yelp.com/v3/businesses/search';

function searchRestaurant(req, res) {
  var options = {
    url: `${rootURL}?=restaurant&radius=1610&location=${req.body.location}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  request(options, function (err, response, body) {
    var restaurantData = JSON.parse(body);
    var random = randomRestaurant(restaurantData.businesses)
    console.log(random)
    if (restaurantData.total === undefined) {
      res.render('index', { user: req.user })
    }
    res.render('show', { random, user: req.user });
  });
}

function randomRestaurant(restaurantData) {
  var random = Math.floor(Math.random() * (20 - 1)) + 1;
  return restaurantData[random]
}

module.exports = {
  searchRestaurant,
  randomRestaurant
}