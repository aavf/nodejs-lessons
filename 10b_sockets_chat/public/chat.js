$(function () {
  //make connection
  var socket = io.connect();

  //buttons and inputs
  var message = $("#message");
  var username = $("#username");

  var send_button = $("#send_message");
  var send_username = $("#send_username");

  var imgUpload = $("#image_upload");
  var uploadBtn = $("#upload_btn");

  var chatroom = $("#chatroom");
  var usersSection = $("#users");

  // A c) on connect & disconnect
  socket.on("user_connected", (data) => {
    chatroom.append("<p class='message'>" + data.username + " has connected!</p>");
    updateConnectedUsers(data.users);
  });

  socket.on("user_disconnected", (data) => {
    chatroom.append("<p class='message'>" + data.username + " has disconnected!</p>");
    updateConnectedUsers(data.users);
  })
  // A c) ii. aux
  function updateConnectedUsers(users) {
    //console.log(data.users);
    usersSection.html('');
    jQuery.each(users, function (username, id) {
      usersSection.append("<p class='user'>" + username + "</p>");
    });
  }

  // A d) Emit name change
  send_username.click(function () {
    socket.emit('new_username', { name: username.val() });
  });
  // A d) Listen on username_changed
  socket.on("username_changed", (data) => {
    //feedback.html('');
    chatroom.append("<p class='message'>" + data.previousUser + " Changed it's name to: " + data.username + "</p>")
    updateConnectedUsers(data.users);
  });


  // B a) Emit message
  send_button.click(function () {
    socket.emit('send_message', { message: message.val() });
    message.val('');
  });
  //  B a) Listen on send_message
  socket.on("send_message", (data) => {
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
  });


  // upload
  uploadBtn.click((event) => {
    //stop submit the form, we will post it manually.
    event.preventDefault();
    doAjax();
    imgUpload.val('');

    // send message together with photo, also identifies the socket user sending msg
    socket.emit('send_message', { message: message.val() });
    message.val('');
  });
  
  function doAjax() {
    var form = $('#uploadForm')[0];
    var data = new FormData(form);
    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/photo/upload/",
      data: data,
      processData: false, //prevent jQuery from automatically transforming the data into a query string
      contentType: false,
      cache: false,
      success: (data) => {
        console.log(data)
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  // B Listen on img uploaded
  socket.on("send_img", (data) => {
    chatroom.append('<img src="' + data.img + '"/>')
  });

});

