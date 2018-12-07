$(function(){
    const socket = io();

    const msgForm = $("#formMsg");
    const msgView = $("#viewMsg");
    const msgContent = $("#contentMsg");

    const formNick = $("#nickForm");
    const errorNick = $("#nickError");
    const nickName = $("#nick");

    const usersList = $("#users");

    var nickStates = 0;

    formNick.submit(function(e){
        e.preventDefault();
        socket.emit("nuevo usuario", nickName.val(), function(data){
            if(data){
                $("#nickWrap").hide();
                $("#contentWrap").show();
            }
            else{
                errorNick.html("<div class='alert alert-danger'>Error: Usuario ya existente</div>");
            }
            nickName.val(" ");
        });
    });

    msgForm.submit(function(e){
        e.preventDefault();
        if(msgContent.val() === "/emoticonos"){
            msgView.append("<b>Emoticonos: </b><br>");
            msgView.append(':gato <i class="fas fa-cat"></i>');
            msgView.append(':perro <i class="fas fa-dog"></i>');
            msgView.append(':pez <i class="fas fa-fish"></i>');
            msgView.append(':rana <i class="fas fa-frog"></i>');
            msgView.append(':pluma <i class="fas fa-feather"></i>');
            msgView.append(':araña <i class="fas fa-spider"></i>');
            msgView.append(':dragon <i class="fas fa-dragon"></i>');
            msgView.append(':telefono <i class="fas fa-phone-volume"></i>');
            msgView.append(':musica <i class="fas fa-music"></i>');
            msgView.append(':camion <i class="fas fa-bus-alt"></i>');
            msgView.append(':carro <i class="fas fa-car"></i>');
            msgView.append(':moto <i class="fas fa-motorcycle"></i>');
            msgView.append(':enojado <i class="fas fa-angry"></i>');
            msgView.append(':feliz <i class="fas fa-grin-beam"></i>');
            msgView.append(':triste <i class="fas fa-frown"></i>');
            msgContent.val("");
        }
        else{
            var mensajeCrypt = msgContent.val();
            mensajeCrypt = mensajeCrypt.toString();
            var msgLength = mensajeCrypt.length;
            mensajeCrypt = 0;
            console.log(msgLength);
            for(var i = 0; i < msgLength; i++){
                var a = msgContent.val().charCodeAt(i);
                a = a + 10;
                mensajeCrypt = mensajeCrypt + String.fromCharCode(a);
            }
            mensajeCrypt = mensajeCrypt.substr(1);
            console.log(mensajeCrypt);
            socket.emit("enviar mensaje", mensajeCrypt, function(data){
                msgView.append("<p class='error'>" + data + "</p>");
            });
            msgContent.val("");
        }
    });

    socket.on("recibir mensaje", function(msg){
        if(msg.msg === ":gato"){
            msgView.append("<b>" + msg.nick + ": </b> <i class='fas fa-cat'></i>");
        }
        else if(msg.msg === ":perro"){
            msgView.append("<b>" + msg.nick + ": </b> <i class='fas fa-dog'></i>");
        }
        else if(msg.msg === ":pez"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-fish"></i>');
        }
        else if(msg.msg === ":rana"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-frog"></i>');
        }
        else if(msg.msg === ":pluma"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-feather"></i>');
        }
        else if(msg.msg === ":araña"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-spider"></i>');
        }
        else if(msg.msg === ":dragon"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-dragon"></i>');
        }
        else if(msg.msg === ":telefono"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-phone-volume"></i>');
        }
        else if(msg.msg === ":musica"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-music"></i>');
        }
        else if(msg.msg === ":camion"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-bus-alt"></i>');
        }
        else if(msg.msg === ":carro"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-car"></i>');
        }
        else if(msg.msg === ":moto"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-motorcycle"></i>');
        }
        else if(msg.msg === ":enojado"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-angry"></i>');
        }
        else if(msg.msg === ":feliz"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-grin-beam"></i>');
        }
        else if(msg.msg === ":triste"){
            msgView.append("<b>" + msg.nick + ': </b> <i class="fas fa-frown"></i>');
        }
        else{
            msgView.append("<p class='global'><b>" + msg.nick + ": </b>" + msg.msg + "</p>");
        }
    });

    socket.on("usuarios", function(msg){
        let html = "";
        for (let i = 0; i < msg.length; i++){
            html += "<p>";
            html += msg[i];
            html += "</p>";
        }

        html += "<p><b>Usuarios Desconectados:</b></p>";
        console.log(nickStates);
        if(nickStates != 0){
            for (let i = 0; i < nickStates.length; i++){
                html += "<p>";
                html += nickStates[i];
                html += "</p>";
            }
        }
        usersList.html(html);
    });

    socket.on("estados", function(msg){
        nickStates = msg;
        console.log(nickStates);
    });

    socket.on("privado", function(msg){
        console.log("mensaje a '", msg.nick, "' que dice: ", msg.msg);
        msgView.append("<p class='private'><b>" + msg.nick + ": </b>" + msg.msg + "</p>");
    });

    socket.on("historial", function(msg){
        for(var i = 0; i < msg.length; i++){
            if(msg[i].msg === ":gato"){
                msgView.append("<b>" + msg[i].nick + ": </b> <i class='fas fa-cat'></i>");
            }
            else if(msg[i].msg === ":perro"){
                msgView.append("<b>" + msg[i].nick + ": </b> <i class='fas fa-dog'></i>");
            }
            else if(msg[i].msg === ":pez"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-fish"></i>');
            }
            else if(msg[i].msg === ":rana"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-frog"></i>');
            }
            else if(msg[i].msg === ":pluma"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-feather"></i>');
            }
            else if(msg[i].msg === ":araña"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-spider"></i>');
            }
            else if(msg[i].msg === ":dragon"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-dragon"></i>');
            }
            else if(msg[i].msg === ":telefono"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-phone-volume"></i>');
            }
            else if(msg[i].msg === ":musica"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-music"></i>');
            }
            else if(msg[i].msg === ":camion"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-bus-alt"></i>');
            }
            else if(msg[i].msg === ":carro"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-car"></i>');
            }
            else if(msg[i].msg === ":moto"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-motorcycle"></i>');
            }
            else if(msg[i].msg === ":enojado"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-angry"></i>');
            }
            else if(msg[i].msg === ":feliz"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-grin-beam"></i>');
            }
            else if(msg[i].msg === ":triste"){
                msgView.append("<b>" + msg[i].nick + ': </b> <i class="fas fa-frown"></i>');
            }
            else{
                msgView.append("<p class='global'><b>" + msg[i].nick + ": </b>" + msg[i].msg + "</p>");
            }
        }
    });
})

