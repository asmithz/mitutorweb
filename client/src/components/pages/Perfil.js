import React, { useEffect, useState } from 'react';
import '../pages_css/Perfil.css';
import PerfilTutor from './PerfilTutor';
import PerfilEstudiante from './PerfilEstudiante';
import axios from 'axios';

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/checkToken`
})

const Perfil = () => {
    const [usuario, setUsuario] = useState([])
    const [dataUsuario, setdataUsuario] = useState(true)
    useEffect(()=>{
        const obtenerUsuario = async () => {
            try{
                const mi_token = localStorage.getItem('x-token')
                //console.log(mi_token)
                const tipo_usuario = await api.get('/checkUser',{
                    headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                    }
                });
                if(dataUsuario){
                    setUsuario(tipo_usuario.data.usuario)
                    setdataUsuario(false)
                }
            }catch(error){
                console.log(error)
            }
        }
        obtenerUsuario();
        //console.log(usuario)
    }, [usuario])

    return(
        <div>
            <div>
                <h1>l </h1>
                {}
                <h1>Mi perfil </h1>
            </div>
            {usuario.tipo === "estudiante" &&
                <PerfilEstudiante datos_estudiante={usuario} /> 
            }
            {usuario.tipo === "tutor" &&
                <PerfilTutor datos_tutor={usuario} />
            }
        </div>
    );
}

export default Perfil;