const { Router } = require('express');
const { validarJWT } = require('../middelware/validar_jwt');
const { obtenerTutor, actualizarTutor, borrarTutor } = require('../controladores/events')
const { obtenerEstudiante, actualizarEstudiante, borrarEstudiante } = require('../controladores/events')
const { obtenerTutores, filtrarTutores } = require('../controladores/events')

const router = Router();

//obtener estudiante
router.get('/obtenerEstudiante', obtenerEstudiante);

//actualizar estudiante
router.put('/:id', actualizarEstudiante);

//borrar estudiante
router.delete('/:id',borrarEstudiante);

//obtener tutor
router.get('/obtenerTutor', obtenerTutor);

//actualizar tutor
router.put('/:id', actualizarTutor);

//borrar tutor
router.delete('/:id',borrarTutor);

//obtener tutores
router.get('/obtenerTutores', obtenerTutores);

//filtrar tutores
router.get('/filtrarTutores', filtrarTutores);

module.exports = router;
