//el crea el server express y lo exporta
module.exports = function(server,sessionMiddleware) {
    //se importa el socket
    var io =  require("socket.io")(server);
    //se configura el socket para compartir la sesion con express
    io.use(function(socket,next){
        sessionMiddleware(socket.request,socket.request.res,next);

    });
    //se ejecuta el socket para una nueva conexion
    io.sockets.on("Connection", function(socket){
        console.log(socket.request.session.user_id);
    })
    
}