// Load the Required packages
var User 		 			= require('../models/user');
var Article		 		= require('../models/article.js');
var Notification  = require('../models/notification.js');
var mongoose 	 	  = require('mongoose');

// 	  TABLE OF CONTENTS   ====================================================================
//
//		#postUser
//		#getUser
//		#putUser
//		#getHomeFeed
//
//		#getUsers
//
// ===========================================================================================


// ====================================================
//               #postUser
// ====================================================

// POST
exports.postUsers = function(req, res) {
	var user = new User({
		email: req.body.email,
		username: req.body.username,
		description: '',
		gravatarURL: req.body.gravatarURL,
		authID: req.body.authID,
		counts: {
			articles: 0,
			follows: 0,
			followed_by: 0
		}
	});

	user.save(function(err) {
		if (err)
			res.send(err);

		res.json(
			{
				message: 'New User has been added!',
				email: user.email,
				username: user.username,
				gravatarURL: user.gravatarURL
			}
		);
	});
};


// ====================================================
//               #getUser
// ====================================================

exports.getUser = function(req, res) {
	var id = req.params.id;

	User.findById(id, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
		// console.log(users);
	});

};


// ====================================================
//               #putUser
// ====================================================

exports.putUser = function(req, res) {

	var userID = req.body.userID;
	var username = req.body.username;
	var email = req.body.email;
	var description = req.body.description;

	User.findById(userID, function(err, user) {
    if (err)
      res.send(err);

    user.username = username;
		user.email = email;
		user.description = description;


    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });

};

// ====================================================
//               #getHomeFeed
// ====================================================

// GET
exports.getHomeFeed = function(req, res) {
	console.log(req.body);

	var userID = mongoose.Types.ObjectId(req.params.id);
	var feedCount = req.body.count;
	var minDate   = req.body.minID;
	// var minDate   = 1436318004568;

	console.log("the userID is " + userID);
	console.log("the COUNT is " + feedCount);

	User
		.findById(userID).exec(function(err, user) {

					// Store user.follows in followIDlist
					FollowIDs = [];

					// Fill FollowsID array with followers
		      for (var i = 0; i < user.follows.length; i++) {
						FollowIDs.push(user.follows[i]);
		      };

					Article
						.where('_userID').in(FollowIDs)
						.find({ "created": {$lt: minDate}})
						.limit(feedCount)
						.sort({created: 'desc'})
						.exec(function(err, articles) {
								res.send(articles)
						});

		});

};






// ====================================================
//               #getUsers
// ====================================================

exports.getUsers = function(req, res) {
	User.find(function(err, users) {
			if (err)
				res.send(err);
		res.json(users);
	});
};








// Need to work on this


// ====================================================
//               /users/:userID/articles
// ====================================================

// GET
exports.getUserArticles = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);


	User.findById(userID)
		// If this doesnt work uncomment this part
		// .populate('articles')
		.populate({path: 'articles', options: { sort: { 'created': -1 } } })
		// Need to return this most recent first
		// .sort({created: 'desc'})
		.exec(function(err, user) {
    	res.send(user.articles)
		});

};



// ====================================================
//               /users/:userID/saved
// ====================================================

// POST
exports.saveForLater = function(req, res) {

	var userID 		= mongoose.Types.ObjectId(req.body.userID);
	var articleID = mongoose.Types.ObjectId(req.body.articleID);

	console.log("The user id is " + userID);
	console.log("The article id is " + articleID);

	// Note to Self:for some reason this is returning null
	User.findByIdAndUpdate(
			userID,
			{$push: {"saved": articleID}},
			{safe: true, upsert: true},
			function(err, model) {
					// console.log(err);
					res.send(err)
			}
	);

};


// GET
exports.getSaved = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);
	console.log("The user id that is in question is " + userID);

	User.findById(userID).populate('saved').exec(function(err, user) {
    	res.send(user.saved)
	});

};

// DELETE
exports.deleteSaved = function(req, res) {


	var userID 		= mongoose.Types.ObjectId(req.body.userID);
	var articleID = mongoose.Types.ObjectId(req.body.articleID);

	console.log("The user id is " + userID);
	console.log("The article id is " + articleID);


	User.findByIdAndUpdate(
			userID,
			{$pull: {"saved": articleID}},
			{safe: true, upsert: true},
			function(err, user) {
				if (err)
			res.send(err);
		res.json(user);
			}
	);


};




