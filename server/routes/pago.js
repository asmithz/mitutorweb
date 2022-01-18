const express= require('express');
const router = express.Router();

const { registrarPago, generarPago, buscarPago} = require('../controladores/pagoControlador')

router.post('/generarPago', generarPago);
router.put('/registrarPago/:id', registrarPago);
router.get('/buscarPago/:id', buscarPago);

module.exports = router;