var request = require('request'); 
const rootURL = 'https://api.yelp.com/v3/businesses/search';


module.exports = {
  searchRestaurant
}


function searchRestaurant(req, res) {
  var options = {
    url: `${rootURL}?=restaurant&radius=1610&location=${req.body.location}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  request(options, function (err, response, body) {
    var restaurantData = JSON.parse(body);
    if (restaurantData.total === undefined) {
      res.render('index', { user: req.user })
    }
    res.render('show', { restaurantData, user: req.user });
  });
}

