var apiController = require('../controllers/api/apiController');
var express = require('express');
var router = express.Router();

router.get('/api/restaurants', apiController.getAllRestaurants);

module.exports = router;