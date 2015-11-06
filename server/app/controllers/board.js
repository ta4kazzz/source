// Load Dependancies
var Board = require('../models/board.js');
var mongoose = require('mongoose');
var Article = require('../models/article.js');

// ==========================================
//    #getDetailBoard
// ==========================================
exports.getDetailBoard = function (req, res) {
    Board.findById(req.params.id)
           .sort('-created')
           .populate({ path: 'articles' })
           .exec(function (err, boards) {
        if (err) {
            res.send(err);
        } else {
            res.send(boards);
        }
    });

    //Board.findById(req.params.id, function (err, board) {
    //    if (err) {
    //        res.send(err);
    //    }
    //    res.json(board);
    //});
};

exports.postBoard = function (req, res) {
    var board = new Board();
    board.name = req.body.name;
    var userID = mongoose.Types.ObjectId(req.body.userID);
    board._userID = userID;
    
    board.save(function (err) {
        if (err) {
            return res.send(err);
        }
        return res.send(board);
    });
};

// ==========================================
// 		#getBoards
// ==========================================

exports.getBoards = function (req, res) {
    var userID = mongoose.Types.ObjectId(req.params.id);
    Board.find({ '_userID': userID }, function (err, boards) {
        if (err)
            res.send(err);
        res.send(boards);
    });
};

// ==========================================
// 		#deleteBoard
// ==========================================

exports.deleteBoard = function (req, res) {
    var currentUserId = req.session.userId;
    
    // delete the article only from the user that posted it.
    Article.findOne({ $and: [{ '_userID': currentUserId }, { '_id': req.params.id }] }, function (err) {
        if (err) {
            res.send(err);
        }
    }).remove(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Board successfully removed' });
    });
};

// ==========================================
// 		#postArticleBoard
// ==========================================
exports.postArticle = function (req, res) {
    
    console.log("REQ.body is " + req.body);
    
    var boardID = mongoose.Types.ObjectId(req.body.boardID);
    var articleID = mongoose.Types.ObjectId(req.body.articleID);
    
    // Add liker to the article object
    Board.findByIdAndUpdate(boardID, { $push: { "articles": articleID } }, { safe: true, upsert: true }, function (err, model) {
        if (err) {
            console.log(err);
        }
        res.send(model);
    });
};

// ==========================================
// 		#removeArticleBoard
// ==========================================
exports.removeArticle = function (req, res) {
    console.log("Removing Article To Board");
    
    var boardID = mongoose.Types.ObjectId(req.body.boardID);
    var articleID = mongoose.Types.ObjectId(req.body.articleID);
    
    Board.findByIdAndUpdate(boardID, { $pull: { "articles": articleID } }, { safe: true, upsert: true }, function (err, board) {
        if (err) {
            res.send(err);
        }
        res.send(board);
    }
    );
};
