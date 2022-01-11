import './ChatVirtual.css'
import { Formik, Form, Field, ErrorMessage, isObject } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import ModalPago from '../botones/ModalPago'
import io from 'socket.io-client'
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import DetectarTipoUsuario from '../controllers/DetectarTipoUsuario';
import ScrollableFeed from 'react-scrollable-feed'
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

const api_pago = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/pago`
})

const ChatVirtual = (props) => {
    const emisorID = ObtenerUsuarioID()
    const emisorTIPO = DetectarTipoUsuario().tipo
    const enlace_reunion = APIZoom()
    const chatID = useLocation().pathname.split("/")[2]
    const [chatDatos, setchatDatos] = useState({})
    const [mensajes, setMensajes] = useState([])
    const [montoTotal, setMonto] = useState(0)
    const [enlacePago, setEnlace] = useState("")

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
                setchatDatos(response_chat.data)
                socket.emit("mensaje", chatDatos, mensajeEnviado, emisorID)
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
                    setMensajes(response.data.mensajes)
                }
            }catch(error){
                console.log(error)
            }
        }
        mostrarMensajes()
        }, [mensajes])

    const solicitarEnlace = () => {
        return alert("El enlace de la reunión es: "+enlace_reunion)
    }

    const salirChat = () => {
        window.location.replace('/Bandeja');
    }

    const generarPago = async () =>{
        if(!montoTotal || montoTotal === 0){
            alert("Monto inválido, intente denuevo")
        }
        else{
            const datos = {"monto": montoTotal, "tutor_id": emisorID, "estado": "Pendiente"} 
            const mi_token = localStorage.getItem('x-token')
            try{
                const iniciar_pago = await api_pago.post("/generarPago", datos, {
                    headers: {
                        'Content-type': 'application/json',
                        'x-token': mi_token
                    }
                })
                if(iniciar_pago.data.nuevo_pago){
                    setEnlace("http://localhost:3000/PagoEnLinea/"+iniciar_pago.data.nuevo_pago._id)
                    socket.emit("enlace_pago", chatDatos, enlacePago, emisorID)
                    socket.on("enlace_pago", (enlacePago) => {
                        setMensajes([...mensajes, enlacePago])
                    })
                }
            }catch(error){
                console.log(error)
            }
        }
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
            <div className="chat-tarjeta">
                <div className="mensajes">
                    <ScrollableFeed>
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
                    </ScrollableFeed>
                </div>
                <div className="chat-bottom">
                    {
                        emisorTIPO === "tutor" &&
                        <BotonFormulario className="btn btn-primary" func={solicitarEnlace} nombre="boton" value="Zoom"/>
                    }
                    {
                        emisorTIPO === "estudiante" &&
                        <></>
                    }
                    <Formik initialValues={{
                        mensaje: ''
                    }}
                    onSubmit={(values, {resetForm}) => {enviarMensaje(values); resetForm({values: ""})}}>
                        <Form>
                            {
                                emisorTIPO === "tutor" &&
                                <div className="chat-input-mensaje-tutor">
                                    <div className="form-floating">
                                        <Field placeholder="Escriba un mensaje" className="form-control" id="floatingMensaje" name="mensaje" type="text"/>
                                        <label for="floatingNombre">Escriba un mensaje</label>
                                        <ErrorMessage name="mensaje"/>
                                    </div>
                                    <div>
                                        <BotonFormulario className="btn btn-primary" nombre="boton" value="Enviar mensaje"/>
                                    </div>
                                </div>
                            }
                            {
                                emisorTIPO === "estudiante" &&
                                <div className="chat-input-mensaje-estudiante">
                                    <div className="form-floating">
                                        <Field placeholder="Escriba un mensaje" className="form-control" id="floatingMensaje" name="mensaje" type="text"/>
                                        <label for="floatingNombre">Escriba un mensaje</label>
                                        <ErrorMessage name="mensaje"/>
                                    </div>
                                    <div>
                                        <BotonFormulario type="reset" className="btn btn-primary" nombre="boton" value="Enviar mensaje"/>
                                    </div>
                                </div>
                            }
                        </Form>
                    </Formik>
                </div>
                {
                emisorTIPO === "tutor" &&
        <>
                        <button type="button" className="boton-aceptar" data-bs-toggle="modal" func={props.func} nombre="boton" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Generar Pago</button>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Generar enlace de pago</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Valor de la tutoría:</label>
                                    <input placeholder="Ingrese el monto" type="text" class="form-control" id="recipient-name" onChange={e => setMonto(e.target.value)}/>
                                </div>
                                {
                                    enlacePago !== "" &&
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Su enlace de pago es el siguiente {enlacePago}</label>
                                    </div>
                                }
                            </div>
                            <div class="modal-footer">
                                {
                                    enlacePago !== "" &&
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEnlace("")} >Cerrar</button>
                                }
                                {
                                    enlacePago === "" &&
                                    <button type="button" class="boton-aceptar" onClick={generarPago}>Generar</button>
                                }
                            </div>
                            </div>
                        </div>
                        </div>
        </>
                }
            </div>
            <BotonFormulario className="boton-eliminar" nombre="salir" func={salirChat} value="Salir del chat"/>
        </div>
    );
}

export default ChatVirtual;