var express = require("express");
var app = express();
//se declara el middleware y carga los archvos estaticos
app.use("/estatico",express.static('public'));
app.use(express.static('assets'));

app.set("view engine", "jade");
//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/", function(req,res){
    res.render("index");
});
//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/login", function(req,res){
    res.render("login");
});

app.listen(8080);