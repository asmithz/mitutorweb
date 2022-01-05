const { Router } = require('express');
const { validarJWT } = require('../middelware/validar_jwt');
const { obtenerTutor, actualizarTutor, borrarTutor } = require('../controladores/events')
const { obtenerEstudiante, actualizarEstudiante, borrarEstudiante } = require('../controladores/events')

const router = Router();

//validar token
router.use( validarJWT );

//obtener estudiante
router.get('/', obtenerEstudiante);

//actualizar estudiante
router.put('/:id', actualizarEstudiante);

//borrar estudiante
router.delete('/:id',borrarEstudiante);

//obtener tutor
router.get('/', obtenerTutor);

//actualizar tutor
router.put('/:id', actualizarTutor);

//borrar tutor
router.delete('/:id',borrarTutor);

module.exports = router;
