const express = require('express');
const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const Tutor = require("../models/tutor");

const registrarEstudiante = async (req, res = express.response) => {
    
    const { tipo, 
            nombre, 
            apellido, 
            rut, 
            sexo, 
            email, 
            establecimiento, 
            edad,
            user,
            password } = req.body;
    try{

        let nuevo_estudiante = await Estudiante.findOne({ email });

        if( nuevo_estudiante ){
            return res.status(400).json({
                msg: 'un usuario ya existe con ese correo'
            });
        }

        const estudiante = new Estudiante( req.body );
        estudiante.user = nombre[0]+apellido; 
        estudiante.password = rut; 

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        estudiante.password = bcrypt.hashSync( password, salt );

        await estudiante.save();

        res.json({
            ok:true,
            msg: 'register'
        })

    } catch (error) {
        res.status(500).json({
            ok:true,
            msg: 'error'
        })
    }

}


const registrarTutor = (req, res = express.response) => {

    res.json({
        ok:true,
        msg: 'register'

    })
}

const loginEstudiante = async(req, res = express.response) => {

    const { user, 
            password } = req.body;

    try{

        const login_estudiante = await Estudiante.findOne({ user });

        if( !login_estudiante ){
            return res.status(400).json({
                msg: 'el usuario no existe con ese correo'
            });
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync( password, login_estudiante.password)

        if( !validPassword ){
            res.status(400).json({
                msg: 'password incorrecto'
            });
        }

        //geerar json token (jwt)
        res.json({

        })

    } catch(error){
        res.status(500).json({
            ok:true,
            msg: 'error'
        })
    }

    res.json({
        ok:true,
        msg: 'register'

    })
}

const loginTutor = async(req, res = express.response) => {

    const { user, 
            password } = req.body;

    try{

        const login_tutor = await Tutor.findOne({ user });

        if( !login_tutor ){
            return res.status(400).json({
                msg: 'el usuario no existe con ese correo'
            });
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync( password, login_tutor.password)

        if( !validPassword ){
            res.status(400).json({
                msg: 'password incorrecto'
            });
        }

        //geerar json token (jwt)
        res.json({

        })

    } catch(error){
        res.status(500).json({
            ok:true,
            msg: 'error'
        })
    }

    res.json({
        ok:true,
        msg: 'register'

    })
}

const revalidarToken = (req, res) => {
    res.json({
        ok:true,
        msg: 'lgin'
    })
}

module.exports = {
    registrarEstudiante,
    registrarTutor,
    loginEstudiante,
    loginTutor,
    revalidarToken
}