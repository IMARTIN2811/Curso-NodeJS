var express = require("express");
//carga el modulo express
var app = express();
//carga el modulo jade
app.set("view engine", "jade");

//Verbos http => GET,POST,PUT,PATCH,OPTIONS,HEADERS,DELETE

//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/", function(req,res){
    res.render("index");
});

app.get("/:nombre", function(req,res){
    res.render("form",{nombre: req.params.nombre});
});

//decla la ruta del directorio
app.post("/", function(req,res){
    res.render("form")
});

app.listen(8080);