const { response } = require('express');
const  ChatVirtual = require("../models/chatvirtual")
const  Mensaje = require("../models/mensaje")

const ingresarChat = async () => {

}

const eliminarChat = async (req, res = response) => {
    const id_chat = req.params.id
    console.log(id_chat)

    try{
        const chat = await ChatVirtual.findById(id_chat)
        if(!chat){
            return res.status(400).json({
                ok: false,
                msg: "chat no encontrado"
            })
        }

        await ChatVirtual.findByIdAndDelete(id_chat);
        res.json({
            ok: true,
            msg: "exito al eliminar"
        })
        
    }catch(error){
        console.log(error)
    }

    
}

const agregarChat = async () => {
    
}

const obtenerChat = async (req, res = response) => {
    const emisor_id = req.params.id
    var chats = await ChatVirtual.find({emisor_id})
    if(chats.length === 0){
        const receptor_id = req.params.id
        chats = await ChatVirtual.find({receptor_id})
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