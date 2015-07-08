// Load Dependancies
var Article		 	 = require('../models/article.js');
var User         = require('../models/user.js');
var Notification = require('../models/notification.js');
var unfluff      = require('unfluff');
var cheerio      = require('cheerio');
var request      = require('request');
var mongoose     = require('mongoose');

// 	  TABLE OF CONTENTS   ====================================================================
//
//		#postArticle
//		#getArticle
//		#deleteArticle
//		#putArticle
//
//		#getArticles
//		#getTopArticles
//
//		#likeArticle
//		#getLikers
//    #putLikes
//
// ===========================================================================================



// ==========================================
//    #postArticle
// ==========================================

exports.postArticles = function(req, res) {

  // New Article object
	var article = new Article();

  article.url         = req.body.url;
	article.shortUrl    = req.body.shortUrl;
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

// ==========================================
// 		#getArticle
// ==========================================

exports.getArticle = function(req, res) {

    Article.findById(req.params.id, function(err, article) {
        if (err)
            res.send(err);
        res.json(article)
    });

};

// ==========================================
// 		#deleteArticle
// ==========================================

exports.deleteArticle = function(req, res) {

  Article.remove({ userId: req.userID, _id: req.params.article_id }, function(err) {
    if (err)
      res.send(err);
    	res.json({ message: 'Article successfully removed' });
  });

};


// ==========================================
// 		#putArticle
// ==========================================
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











// ==========================================
//    #getArticles
// ==========================================

exports.getArticles = function(req, res) {
		Article
			.find()
			.sort({created: 'desc'})
			.exec(function(err, articles) {
				res.send(articles)
		});
};


// ==========================================
//    #getTopArticles
// ==========================================

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
// 		#likeArticle
// ==========================================

exports.postLikes = function(req, res) {

	console.log("REQ.body is " + req.body);

	var userID 								= mongoose.Types.ObjectId(req.body.userID);
	var articleID 						= mongoose.Types.ObjectId(req.body.articleID);
	var articleOwner 					= mongoose.Types.ObjectId(req.body.articleOwner);
	var articleImageUrl 			= req.body.imageUrl;

	// Add liker to the article object
	Article.findByIdAndUpdate(
			articleID,
			{$push: {"likes": userID}},
			{safe: true, upsert: true},
			function(err, model) {
					console.log(err);
			}
	);

	// Add Article to the liker object?





	// An article was added  alices array
	// A User was added to the article arrays liked
	console.log(userID + "liked an article ");


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

					// 1) BUILD THE NOTIFICATION OBJECT
					var notification = new Notification({
							articleOwner: articleOwner,
							created: Date.now(),
							associated_article: articleID,
							imageUrl: articleImageUrl,
							doer_username: doer_username,
							// read: False,
							type: "liked your post"
					});

					// 2) PUSH NOTIFICAITON TO THE USERS COLLECTION
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

					// 3) SAVE NOTIFICATION OBJECT
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



// ==========================================
// 		#getLikes
// ==========================================

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

// ==========================================
// 		#putLikes
// ==========================================

exports.putLikes = function(req, res) {

	console.log("Putting Likes Now");
	// console.log(mongoose.Types.ObjectId(req.params.articleID));


	var userID 				= mongoose.Types.ObjectId(req.body.userID);
	var articleID 		= mongoose.Types.ObjectId(req.body.articleID);

	// console.log("The user id is " + userID);
	// console.log("The article id is " + articleID);


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
