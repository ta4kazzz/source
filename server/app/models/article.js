// app/models/article.js
// load the things we need
var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var articleSchema = new Schema({
  _userID: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  gravatarURL: String,
  url: String,
  summary: String,
  created: String,
  title: String,
  content: String,
  imageUrl: String,
  public: Boolean,
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

articleSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Article', articleSchema);
