var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/login", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save(function (err, user) {
    if (err) {
      var error = "Try again!";
      if (err.code === 11000) {
        var error = "Email is taken please try a new one";
      }
      res.render("login");//, {emailError: error});
    } else {
      res.redirect("../login");
    }
  });
});

router.post("/index", function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (!user) {
      res.redirect('../login');//res.render("login", {error : "Invalid email or password"})
    } else {
      if (req.body.password === user.password) {
        req.session.user = user; // set-cookie: session={ email, password, nd stuff, Encrypted}
        res.redirect('../index');
      } else {
        res.redirect('../login');//res.render("login", {error : "Invalid email or password"})
      }
    }
  });
});

module.exports = router;
