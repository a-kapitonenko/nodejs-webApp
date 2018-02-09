var express = require('express');
var config = require('./config');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessionOptions = config.get('session');
var mongoose = require('./database/mongoose');
var User = require('./database/models/user').User;
var MongoStore = require('connect-mongo')(session);

var app = express();

app.set('port', config.get('port'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
//app.use('/assets', express.static(path.join(__dirname, 'dist')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
sessionOptions.store = new MongoStore({mongooseConnection: mongoose.connection});
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

 var book=require('./routes/book');
app.use('/book', book);

require('./boot/index')(app);
require('./routes/index')(app);


app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

app.use(function(err, req, res, next) {
 	res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {};
  	res.status(err.status || 500);
  	res.render('error');
});

module.exports = app;
