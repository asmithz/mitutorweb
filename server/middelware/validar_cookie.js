const { response } = require('express');

const validarCookie = (req, res = response, next) => {

    const cookies = req;
    if('x-token' in cookies){
        console.log('session exists');
        next();
    }

}

module.exports = {
    validarCookie
}