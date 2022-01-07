const express= require('express');
const router = express.Router();

const { registrarEstudiante } = require('../controladores/auth')
const { registrarTutor } = require('../controladores/auth')
const { loginUsuario } = require('../controladores/auth')
const { revalidarToken } = require('../controladores/auth');
const { validarJWT } = require('../middelware/validar_jwt')
const { validarCookie } = require('../middelware/validar_cookie')

router.post('/registrarEstudiante', registrarEstudiante);

router.post('/registrarTutor', registrarTutor);

router.post('/Login', loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;