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
var jwt = require('express-jwt');


// Load Config & Controllers
var app       	 = express();
var port      	 = process.env.PORT || 8080;

var configDB 		  = require('./config/database.js');
var articleController = require('./app/controllers/article');
var userController    = require('./app/controllers/user');


// Database ====================================================================
mongoose.connect(configDB.url);

var jwtCheck = jwt({
    secret: new Buffer('e6xsoEi8W66dPHwBRkLwWyWy3J-Nq0GnzOZ2WsQMhouv5fJDlf6MH6izwhdim0gX', 'base64'),
    audience: '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ'
  });


// Express Config ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating



// API Endpoints ============================
var router = express.Router();     // Get instance of express Router


// Creates an enpoint handler for /articles
router.route('/articles', jwtCheck)
	.post(articleController.postArticles)
	.get(articleController.getArticles);

// Creates an endpoint handler for /articles:article_id
router.route('/articles/:article_id')
	.get(articleController.getArticle)
	.put(articleController.putArticle)
	.delete(articleController.deleteArticle);

// Creates endpoint handlers for /users
router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUser);

app.use('/api', router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
