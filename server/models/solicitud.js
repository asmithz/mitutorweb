const { Schema, model } = require('mongoose');

const SolicitudSchema = Schema({
    titulo: {
        type: String,
    },
    estado:{
        type: String,
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor'
    }
});

module.exports = model('Solicitud', SolicitudSchema);