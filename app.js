var express = require("express");
//ejecuta expresss
var app = express();
//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/", function(req,res){
    res.send("Hola mundo");
});
//ejecuta el server con el puerto 8080
app.listen(8080);