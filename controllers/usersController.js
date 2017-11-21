var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function show (req, res, next) {
  console.log(req.user);
  res.render('show', { user: req.user });
}




module.exports = {
  show
}