// ====================================================
//               /users/:userID/follows
// ====================================================

// POST
exports.postFollows = function(req, res) {
	var myID = mongoose.Types.ObjectId(req.params.id);
	var userID = mongoose.Types.ObjectId(req.body._id);
	// add kai's userID to pat's followers
	console.log(myID);
	console.log(userID);

		// FEATURE TO ADD
		// IF the user already exists, do not push them to the database

		// ADDS user to my follows List
    User.findByIdAndUpdate(
        myID,
        {$push: {"follows": userID}},
        {safe: true, upsert: true},
        function(err, user) {
        	if (err)
				res.send(err);
				// comment this out because in this case we want to return bob instead
			// res.json(user);
        }
    );

		// ADDS alices name to bobs followers array
    User.findByIdAndUpdate(
        userID,
        {$push: {"followers": myID}},
        {safe: true, upsert: true},
        function(err, user) {
        	if (err)
					res.send(err);
					res.json(user);
        }
    );


		// Look up alice by ID and return her info
		User.findById(myID, function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
			var doer_username = users.username;
			console.log(doer_username);
			// function to send notification
			postNotification(doer_username);
		});

		// send notification to bob that alice is following him
		// build notificaiton object
		// post notification object to bobs notification array

		// NEEDS
		// alice username
		// alice id


		function postNotification(doer_username) {


				// BUILD THE NOTIFICATION OBJECT
				var notification = new Notification({
						doer_id: myID,
						doer_username: doer_username,
						articleOwner: userID,
						type: "is now following you",
						created: Date.now()
				});

				// PUSH NOTIFICATION TO USERS COLLECTION
				User
				.findByIdAndUpdate(
						notification.articleOwner,
						{$push: {"notifications": notification}},
						{safe: true, upsert: true},
						function(err, user) {
							if (err)
						res.send(err);
							res.json(notification);
						}
				);


				// SAVE NOTIFICATION OBJECT
				notification.save(function(err) {
					if (err)
						res.send(err);
					res.json(
						{
							message: 'New Notication Has been added',

						}
					);
				});

		}





};



// GET
exports.getFollows = function(req, res) {

	var id = mongoose.Types.ObjectId(req.params.id);

	User
		.findById(id)
		.select('-__v -authID -email -followers -counts -articles -email')
		.populate('follows', '-__v -authID -followers -counts -articles -follows -email')
		.exec(function(err, user) {
			res.send(user.follows)
		});

};



// DELETE
exports.deleteFollows = function(req, res) {

	var myID = mongoose.Types.ObjectId(req.params.id);
	var userID = mongoose.Types.ObjectId(req.body._id);

    User.findByIdAndUpdate(
        myID,
        {$pull: {"follows": userID}},
        {safe: true, upsert: true},
        function(err, user) {
        	if (err)
				res.send(err);
			res.json(user);
        }
    );

    User.findByIdAndUpdate(
        userID,
        {$pull: {"followers": myID}},
        {safe: true, upsert: true},
        function(err, user) {
        	if (err)
				res.send(err);
			res.json(user);
        }
    );

};


// ====================================================
//               /users/:userID/followers
// ====================================================



exports.getFollowers = function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);

	console.log(id);
	User.findById(id).populate('followers').exec(function(err, user) {
    	res.send(user.followers)
	});

};


// ====================================================
//               /users/:id/feed
// ====================================================

	// .where('userID')
	// .in(arrayOfFollowIDs)


exports.getUserFeed = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);


	User
		.findById(userID)
		.exec(function(err, user) {

			var data = user.follows;
			// console.log(data);
			// now the list of userIDs is in an array called data
			// we need to pass this into the other query
			// search those susers "recent array", or just get their most recent

			Article
				.where('_userID').in(data)
				.exec(function(err, user) {
					res.send(Article)
			});
	});



};


// ====================================================
//               /users/auth/:authID
// ====================================================

exports.getAuth = function(req, res) {

	var id = req.params.id;
	console.log(id);

	User.findOne({
		authID: id
	}, function(err, users) {
		if (err)
			res.send(err);
			console.log("There was an error finding a user with that auth id")
			res.json(users);
	});

};
