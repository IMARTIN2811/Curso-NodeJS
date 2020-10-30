var express = require("express");
//ejecuta expresss

var app = express();
//carga el modulo express

app.set("view engine", "jade");
//especifica la ruta y mandar una funcion que recibe dos paramteros,

//una de la peticion una de respuesta
app.get("/", function(req,res){
    res.render("index", {Hola: "israel "});
});
//ejecuta el server con el puerto 8080
app.listen(8080);