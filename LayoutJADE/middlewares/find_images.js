var Imagen = require("../models/imagenes");

//se declara el middleware y se exporta
module.exports = function(req,res,next) {
    //busca la imagen por medio de la id
    Imagen.findById(req.params.id,function(err,imagen) {
        //valida si encuentra la imagen 
        if (imagen != null) {
            console.log("Encontre la imagen"+ imagen.title);
            res.locals.imagen = imagen;
            next();
        }else{
            //sino encuentra la imagen lo redirigira a la ruta /app
            res.redirect("/app");
        }        
    })
} 