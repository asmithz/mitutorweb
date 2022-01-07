const { response } = require('express');
const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const Tutor = require("../models/tutor");
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middelware/validar_jwt');

const registrarEstudiante = async (req, res = response) => {

    const { tipo, nombre, apellido,rut, sexo, email, establecimiento, edad } = req.body;

    try{
        const estudiante = new Estudiante( req.body );

        estudiante.user = estudiante.nombre[0]+estudiante.apellido; 
        estudiante.password = estudiante.rut; 

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        estudiante.password = bcrypt.hashSync( estudiante.password, salt );

        estudiante.markModified('user');
        estudiante.markModified('password');

        await estudiante.save();
        // generar jwt
        const token = await generarJWT(estudiante.id, estudiante.tipo);
        //res.cookie('x-token', token, { httpOnly: true, maxAge: 86400 })

        res.status(201).json({
            ok: true,
            msg: 'register'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const registrarTutor = async (req, res = response) => {

    const { datos, horario } = req.body;

    try{
        const email = datos.email

        let tutor = await Tutor.findOne({ datos: {email: email} });

        if(tutor){
            return res.status(400).json({
                ok: false,
                msg: "ya existe ese correo"
            });
        }

        tutor = new Tutor( req.body );
        tutor.datos.user = tutor.datos.nombre[0]+tutor.datos.apellido; 
        tutor.datos.password = tutor.datos.rut; 
        tutor.datos.calificacion = "0";

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        tutor.datos.password = bcrypt.hashSync( tutor.datos.password, salt );

        tutor.markModified('datos.user');
        tutor.markModified('datos.password');

        console.log(tutor)
        await tutor.save();
        // generar jwt
        const token = await generarJWT(tutor.id, tutor.datos.tipo);
        res.cookie('x-token', token, { httpOnly: true, maxAge: 86400 })

        res.status(201).json({
            ok: true,
            msg: 'register'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error no se pudo agregar al tutor'
        })
    }

}

const loginUsuario = async(req, res = response) => {

    const { user, password } = req.body;

    try{
        // busca que exista el user en estudiantes
        let login = await Estudiante.findOne({ user });

        if( !login ){
            // busca que exista el user en tutores
            login = await Tutor.findOne({ user });
            if( !login ){
                return res.status(400).json({
                    ok: false,
                    msg: 'el usuario no existe'
                });
            }
            else{
                // confirmar los password
                let validPassword2 = bcrypt.compareSync( password, login.datos.password );

                if( !validPassword2 ){
                    return res.status(400).json({
                        ok: false, 
                        msg: 'password incorrecto'
                    });
                }
            }
        }
        else{
            // confirmar los password
            let validPassword = bcrypt.compareSync( password, login.password );

            if( !validPassword ){
                return res.status(400).json({
                    ok: false, 
                    msg: 'password incorrecto'
                });
            }
        }


        //geerar json token (jwt)
        // generar jwt
        const token = await generarJWT(login.id, login.tipo);
        res.cookie('x-token', token, { httpOnly: true, maxAge: 86400, secure: true })
        res.json({
            ok: true,
            msg: 'logeado',
            login,
            token
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error halgo sucedio'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const { tipo, id } = req.body;

    // generar nuevo token
    const token = await generarJWT(id, tipo);

    res.json({
        ok:true,
        msg: 'login',
        token
    })
}


module.exports = {
    registrarEstudiante,
    registrarTutor,
    loginUsuario,
    revalidarToken
}