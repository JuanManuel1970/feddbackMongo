const { validationResult } = require('express-validator') 
const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');


const paginaPrincipal = (req, res) => { 
    //console.log(req);
    res.status(200).json({
        mensaje: "Código 200 - Todo OK!"
    })
}

const paginaError = (req, res) => { 
    console.log('Error');
    res.status(500).send(`<h1>Todo mal!!</h1>`)
}


const registrarUsuario = async (req, res) => {

    //1. Verificacmos si los datos son correctos
    
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        })
    }
    //2.desestructuramos las variables
    
    const { nombre, email, password } = req.body;
    
    console.log(`1. Mis datos son: ${nombre} - ${email} - ${password}`);



        //3. Verificacmos si el usuario ya existe 
        
        try {
            let usuarioExiste =  await Usuario.findOne({email})
            console.log(`2.Existe : ${usuarioExiste}`);
            if(usuarioExiste){
                return res.status(400).json({
                    errores: 'El usuario ya existe'

            })
        }

            //4.si no existe , creamos u nuevo  usuario

            let nuevoUsuario = new Usuario(req.body);


        console.log(`3.NUevo Usuario a guardar :${nuevoUsuario}`);
        const salt = bcrypt.genSaltSync();
        console.log(`4. Salt para encriptacion : ${salt}`);
        console.log(`5. El password sin Salt es : ${nuevoUsuario.password}`);
        
        //6.Mezclamos la salt con el password del usuario
        nuevoUsuario.password = bcrypt.hashSync(password, salt);
        
        console.log(`6. El password con Salt es : ${nuevoUsuario.password}`);
        
        //7. insertamos en la db un nuevo usuario

          await nuevoUsuario.save();

           res.status(200).end('Tus datos fueron recibidos  y guardados en la DB ')
 //5.Creamos la salt para encriptar el password    

//6.respondemoa a la peticion del cliente , si todo va bien
        } catch (error) {
console.log(error);
return res.status(400).json ({
    mensaje : 'NUestros mejores Deps , estan trabajando para solucionar el problema'

    })
}
   





}


const paginaPrueba = (req, res) => {

        const { nombre, email, password } = req.body;

        //iria la insercion de datos con MongoDB
    

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

        res.status(200).json({
            mensaje: 'User creado'
        })

        console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

};

module.exports = {
    paginaPrincipal,
    paginaError,
    registrarUsuario,
    paginaPrueba
}