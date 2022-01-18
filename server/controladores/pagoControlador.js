const { response } = require('express');
const PagoEnLinea = require('../models/pagoenlinea');

const generarPago = async (req, res = response) =>{
    const {monto, tutor_id, estado} = req.body
    try{
        const nuevo_pago = new PagoEnLinea()
        nuevo_pago.monto = monto
        nuevo_pago.tutor_id = tutor_id
        nuevo_pago.estado = estado
        nuevo_pago.markModified('monto')
        nuevo_pago.markModified('tutor_id')
        nuevo_pago.markModified('estado')
        nuevo_pago.save()
        return res.json({
            nuevo_pago
        })
    }catch(error){
        console.log(error)
    }
}

const registrarPago = async (req, res = response) =>{
    const pagoID = req.params.id 
    try{
        const pagoRegistrado = await PagoEnLinea.findById(pagoID)
        if(!pagoRegistrado){
            return res.json({
                msg: "El pago no existe"
            })
        }
        pagoRegistrado.estado = "Aceptado"
        pagoRegistrado.markModified('estado')
        await pagoRegistrado.save()
        return res.json({
            pagoRegistrado
        })
        
    }catch(error){
        return res.status(400).json({
            msg: "algo ocurrio"
        })
    }
}

const buscarPago = async (req, res = response) => {
    const pagoID = req.params.id
    try{
        const buscarPago = await PagoEnLinea.findById(pagoID)
        if(!buscarPago){
            return res.status(400).json({
                msg: "no se encontro el pago"
            })
        }
        return res.json({
            buscarPago
        })

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    generarPago,
    registrarPago,
    buscarPago
}