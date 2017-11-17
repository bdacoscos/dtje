var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = require('./user');

// NOTE schema here
var noteSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
});


var restaurantSchema = new Schema({
  yelpId: String,
  name: String,
  city: String,
  address: String,
  categories: [String],
  rating: Number,
  reviewCount: Number,
  notes: [noteSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
