const { response } = require('express');

const checkTipo = (req, res = response) => {
    //console.log(req.header('x-token'))
    const token = req.header('x-token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = Buffer.from(base64, "base64");
    const payloadinit = buff.toString('ascii');
    const usuario = JSON.parse(payloadinit);
    res.status(201).json({
        usuario
    })
      
}

module.exports={
    checkTipo
}