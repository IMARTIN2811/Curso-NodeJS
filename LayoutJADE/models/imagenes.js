//Se declara la libreria 
var mongoose = require("mongoose");
//Se declara el esquema
var Schema = mongoose.Schema;

//se declara la esquema de la imagen
var imgSchema = new Schema({
    title : { type: String, required: true }
});

var Imagen = mongoose.model("Imagen",imgSchema);
//se exporta el modelo
module.exports = Imagen;