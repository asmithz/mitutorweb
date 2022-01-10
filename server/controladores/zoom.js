const { response } = require('express');
const Reunion = require("../models/reunion")

const zoomMeet = async (req, res = response) => {
    try{
        const generarEnlace = await Reunion.findOne()
        const enlaceZoom = generarEnlace.enlace
        
        if(await Reunion.findByIdAndDelete(generarEnlace._id)){
            return res.json({
                enlaceZoom
            })
        }
        else{
            console.log("algo ocurrio")
        }

    }catch(error){
        return res.status(400).json({
            msg: "Algo ocurrio"
        })
    }
}

module.exports = {
    zoomMeet
}

