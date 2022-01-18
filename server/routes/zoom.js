const express= require('express');
const router = express.Router();

const { zoomMeet } = require('../controladores/zoomControlador')

router.get('/ZoomMeet', zoomMeet);

module.exports = router;