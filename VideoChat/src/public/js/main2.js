var videoe = document.getElementById("videoObj");

$(function(){
    const socket = io();

    var canvas = document.getElementById("canvasObj");
    var context = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 320;

    context.width = canvas.width;
    context.height = canvas.height;

    $("#msgObj").text("Iniciando");

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if(navigator.getUserMedia){
        navigator.getUserMedia({video : true}, Load, Fail);
    }

    setInterval(function(){
        Render(context, canvas, socket);
    }, 60);

    socket.on("user1e", function(image){
        var img = document.getElementById("transObj");
        img.src = image;
    });

    /*msgForm.submit(function(e){
        e.preventDefault();
        socket.emit("enviar mensaje", msgContent.val());
        msgContent.val("");
    });*/

    /*socket.on("recibir mensaje", function(msg){
        msgView.append(msg + "<br>");
    });*/
})

function Load(stream){
    videoe.src = window.URL.createObjectURL(stream);
    $("#msgVideo").text("Exito");
}

function Fail(){
    $("#msgVideo").text("Error");
}

function Render(con, canvas, socket){
    con.drawImage(videoe, 0, 0, con.width, con.height);
    socket.emit("user2", canvas.toDataURL("image/webp"));
}