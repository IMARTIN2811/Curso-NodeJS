var express = require("express");
var app = express();
//se importa la libreria
var bodyParser = require("body-parser");
//se importa la libreria
var mongoose = require("mongoose");
//Se declara el esquema
var Schema = mongoose.Schema;

//Se hace la conexion
mongoose.connect("mongodb://localhost");
var db = mongoose.connection
//Si la conexion en incorecta marca un errro
db.on('error', function(err){
  console.log('connection error', err)
})
//Verifica la conexion a BD
db.once('open', function(){
  console.log('Connection to DB successful')
})

//Se genera los objetos del documento
var userSchemaJSON = {
    email:String,
    password:String
};
//Crea el esquema y pasa la estrucutura del documento
var user_Schema = new Schema(userSchemaJSON);
//Se crea el modelo para establecer la conexion
var User = mongoose.model("User",user_Schema);

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
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    });
});

//Se declara metodo post y envia los datos 
app.post("/users", function(req,res) {
    //console.log("Contraseña:"+ req.body.password);
    //console.log("Email:"+ req.body.email);
    var user = new User({email: req.body.email, 
                            password: req.body.password,
                            password_confirmation: req.body.password_confirmation
                        });
    console.log(user.password_confirmation);
    
    //guarda los datos
    user.save(function(){
        res.send("Guardamos tus datos");
    });
});

app.listen(8080);