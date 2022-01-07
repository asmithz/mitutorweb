const { Router } = require('express');
const { validarJWT } = require('../middelware/validar_jwt');
const { obtenerTutor, actualizarTutor, actualizarHorario, borrarTutor } = require('../controladores/events')
const { obtenerEstudiante, actualizarEstudiante, borrarEstudiante } = require('../controladores/events')
const { obtenerTutores, filtrarTutores } = require('../controladores/events')

const router = Router();

//obtener estudiante
router.get('/obtenerEstudiante', obtenerEstudiante);

//actualizar estudiante
router.put('/actualizarEstudiante/:id', actualizarEstudiante);

//borrar estudiante
router.delete('/:id',borrarEstudiante);

//obtener tutor
router.get('/obtenerTutor', obtenerTutor);

//actualizar tutor
router.put('/actualizarTutor/:id', actualizarTutor);

//actualizar horario
router.put('/actualizarHorario/:id', actualizarHorario);

//borrar tutor
router.delete('/:id',borrarTutor);

//obtener tutores
router.get('/obtenerTutores', obtenerTutores);

//filtrar tutores
router.get('/filtrarTutores', filtrarTutores);

module.exports = router;
