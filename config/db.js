var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://Foodie:food123@ds036079.mlab.com:36079/dtje');
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB: ${db.host}:${db.port}`);
});

db.on('error', (err) => {
  console.error(`Database error:\n ${err}`);
});
