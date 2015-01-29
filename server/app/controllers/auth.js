// Load the Required packages
var Auth = require('../models/auth');


// Create endpoint /api/users for POST
exports.postAuth = function(req, res) {
	var auth = new Auth({
		username: req.body.username,
		email: req.body.email,
	});

	auth.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Authentication info has been saved' });
	});
};