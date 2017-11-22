var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function updateLocation(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) console.log('ERROR = ', err)
    user.location = req.body.location;
    user.save(function(err) {
      if (err) {
        console.log("ERROR =", err)
      }
      res.redirect('/favorites');
    })
  });
}

module.exports = {
  updateLocation
}
