const { response } = require('express');
const jwt = require('jsonwebtoken')
const rp = require('request-promise')

const zoomMeet = async (req, res = response) => {
    console.log("iniciado...")
    // limite de 100 enlaces por dia
    const email = "youremail@email.com"
    const config = {
        production:{
            APIKey: 'yourAPIKey',
            APISecret: 'yourAPISecret'
        }
    }
    const payload = {
        iss: config.production.APIKey,
        exp: ((new Date().getTime() + 5000))
    }
    const token = jwt.sign(payload, config.production.APISecret)
    try{
        const options = {
            method: "POST",
            uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
            body: {
                topic: "yourTopic",
                type: 1,
                duration: 60,
                settings: {
                    host_video: "true",
                    participant_video: "true"
                }
            },
            auth: {
                bearer: token
            },
            headers: {
                "User-Agent": "Zoom-api-Jwt-Request",
                "content-type": "application/json"
            },
            json: true
        }

        rp(options).then(function (response) {
            return res.json({
                response
            })
        })

    }catch(error){
        return res.status(400).json({
            msg: "Algo ocurrio"
        })
    }
}

module.exports = {
    zoomMeet
}

