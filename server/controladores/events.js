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

        const nuevoEstudiante = {
            ...req.body,
            id: estudiante_user 
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate( estudianteID, nuevoEstudiante, { new: true} );

        return res.json({
            ok: true,
            msg: estudianteActualizado
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
        msg : 'actualizarEstudiante',
        estudianteID
    })
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