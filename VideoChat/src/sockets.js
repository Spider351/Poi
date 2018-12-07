module.exports = function(io){
    io.on("connection", function(socket){
        console.log("Usuario Conectado");
        socket.on("user1", function(image){
            io.sockets.emit("user1e", image);
            console.log("Usuario 1 Recibido");
        });
        socket.on("user2", function(image){
            io.sockets.emit("user2e", image);
            console.log("Usuario 2 Recibido");
        });
    });
}