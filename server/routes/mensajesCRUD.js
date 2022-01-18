const express= require('express');
const router = express.Router();

const { enviarMensaje } = require('../controladores/mensajeControlador')
const { obtenerMensajes } = require('../controladores/mensajeControlador')

router.post('/enviarMensaje/:id', enviarMensaje);
router.get('/obtenerMensajes/:id', obtenerMensajes);

module.exports = router;