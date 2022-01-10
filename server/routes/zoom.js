const express= require('express');
const router = express.Router();

const { zoomMeet } = require('../controladores/zoom')

router.get('/ZoomMeet', zoomMeet);

module.exports = router;