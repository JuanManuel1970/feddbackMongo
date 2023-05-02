require('dotenv').config();
const jwt = require('jsonwebtoken');
const miFirma = process.env.PRIVATE_KEY;

console.log(miFirma);

const generarjsonWebToken = (usuario)=>{

    return new Promise((resolve, reject)=>{ 
        jwt.sign( 
            {usuario}, 
            miFirma, 
            { expiresIn: '30min'},
            (error, token)=>{
                if(error){
                console.log(error);
                reject('No pude generar la firma')
                }
                resolve(token)
            })
    });

}

module.exports = {
    generarjsonWebToken 
}
