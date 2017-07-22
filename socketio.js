var instance;

module.exports =
{
  getInstance: function() {
    return instance;
  },
  setup: function(server) {
    instance = require('socket.io')(server);
    //console.log(instance);
    instance.on ("connection", function(socket) {
      console.log("a user connected");
      socket.join("chat");
      socket
      // .on('newList', function(data) {
      //   socket.to(data.url).broadcast.emit("new list", data.data);
      // })
      .on("newMessage", function(data) {
        socket.to("chat").broadcast.emit("new message", data);
      })
      .on("url", function(url) {
        socket.join(url);
      })
      .on("disconnect", function() {
        console.log("user disconnect");
      })
    });
  }
};
