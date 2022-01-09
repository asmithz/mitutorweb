const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        //res.redirect('http://localhost:3000/Login')
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        });
    }

    try{
        const { id, tipo } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.tipo = tipo;

    } catch (error){
        //res.redirect('http://localhost:3000/Login')
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });

    }
    next();
}

module.exports = {
    validarJWT
}