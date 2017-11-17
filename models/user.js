var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurants = require('./restaurant');

var userSchema = new Schema({
  address: String,
  favorites: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
})

module.exports = mongoose.model('User', userSchema);