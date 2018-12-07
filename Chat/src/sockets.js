module.exports = function(io){

    let nicknames = [];

    io.on("connection", function(socket){
        console.log("Usuario Conectado");

        socket.on("nuevo usuario", function(data, cb){
            console.log(data);
            if(data in nicknames){
                cb (false);
            }
            else{
                cb(true);
                socket.nickname = data;
                nicknames[socket.nickname] = socket;
                io.sockets.emit("usuarios", Object.keys(nicknames));
            }
        });

        socket.on("enviar mensaje", function(msg, cb){
            console.log(msg);

            var mensajeDecrypt = msg;
            var msgLength = mensajeDecrypt.length;
            mensajeDecrypt = 0;
            for(var i = 0; i < msgLength; i++){
                var a = msg.charCodeAt(i);
                a = a - 10;
                mensajeDecrypt = mensajeDecrypt + String.fromCharCode(a);
            }
            mensajeDecrypt = mensajeDecrypt.substr(1);
            var mensaje = mensajeDecrypt.trim();
            if(mensaje.substr(0, 3) === "/p "){
                mensaje = mensaje.substr(3);
                var index = mensaje.indexOf(" ");
                if(index !== -1){
                    var user = mensaje.substr(0, index);
                    var mensaje = mensaje.substr(index + 1);
                    if(user in nicknames){
                        console.log("mensaje privado a", user);
                        nicknames[user].emit("privado", {
                            msg : mensaje,
                            nick : socket.nickname
                        });
                        nicknames[socket.nickname].emit("privado", {
                            msg : mensaje,
                            nick : socket.nickname
                        });
                    }
                    else{
                        cb("<b>Error</b>: usuario invalido");
                    }
                }
                else{
                    cb("<b>Error</b>: falta mensaje o usuario");
                }
            }
            else{
                io.sockets.emit("recibir mensaje", {
                    msg : mensajeDecrypt,
                    nick : socket.nickname
                });
            }
        });

        socket.on("disconnect", function(data){
            if(!socket.nickname){
                return;
            }
            else{
                delete nicknames[socket.nickname];
                io.sockets.emit("usuarios", Object.keys(nicknames));
            }

        });

    });
}