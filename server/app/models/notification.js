// app/models/notification.js
// load the things we need
var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;


var notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: String,
  associated_article: { type: Schema.Types.ObjectId, ref: 'Article' },
  read: Boolean,
  type: String
});

notificationSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Article', notificationSchema);