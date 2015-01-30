// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

// define the schema for our user model
var UserSchema = new Schema({
      username:   String,
      email:      String,
      authID:     String,
      articles: [mongoose.Types.ObjectId],
});

// METHODS ======================
// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);