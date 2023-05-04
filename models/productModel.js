const mongoose = require('mongoose');

const { Schema } = require('mongoose');

//configuramos con Schema nuestra coleccion de database
const productSchema = new Schema({
   nombre:{ 
    type : String,
    required: true
   },
   precio:{ 
    type: Number,
    required: true
   },
   stock:{
    type: Number,
    required: true
   },
   timestamp:{ 
    type : Date,
    default: new Date(),

}

});
//exportamos la configuracion con el nombre de la coleccion

module.exports = mongoose.model('Productos', productSchema);


