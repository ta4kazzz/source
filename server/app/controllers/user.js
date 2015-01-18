// Load the Required packages
var User = require('../models/user');


// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password,
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


// Need to add the rest of the functions here