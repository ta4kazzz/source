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

// Load Config & Controllers
var app       	 = express();
var port      	 = process.env.PORT || 8080;

var configDB 		  = require('./config/database.js');
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');
var authController    = require('./app/controllers/auth');
var commentController = require('./app/controllers/comments');


// Database ====================================================================
mongoose.connect(configDB.url);


// Express Config ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating

/// Passport ========================
app.use(passport.initialize());

// API Endpoints ============================
var router = express.Router();     // Get instance of express Router

// ============== ARTICLES ========================

router.route('/articles')
  .get(authController.isAuthenticated, articleController.getArticles)
  .post(authController.isAuthenticated, articleController.postArticles)


router.route('/articles/:article_id')
  .get(articleController.getArticle)
  .put(articleController.putArticle)
  .delete(articleController.deleteArticle);
  
// ============== USERS ========================

// Endpoints for /users
router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

// Endpoints for /users/:username
router.route('/users/:id')
  .get(userController.getUser);

// Endpoints for /users/:username/articles
router.route('/users/:id/articles')
  .get(userController.getArticles);

// Endpoints for /users/:username/follows
router.route('/users/:id/follows-by')
	.post(userController.postFollows)
  	.get(userController.getFollows);

// Endpoints for /users/:username/followed-by
router.route('/users/:id/follows')
	.post(userController.postFollowers)
  	.get(userController.getFollowers);

// Endpoints for /users/:username/followed-by
router.route('/users/:id/feed')
  	.get(userController.getFeed);

// ============== COMMENTS ========================

router.route('/articles/:id/comments')
  .post(commentController.postComment)
  .get(commentController.getComments);




 
app.use('/api', router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
