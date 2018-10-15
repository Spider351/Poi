module.exports = function(io){
    io.on("connection", function(socket){
        console.log("Usuario Conectado");
        socket.on("enviar mensaje", function(msg){
            io.sockets.emit("recibir mensaje", msg);
        });
    });
}