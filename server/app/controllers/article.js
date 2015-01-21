// Load Models ==================================================
var Article		 = require('../models/article.js');
var unfluff      = require('unfluff');
var cheerio      = require('cheerio');
var request      = require('request');

// Create endpoint /api/articles for POSTS
exports.postArticles = function(req, res) {
	// Create new instance of the Article Model
	var article = new Article();

	// Set the article properties that came from the POST data
	article.url = req.body.url;
    article.summary = req.body.summary;
    article.created = req.body.created;
    article.userID = req.body.userID;

    // article.title = 'test';

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


        article.title = title;
        article.content  = content;

        // save the bear and check for errors
        article.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Article created!' });
        });
    };

};



// Create endpoint /api/articles for GET
exports.getArticles = function(req, res) {
    Article.find({ userId: req.user._id }, function(err, articles) {
        if (err)
            res.send(err);
        res.json(articles);
    });
};


// Create endpooint /api/articles/:articles_id for GET
exports.getArticle = function(req, res) {
	Article.find ({ userId: req.user._id, _id: req.params.article_id }, function(err, article) {
        if (err)
            res.send(err);
        res.json(article);
    });
};


// Create endoiunt for /api/articles/:article_id for PUT
exports.putArticle = function(req, res) {
	// use our bear model to find the bear we want
    Article.update({ userID: req.user._id, _id: req.params.article_id }, function(err, article) {
        if (err)
            res.send(err);
        article.url = req.body.url;  // update the bears info
        // save the bear
        article.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Article updated!' });
        });
    });
};


// Creates endpoint /api/articles/:article_id for DELETE
exports.deleteArticle = function(req, res) {
    Article.remove({
        userID: req.user._id,
        _id: req.params.article_id
    }, function(err, article) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};










