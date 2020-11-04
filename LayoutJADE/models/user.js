//Se declara la libreria 
var mongoose = require("mongoose");
//Se declara el esquema
var Schema = mongoose.Schema;
//se declara el array y se le asigna dos valores
var posiblesValores = ["M","F"];

var emailMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

//Crea el esquema y pasa la estructura del documento
var useSchema = new Schema({
    name: String,
    lastName: String,
    //Hace las validaciones
    userName: {
        type: String,required:true,maxlength:[50,"El usuario es muy grande"]
    },
    password: {
        type: String,minlength:[8,"El password es muy corto"],
        validate: { validator: function(p) {
            return this.password_confirmation == p;
    }, 
        message: "Las contraseñas no son iguales" }
    },
    age : {
        type: Number, min: [5,"La edad no puede ser menor que 5"], max:[100,"La edad no puede ser mayor que 100"] 
    },
    email: {
        type: String, required: "El correo el obligatorio",match: emailMatch
    },
    dateOfBirth: Date,
    sex: {
        type: String,enum:{values: posiblesValores, message:"Opción no válida"} 
    }
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