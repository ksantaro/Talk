var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var sessions = require('client-sessions');

var index = require('./routes/index');
var users = require('./routes/users');
var messages = require('./routes/messages');

var User = require('./models/user.js');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/talk");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected");
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(sessions({
  cookieName: 'session',
  secret: 'eigojweogoapoiej9230gio20fvidiev24',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use('/', index);
app.use('/users', users);
app.use('/messages', messages);

app.get('/login', function(req, res) {
    req.session.reset();
    res.render('login');
});
app.get('/index', function(req, res) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email}, function (err,user) {
        if (!user) {
          req.session.reset();
          req.redirect('/login');
        } else {
          res.locals.user = user;
          res.render('index', {username: user.username, email: user.email});
        }
      });
    } else {
      res.redirect('/login');
    }
});


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
