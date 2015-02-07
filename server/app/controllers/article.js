// Load Models ==================================================
var Article		 = require('../models/article.js');
var User         = require('../models/user.js');
var unfluff      = require('unfluff');
var cheerio      = require('cheerio');
var request      = require('request');
var mongoose     = require('mongoose');


// ==================================
//               /articles
// ==================================


// POSTS
exports.postArticles = function(req, res) {
	// Create new instance of the Article Model
	var article = new Article();
	// Set the article properties that came from the POST data
	article.url         = req.body.url;
    article.summary     = req.body.summary;






    var userID = mongoose.Types.ObjectId(req.body.userID);
    article._userID = userID;

    // Add this article id to this userID
        // console.log("the article id is " + article._id);
        // console.log("the userID is " + userID);
 

    // find by document id and update
    User.findByIdAndUpdate(
        userID,
        {$push: {articles: article._id}},
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
        // console.log(html);
        data = unfluff.lazy(html, 'en');
        // console.log(data.title());
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
            res.json({ message: 'Article created!', data: article});
        });
    };

};



// GET
exports.getArticles = function(req, res) {
    Article.find(function(err, articles) {
        if (err)
            res.send(err);
        res.json(articles);
    });
};


// ==========================================
//               /articles/:article_id
// ==========================================

// GET
exports.getArticle = function(req, res) {
    Article.findById(req.params.article_id, function(err, article) {
        if (err)
            res.send(err);
        res.json(article)
    });
};


// PUT
exports.putArticle = function(req, res) {

  Article.findById(req.params.article_id, function(err, article) {
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

    res.json({ message: 'Beer removed from the locker!' });
  });
};
    

