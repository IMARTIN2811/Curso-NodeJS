//importa el modelo del usuario
var User = require("../models/user").User;
//la funcion representa la creacion de un middlewares
module.exports = function(req,res,next) {
    //valida que tenga una sesion en caso de que no lo tenga lo manda al login
    if (!req.session.user_id){
        res.redirect("/login");
    }
    else{
        User.findById(req.session.user_id,function(err,user) {
            if (err) {
                console.log(err); 
                res.redirect("/login");   
            }else{
                res.locals = { user: user };
                next();
            }
        });
    }
}