const express= require('express');
const router = express.Router();

const { ingresarChat } = require('../controladores/chatControlador')
const { eliminarChat } = require('../controladores/chatControlador')
const { agregarChat } = require('../controladores/chatControlador')
const { obtenerChat } = require('../controladores/chatControlador')
const { verificarChat } = require('../controladores/chatControlador')

router.post('/agregarChat/:id', agregarChat);
router.get('/obtenerChat/:id', obtenerChat);
router.get('/verificarChat/:id', verificarChat);
router.delete('/eliminarChat/:id', eliminarChat);

module.exports = router;