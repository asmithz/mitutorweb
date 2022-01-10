const express= require('express');
const router = express.Router();

const { enviarMensaje } = require('../controladores/mensajes')
const { obtenerMensajes } = require('../controladores/mensajes')

router.post('/enviarMensaje/:id', enviarMensaje);
router.get('/obtenerMensajes/:id', obtenerMensajes);

module.exports = router;