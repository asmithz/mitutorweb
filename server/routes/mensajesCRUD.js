const express= require('express');
const router = express.Router();

const { enviarMensaje } = require('../controladores/mensajes')
const { obtenerMensajes } = require('../controladores/mensajes')

router.post('/', enviarMensaje);
router.get('/:chatid', obtenerMensajes);

module.exports = router;