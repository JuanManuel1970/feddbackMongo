const mongoose = require('mongoose');

const { Schema } = require('mongoose');

//configuramos con Schema nuestra coleccion de database
const userSchema = new Schema({
   nombre:{ 
    type : String,
    required: true
   },
   email:{ 
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },
   timestamp:{ 
    type : Date,
    default: new Date(),

}

});
//exportamos la configuracion con el nombre de la coleccion

module.exports = mongoose.model('Usuarios', userSchema);



