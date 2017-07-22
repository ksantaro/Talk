var sendMessage = $(".chat-list button");
var deleteMessages = $(".navbar-brand.fixed-left");
var messageInfo;
var lastMessage = 1; //0 - You were the last to send the message, 1 - You are not
var lastEmail;
var messageList = [
  // {text: "Hello?", username: username, email: email},
  // {text: "Are you there??", username: username, email: email},
  // {text: "What!", username: "venny", email: "venny@gmail.com"},
  // {text: "He said Hello!", username: "123", email: "123@gmail.com"},
  // {text: "That's it.", username: "123", email: "123@gmail.com"},
  // {text: "Yeah", username: username, email: email},
  // {text: "Yeah", username: username, email: email},
  // {text: "Yeah", username: username, email: email},
  // {text: "That's it.", username: "123", email: "123@gmail.com"},
  // {text: "That's it.", username: "123", email: "123@gmail.com"},
  // {text: "What!", username: "venny", email: "venny@gmail.com"},
  // {text: "What!", username: "venny", email: "venny@gmail.com"},

];

//Find Out my username/email

//Get the messages and add them to the messageList, then populate screen
$.get("http://localhost:3000/messages" , function(response) {
  for (var num = 0; num < response.length; num++) {
    messageList.push(response[num]);
  }

  for (var num = 0; num < messageList.length; num++) {
    messageInfo = $(".chat-list .chat-box");
    var message = messageList[num];
    if (message.email === email) {
      if (lastEmail !== message.email) {
        messageInfo.append(
          $("<div/>").addClass("message-user")
            .append($("<span/>").html(username))
            .append($("<p/>").html(message.text))
        );
        lastEmail = message.email;
      } else {
        var mUser = $(".message-user");
        $(mUser[mUser.length - 1]).append($("<p/>").html(message.text));
      }
    } else {
      if (lastEmail !== message.email) {
        messageInfo.append(
          $("<div/>").addClass("message-other")
            .append($("<span/>").html(message.username))
            .append($("<p/>").html(message.text))
        );
        lastEmail = message.email;
      } else {
        var mUser = $(".message-other");
        $(mUser[mUser.length - 1]).append($("<p/>").html(message.text));
      }

    }
  }

});
// send new message
sendMessage.click(function () {
  messageInfo = $(".chat-list .chat-box");
  messageText = $(".chat-list textarea").val();
  $.ajax({
    url: "http://localhost:3000/messages",
    type: "POST",
    dataType: "json",
    data: {
      email: email,
      username: username,
      text: messageText,
    },
    success: function(response) {
      console.log(response);
      messageList.push(response);
      socket.emit("newMessage", response);
    },
  });
  if (lastEmail !== email) {
    messageInfo.append(
      $("<div/>").addClass("message-user")
        .append($("<span/>").html(username))
        .append($("<p/>").html(messageText))
    );
    lastEmail = email;
  } else {
    var mUser = $(".message-user");
    $(mUser[mUser.length - 1]).append($("<p/>").html(messageText));
  }
  $(".chat-list textarea").val("");
});
//new message socket
socket.on("new message", function(message) {
  messageInfo = $(".chat-list .chat-box");
  messageList.push(message);
  if (message.email === email) {
    if (lastEmail !== message.email) {
      messageInfo.append(
        $("<div/>").addClass("message-user")
          .append($("<span/>").html(message.username))
          .append($("<p/>").html(message.text))
      );
      lastEmail = message.email;
    } else {
      var mUser = $(".message-user");
      $(mUser[mUser.length - 1]).append($("<p/>").html(message.text));
    }
  } else {
    if (lastEmail !== message.email) {
      messageInfo.append(
        $("<div/>").addClass("message-other")
          .append($("<span/>").html(message.username))
          .append($("<p/>").html(message.text))
      );
      lastEmail = message.email;
    } else {
      var mUser = $(".message-other");
      $(mUser[mUser.length - 1]).append($("<p/>").html(message.text));
    }

  }
});

deleteMessages.click(function() {
  console.log($(".chat-list"));
  $(".chat-list").empty();
});
