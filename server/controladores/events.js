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

        // checkear si esta en blaco :c estaba apurado xD
        if(!estudianteBody.name){
            estudianteBody.name = estudiante.nombre
        }
        if(!estudianteBody.apellido){
            estudianteBody.apellido = estudiante.apellido
        }
        if(!estudianteBody.rut){
            estudianteBody.rut = estudiante.rut
        }
        if(!estudianteBody.sexo){
            estudianteBody.sexo = estudiante.sexo
        }
        if(!estudianteBody.email){
            estudianteBody.email = estudiante.email
        }
        if(!estudianteBody.establecimiento){
            estudianteBody.establecimiento = estudiante.establecimiento
        }
        if(!estudianteBody.edad){
            estudianteBody.edad = estudiante.edad
        }

        const nuevosDatos = {
            _id: estudiante._id,
            tipo: estudiante.tipo,
            nombre : estudianteBody.nombre,
            apellido : estudianteBody.apellido,
            rut : estudianteBody.rut,
            sexo : estudianteBody.sexo,
            email : estudianteBody.email,
            establecimiento : estudianteBody.establecimiento,
            edad : estudianteBody.edad,
            user: estudiante.user,
            password: estudiante.password,
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
}

const obtenerTutor = async (req, res = response) => {
    const tipo = "tutor";
    const tutores = await Tutor.find({tipo});
    // .populate
    res.json({
        ok: true,
        msg : 'obtenerTutor',
        tutores
    })
}

const actualizarTutor = async (req, res = response) => {

    const tutorID = req.params.id;
    const tutorBody = req.body;
    const busqueda = { 'datos._id': tutorID};

    try{
        const tutor = await Tutor.findOne(busqueda);

        if (!tutor){
            return res.status(404).json({
                ok: false,
                msg: 'no existe ese id'
            });
        }

        // checkear si esta en blaco :c estaba apurado xD
        if(!tutorBody.nombre){
            tutorBody.nombre = tutor.datos.nombre;
            console.log(tutorBody.nombre)
        }
        if(!tutorBody.apellido){
            tutorBody.apellido = tutor.datos.apellido;
        }
        if(!tutorBody.rut){
            tutorBody.rut = tutor.datos.rut;
        }
        if(!tutorBody.sexo){
            tutorBody.sexo = tutor.datos.sexo;
        }
        if(!tutorBody.email){
            tutorBody.email = tutor.datos.email;
        }
        if(!tutorBody.establecimiento){
            tutorBody.establecimiento = tutor.datos.establecimiento;
        }
        if(!tutorBody.edad){
            tutorBody.edad = tutor.datos.edad;
        }
        if(!tutorBody.asignaturas[0]){
            tutorBody.asignaturas = tutor.datos.asignaturas;
        }
        
        const datosTutor = {
            tipo: tutor.datos.tipo,
            nombre : tutorBody.nombre,
            apellido : tutorBody.apellido,
            rut : tutorBody.rut,
            sexo : tutorBody.sexo,
            email : tutorBody.email,
            establecimiento : tutorBody.establecimiento,
            edad : tutorBody.edad,
            asignaturas: tutorBody.asignaturas,
            _id: tutorID,
            user: tutor.datos.user,
            password: tutor.datos.password,
            calificacion: tutor.datos.calificacion
        }
        
        const nuevosDatos = {
            _id: tutor.id,
            datos: datosTutor,
            horario: tutor.horario
        } 
       
        const tutorActualizado = await Tutor.findOneAndUpdate( busqueda, nuevosDatos, { new: true} );
        //console.log(tutorActualizado)

        return res.json({
            ok: true,
            msg: "tutor actualizado"
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar'
        })
    }
}

const actualizarHorario = async (req, res = response) => {

    const { horario } = req.body;
    const id = req.params.id;
    const busqueda = { 'datos._id': id};
    try{
        const tutor = await Tutor.findOne(busqueda);
        console.log(tutor)
        const nuevo_tutor = {
            _id: tutor.id,
            datos: tutor.datos,
            horario: horario,
            __v: tutor.__v
        }
        const horarioActualizado = await Tutor.findOneAndUpdate( busqueda, nuevo_tutor, { new: true} );

        return res.json({
            ok: true,
            msg: "horario actualizado",
            horarioActualizado
        });

    }catch(error){
        console.log(error)
    }
}

const borrarTutor = async (req, res = response) => {

    const tutorID = req.params.id;
    const busqueda = { 'datos._id': tutorID};

    try{

        const tutor = await Tutor.findOne( busqueda );

        if (!tutor){
            return res.status(404).json({
                ok: false,
                msg: 'no existe ese id'
            });
        }

        await Tutor.findByIdAndDelete( tutor.id );

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
    actualizarHorario,
    borrarTutor,
    obtenerTutores,
    filtrarTutores
}