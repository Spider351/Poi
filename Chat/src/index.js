const http = require("http");
const path = require("path");

const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

app.set("port", process.env.PORT || 5500);

require("./sockets")(io);
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));

server.listen(app.get("port"), function(){
    console.log("server on port " + app.get("port"));
});