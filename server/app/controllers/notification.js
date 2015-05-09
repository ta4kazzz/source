// Load the Required packages
var User 		 = require('../models/user');
var Article		 = require('../models/article.js');
var mongoose 	 = require('mongoose');



// ====================================================
//               /users/:id/notifications
// ====================================================

exports.getNotifications = function(req, res) {
  console.log("Getting Notifications");

  var userID = mongoose.Types.ObjectId(req.params.id);


  User
    .findById(userID)
    .select('-__v')
    .populate('notifications')
    .sort({created: 'desc'})
    .exec(function(err, user) {
			res.send(user.notifications)
      console.log(user.notifications);
		});

};
