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

const ChatVirtualSchema = Schema({
    titulo: {
        type: String,
    },
    estado:{
        type: String,
    },
    //estudiante
    emisor_id: {
        type: Schema.Types.ObjectId
    },
    //tutor
    receptor_id: {
        type: Schema.Types.ObjectId
    },
    mensajes: {
        type: [MensajeSchema]
    },
    cant_mensajes: {
        type: Number
    }
});

module.exports = model('ChatVirtual', ChatVirtualSchema);