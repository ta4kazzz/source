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

// Load Config & Controllers
var app       	 = express();
var port      	 = process.env.PORT || 8080;

var configDB 		  = require('./config/database.js');
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');
var authController    = require('./app/controllers/auth');
var clientController  = require('./app/controllers/client')

// Database ====================================================================
mongoose.connect(configDB.url);


// Express Config ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating



// Passport
app.use(passport.initialize());


// API Endpoints ============================
var router = express.Router();     // Get instance of express Router
app.use('/api', router);


// Create endpoint handlers for /client
router.route('/clients')
	.post(authController.isAuthenticated, clientController.postClients)
	.get(authController.isAuthenticated, clientController.getClients);

// Creates an enpoint handler for /articles
router.route('/articles')
	.post(authController.isAuthenticated, articleController.postArticles)
	.get(authController.isAuthenticated, articleController.getArticles);

// Creates an endpoint handler for /articles:article_id
router.route('/articles/:article_id')
	.get(authController.isAuthenticated, articleController.getArticle)
	.put(authController.isAuthenticated, articleController.putArticle)
	.delete(authController.isAuthenticated, articleController.deleteArticle);

// Creates endpoint handlers for /users
router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUser);



// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
