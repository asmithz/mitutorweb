const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    tipo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    rut: {
        type: String,
        require: true
    },
    sexo: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    establecimiento: {
        type: String,
        require: true
    },
    edad: {
        type: String,
        require: true
    },
    user: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = model('Estudiante', EstudianteSchema);