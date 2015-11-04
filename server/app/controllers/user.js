// Load the Required packages
var User = require('../models/user');
var Article = require('../models/article.js');
var Notification = require('../models/notification.js');
var mongoose = require('mongoose');
var passport = require('passport');
var gravatar = require('gravatar');
var request = require('request');
// 	  TABLE OF CONTENTS   ====================================================================
//
//		#postUser
//		#getUser
//		#putUser
//		#getHomeFeed
//		#getUsers
//
// ===========================================================================================


// ====================================================
//               #postUser
// ====================================================

// POST
exports.postUsers = function (req, res) {
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
    
    user.save(function (err) {
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

exports.getUser = function (req, res) {
    var id = req.params.id;
    
    User.findById(id, function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
		// console.log(users);
    });

};


// ====================================================
//               #putUser
// ====================================================

exports.putUser = function (req, res) {
    
    var userID = req.body.userID;
    var username = req.body.username;
    var email = req.body.email;
    var description = req.body.description;
    
    User.findById(userID, function (err, user) {
        if (err)
            res.send(err);
        
        user.username = username;
        user.email = email;
        user.description = description;
        
        
        user.save(function (err) {
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
exports.getHomeFeed = function (req, res) {
    console.log(req.body);
    
    var userID = mongoose.Types.ObjectId(req.params.id);
    var feedCount = req.body.count;
    var minDate = req.body.minID;
    
    console.log("the userID is " + userID);
    console.log("the COUNT is " + feedCount);
    
    User
		.findById(userID).exec(function (err, user) {
        
        // Store user.follows in followIDlist
        FollowIDs = [];
        
        // Fill FollowsID array with followers
        for (var i = 0; i < user.follows.length; i++) {
            FollowIDs.push(user.follows[i]);
        }        ;
        
        Article
						.where('_userID').in(FollowIDs)
						.find({ "created": { $lt: minDate } })
						.limit(feedCount)
						.sort({ created: 'desc' })
						.exec(function (err, articles) {
            res.send(articles);
        });

    });

};

// ====================================================
//               #getHomeFeed with paging
// ====================================================
exports.getHomeFeedPaging = function (req, res) {
    console.log(req.body);
    
    var userID = mongoose.Types.ObjectId(req.params.id);
    
    var minDate = req.body.minID;
    var itemsPerPage = req.body.itemsPerPage;
    var pageNumber = req.body.pageNumber;
    
    User
    .findById(userID)
    .exec(function (err, user) {
        // Store user.follows in followIDlist
        FollowIDs = [];
        
        // Fill FollowsID array with followers
        for (var i = 0; i < user.follows.length; i++) {
            FollowIDs.push(user.follows[i]);
        }
        
        Article
          .where('_userID').in(FollowIDs)
          .where('public', true)
			   //.find({ "created": { $lt: minDate } })
               .skip(itemsPerPage * (pageNumber - 1))
               .limit(itemsPerPage)
			   .sort({ created: 'desc' })
			   .exec(function (err, articles) {
            return res.send(articles);
        });

    });
};




// ====================================================
//               #getUsers
// ====================================================

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
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
exports.getUserArticles = function (req, res) {
    
    var userID = mongoose.Types.ObjectId(req.params.id);
    
    
    User.findById(userID)
		// If this doesnt work uncomment this part
		// .populate('articles')
		.populate({ path: 'articles', options: { sort: { 'created': -1 } } })
		// Need to return this most recent first
		// .sort({created: 'desc'})
		.exec(function (err, user) {
        res.send(user.articles)
    });

};

// ====================================================
//               /users/:userID/saved
// ====================================================

// POST
exports.saveForLater = function (req, res) {
    
    var userID = mongoose.Types.ObjectId(req.body.userID);
    var articleID = mongoose.Types.ObjectId(req.body.articleID);
    
    console.log("The user id is " + userID);
    console.log("The article id is " + articleID);
    
    // Note to Self:for some reason this is returning null
    User.findByIdAndUpdate(
        userID,
			{ $push: { "saved": articleID } },
			{ safe: true, upsert: true },
			function (err, model) {
            // console.log(err);
            res.send(err)
        }
    );

};


// GET
exports.getSaved = function (req, res) {
    
    var userID = mongoose.Types.ObjectId(req.params.id);
    console.log("The user id that is in question is " + userID);
    
    User.findById(userID).populate('saved').exec(function (err, user) {
        res.send(user.saved)
    });

};

// DELETE
exports.deleteSaved = function (req, res) {
    
    
    var userID = mongoose.Types.ObjectId(req.body.userID);
    var articleID = mongoose.Types.ObjectId(req.body.articleID);
    
    console.log("The user id is " + userID);
    console.log("The article id is " + articleID);
    
    
    User.findByIdAndUpdate(
        userID,
			{ $pull: { "saved": articleID } },
			{ safe: true, upsert: true },
			function (err, user) {
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
exports.postFollows = function (req, res) {
    var myID = mongoose.Types.ObjectId(req.params.id);
    var userID = mongoose.Types.ObjectId(req.body._id);
    var userIdToFollow = req.body._id;
    var currentUserId = req.params.id;
    
    // add kai's userID to pat's followers
    console.log(myID);
    console.log(userID);
    
    User.findById(myID, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            for (var i = 0; i < user.follows.length; i++) {
                //  var currentUserId = mongoose.Types.ObjectId(user.follows[i]);
                if (user.follows[i] == userIdToFollow) {
                    // IF the user already exists in follows list do not push them to the database
                    console.log('User already followed!');
                    return res.send('User already followed!');
                }
            }
            
            // All good we can add the user
            User.findByIdAndUpdate(myID, { $push: { "follows": userID } }, { safe: true, upsert: true }, function (err, user) {
                if (err) {
                    return res.send(err);
                }
            });
            
            checkOtherUser();
        }
    });
    
    function checkOtherUser() {
        // Find the other user
        User.findById(userID, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                for (var i = 0; i < user.followers.length; i++) {
                    if (user.followers[i] == currentUserId) {
                        // IF the user already exists in followers list do not push them to the database
                        console.log('User already in followers list!');
                        return res.send('User already in followers list');
                    }
                }
                
                // ADDS alices name to bobs followers array
                User.findByIdAndUpdate(userID, { $push: { "followers": myID } }, { safe: true, upsert: true }, function (err, user) {
                    if (err) {
                        return res.send(err);
                    }
                 //   res.json(user);
                });
            }
        });
        
        // Look up alice by ID and return her info
        User.findById(myID, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
            var doer_username = users.username;
            console.log(doer_username);
            // function to send notification
            postNotification(doer_username);
        });
    };
    
    
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
        User.findByIdAndUpdate(notification.articleOwner, { $push: { "notifications": notification } }, { safe: true, upsert: true }, function (err, user) {
            if (err)
                res.send(err);
            //res.send(notification);
        });
        
        // SAVE NOTIFICATION OBJECT
        notification.save(function (err) {
            if (err)
                res.send(err);
            //res.json({message: 'New Notication Has been added'});
        });
    }
};

// GET
exports.getFollows = function (req, res) {
    
    var id = mongoose.Types.ObjectId(req.params.id);
    
    User
		.findById(id)
		.select('-__v -authID -email -followers -counts -articles -email')
		.populate('follows', '-__v -authID -followers -counts -articles -follows -email')
		.exec(function (err, user) {
        res.send(user.follows)
    });

};



// DELETE
exports.deleteFollows = function (req, res) {
    
    var myID = mongoose.Types.ObjectId(req.params.id);
    var userID = mongoose.Types.ObjectId(req.body._id);
    
    User.findByIdAndUpdate(
        myID,
        { $pull: { "follows": userID } },
        { safe: true, upsert: true },
        function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        }
    );
    
    User.findByIdAndUpdate(
        userID,
        { $pull: { "followers": myID } },
        { safe: true, upsert: true },
        function (err, user) {
            if (err)
                res.send(err);
         //   res.send(user);
        }
    );

};


// ====================================================
//               /users/:userID/followers
// ====================================================




exports.getFollowers = function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    
    console.log(id);
    User.findById(id).populate('followers').exec(function (err, user) {
        res.send(user.followers)
    });

};


// ====================================================
//               /users/:id/feed
// ====================================================

// .where('userID')
// .in(arrayOfFollowIDs)


exports.getUserFeed = function (req, res) {
    
    var userID = mongoose.Types.ObjectId(req.params.id);
    
    
    User
		.findById(userID)
		.exec(function (err, user) {
        
        var data = user.follows;
        // console.log(data);
        // now the list of userIDs is in an array called data
        // we need to pass this into the other query
        // search those susers "recent array", or just get their most recent
        
        Article
				.where('_userID').in(data)
				.exec(function (err, user) {
            res.send(Article)
        });
    });



};


// ====================================================
//               /users/auth/:authID
// ====================================================

exports.getAuth = function (req, res) {
    
    var id = req.params.id;
    console.log(id);
    
    User.findOne({
        authID: id
    }, function (err, users) {
        if (err)
            res.send(err);
        console.log("There was an error finding a user with that auth id")
        res.json(users);
    });

};

//Main method where the user logs in and is authenticated by node passport
exports.connect = function (req, res) {
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    User.findOne({ $or: [{ 'username': req.body.username }, { 'email': req.body.username }] }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            req.session.userId = user.id; // set the userId so we can protect the methods
            res.send(user);
        }
    });
};

