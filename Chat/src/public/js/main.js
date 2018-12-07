$(function(){
    const socket = io();

    const msgForm = $("#formMsg");
    const msgView = $("#viewMsg");
    const msgContent = $("#contentMsg");

    const formNick = $("#nickForm");
    const errorNick = $("#nickError");
    const nickName = $("#nick");

    const usersList = $("#users");

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
    });

    socket.on("recibir mensaje", function(msg){
        msgView.append("<p class='global'><b>" + msg.nick + ": </b>" + msg.msg + "</p>");
    });

    socket.on("usuarios", function(msg){
        let html = "";
        for (let i = 0; i < msg.length; i++){
            html += "<p>"
            html += msg[i]
            html += "</p>"
        }
        usersList.html(html);
    });

    socket.on("privado", function(msg){
        console.log("mensaje a '", msg.nick, "' que dice: ", msg.msg);
        msgView.append("<p class='private'><b>" + msg.nick + ": </b>" + msg.msg + "</p>");
    });
})

