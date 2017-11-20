var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');
var request = require('request'); 
var passport = require('passport');


/* GET users listing. */
router.get('/show', user.show)




module.exports = router;