exports.signup = function (req, res) {
    var gravatarURL = '';
    var description = '';
    
    if (req.body.description) {
        description = req.body.description;
    }
    
    if (req.body.gravatarURL) {
        gravatarURL = req.body.gravatarURL;
    } else {
        //get gravatar image
        gravatarURL = gravatar.url(req.body.email, { s: '200', r: 'pg', d: '404' }, false);
        request(gravatarURL, function (error, response, body) {
            if (!error) {
                if (response.statusCode === 404) {
                    // get new image from first letters
                    var monkeyPlace = req.body.email.indexOf('@');
                    var twoLetters = '';
                    if (monkeyPlace === 1) {
                        var firstLetter = req.body.email.substr(0, monkeyPlace).toLowerCase();
                        twoLetters = firstLetter + firstLetter;
                    } else {
                        twoLetters = req.body.email.substr(0, 2).toLowerCase();
                    }
                    gravatarURL = 'https://i1.wp.com/cdn.auth0.com/avatars/' + twoLetters + '.png?ssl=1';
                }
            } else {
                console.log(error);
            }
            
            registerUser();
        });
    }
    
    function registerUser() {
        User.register(new User({ username: req.body.username, password: req.body.password, email: req.body.email, gravatarURL: gravatarURL, description: description }), req.body.password, function (err, account) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                passport.serializeUser(User.serializeUser());
                req.session.userId = account.id; // set the userId so we can protect the methods
                console.log(passport.deserializeUser(User.deserializeUser()));
                res.send(account);
            }
        });
    }

};

