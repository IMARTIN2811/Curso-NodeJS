var express = require("express");
//se crea el obejto router para crear rutas modulares
var router = express.Router();
//importa el modelo de imagenes
var Imagen =  require("./models/imagenes");
//se importa le middleware find_images
var imageFinder = require("./middlewares/find_images");
//se importa el modulo fs
var fs = require("fs");

//se crea la ruta
router.get("/", function(req,res) {
    res.render("app/home");
});

//crear la ruta para mostrar el form
router.get("/imagenes/new",function(req,res) {
    res.render("app/imagenes/new");
});

router.all("/imagenes/:id*",imageFinder);

//crear la ruta para modificar la img
router.get("/imagenes/:id/edit",function(req,res) {  
    //Imagen.findById(req.params.id, function(err, imagen) {
        //res.render("app/imagenes/edit",{imagen: imagen});
        res.render("app/imagenes/edit");
    //})
});

//crear ruta para las imagenes individuales 
router.route("/imagenes/:id")
    //y mostrar img mediante el metodo get
    .get(function(req,res) {
        //accede a la imagen por medio de id
        //Imagen.findById(req.params.id, function(err,imagen) {
            //res.render("app/imagenes/show",{imagen: imagen});
            res.render("app/imagenes/show");
        //})
    })
    //para actualizar el img
    .put(function(req,res) {
        //busca la imagen por medio de id
        //Imagen.findById(req.params.id, function(err,imagen) {
            //imagen.title = req.body.title;
            res.locals.imagen.title = req.body.title;
            //imagen.save({function(err) {
            res.locals.imagen.save({function(err) {    
                if (!err) {
                    //res.render("app/imagenes/show",{imagen: imagen});
                    res.render("app/imagenes/show");
                }else{ 
                    //res.render("app/imagenes/"+imagen.id+"/edit",{imagen: imagen});
                    res.render("app/imagenes/"+req.params.id+"/edit");
                }
            }})
        //})
    })

    //para eliminar la img
    .delete(function(req,res) { 
        Imagen.findByIdAndRemove({_id: req.params.id},function(err) {
            //evalua sino hay errores, si no lo hay los redirecciona a la ruta imagenes
            if (!err) {
                res.redirect("/app/imagenes");
            }else{
                //y si hay errores los mostrará en la consola y volvera a mostrar la vista de imagenes
                console.log(err);
                res.redirect("/app/imagenes"+req.params.id)
            }    
        })
    });

//crear ruta para la coleccion de imagenes 
router.route("/imagenes")
    //obtiene toda la coleccion de imgs mediante el metodo get
    .get(function(req,res) {
        //trae multiples imagenes
        Imagen.find({creator: res.locals.user._id},function(err,imagenes) {
        //Imagen.find({},function(err,imagenes) {
            //si hay un error que lo redirecciones en la /app
            if (err) {res.redirect("/app");return;}
            res.render("app/imagenes/index",{imagenes: imagenes});
        });
    })
    //para crear una nueva imagen
    .post(function(req,res) {
        console.log(req.files.archivo);
        //Var. el cual devuelve un array lo separa por medio de un punto
        var extension = req.files.archivo.originalFilename.split(".").pop();
        //extrae la inf. del usuario
        var data = {
            title: req.body.title,
            //accede al id del usuario
            creator: res.locals.user._id,
            extension: extension
        }
        //crea una nueva instancia del modelo
        var imagen = new Imagen(data);
        //guardar la imagen
        imagen.save(function(err){
            //sino hay un error rediccionara a la ruta imagenes
            if (!err) {
                //fs mueve la imagen a la carpeta public/images
                fs.rename(req.files.archivo.path, "public/imagenes/"+imagen._id+"."+extension,
                function(err) {
                    res.redirect("/app/imagenes/"+imagen._id);
                });
            }
            else{
                console.log(imagen);
                res.render(err);
            }
        });
    });
//se exporta la ruta
module.exports = router;