const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    emisor_id:{
        type: Schema.Types.ObjectId
    },
    mensaje:{
        type: String
    },
    numero: {
        type: Number
    }
});

module.exports = model('Mensaje', MensajeSchema);