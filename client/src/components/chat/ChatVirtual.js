import './ChatVirtual.css'
import { Formik, Form, Field, ErrorMessage, isObject } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import io from 'socket.io-client'
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import DetectarTipoUsuario from '../controllers/DetectarTipoUsuario';
import APIZoom from './APIZoom'

const socket = io('http://localhost:2000/')
socket.on("connection")

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/mensaje`
})

const api_chat = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/chat`
})

const ChatVirtual = (props) => {
    const emisorID = ObtenerUsuarioID()
    const emisorTIPO = DetectarTipoUsuario().tipo
    const enlace_reunion = APIZoom()
    const chatID = useLocation().pathname.split("/")[2]
    const [mensajes, setMensajes] = useState([])
    const [validarMensajes, setvalidarMensajes] = useState(false)

    const enviarMensaje = async (mensajeRequest) => {
        const mi_token = localStorage.getItem('x-token')
        const mensaje = Object.values(mensajeRequest)[0]
        const mensajeEnviado = {'emisor_id': emisorID, mensaje}
        try{
            const response = await api.post("/enviarMensaje/"+chatID, mensajeEnviado, {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                }})
            const response_chat = await api_chat.get("/verificarChat/"+chatID, {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                }
            })
            if(response_chat.data.chat){
                console.log(response_chat.data.chat)
                let chat = response_chat.data
                socket.emit("mensaje", chat, mensajeEnviado, emisorID)
                socket.on("mensaje", (mensajeEnviado) => {
                    setMensajes([...mensajes, mensajeEnviado])
                })
            }
            
        }catch(error){
            alert("El chat ya no existe, fue borrado.")
            window.location.replace('/Inicio');
            console.log(error)
        }
    }

    useEffect(() => {
        const mostrarMensajes = async () => {
            const mi_token = localStorage.getItem('x-token')
            try{
                const response = await api.get("/obtenerMensajes/"+chatID, {
                    headers: {
                        'Content-type': 'application/json',
                        'x-token': mi_token
                    }})
                if(response.data.mensajes){
                    if(!validarMensajes){
                        setMensajes(response.data.mensajes)
                    }
                }
            }catch(error){
                console.log(error)
            }
        }
        mostrarMensajes()
        }, [mensajes])

    const solicitarEnlace = () => {
        return alert(enlace_reunion)
    }

    const salirChat = () => {
        window.location.replace('/Bandeja');
    }

    return(
        <div>
            <br/>
            {
                emisorTIPO === "estudiante" &&
                <h1>Chat Virtual con su tutor</h1>
            }
            {
                emisorTIPO === "tutor" &&
                <h1>Chat Virtual con su estudiante</h1>
            } 
            <BotonFormulario className="boton-eliminar" nombre="salir" func={salirChat} value="Salir del chat"/>
            <div className="chat-tarjeta">
                <div className="mensajes">
                    {
                       mensajes.map((mensajeEnviado, i) => {
                           if(emisorID === mensajeEnviado.emisor_id){
                                return <div className="mensaje-emisor" key={i}>
                                    <p className="max1">{mensajeEnviado.mensaje}</p>
                                </div>

                           }
                           else{
                                return <div className="mensaje-receptor" key={i}>
                                    <p className="max1">{mensajeEnviado.mensaje}</p>
                                        </div>
                           }
                       }) 
                    }
                </div>
                <div className="chat-bottom">
                    <BotonFormulario className="btn btn-primary" func={solicitarEnlace} nombre="boton" value="Zoom"/>
                    <Formik initialValues={{
                        mensaje: ''
                    }}
                    onSubmit={values => enviarMensaje(values)}>
                        <Form>
                            <div className="chat-input-mensaje">
                                <div className="form-floating">
                                    <Field placeholder="Escriba un mensaje" className="form-control" id="floatingMensaje" name="mensaje" type="text"/>
                                    <label for="floatingNombre">Escriba un mensaje</label>
                                    <ErrorMessage name="mensaje"/>
                                </div>
                                <div>
                                    <BotonFormulario className="btn btn-primary" nombre="boton" value="Enviar mensaje"/>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ChatVirtual;