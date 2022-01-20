const express= require('express');
const router = express.Router();

const { zoomMeet } = require('../controladores/zoomControlador')

router.post('/ZoomMeet', zoomMeet);

module.exports = router;