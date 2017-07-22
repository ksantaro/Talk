var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageModel = new Schema({
  username: String,
  email: String,
  text: String,
});

module.exports = mongoose.model("messages", messageModel);
