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

		res.json({ message: 'New User has been added!' });
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
exports.getArticles = function(req, res) {

	var userID = mongoose.Types.ObjectId(req.params.id);
	console.log(userID);

	User.findById(userID).populate('articles').exec(function(err, user) {
    	res.send(user.articles)
	});

};


// ====================================================
//               /users/:userID/follows
// ====================================================


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

exports.getFollows = function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);

	User.findById(id).populate('follows').exec(function(err, user) {
    	res.send(user.follows)
	});

};

exports.deleteFollows = function(req, res) {
	var myID = mongoose.Types.ObjectId(req.params.id);
	var userID = mongoose.Types.ObjectId(req.body._id);

	console.log(myID);
	console.log(userID);

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
//               /users/:userID/followed-by
// ====================================================

// exports.postFollows0 = function(req, res) {
// 	var myID = mongoose.Types.ObjectId(req.params.id);
// 	var userID = mongoose.Types.ObjectId(req.body._id);
// 	console.log("my ID " + myID);
// 	console.log("kai ID" + userID);


// 	// Need to implement the logic (if there is already a userID)
//     User.findByIdAndUpdate(
//         myID,
//         {$push: {"follows": userID}},
//         {safe: true, upsert: true},
//         function(err, user) {
//         	if (err)
// 				res.send(err);
// 			res.json(user);
//         }
//     );

// 	// Need to implement the logic (if there is already a userID)
//     User.findByIdAndUpdate(
//         userID,
//         {$push: {"follows": myID}},
//         {safe: true, upsert: true},
//         function(err, user) {
//         	if (err)
// 				res.send(err);
// 			res.json(user);
//         }
//     );
// };

// exports.deleteFollowers = function(req, res) {
// 	var myID = mongoose.Types.ObjectId(req.params.id);
// 	var userID = mongoose.Types.ObjectId(req.body._id);

// 	// find by id and delete the user from the follow list
	
// };


exports.getFollowers = function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);

	console.log(id);
	User.findById(id).populate('followers').exec(function(err, user) {
    	res.send(user.followers)
	});

};


// ====================================================
//               /users/:userID/feed
// ====================================================

exports.getFeed = function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);


	// GET HOME FEED
	// 1 ) Search by id and get followers
	// 2 ) Populate those users articles

	
	// Advanced Mongo Query Syntax
	



};



// ====================================================
//               /users/auth/:authID
// ====================================================

exports.getAuth = function(req, res) {

	var id = req.params.id;

	User.findOne({
		authID: id
	}, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});

};




