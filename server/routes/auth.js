const express= require('express');
const router = express.Router();
const { registrarEstudiante } = require('../controladores/auth')
const { registrarTutor } = require('../controladores/auth')
const { loginEstudiante } = require('../controladores/auth')
const { loginTutor } = require('../controladores/auth')
const { revalidarToken } = require('../controladores/auth');
const { validarJWT } = require('../middelware/validar_jwt')

router.post('/registrarEstudiante', registrarEstudiante);

router.post('/registrarTutor', registrarTutor);

router.post('/login', loginEstudiante);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;