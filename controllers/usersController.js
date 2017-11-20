var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function show (req, res) {
  res.render('index', { user: req.user });
}

module.exports = {
  show
}
