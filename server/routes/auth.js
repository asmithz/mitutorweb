/* rutas de auth
   host + ruta 
*/

const express= require('express');
const router = express.Router();
const { registrarEstudiante } = require('../controladores/auth')
const { registrarTutor } = require('../controladores/auth')
const { loginEstudiante } = require('../controladores/auth')
const { loginTutor } = require('../controladores/auth')
const { revalidarToken } = require('../controladores/auth')

router.post('/registrar', registrarEstudiante);
router.post('/registrar', registrarTutor);
router.post('/login', loginEstudiante);
router.post('/login', loginTutor);

router.get('/renew', revalidarToken);

module.exports = router;