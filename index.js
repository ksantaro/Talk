var username = "kenny";
var email = "kenny@gmail.com"
var sendMessage = $(".chat-list button");
var deleteMessages = $(".navbar-brand .fixed-left");
var messageInfo;
var lastMessage = 1; //0 - You were the last to send the message, 1 - You are not
var lastUsername;
var messageList = [
  {message: "Hello?", username: username, email: email},
  {message: "Are you there??", username: username, email: email},
  {message: "What!", username: "venny", email: "venny@gmail.com"},
  {message: "He said Hello!", username: "123", email: "123@gmail.com"},
  {message: "That's it.", username: "123", email: "123@gmail.com"},
  {message: "Yeah", username: username, email: email},
];

//Find Out my username/email

//Get the messages and add them to the messageList, then populate screen
console.log(messageList);
for (var num = 0; num < messageList.length; num++) {
  console.log("in");
  messageInfo = $(".chat-list textarea");
  var message = messageList[num];
  if (message.username === username) {
    if (lastUsername !== message.username) {
      messageInfo.before(
        $("<div/>").addClass("message-user")
          .append($("<span/>").html(username))
          .append($("<p/>").html(message.text))
      );
      lastUsername = message.username;
    } else {
      var mUser = $(".message-user");
      $(mUser[mUser.length - 1]).append($("<p/>").html(messageText));
    }
  } else {
    if (lastUsername !== message.username) {
      messageInfo.before(
        $("<div/>").addClass("message-other")
          .append($("<span/>").html(username))
          .append($("<p/>").html(message.text))
      )
    } else {
      lastUsername = message.username;
    }

  }
}

sendMessage.click(function () {
  messageInfo = $(".chat-list textarea");
  messageText = messageInfo.val();
  if (lastUsername === username) {
    messageInfo.before(
      $("<div/>").addClass("message-user")
        .append($("<span/>").html(username))
        .append($("<p/>").html(messageText))
    );
    lastUsername = username;
  } else {
    var mUser = $(".message-user");
    $(mUser[mUser.length - 1]).append($("<p/>").html(messageText));
  }

  messageInfo.val("");
});
