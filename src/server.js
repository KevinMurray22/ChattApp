const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require('path');
const io = require("socket.io")(http); 
const User = require('./user');

let users = {};
let names = new Set();
let typingUsers = new Set();
let chatrooms = [];

app.use(express.static('.'));
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname,"index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  let testSymbol = Symbol('test');

  if(!users[socket.id]){
    users[socket.id] = new User('test', socket);
    users[socket.id][testSymbol] = 'test';
  }

  socket.on('private message', (name, msg) => {
    let user;
    let flag = true;
    for(user in users) {
      if(users[user].name === name) {
        socket.to(user).emit('private message', msg, users[socket.id].name);
        io.to(socket.id).emit('private message', msg, name);
        flag = false;
        break;
      }
    }
    if(flag) {
      if(chatrooms.includes(name)){
        io.to(name).emit('private message', msg, name);
      }
      else
        io.to(socket.id).emit('private message', '**User is not online**', name);
    }
  });


  

  socket.on('new chatroom request', chatRoomName => {
    chatrooms.push(chatRoomName);
    io.emit('update chatroom list', chatRoomName);
    socket.join(chatRoomName);
  });




  socket.on('join chatroom', chatRoomName => {
    if(chatrooms.includes(chatRoomName))
      socket.join(chatRoomName);
  });
  


  socket.on('typing', () => {
    typingUsers.add(users[socket.id].name);
    io.emit('typing', Array.from(typingUsers));
    console.log(users[socket.id].name + ' is typing...');
  });



  socket.on('not typing', () => {
    typingUsers.delete(users[socket.id].name);
    io.emit('typing', Array.from(typingUsers));
    console.log(users[socket.id].name + ' is no longer typing...');
  });

  socket.on('new user', (callback) => {
    let name = "Anonymous" + Math.floor(Math.random() * 1000);
    if(names.has(name)){
      //very small possibility of duplicate. Need to fix
    } else {
      users[socket.id] = new User(name, socket.id);
      names.add(name);
      io.emit('chat message', `**${name} connected**`);
      io.emit('user list', Array.from(names));
      callback(name);
    }
  });



  socket.on('change name', (name, callback) =>{
    if(names.has(name)){
      callback(false);

    } else {
      if(typingUsers.has(users[socket.id].name)){
        typingUsers.delete(users[socket.id].name);
        typingUsers.add(name);
      }
      names.delete(users[socket.id].name);
      names.add(name);
      let oldName = users[socket.id].name;
      io.emit('chat message', `**${oldName} has changed name to ${name}**`);
      users[socket.id].name = name;
      io.emit('user list', Array.from(names));
      io.emit('update chatrooms', oldName, name);
      callback(true);
    }
  });




  socket.on("chat message", (msg) => {
    io.emit('chat message', msg);
    console.log(msg);
  });



  socket.on("disconnect", () => {
    console.log("user disconnected");
    names.delete(users[socket.id].name);
    if(typingUsers.has(users[socket.id].name)){
      typingUsers.delete(users[socket.id].name);
       io.emit('typing', Array.from(typingUsers));
    }
    if(!users[socket.id][testSymbol]) {
      io.emit("chat message", `**${users[socket.id].name} disconnected**`);
    }
    delete users[socket.id];
    io.emit('user list', Array.from(names));
  });
});


http.listen(3001, () => {
  console.log("listening on :3000");
});
