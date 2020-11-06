//la funcion representa la creacion de un middlewares
module.exports = function(req,res,next) {
    //valida que tenga una sesion en caso de que no lo tenga lo manda al login
    if (!req.session.user_id){
        res.redirect("/login")
    }
    else{
        next();
    }
}