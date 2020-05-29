// require and instantiate express
var express = require('express');
var app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path'); // ADDED
var cookieParser = require('cookie-parser');
var multer = require('multer');
const fs = require('fs');

const port = 3000;
var users = {};

app.set('view engine', 'ejs'); // set up ejs for templating

//middlewares
app.use(express.static(path.join(__dirname, 'public'))); // '/public', 
//app.use(express.static('public'));
//app.use(cookieParser());

// express server
var server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});

//multer object creation
/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/') // need to create the folder manually
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
}); 

var upload = multer({ storage: storage }); */
var upload = multer({ dest: 'public/uploads/' })

// route
app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.post('/photo/upload', upload.single('imageupload'), function (req, res, next) {
  console.log(req.file);
  io.sockets.emit('send_img', { img: '/uploads/'+req.file.filename });
  res.send("File is uploaded");
});


// sockets.io
var io = require('socket.io')(server);

// Registar o evento Connection
io.on('connection', function (socket) {
  // A a) Set Username
  socket.username = "User" + uuidv4();
  // A b) Guardar o ID e UserName
  users[socket.username] = socket.id;
  console.log(users);

  writeLog(socket.username, 'connected');

  // A c) Emit that a user has connected
  io.sockets.emit('user_connected', { username: socket.username, users: users });
  
  socket.on('disconnect', function () {
    delete users[socket.username];
    console.log(users);
    io.sockets.emit('user_disconnected', { username: socket.username, users: users });
    writeLog(socket.username, 'disconnected');
  });

  // A d) listen on new_name
  socket.on('new_username', (data) => {
    var previousUserName = socket.username;
    // apagar do objeto
    delete users[previousUserName];
    // Set Username
    socket.username = data.name;
    users[socket.username] = socket.id;
    console.log(users);
    // Emit that a user has changed name
    io.sockets.emit('username_changed', { previousUser: previousUserName, username: socket.username, users: users });
  });   

  // B a) listen on send_message
  socket.on('send_message', (data) => {
    if (data.message.includes('@')) {
      var otherUser = data.message.split(":")[0];
      var message = data.message.split(":")[1];
      otherUser = otherUser.slice(1, otherUser.length);
      console.log(otherUser);
      io.sockets.connected[users[socket.username]].emit('send_message', { message: data.message, username: socket.username });
      io.sockets.connected[users[otherUser]].emit('send_message', { message: message, username: socket.username });
    }
    else {
      //broadcast the new message
      io.sockets.emit('send_message', { message: data.message, username: socket.username });
    }
  });
});


function writeLog(user, action) {
  // e.
  var logEntry = user + ", " + action + ", " + new Date() + "\n";
  //fs.appendFile('log.txt', function (err) {
  fs.appendFile('log.txt', logEntry, function (err) {
      if (err) throw err;
      console.log('Saved!');
  });
}
