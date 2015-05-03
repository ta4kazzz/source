// Load the Required packages
var User 		 = require('../models/user');
var Article		 = require('../models/article.js');
var mongoose 	 = require('mongoose');


// ====================================================
//               /users
// ====================================================

// POST
exports.postUsers = function(req, res) {
	var user = new User({
		email: req.body.email,
		username: req.body.username,
		gravatarURL: req.body.gravatarURL,
		authID: req.body.authID,
		// password: req.body.password,
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




// GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
			if (err)
				res.send(err);
		res.json(users);
	});
};

// ====================================================
//               /users/:userID
// ====================================================

exports.getUser = function(req, res) {
	var id = req.params.id;


	User.findById(id, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});

};




// ====================================================
//               /users/:userID/articles
// ====================================================

// GET
exports.getArticles = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);
	// console.log(userID);

	User.findById(userID).populate('saved').exec(function(err, user) {
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

	User.findByIdAndUpdate(
			userID,
			{$push: {"saved": articleID}},
			{safe: true, upsert: true},
			function(err, model) {
					console.log(err);
			}
	);

};


// GET
exports.getSaved = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);

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

	// Need to implement the logic (if there is already a userID)
    User.findByIdAndUpdate(
        myID,
        {$push: {"follows": userID}},
        {safe: true, upsert: true},
        function(err, user) {
        	if (err)
				res.send(err);
			res.json(user);
        }
    );

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
