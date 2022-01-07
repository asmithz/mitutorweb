const { response } = require('express');
const Estudiante = require('../models/estudiante')
const Tutor = require('../models/tutor')

const obtenerEstudiante = async (req, res = response) => {
    const tipo = "estudiante";
    const estudiantes = await Estudiante.find({tipo});
    // .populate

    res.json({
        ok: true,
        msg : 'obtenerEstudiante',
        estudiantes
    })
}

const actualizarEstudiante = async (req, res = response) => {

    //console.log(req.body)
    //console.log(req.params.id)
    const estudianteID = req.params.id;
    const estudianteBody = req.body

    try{

        const estudiante = await Estudiante.findById( estudianteID );

        if (!estudiante){
            return res.status(404).json({
                ok: false,
                msg: 'no existe ese id'
            });
        }

        if(estudiante.id.toString() !== estudianteID){
            return res.status(401).json({
                ok: false,
                msg: 'sin privilegios'
            });
        }
        //console.log(estudiante)
        /*
        let nuevo = {
            _id: estudiante._id,
            __v: estudiante.__v}

        */
        //rellenar datos vacios con los anteriores
        for(let valor in Object.entries(estudianteBody)){
            if(valor === ""){
                estudianteBody.valor = estudiante.valor
            }
        }

       

        const nuevosDatos = {
            _id: estudiante._id,
            nombre : estudianteBody.nombre,
            apellido : estudianteBody.apellido,
            rut : estudianteBody.rut,
            sexo : estudianteBody.sexo,
            email : estudianteBody.email,
            establecimiento : estudiante.establecimiento,
            edad : estudiante.edad,
            __v: estudiante.__v
        } 
       
        const estudianteActualizado = await Estudiante.findByIdAndUpdate( estudianteID, nuevosDatos, { new: true} );

        return res.json({
            ok: true
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar'
        })
    }
}

const borrarEstudiante = async(req, res = response) => {

    const estudianteID = req.params.id;

    try{

        const estudiante = await Estudiante.findById( estudianteID );

        if (!estudiante){
            return res.status(404).json({
                ok: false,
                msg: 'no existe ese id'
            });
        }

        console.log(estudiante.id.toString())

        console.log(estudianteID)

        if(estudiante.id.toString() !== estudianteID){
            return res.status(401).json({
                ok: false,
                msg: 'sin privilegios'
            });
        }

        await Estudiante.findByIdAndDelete( estudianteID );

        return res.json({
            ok: true,
            msg: 'borrado'
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar'
        })
    }
    res.json({
        ok: true,
        msg : 'borrarEstudiante'
    })
}

const obtenerTutor = async (req, res = response) => {
    const tipo = "tutor";
    const tutores = await Tutor.find({tipo});
    // .populate
    res.json({
        ok: true,
        msg : 'obtenerTutor'
    })
}

const actualizarTutor = (req, res = response) => {
    res.json({
        ok: true,
        msg : 'actualizarTutor'
    })
}

const borrarTutor = (req, res = response) => {
    res.json({
        ok: true,
        msg : 'borrarTutor'
    })
}

const obtenerTutores = async (req, res = response) => {
    const tutores = await Tutor.find();
    // .populate
    res.json({
        tutores
    })
}

const filtrarTutores = async(req, res = response) => {
    //colocar especificaciones
    const tutores = await Tutor.find({dato});
    res.json({
        ok: true,
        tutores
    })
}

module.exports = {
    obtenerEstudiante,
    actualizarEstudiante,
    borrarEstudiante,
    obtenerTutor,
    actualizarTutor,
    borrarTutor,
    obtenerTutores,
    filtrarTutores
}