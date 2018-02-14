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
app.use('/books', express.static(path.join(__dirname, 'dist')));

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        //console.log("Message Received: " + JSON.parse(message).comment.text);
        io.emit('message', {type:'new-message', message: message});    
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
sessionOptions.store = new MongoStore({mongooseConnection: mongoose.connection});
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'dist')));

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
