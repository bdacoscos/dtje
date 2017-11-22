var User = require('../models/user');
var Restaurant = require('../models/restaurant')

function updateLocation(req, res) {
  

  User.findById(req.params.id, function (err, user) {
    if (err) console.log('ERROR = ', err)
    console.log('user =', user)
    console.log('req.body.location =', req.body.location)
    user.location = req.body.location;
    console.log('now user =', user)
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
