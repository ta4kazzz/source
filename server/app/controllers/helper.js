// Helper methods that can be called from all other controllers using require('./helper')

exports.isLoggedIn = function (req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.session.userId) {
            return next();
        } else {
            res.status(401);
            res.send('You are not authorized to view this page');
        }
};

