var request = require('request-promise-native'); 
const rootURL = 'https://api.yelp.com/v3/businesses/search';

function searchRestaurants(location) {
  var options = {
    url: `${rootURL}?=restaurant&radius=1610&location=${location}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  return request(options).then(function(restaurantData){
    return JSON.parse(restaurantData).businesses;
  });
}

function randomRestaurant(location) {
  return searchRestaurants(location).then(function(restaurants) {
    return restaurants[Math.floor(Math.random() * restaurants.length)];
  });
}

module.exports = {
  searchRestaurants,
  randomRestaurant
}