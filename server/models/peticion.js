const { Schema, model } = require('mongoose');

const PeticionSchema = Schema({
    titulo: {
        type: String,
    },
    estado:{
        type: String,
    },
    estudiante_id: {
        type: Schema.Types.ObjectId
    },
    tutor_id: {
        type: Schema.Types.ObjectId
    }
});

module.exports = model('Peticion', PeticionSchema);