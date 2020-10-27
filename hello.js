//Operar primer servidor en NodeJS

//se crea el modulo http
var http = require("http");

//se crea funcion y sus parametros
var manejador =  function(solicitud,respuesta){
    //se ejecuta cada vez que el navegador hace una peticion a nuestro server
    console.log("Recibimos una nueva peticion");
    respuesta.end("Hola mundo");
};

//se guarda en la var. servidor y retorna un obj del servidor
var servidor = http.createServer(manejador);
//puerto en donde se va a ejecutar
servidor.listen(8080);