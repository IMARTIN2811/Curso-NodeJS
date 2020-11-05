var express = require("express");
var app = express();
//se importa la libreria
var bodyParser = require("body-parser");
//se importa la libreria
var mongoose = require("mongoose");
//Se declara el esquema
var Schema = mongoose.Schema;
//importa el archivo de validaciones
//var User = require("./models/user").User;
//se declara el session
var session = require("express-session");

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

//Se define el middleware de la sesion
app.use(session({
    secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: false
}));

//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/", function(req,res){
    console.log(req.session.user_id)
    res.render("index");
});

//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/signup", function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");
    });
});

//especifica la ruta y mandar una funcion que recibe dos paramteros,
//una de la peticion una de respuesta
app.get("/login", function(req,res){
    res.render("login");
});

//Se declara metodo post y envia los datos 
app.post("/sessions", function(req,res) {
    //Se declara el metodo find y devuelve los documentos
    //find: te trae multiples documentos, findOne: te trae un solo documento
    User.findOne({email: req.body.email,
                  password: req.body.password },function(err,user){
        req.session.user_id = user._id;
        res.send("Hola mundo");
    });
});
app.listen(8080);

/*
//Para registro de usuarios 
//Se declara metodo post y envia los datos,
app.post("/users", function(req,res) {
    //console.log("Contraseña:"+ req.body.password);
    //console.log("Email:"+ req.body.email);
    var user = new User({   email: req.body.email, 
                            password: req.body.password,
                            password_confirmation: req.body.password_confirmation,
                            username: req.body.username
                        });
    
    //metodo save con promises                    
    user.save().then(function(us){
        res.send("Guardamos tus datos");
    }, function(err) {
        if (err) {
            console.log(String(err));
            res.send("No pudimos guardar la informacion");
        }
    });
    //guarda los datos
    user.save(function(err){
        if (err) {
            console.log(String(err));
        }
        res.send("Guardamos tus datos");
    });
});
*/