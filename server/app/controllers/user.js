// Load the Required packages
var User = require('../models/user');


// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		email: req.body.email,
		authID: req.body.authID,
	});

	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'New User has been added!' });
	});
};


// Create endpoint /api/users for GET
exports.getUser = function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
};

exports.getUserAuth = function(req, res) {
	User.findOne({
		authID: req.params.authID
	}, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
};

// Adds the article to the users article list
exports.postArticle = function(req, res) {
	// INCOMING
	// userID
	// articleID
	// article
	User.findById(req.body.userId, function (err, User) {
	  if (err) return next(err);

	  //adding data to schema here, like: lm.name = req.body.name;
	  console.log("WE are getting there" + articleID);

	  user.save(console.log);
	});

};