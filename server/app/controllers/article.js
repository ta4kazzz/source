// Load Models ==================================================
var Article		 	 = require('../models/article.js');
var User         = require('../models/user.js');
var Notification = require('../models/notification.js');
var unfluff      = require('unfluff');
var cheerio      = require('cheerio');
var request      = require('request');
var mongoose     = require('mongoose');



// ==================================
//               /articles
// ==================================


// POSTS
exports.postArticles = function(req, res) {
    // New Article object
	var article = new Article();

    article.url         = req.body.url;
    article.summary     = req.body.summary;
    article.created     = req.body.created;
    article.gravatarURL = req.body.gravatarURL;
    article.username    = req.body.username;

    // convert userID string to ObjectID
    var userID = mongoose.Types.ObjectId(req.body.userID);
    var articleID = article._id;

    // Saves to article
    article._userID = userID;


    User.findByIdAndUpdate(
        userID,
        {$push: {"articles": articleID}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );

    // URL to html
    var domain = article.url;

    // Gets the raw html from the domain name and execites the parseMyhtml function
    request(domain, function (error, response, body) {
        if (!error) {
            parseHtml(body);
        } else {
            console.log(error);
        }
    });

    var parseHtml = function(html) {

        data = unfluff.lazy(html, 'en');
        var title = data.title();
        var content = data.text();
        var imageUrl = data.image();

        article.title = title;
        article.content  = content;
        article.imageUrl = imageUrl;
        article.public = false;


        // save the bear and check for errors
        article.save(function(err) {
            if (err)
                res.send(err);
            res.json(article);
        });
    };

};



// GET
exports.getArticles = function(req, res) {
    // Article.find(function(err, articles) {
    //     if (err)
    //         res.send(err);
    //     res.json(articles);
    // });

		Article
			.find()
			.sort({created: 'desc'})
			.exec(function(err, articles) {
				res.send(articles)
		});
};


// ==========================================
//               /articles/top
// ==========================================

// GET
exports.getTopArticles = function(req, res) {

		console.log("Getting Top Articles in Server");

		Article
			.find()
			.sort({likes: 'desc'})
			.exec(function(err, articles) {
				res.send(articles)
		});


};


// ==========================================
//               /articles/:article_id
// ==========================================

// GET
exports.getArticle = function(req, res) {

    Article.findById(req.params.id, function(err, article) {
        if (err)
            res.send(err);
        res.json(article)
    });
};


// PUT
exports.putArticle = function(req, res) {

  Article.findById(req.params.id, function(err, article) {
    if (err)
      res.send(err);

    article.public = true;

    article.save(function(err) {
      if (err)
        res.send(err);

      res.json(article);
    });
  });

};


// DELETE
// Create endpoint /api/article/:article_id for DELETE
exports.deleteArticle = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Article.remove({ userId: req.userID, _id: req.params.article_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article successfully removed' });
  });
};


// ================================================
//               /articles/:article_id/likes
// ===============================================



// POST LIKES

exports.postLikes = function(req, res) {

	console.log("Posting Likes Now");

	var userID 								= mongoose.Types.ObjectId(req.body.userID);
	var articleID 						= mongoose.Types.ObjectId(req.body.articleID);
	var articleOwner 					= mongoose.Types.ObjectId(req.body.articleOwner);
	var articleImageUrl 			= req.body.imageUrl;

	// console.log("The articleOwner id is " + articleOwner);
	// console.log("The article id is " + articleID);

	Article.findByIdAndUpdate(
			articleID,
			{$push: {"likes": userID}},
			{safe: true, upsert: true},
			function(err, model) {
					// console.log(err);
			}
	);
	console.log("The user id is " + userID);


	// Look up alice by ID and return
	User.findById(userID, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
		var doer_username = users.username;
		console.log(doer_username);
		// function to send notification
		postNotification(doer_username);
	});


	// pass it the doer
	function postNotification(doer_username) {

			Article
				.findById(articleID).exec(function(err, article) {

					var user = article._userID;


					// BUILD THE NOTIFICATION OBJECT
					var notification = new Notification({
							articleOwner: articleOwner,
							created: req.body.created,
							associated_article: articleID,
							imageUrl: articleImageUrl,
							doer_username: doer_username,
							// read: False,
							type: "liked your post"
					});


					// PUSH NOTIFICAITON TO THE USERS COLLECTION
					User
					.findByIdAndUpdate(
			        notification.articleOwner,
			        {$push: {"notifications": notification}},
			        {safe: true, upsert: true},
			        function(err, user) {
			        	if (err)
							res.send(err);
								res.json(notification);
			        }
			    );


					// SAVE NOTIFICATION OBJECT
					notification.save(function(err) {
						if (err)
							res.send(err);
						res.json(
							{
								message: 'New Notication Has been added',
								// email: user.email,
								// username: user.username,
								// gravatarURL: user.gravatarURL
							}
						);
					});

				});

  }





};



// GET LIKES

exports.getLikes = function(req, res) {

	var articleID = mongoose.Types.ObjectId(req.params.id);

	console.log(articleID);

	Article
		.findById(articleID)
		.select('-__v -_id -authID')
		.populate('likes')
		.exec(function(err, Article) {
			res.send(Article.likes)
	});




};

// PUT LIKES

exports.putLikes = function(req, res) {

	console.log("Putting Likes Now");


	var userID 		= mongoose.Types.ObjectId(req.body.userID);
	var articleID = mongoose.Types.ObjectId(req.body.articleID);

	console.log("The user id is " + userID);
	console.log("The article id is " + articleID);


	Article.findByIdAndUpdate(
			articleID,
			{$pull: {"likes": userID}},
			{safe: true, upsert: true},
			function(err, user) {
				if (err)
			res.send(err);
		res.json(user);
			}
	);


};


















// to keep space at the bottom
