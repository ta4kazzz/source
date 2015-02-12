// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;


var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  email: String,
  gravatarURL: String,
  authID: String,
  counts: {
    articles: Number,
    follows: Number,
    followed_by: Number
  },
  articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  follows: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// define the schema for our user model
// var UserSchema = new Schema({
//   _id:  Number,
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   full_name: String,
//   location: String,
//   email: String,
//   profile_picture: String,
//   banner_image: String,
//   tagline: String,
//   website: String,
//   counts: {
//     articles: Number,
//     follows: Number,
//     followed_by: Number
//   },
//   created_at: Date,
//   updated_at: Date,
//   articles : [{ type: Schema.Types.ObjectId, ref: 'article' }],
//   follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
//   followers: [{ type: Schema.Types.ObjectId, ref: 'user' }]
// });

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

// Verify Password
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);