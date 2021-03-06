// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var Config = require('../../config/database.js');
//var db = mongoose.createConnection(Config.url);
//var deepPopulate = require('mongoose-deep-populate');


var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  gravatarURL: String,
  description: String,
  authID: String,
  counts: {
    articles: Number,
    follows: Number,
    followed_by: Number
  },
  articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  saved : [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  follows: [{ type: Schema.Types.ObjectId, ref: 'User'  }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notifications : [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  fbUser: { type: Boolean },
  fbId: { type: String },
  picture_url: { type: String },
  twiterrId: { type: String },
  twiterrToken: { type: String },
  twitterUser: { type: Boolean }
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

// Verify Password
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

UserSchema.plugin(passportLocalMongoose);
//db.on('connected', function (err) {
//    if (err) console.trace(err);
//    else console.log("account db up!");
//});
// create the model for users and expose it to our app
//UserSchema.plugin(deepPopulate);
module.exports = mongoose.model('User', UserSchema);
