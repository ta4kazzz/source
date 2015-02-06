// app/models/article.js
// load the things we need
var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;

var articleSchema = new Schema({
  _id:  Number,
  _userID: { type: Schema.Types.ObjectId, ref: 'user' },
  url: String,
  summary: String,
  created_at: Date,
  title: String,
  content: String,
  image_url: String,
  public: Boolean,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Article', articleSchema);