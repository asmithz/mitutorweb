import { useEffect, useState } from 'react';
import axios from 'axios'
import DetectarTipoUsuario from '../controllers/DetectarTipoUsuario';

const ZoomAPI = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/zoomControlador`
})

const APIZoom = () => {
    const verificarTutor = DetectarTipoUsuario().tipo
    const [enlace_reunion, setEnlace] = useState({})
    const [validarEnlace, setValidacion] = useState(false)

    useEffect(() => {
        const generarEnlace = async () => {
        if(verificarTutor === "tutor"){
            try{
                const mi_token = localStorage.getItem('x-token')
                const response = await ZoomAPI.post("/ZoomMeet", {
                    headers: {
                        'Content-type': 'application/json',
                        'x-token': mi_token
                    }
                })
                if(response.data){
                    if(!validarEnlace){
                        setEnlace(response.data)
                        setValidacion(true)
                    }
                }
            }catch(error){
                console.log(error)
            }
            }
        }
        generarEnlace();
    },[verificarTutor])
    
    if(enlace_reunion){
        return enlace_reunion
    }

}

export default APIZoom