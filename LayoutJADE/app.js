var express = require("express");
var app = express();
//se importa la libreria
var bodyParser = require("body-parser");
//importa el archivo de validaciones
var User = require("./models/user").User;
//se reemplaza la session por cookieSession
//var session = require("express-session");
//se declara el cookiesession
var cookieSession = require("cookie-session");
//se importa la ruta
var router_app = require("./routes_app");
//se crea la variable e importar el arhchico para almacenar el middleware
var session_middleware = require("./middlewares/session")

app.use("/public",express.static('public'));
app.use(express.static('assets'));
//para peticiones aplication/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "jade");

/** 
//Se define el middleware de la sesion
app.use(session({
    secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: false
}));
*/
//ejecuta el cookiesession
app.use(cookieSession({
    //Pasa los parametros, estos son claves para la forma en la cual se transmite
    //la comunicacion entre el cliente y server
    name: "session",
    keys: ["llave-1", "llave-2"]
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
        res.redirect("/app");
    });
});

//se carga el middleware creado
app.use("/app",session_middleware);
//Se cargan las rutas
app.use("/app",router_app);

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