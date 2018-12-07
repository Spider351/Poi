const http = require("http");
const path = require("path");

const express = require("express");
const socketio = require("socket.io");

const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

mongoose.connect("mongodb://admin:password1@ds127954.mlab.com:27954/chat")
    .then(deb => console.log("base de datos conectada"))
    .catch(err => console.log(err));

app.set("port", process.env.PORT || 5500);

require("./sockets")(io);
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));

server.listen(app.get("port"), function(){
    console.log("server on port " + app.get("port"));
});