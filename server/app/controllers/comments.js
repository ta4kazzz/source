// Load the Required packages
var User 		 = require('../models/user');
var Article		 = require('../models/article.js');
var Comment		 = require('../models/comments.js');

var mongoose 	 = require('mongoose');


// ====================================================
//               /articles/:articleID/comments
// ====================================================

exports.postComment = function(req, res) {
	// New comment object
	var comment = new Comment();

	// convert the ID into ID objects
	var userID    = mongoose.Types.ObjectId(req.body.userID);
 	var articleID = mongoose.Types.ObjectId(req.params.id);

 	// get comment _id
 	var commentID = comment._id;

	// Find the article by ID and push comment id to articles array
    Article.findByIdAndUpdate(
        articleID,
        {$push: {"comments": commentID}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );

    comment.userID = userID;
    comment.comment = req.body.comment;
    comment.article = articleID;

	comment.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'New Comment has been posted' });
	});

};







// exports.getComments = function(req, res) {
// 	var articleID = req.params.id;

// 	Comment.findById(id, function(err, users) {
// 		if (err)
// 			res.send(err);
// 		res.json(users);
// 	});
// };