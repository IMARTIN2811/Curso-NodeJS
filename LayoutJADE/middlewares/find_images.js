var Imagen = require("../models/imagenes");
//Se importa el archivo image_permission
var owner_check = require("./image_permission"); 

//se declara el middleware y se exporta
module.exports = function(req,res,next) {
    //busca la imagen por medio de la id
    Imagen.findById(req.params.id)
        .populate("creator")
        .exec(function(err,imagen) {
            //valida si encuentra la imagen 
            if (imagen != null && owner_check(imagen,req,res)) {
                //console.log("Encontre la imagen"+ imagen.creator);
                res.locals.imagen = imagen;
                next();
            }else{
                //sino encuentra la imagen lo redirigira a la ruta /app
                res.redirect("/app");
            }        
        })
} 