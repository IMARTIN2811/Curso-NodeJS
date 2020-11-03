var express = require("express");
var app = express();
//se importa la libreria
var bodyParser = require("body-parser");

//se declara el middleware y carga los archvos estaticos
app.use("/estatico",express.static('public'));
app.use(express.static('assets'));
//para peticiones aplication/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

//Se declara metodo post y envia los datos 
app.post("/users", function(req,res) {
    console.log("Contraseña:"+ req.body.password);
    console.log("Email:"+ req.body.email);
    res.send("Recibimos tus datos");
});

app.listen(8080);