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

var configDB 		      = require('./config/database.js');
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');



// Database ====================================================================
mongoose.connect(configDB.url);


// Express Config ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating


// API Endpoints ============================
var router = express.Router();     // Get instance of express Router

// ============== USERS ========================

// Endpoints for /users
router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUsers);

// Endpoints for /users/:username
router.route('/users/:id')
  .get(userController.getUser)

// Endpoint for /users/:authID
router.route('/users/auth/:authID')
  .get(userController.getAuth);


// ============== ARTICLES ========================

router.route('/articles')
  .post(articleController.postArticles)
  .get(articleController.getArticles)


router.route('/articles/:article_id')
  .get(articleController.getArticle)
  .put(articleController.putArticle)
  .delete(articleController.deleteArticle);
  



app.use('/api', router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
