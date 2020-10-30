var express = require("express");
//ejecuta express
var app = express();
//carga el modulo express
app.set("view engine","jade");
//especifica la ruta y manda una funcion que recibe dos parametros
//una es la peticion y la otra la respuesta
app.get("/", function(req,res){
    res.render("Component", {Hola: "juan"});  
    res.end();  
});
app.listen(8080);