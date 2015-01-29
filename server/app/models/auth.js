var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// define the schema for our user model
var AuthSchema = new Schema({
      username: String,
      email: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Auth', AuthSchema);