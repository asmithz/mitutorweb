const express= require('express');
const router = express.Router();

const { agregarPeticion } = require('../controladores/peticiones')
const { borrarPeticion } = require('../controladores/peticiones')
const { obtenerPeticion } = require('../controladores/peticiones')
const { actualizarPeticion } = require('../controladores/peticiones')
const { aceptarPeticion } = require('../controladores/peticiones')
const { iniciarChat } = require('../controladores/peticiones')

router.post('/agregarPeticion', agregarPeticion);
router.get('/obtenerPeticion/:id', obtenerPeticion);
router.delete('/borrarPeticion/:id', borrarPeticion);
router.put('/actualizarPeticion/:id', actualizarPeticion);
router.put('/aceptarPeticion/:id', aceptarPeticion);
router.put('/iniciarChat/:id', iniciarChat);

module.exports = router;