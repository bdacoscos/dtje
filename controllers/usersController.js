var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function show (req, res) {
  console.log(req.user);
  res.render('user/show', { user: req.user });
}


module.exports = {
  show
}
