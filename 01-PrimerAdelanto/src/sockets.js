module.exports = function(io){

    let nicknames = [];

    io.on("connection", function(socket){
        console.log("Usuario Conectado");

        socket.on("nuevo usuario", function(data, cb){
            console.log(data);
            if(nicknames.indexOf(data) != -1){
                cb (false);
            }
            else{
                cb(true);
                socket.nickname = data;
                nicknames.push(data);
                io.sockets.emit("usuarios", nicknames);
            }
        });

        socket.on("enviar mensaje", function(msg){
            io.sockets.emit("recibir mensaje", {
                msg : msg,
                nick : socket.nickname
            });
        });

        socket.on("disconnect", function(data){
            if(!socket.nickname){
                return;
            }
            else{
                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                io.sockets.emit("usuarios", nicknames);
            }

        });

    });
}