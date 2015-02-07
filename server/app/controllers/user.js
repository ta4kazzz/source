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
		password: req.body.password
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

	// var id = mongoose.Types.ObjectId(req.params.id);
	console.log("hello" + id);
	console.log(id);

	User.findById(id, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});

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




