var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = require('./user');

// NOTE schema here
var noteSchema = new Schema({
  content: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User'}
})


var restaurantSchema = new Schema({
  favorite: { type: Boolean, default: false },
  notes: [noteSchema]
})

module.exports = mongoose.model('User', userSchema);