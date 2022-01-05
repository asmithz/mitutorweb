const jwt = require('jsonwebtoken');

const generarJWT = ( password, user ) =>{   
    
    return new Promise(( resolve, reject ) =>{

        const payload = { password, user };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '365d'
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