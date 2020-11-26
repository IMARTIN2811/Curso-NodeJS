//el crea el server express y lo exporta
module.exports = function(server,sessionMiddleware) {
    //se importa el socket
    var io = require("socket.io")(server);
    //se importa la libreria
    var redis = require("redis"); 
    //se crea el cliente
    var client = redis.createClient();
    //se suscribe a un canal
    client.subscribe("images");

    //se configura el socket para compartir la sesion con express
    io.use(function(socket,next){
        sessionMiddleware(socket.request,socket.request.res,next);
    });

    //se crea un callback para cuando sucedan eventos en el canal
    client.on("message",function (channel,message) {
        //evalua si el canal de publicacion es de las imagenes
        if (channel=="images") {
            //se envia el mensaje a todos los sockets conectados al server
            io.emit("New image", message)
        }
        //console.log("Recibimos un mensaje del canal: "+ channel);
        //imprime la info del nuevo mensaje.
        //console.log(message);
    });

    //se ejecuta el socket para una nueva conexion
    io.sockets.on("Connection", function(socket){
        console.log(socket.request.session.user_id);
    }); 
}