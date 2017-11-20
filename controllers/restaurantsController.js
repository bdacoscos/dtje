var Restaurant = ('./models/restaurant');

// function index (req,res){
//     // Restaurant.findById({yelpId}, function(err, restaurant){
//     //     if (err) return res.status(err.statusCode || 500).json(err);
//     //     res.json(restaurant);
//     // });
// }

function show(req, res, next) {
    res.render('show', { user: req.user });
}


module.exports = {
    show
}