const { Router } = require('express');
const { validarJWT } = require('../middelware/validar_jwt');
const { obtenerTutor, actualizarTutor, actualizarHorario, borrarTutor, actualizarCalificacion, obtenerCalificacion } = require('../controladores/usuariosControlador')
const { obtenerEstudiante, actualizarEstudiante, borrarEstudiante } = require('../controladores/usuariosControlador')
const { obtenerTutores, filtrarTutores } = require('../controladores/usuariosControlador')

const router = Router();

//obtener estudiante
router.get('/obtenerEstudiante', obtenerEstudiante);

//actualizar estudiante
router.put('/actualizarEstudiante/:id', actualizarEstudiante);

//borrar estudiante
router.delete('/borrarEstudiante/:id',borrarEstudiante);

//obtener tutor
router.get('/obtenerTutor', obtenerTutor);

//actualizar tutor
router.put('/actualizarTutor/:id', actualizarTutor);

//actualizar horario
router.put('/actualizarHorario/:id', actualizarHorario);

//borrar tutor
router.delete('/borrarTutor/:id',borrarTutor);

//obtener tutores
router.get('/obtenerTutores', obtenerTutores);

//filtrar tutores
router.get('/filtrarTutores', filtrarTutores);

//actualizar calificacion
router.put('/actualizarCalificacion/:id', actualizarCalificacion);

//obtener calificacion
router.get('/obtenerCalificacion/:id', obtenerCalificacion);

module.exports = router;
