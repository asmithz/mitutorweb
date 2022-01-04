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
        unique: true,
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

const horario_tutor = Schema({
    Lunes: {
        type: [String],
        required: true,
    },
    Martes: {
        type: [String],
        required: true,
    },
    Miercoles: {
        type: [String],
        required: true,
    },
    Jueves: {
        type: [String],
        required: true,
    },
    Viernes: {
        type: [String],
        required: true,
    },
    Sábado: {
        type: [String],
        required: true,
    },
    Domingo: {
        type: [String],
        required: true,
    }
});

const TutorSchema = Schema({
   datos: {
       type: [datos_tutor],
       required: true,
   },
   horario: {
       type: [horario_tutor],
       required: true,
   }
});

module.exports = model('Tutor', TutorSchema);