var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');



var commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: String,
  text: String,
  article : { type: Schema.Types.ObjectId, ref: 'Article' },
});


commentSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);