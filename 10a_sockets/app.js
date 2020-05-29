// require and instantiate express
var express = require('express');
var app = express();
const port = 3000;

app.set('view engine', 'ejs'); // set up ejs for templating

//middlewares
app.use(express.static('public'));

// express server
var server = app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

// route
app.get('/', function (req, res) {
    res.render('index.ejs');
});

var io = require('socket.io')(server);

// Registar o evento Connection
io.on('connection', function (socket) {
  console.log('connected');
  console.log(socket.id);
  // default username
  socket.username = 'anonymous';

  socket.on('disconnect', function () {
    console.log('disconnected');
  });

  //listen on new_message
  socket.on('send_message', (data) => {
      //broadcast the new message
      io.sockets.emit('broadcast_message', { message: data.message, username: socket.username });
  });

});