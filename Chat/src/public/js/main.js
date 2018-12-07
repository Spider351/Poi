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
            console.log("agh");
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
        socket.emit("enviar mensaje", msgContent.val());
        msgContent.val("");
    });

    socket.on("recibir mensaje", function(msg){
        msgView.append("<b>" + msg.nick + ": </b>" + msg.msg + "<br>");
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
})