const express= require('express');
const router = express.Router();

const { checkTipo } = require('../controladores/checkTipo')
const { validarJWT } = require('../middelware/validar_jwt')
const { validarCookie } = require('../middelware/validar_cookie')

router.get('/checkUser', validarJWT, checkTipo);

module.exports = router;