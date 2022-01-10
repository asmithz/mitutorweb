const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const PagoEnLineaSchema = Schema({
    monto:{
        type: Number
    },
    tutor_id:{
        type: Schema.Types.ObjectId
    },
    estado: {
        type: String
    }

});

module.exports = model('PagoEnLinea', PagoEnLineaSchema);