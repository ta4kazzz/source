// Load the Required packages
var Auth = require('../models/auth');


// Create endpoint /api/users for POST
exports.postAuth = function(req, res) {
	var auth = new Auth({
		userID: req.body.userID,
		email: req.body.email,
	});

	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Authentication info has been saved' });
	});
};



