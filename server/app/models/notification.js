// app/models/notification.js
// load the things we need
var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;
//var deepPopulate = require('mongoose-deep-populate');


var notificationSchema = new Schema({
  doer_username: String,
  doer_id: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  articleOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  // articleOwnerID: { type: Schema.Types.ObjectId, ref: 'User' },
  associated_article: { type: Schema.Types.ObjectId, ref: 'Article' },
  imageUrl: String,
  created: String,
  read: Boolean
});

//notificationSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('Notification', notificationSchema);
