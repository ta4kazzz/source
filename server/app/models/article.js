// app/models/article.js
// load the things we need
var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;

var articleSchema = new Schema({
  _userID: { type: Schema.Types.ObjectId, ref: 'user' },
  username: String,
  gravatar_url: String,
  url: String,
  summary: String,
  created: String,
  title: String,
  content: String,
  imageUrl: String,
  public: Boolean,
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Article', articleSchema);