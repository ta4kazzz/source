var mongoose 	 = require('mongoose');
var Schema       = mongoose.Schema;

var boardSchema = new Schema({
  _userID: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  created: { type: Date, default: Date.now },
  articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

module.exports = mongoose.model('Board', boardSchema);
