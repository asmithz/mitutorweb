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
        const token = await generarJWT(estudiante.password, estudiante.user);

        res.status(201).json({
            ok: true,
            msg: 'register',
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }

}

const loginEstudiante = async(req, res = response) => {

    const { user, password } = req.body;

    try{
        // busca que exista el user
        const login_estudiante = await Estudiante.findOne({ user });

        if( !login_estudiante ){
            return res.status(400).json({
                ok: false,
                msg: 'el usuario no existe'
            });
        }

        // confirmar los password
        const validPassword = bcrypt.compareSync( password, login_estudiante.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false, 
                msg: 'password incorrecto'
            });
        }

        //geerar json token (jwt)
        // generar jwt
        const token = await generarJWT(login_estudiante.password, login_estudiante.user);

        res.json({
            ok:true,
            msg: 'logeado',
            token
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'error halgo sucedio'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const user = req.user;
    const password = req.password;

    // generar nuevo token
    const token = await generarJWT(password, user);

    res.json({
        ok:true,
        msg: 'login',
        token
    })
}

module.exports = {
    registrarEstudiante,
    loginEstudiante,
    revalidarToken
}