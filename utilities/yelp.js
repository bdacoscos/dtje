var request = require('request-promise-native'); 
const rootURL = 'https://api.yelp.com/v3/businesses/search';
const matchURL = 'https://api.yelp.com/v3/businesses';

function searchRestaurants(location) {
  var options = {
    url: `${rootURL}?term=restaurant&radius=1610&location=${location}`,
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


function getRestaurantById(yelpId){
  var options = {
    url: `${matchURL}/${yelpId}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.access_token
    }
  };
  console.log(options);
  return request(options).then(function(restaurant) {
    return JSON.parse(restaurant); 
  });
}

// function getReviews(restaurant){
//   var options = {
//     url: `${reviewURL}/${restaurant.id}/reviews`,
//     headers: {
//       'Authorization': 'Bearer ' + process.env.access_token
//     }
//   }
//   return request(options).then(function(restaurantData){
//     console.log(JSON.parse(restaurantData));
//     return JSON.parse(restaurantData);
//   });  
// };

module.exports = {
  searchRestaurants,
  randomRestaurant,
  getRestaurantById
}