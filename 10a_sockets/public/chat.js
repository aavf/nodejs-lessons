$(function () {
    //make connection
    var socket = io.connect();    

    //buttons and inputs
    var message = $("#message");
    var send_button = $("#send_message");
    var chatroom = $("#chatroom");

    //Emit message
    send_button.click(function () {
      socket.emit('send_message', { message: message.val() });
  });    

    //Listen on broadcast_message
    socket.on("broadcast_message", (data) => {
      chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
      message.val('');
    });
});