const { response } = require('express');
const Reunion = require("../models/reunion")

const zoomMeet = async (req, res = response) => {
    try{
        const generarEnlace = await Reunion.findOne()
        const enlaceZoom = generarEnlace.enlace
        
        if(await Reunion.findByIdAndDelete(generarEnlace._id)){
            res.json({
                enlaceZoom
            })
        }
        else{
            console.log("algo ocurrio")
        }
        return res.json({
            enlaceZoom
        })

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    zoomMeet
}

