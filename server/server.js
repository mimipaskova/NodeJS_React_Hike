const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  authentication = require('./authentication');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// app.engine('html', require('ejs').renderFile);

var db = require('./models/db_connector');

app.use(session({
	secret : 'firnejg4',
	resave : true,
    saveUninitialized : true
}));

app.use(bodyParser.json());

app.use(authentication.initialize()); // Add passport initialization
app.use(authentication.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', require('./controllers/login'));
app.use('/api/story', require('./controllers/story'));

// app.post('/login',
// 	function (req, res, next) {
// 		console.log('/login');
// 		next();
// 	},
// 	authentication.authenticate('local'),
// 	function (req, res) {
// 		res.json(req.user);
// 	});

//   app.get('/login',
// 	function (req, res) {
// 		console.log('/login');
// 	});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
