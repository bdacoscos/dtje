var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function updateLocation(req, res) {
  console.log(req.user);
  console.log('hi' + req.params.id);
  User.findByIdAndUpdate(req.params.id, function (err, user) {
    user.location = req.body.location;
    user.save();
    res.redirect('/favorites');
  });
}

module.exports = {
  updateLocation
}
