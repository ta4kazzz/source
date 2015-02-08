var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;

var commentSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'user' },
  // created_at: Date,
  comment: String,
  article : { type: Schema.Types.ObjectId, ref: 'Article' },
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);