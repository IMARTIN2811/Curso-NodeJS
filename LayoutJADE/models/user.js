//Se declara la libreria 
var mongoose = require("mongoose");
//Se declara el esquema
var Schema = mongoose.Schema;
//Crea el esquema y pasa la estructura del documento
var useSchema = new Schema({
    name: String,
    userName: String,
    password: String,
    age : Number,
    email: String,
    dateOfBirth: Date
});

/*
 *Tipos de datos para definir un documento
 *String, Numbre, Date, Buffer, Boolean, Mixed, Objectid, Array
 */

