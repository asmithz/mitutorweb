import { useEffect, useState } from 'react';
import axios from 'axios'

const ZoomAPI = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/zoomControlador`
})

const APIZoom = () => {
    const [enlace_reunion, setEnlace] = useState("")
    const [validarEnlace, setValidacion] = useState(false)

    useEffect(() => {
        const generarEnlace = async () => {
        try{
            const mi_token = localStorage.getItem('x-token')
            const response = await ZoomAPI.get("/ZoomMeet", {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                }
            })
            if(response.data){
                if(!validarEnlace){
                    setEnlace(response.data.enlaceZoom)
                    setValidacion(true)
                }
            }
        }catch(error){
            console.log(error)
        }
        }
        generarEnlace();
    },[])
    
    if(enlace_reunion){
        return enlace_reunion
    }

}

export default APIZoom