var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var request = require('request'); 
var passport = require('passport');

router.put('/:id', usersController.updateLocation);

module.exports = router;
