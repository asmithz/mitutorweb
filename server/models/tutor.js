const { Schema, model } = require('mongoose');

const datos_tutor = Schema({
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
        require: true,
    },
    establecimiento: {
        type: String,
        require: true
    },
    edad: {
        type: String,
        require: true
    },
    asignaturas: {
        type: [String],
        require: true
    },
    user: {
        type: String
    },
    password: {
        type: String
    },
    calificacion: {
        type: String
    }
});

const horario_tutor = Schema({
    Lunes: {
        type: [String]
    },
    Martes: {
        type: [String]
    },
    Miercoles: {
        type: [String]
    },
    Jueves: {
        type: [String]
    },
    Viernes: {
        type: [String]
    },
    Sábado: {
        type: [String]
    },
    Domingo: {
        type: [String]
    }
});

const TutorSchema = Schema({ 
   datos: {
    type: datos_tutor
   },
   horario:{
    type: horario_tutor
   } 
});


module.exports = model('Tutor', TutorSchema);