var Imagen = require("../models/imagenes");

module.exports = function(image,req,res) {
    //True: tiene permisos
    //False: Si no tiene permisos
    //valida si el usuario esta en la ventana imagen
    if (req.method === "GET" && req.path.indexOf("edit") < 0) {
        return true;
    }
    //
    if(typeof image.creator =="undefined") return false;
    //obtiene el ID del creator y valida si ID del creador de la img es igual 
    //al usuario que inicio sesion entonces que le de los permisos
    if (image.creator._id.toString() == res.locals.user._id) {
        //La imagen yo la subi
        return true;
    }
    //si no tiene los permisos returna un false
    return false; 
}