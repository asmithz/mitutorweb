import { useEffect, useState } from 'react';
import axios from 'axios'

const api_checkTOKEN = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/checkToken`
})

const ObtenerUsuarioID = () => {
    const mi_token = localStorage.getItem('x-token')
    const [usuarioID, setUsuarioID] = useState();
    useEffect(() => {
        const obtenerID = async () => {
            try{
                //obtener ID desde el token
                const usuario = await api_checkTOKEN.get('/checkUser',{
                    headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                    }
                });
                setUsuarioID(usuario.data.usuario.id)
            }catch(error){
                console.log(error)
            }
        }
        obtenerID();
    }, [])
    if(usuarioID){
        return usuarioID
    }
}

export default ObtenerUsuarioID;