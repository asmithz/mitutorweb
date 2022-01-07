const jwt = require('jsonwebtoken');

const generarJWT = ( id, tipo ) =>{   
    
    return new Promise(( resolve, reject ) =>{

        const payload = { id, tipo };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('no se genero el token');
            }
            resolve( token );
        })
    }) 
}

module.exports = {
    generarJWT
}