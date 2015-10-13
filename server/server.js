// set up ======================================================================
var express   	 = require('express');
var mongoose  	 = require('mongoose');
var passport  	 = require('passport');
var flash     	 = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors      	 = require('cors');
var unfluff      = require('unfluff');
var jwt          = require('express-jwt');

// Node Environemtn Variables
//==============================================================
var app       	 = express()
var port      	 = process.env.PORT || 8080;

// Database configuration
//==============================================================
var configDB 		 = require('./config/database.js');

mongoose.connect(configDB.url);

var jwtCheck = jwt({
    secret: new Buffer('e6xsoEi8W66dPHwBRkLwWyWy3J-Nq0GnzOZ2WsQMhouv5fJDlf6MH6izwhdim0gX', 'base64'),
    audience: '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ'
  });


// Controllers
//==============================================================
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');
var authController    = require('./app/controllers/auth');
var commentController = require('./app/controllers/comments');
var notificationController = require('./app/controllers/notification');


// Express Config ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating

/// Authentication ===========================================================

var Auth0 = require('auth0');
var extend = require('xtend');
// xtend is a basic utility library which allows you to extend an object by appending
// all of the properties from each object in a list. When there are identical properties
// the right-most property takes precedence.

var authAPI = new Auth0({
  domain:       'source.auth0.com',
  clientID:     '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ',
  clientSecret: 'e6xsoEi8W66dPHwBRkLwWyWy3J-Nq0GnzOZ2WsQMhouv5fJDlf6MH6izwhdim0gX'
});

var CONNECTION = 'Username-Password-Authentication';

app.use('/signup', function (req, res) {
  var data = extend(req.body, {connection: CONNECTION, email_verified: false});

  authAPI.createUser(data, function (err) {
    if (err) {
      console.log('Error creating user: ' + err);
      res.send(500, err);
      return;
    }

    res.send(200);
    return;
  });
});


// API Endpoints ============================
var router = express.Router();     // Get instance of express Router

// ============== ARTICLES ========================

router.route('/articles')
    .get(articleController.getArticles)
    .post(articleController.postArticle);

router.route('/articles/top')
  .get(articleController.getTopArticles);

router.route('/articles/:id')
  .get(articleController.getArticle)
  .put(articleController.putArticle)
  .delete(articleController.deleteArticle);

  router.route('/articles/:id/likes')
  .post(articleController.postLikes)
  .get(articleController.getLikes)
  .put(articleController.putLikes);

// ============== USERS ========================



// Endpoints for /users/:username/followed-by
router.route('/users/:id/homefeed')
    .post(userController.getHomeFeed);
  
router.route('/users/homefeedpaging/:id')
    .post(userController.getHomeFeedPaging);

// Endpoints for /users
router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUsers);

// Endpoints for /users/:id
router.route('/users/:id')
  .get(userController.getUser)
  .put(userController.putUser);

// Endpoints for /users/:id/feed
router.route('/users/:id/feed')
  .get(userController.getUserFeed);

router.route('/users/auth/:id')
  .get(userController.getAuth);


// Endpoints for /users/:username/articles
router.route('/users/:id/articles')
  .get(userController.getUserArticles);

// Endpoints for /users/:id/saved
router.route('/users/:id/saved')
  .post(userController.saveForLater)
  .get(userController.getSaved)
  .put(userController.deleteSaved);

// Endpoints for /users/:username/follows
router.route('/users/:id/follows')
	.post(userController.postFollows)
  .get(userController.getFollows)
  .put(userController.deleteFollows)

// Endpoints for /users/:username/followers
router.route('/users/:id/followers')
  	.get(userController.getFollowers);


// ============== NOTIFICATIONS ========================
router.route('/users/:id/notifications')
  	.get(notificationController.getNotifications);



// ============== COMMENTS ========================

router.route('/articles/:id/comments')
  .post(commentController.postComment)
  .get(commentController.getComments);




app.use('/api', router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