exports.logout = function (req, res) {
    req.logout();
    req.session.userId = null; // clear the user
    
    res.status(200).send('ok');
};

exports.fbsignup = function (req, res, next) {
    User.findOne({ 'username': req.query.email }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (!result) { // first time
                User.register(new User({ username: req.query.email, password: req.query.access, email: req.query.email, fbId: req.query.fbId, fbUser: true, picture_url: req.body.picture_url, gravatarURL: req.body.picture_url, description: '' }), req.query.access, function (err, account) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        passport.serializeUser(User.serializeUser());
                        req.session.userId = account.id; // set the userId so we can protect the methods
                        console.log(passport.deserializeUser(User.deserializeUser()));
                        res.send(account);
                    }
                });
            } else { // already signed in
                //result[0].password = req.query.access;  // update pass as new access
                //result[0].save();
                req.session.userId = result.id; // set the userId so we can protect the methods
                res.send(result);
            }

        }
    });
};

exports.twittersignup = function (req, res, next) {
    User.findOne({ 'username': req.query.userName }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (!result) { // first time
                User.register(new User({ username: req.query.userName, password: req.query.secret, twitterId: req.query.userId, twitterToken: req.query.token, twitterUser: true, gravatarURL: req.body.pictureUrl }), req.query.secret, function (err, account) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        passport.serializeUser(User.serializeUser());
                        req.session.userId = account.id;
                        console.log(passport.deserializeUser(User.deserializeUser()));
                        
                        res.send(account);

                    }
                });
            } else { // already signed in
                req.session.userId = result.id; // set the userId so we can protect the methods
                res.send(result);
            }
        }
    });

};
