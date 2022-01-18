const express= require('express');
const router = express.Router();

const { agregarPeticion } = require('../controladores/peticionControlador')
const { borrarPeticion } = require('../controladores/peticionControlador')
const { obtenerPeticion } = require('../controladores/peticionControlador')
const { actualizarPeticion } = require('../controladores/peticionControlador')
const { aceptarPeticion } = require('../controladores/peticionControlador')
const { iniciarChat } = require('../controladores/peticionControlador')

router.post('/agregarPeticion', agregarPeticion);
router.get('/obtenerPeticion/:id', obtenerPeticion);
router.delete('/borrarPeticion/:id', borrarPeticion);
router.put('/actualizarPeticion/:id', actualizarPeticion);
router.put('/aceptarPeticion/:id', aceptarPeticion);
router.put('/iniciarChat/:id', iniciarChat);

module.exports = router;