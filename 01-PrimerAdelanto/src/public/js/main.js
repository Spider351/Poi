$(function(){
    const socket = io();

    const msgForm = $("#formMsg");
    const msgView = $("#viewMsg");
    const msgContent = $("#contentMsg");

    msgForm.submit(function(e){
        e.preventDefault();
        socket.emit("enviar mensaje", msgContent.val());
        msgContent.val("");
    });

    socket.on("recibir mensaje", function(msg){
        msgView.append(msg + "<br>");
    });
})