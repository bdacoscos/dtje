var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var request = require('request'); 
var passport = require('passport');

router.put('/users/:id', usersController.updateLocation);


module.exports = router;
