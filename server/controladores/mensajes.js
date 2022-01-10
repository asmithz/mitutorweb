const { response } = require('express');
const Estudiante = require('../models/estudiante')
const Tutor = require('../models/tutor')
const Mensaje = require('../models/mensaje')
const ChatVirtual = require('../models/chatvirtual')

const enviarMensaje = async (req, res = response) => {
    const chat_id = req.params.id
    const idEmisor = req.body.emisor_id 
    const mensajeEmisor = req.body.mensaje
    try{
        const chatEncontrado = await ChatVirtual.findById(chat_id)
        if(!chatEncontrado){
            return res.status(400).json({
                ok: false,
                msg: "no existe tal chat"
            })
        }
        
        chatEncontrado.cant_mensajes += 1
        chatEncontrado.markModified("cant_mensajes")
        const numero_mensaje = chatEncontrado.cant_mensajes

        const nuevo_mensaje = new Mensaje()
        nuevo_mensaje.emisor_id = idEmisor
        nuevo_mensaje.mensaje = mensajeEmisor
        nuevo_mensaje.numero = numero_mensaje
        chatEncontrado.mensajes.push(nuevo_mensaje)
        await chatEncontrado.save()
        res.json({
            ok: true,
            msg: "mensaje agregado",
            chatEncontrado
        })
        
    }catch(error){
        console.log(error)
    }

}

const obtenerMensajes = async (req, res = response) => {
    const chat_id = req.params.id
    const chatEncontrado = await ChatVirtual.findById(chat_id)
        if(!chatEncontrado){
            return res.status(400).json({
                ok: false,
                msg: "no existe tal chat"
            })
        }
        const mensajes = chatEncontrado.mensajes.sort((a, b) => parseFloat(a.numero) - parseFloat(b.numero))
    res.json({
        mensajes        
    })
}

module.exports = {
    enviarMensaje,
    obtenerMensajes
}
