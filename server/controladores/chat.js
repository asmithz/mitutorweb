const { response } = require('express');
const  ChatVirtual = require("../models/chatvirtual")
const  Mensaje = require("../models/mensaje")

const ingresarChat = async () => {

}

const eliminarChat = async () => {
    
}

const agregarChat = async () => {
    
}

const obtenerChat = async (req, res = response) => {
    const emisor_id = req.params.id
    var chats = await ChatVirtual.find({emisor_id})
    console.log(chats)
    if(chats.length === 0){
        const receptor_id = req.params.id
        chats = await ChatVirtual.find({receptor_id})
        console.log(chats)
        if(chats.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "no se encuentran peticiones"
            })
        }
    }
    res.json({
        chats
    })
}

module.exports = {
    ingresarChat,
    eliminarChat,
    agregarChat,
    obtenerChat
}