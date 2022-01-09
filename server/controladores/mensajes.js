const { response } = require('express');

const enviarMensaje = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "conectado"
    })

}
const obtenerMensajes = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "conectado"
    })

}
module.exports = {
    enviarMensaje,
    obtenerMensajes
}
