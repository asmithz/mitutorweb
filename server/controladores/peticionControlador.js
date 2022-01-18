const { response } = require('express');
const Estudiante = require('../models/estudiante');
const Tutor = require("../models/tutor");
const Peticion = require("../models/peticion");
const ChatVirtual = require("../models/chatvirtual")
const Mensaje = require("../models/mensaje")

const agregarPeticion = async (req, res = response) => {
    const { estudiante_id, tutor_id } = req.body
    try{
        const tutor = await Tutor.findOne({'datos._id': tutor_id})
        const estudiante = await Estudiante.findById(estudiante_id)
        const existe_peticion = await Peticion.findOne({estudiante_id, tutor_id})
        if(existe_peticion){
            return res.json({
                ok: false,
                msg: "Ya existe la peticion a este tutor"
            })
        }
        const peticion = new Peticion();
        peticion.titulo = "El estudiante: "+estudiante.nombre+" "+estudiante.apellido+", desea iniciar un chat virtual.";
        peticion.estado = "Pendiente"; 
        peticion.estudiante_id = estudiante_id;
        peticion.tutor_id = tutor_id;
        peticion.markModified('titulo')
        peticion.markModified('estado')
        peticion.markModified('estudiante_id')
        peticion.markModified('tutor_id')
        await peticion.save();
    }catch(error){
        console.log(error)
    }
    res.json({
        ok: true,
        msg: "peticion realizada"
    })

}

const borrarPeticion = async (req, res = response) => {
    const peticion_id = req.params.id;

    const buscarPeticion = await Peticion.findById(peticion_id)
    
    if(!buscarPeticion){
        return res.status(400).json({
            ok: false,
            msg: "no existe "
        })
    }

    await Peticion.findByIdAndDelete( peticion_id );

    res.json({
        ok: true,
        msg: "encontrado y borrado"
    })

}

const actualizarPeticion = async (req, res = response) => {
    const peticion_id = req.params.id;

    const buscarPeticion = await Peticion.findById(peticion_id)
    
    if(!buscarPeticion){
        return res.status(400).json({
            ok: false,
            msg: "no existe "
        })
    }

    buscarPeticion.estado = "Aprobado, el estudiante debe inciar el chat" 
    buscarPeticion.markModified('estado')

    res.json({
        ok: true,
        msg: "encontrado y borrado"
    })

}

const obtenerPeticion = async (req, res = response) => {
    const tutor_id = req.params.id
    try{
    var peticiones = await Peticion.find({tutor_id})
    if(peticiones.length === 0){
        const estudiante_id = req.params.id
        peticiones = await Peticion.find({estudiante_id})
        if(peticiones.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "no se encuentran peticiones"
            })
        }
    }
    }catch(error){
        console.log(error)
    }
    res.json({
        peticiones
    })

}

const aceptarPeticion = async (req, res = response) => {
    const peticion_id = req.params.id;

    const buscarPeticion = await Peticion.findById(peticion_id)
    
    if(!buscarPeticion){
        return res.status(400).json({
            ok: false,
            msg: "no existe "
        })
    }

    buscarPeticion.estado = "Aceptada" 
    buscarPeticion.markModified('estado')

    await Peticion.findByIdAndUpdate(peticion_id, buscarPeticion)

    res.json({
        ok: true,
        msg: "encontrado y borrado",
        buscarPeticion
    })

}

const iniciarChat = async (req, res = response) => {
    const peticion_id = req.params.id;
    try{
        const buscarPeticion = await Peticion.findById(peticion_id)
        
        if(!buscarPeticion){
            return res.status(400).json({
                ok: false,
                msg: "no existe "
            })
        }
        const { estudiante_id, tutor_id } = buscarPeticion

        const emisor = await Estudiante.findById(estudiante_id)
        const receptor = await Tutor.findOne({ 'datos._id': tutor_id})
        const receptor_datos = receptor.datos

        const nuevo_chat = new ChatVirtual();
        nuevo_chat.titulo = "Chat entre "+emisor.nombre+" "+emisor.apellido+" y "+receptor_datos.nombre+" "+receptor_datos.apellido+""
        nuevo_chat.estado = "Iniciado"
        nuevo_chat.emisor_id = estudiante_id
        nuevo_chat.receptor_id = tutor_id
        nuevo_chat.cant_mensajes = 0
        nuevo_chat.markModified('titulo')
        nuevo_chat.markModified('estado')
        nuevo_chat.markModified('emisor_id')
        nuevo_chat.markModified('receptor_id')
        nuevo_chat.markModified('cant_mensajes')
        await nuevo_chat.save()
        await Peticion.findByIdAndDelete( peticion_id );

        return res.json({
            ok: true,
            msg: "chat creado",
            nuevo_chat 
        })

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    agregarPeticion,
    borrarPeticion,
    actualizarPeticion,
    obtenerPeticion,
    aceptarPeticion,
    iniciarChat
}