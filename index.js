var username = "Kenny";
var sendMessage = $(".chat-list button");
var messageInfo;
var lastMessage = 1; //0 - You were the last to send the message, 1 - You are not

sendMessage.click(function () {
  messageInfo = $(".chat-list textarea");
  messageText = messageInfo.val();
  if (lastMessage === 1) {
    messageInfo.before(
      $("<div/>").addClass("message-user")
        .append($("<span/>").html(username))
        .append($("<p/>").html(messageText))
    );
    lastMessage = 0;
  } else {
    var mUser = $(".message-user");
    $(mUser[mUser.length - 1]).append($("<p/>").html(messageText));
  }

  messageInfo.val("");
});
