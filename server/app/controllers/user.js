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
		password: req.body.password,
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
	var userID = mongoose.Types.ObjectId(req.body.userID);
	// add kai's userID to pat's followers


	// Need to implement the logic (if there is already a userID)
    User.findByIdAndUpdate(
        myID,
        {$push: {"followers": userID}},
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

	User.findById(id).populate('followers').exec(function(err, user) {
    	res.send(user.followers)
	});

	// User.findById(id, function(err, users) {
	// 	if (err)
	// 		res.send(err);
	// 	res.json(users);
	// });

};


// ====================================================
//               /users/:userID/followed-by
// ====================================================

exports.postFollowers = function(req, res) {


};

exports.getFollowers = function(req, res) {


};



// ====================================================
//               /users/auth/:authID
// ====================================================

exports.getAuth = function(req, res) {

	var id = req.params.authID;

	User.findOne({
		authID: id
	}, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});

};




