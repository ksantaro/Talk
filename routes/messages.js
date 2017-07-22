var express = require('express');
var router = express.Router();
var Message = require('../models/message.js');

/* GET messages listing. */
router.get('/', function(req, res, next) {
  Message.find(function(err, message) {
    if (err) {
      console.log(err);
    } else {
      res.json(message);
    }
  });
});

router.post('/', function(req, res, next) {
  var newMessage = new Message(
    { text: req.body.text,
      username: req.body.username,
      email: req.body.email,
    }
  );
  newMessage.save(function (err, message) {
    if (err) {
      console.log(err);
    } else {
      res.json(message);
    }
  });
});

module.exports = router;
