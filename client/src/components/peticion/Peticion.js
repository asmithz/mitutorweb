import '../peticion/Peticion.css'
import BotonFormulario from '../botones/BotonFormulario';
import axios from 'axios'
import { useEffect } from 'react';

const api_peticion = axios.create({
    withCredentials: true, 
    credentials: 'include',
    baseURL: `http://localhost:2000/api/peticionControlador`
})

const Peticion = (props) => {
    const borrarPeticion = async () => {
        try{
            const response = await api_peticion.delete("/borrarPeticion/"+props.id_peticion);
            if(response){
                alert("La solicitud fue rechazada, se eliminará.")
                window.location.reload(false);
            }
        }catch(error){
            console.log(error)
        }
    }
    const aceptarPeticion = async () => {
        try{
            const response = await api_peticion.put("aceptarPeticion/"+props.id_peticion);
            alert("La solicitud fue aceptada. Ahora el estudiante debe iniciar el chat.")
            window.location.reload(false);
        }catch(error){
            console.log(error)
        }
    }

    const iniciarChat = async () => {
        try{
            const response = await api_peticion.put("/iniciarChat/"+props.id_peticion);
            alert("Chat asíncrono con su tutor, ha sido iniciado con éxito.")
            window.location.reload(false)
        }catch(error){
            console.log(error)
        }
    }

    return (
            <div className="modulo-peticion">
                <div className="elemento-peticion">
                    <span>{props.titulo}</span>
                </div>
                <div className="elemento-peticion">
                    <span>Estado: {props.estado}</span>
                </div>
                    {
                        props.tipo_usuario.tipo === "tutor" &&
                        <div className="elemento-peticion">
                        <div className="botones-peticion">
                        {
                            props.estado === "Pendiente" &&
                        <>
                            <BotonFormulario className="boton-aceptar" func={aceptarPeticion} name="boton" value="Aceptar"/>
                            <BotonFormulario className="boton-rechazar" func={borrarPeticion} name="boton" value="Rechazar"/>
                        </>
                        }
                        {
                            props.estado === "Aceptada" &&
                            <span>Espere que el estudiante apruebe la solicitud</span>
                        }
                        </div>

                        </div>
                    }
                    {
                        props.tipo_usuario.tipo === "estudiante" &&
                        <div className="boton-peticion">
                        {
                            props.estado === "Aceptada" &&
                            <BotonFormulario className="boton-aceptar" func={iniciarChat} name="boton" value="Iniciar Chat"/>
                        }
                        </div>
                    }
            </div>
    );

}

export default Peticion;