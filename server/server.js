// set up ======================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var server = require('http').createServer(app);
var mongoose  	 = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(expressSession);
var morgan = require('morgan');
var User = require('./app/models/user');

//var flash     	 = require('connect-flash');
//var bodyParser   = require('body-parser');

var cors      	 = require('cors');
//var unfluff      = require('unfluff');
//var jwt          = require('express-jwt');

// Node Environemtn Variables
//==============================================================

var port      	 = process.env.PORT || 8080;

// Database configuration
//==============================================================
var configDB 		 = require('./config/database.js');

mongoose.connect(configDB.url);

//var jwtCheck = jwt({
//    secret: new Buffer('e6xsoEi8W66dPHwBRkLwWyWy3J-Nq0GnzOZ2WsQMhouv5fJDlf6MH6izwhdim0gX', 'base64'),
//    audience: '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ'
//  });


// Controllers
//==============================================================
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');
var authController    = require('./app/controllers/auth');
var commentController = require('./app/controllers/comments');
var notificationController = require('./app/controllers/notification');


// Express Config ==============================================================


//app.use(function (req, res, next) {
//    //res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
//    //res.header('Access-Control-Allow-Credentials', 'true');
//    //res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//    //res.header('Access-Control-Expose-Headers', 'Content-Length');
//    //res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
//    //if (req.method === 'OPTIONS') {
//    //    return res.send(200);
//    //} else {
//    //    return next();
//    //}

//    //res.setHeader('Access-Control-Allow-Credentials', true);
//    ////res.setHeader('Access-Control-Allow-Origin', req.headers.origin); //uncomment when from angular
//    //res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//    //res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

//});

app.use(function (req, res, next) {
    //    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Origin, Accept');
    //    res.setHeader('Access-Control-Allow-Credentials', true);
    //    next();
    
    
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});


//----
app.use(morgan('dev')); // log every request to the console
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(expressSession({
    secret: configDB.secret,
    maxAge: null,//new Date(Date.now() + 3600000),
    store: new MongoStore(configDB.db),
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating

/// Authentication ===========================================================

//var Auth0 = require('auth0');
//var extend = require('xtend');
//// xtend is a basic utility library which allows you to extend an object by appending
//// all of the properties from each object in a list. When there are identical properties
//// the right-most property takes precedence.

//var authAPI = new Auth0({
//  domain:       'source.auth0.com',
//  clientID:     '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ',
//  clientSecret: 'e6xsoEi8W66dPHwBRkLwWyWy3J-Nq0GnzOZ2WsQMhouv5fJDlf6MH6izwhdim0gX'
//});

//var CONNECTION = 'Username-Password-Authentication';

//app.use('/signup', function (req, res) {
//  var data = extend(req.body, {connection: CONNECTION, email_verified: false});

//  authAPI.createUser(data, function (err) {
//    if (err) {
//      console.log('Error creating user: ' + err);
//      res.send(500, err);
//      return;
//    }

//    res.send(200);
//    return;
//  });
//});

// New routing using connect
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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


// New methods for loggin and sign up in the app
router.post('/users/connect', passport.authenticate('local'), userController.connect);
router.post('/users/signup', userController.signup);

app.use('/api', router);

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
