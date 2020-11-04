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

//se crea el virtual
useSchema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
});

//Se crea el modelo
var User = mongoose.model("User", useSchema);
module.exports.User = User;
/*
 *Tipos de datos para definir un documento
 *String, Numbre, Date, Buffer, Boolean, Mixed, Objectid, Array
 */