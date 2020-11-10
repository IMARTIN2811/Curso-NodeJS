var express = require("express");
//se crea el obejto router para crear rutas modulares
var router = express.Router();
//importa el modelo de imagenes
var Imagen =  require("./models/imagenes");

//se crea la ruta
router.get("/", function(req,res) {
    res.render("app/home")
});

//crear la ruta para mostrar el form
router.get("/imagenes/new",function(req,res) {
    res.render("app/imagenes/new");
});

//crear la ruta para modificar la img
router.get("/imagenes/:id/edit",function(req,res) {  
});

//crear ruta para las imagenes individuales 
router.route("/imagenes/:id")
    //y mostrar img mediante el metodo get
    .get(function(req,res) {
        //accede a la imagen por medio de id
        Imagen.findById(req.params.id, function(err,imagen) {
            res.render("app/imagenes/show",{imagen: imagen});
        })
    })
    //para actualizar el img
    .put(function(req,res) {
    })
    //para eliminar la img
    .delete(function(req,res) { 
    });

//crear ruta para la coleccion de imagenes 
router.route("/imagenes")
    //obtiene toda la coleccion de imgs mediante el metodo get
    .get(function(req,res) {
    })
    //para crear una nueva imagen
    .post(function(req,res) {
        //extrae la inf. del usuario
        var data = {
            title: req.body.title
        }
        //crea una nueva instancia del modelo
        var imagen = new Imagen(data);
        //guardar la imagen
        imagen.save(function(err){
            //sino hay un error rediccionara a la ruta imagenes
            if (!err) {
                res.redirect("/app/imagenes/"+ imagen._id)
            }
            else{
                res.render(err);
            }
        });
    });

//se exporta la ruta
module.exports = router;