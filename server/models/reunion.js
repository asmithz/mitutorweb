const { Schema, model } = require('mongoose');

const ReunionSchema = Schema({
    enlace: {
        type: String
    }
});

module.exports = model('Reunion', ReunionSchema);