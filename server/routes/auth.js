/* rutas de auth
   host + ruta 
*/

const express= require('express');
const router = express.Router();
const { registrarEstudiante } = require('../controladores/auth')
const { registrarTutor } = require('../controladores/auth')
const { loginEstudiante } = require('../controladores/auth')
const { loginTutor } = require('../controladores/auth')
const { revalidarToken } = require('../controladores/auth');
const { test } = require('../controladores/auth');
const { crearEstudiante } = require('../controladores/events');
const { validarJWT } = require('../middelware/validar_jwt')

router.post('/registrar', registrarEstudiante);
router.post('/login', loginEstudiante);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;