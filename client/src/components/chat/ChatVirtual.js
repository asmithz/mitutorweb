import './ChatVirtual.css'
import { Formik, Form, Field, ErrorMessage, isObject } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import io from 'socket.io-client'

const ChatVirtual = () => {
    var socket = io('http://localhost:2000/')
    socket.on("connection")

    const enviarMensaje = (mensaje) => {
        socket.emit("mensaje", mensaje)
    }

    const solicitarEnlace = () => {

    }

    return(
        <div>
            <h1>Este es su Chat Virtual</h1>
            <h1>Chat Virtual</h1>
            <div className="chat-tarjeta">
                <div className="mensajes">
                    <div className="mensaje-usuario">
                        <p className="max1"></p>
                    </div>
                    <div className="mensaje-otro-usuario">
                        <p className="max1"></p>
                    </div>
                </div>
                <div className="chat-bottom">
                    <BotonFormulario className="btn btn-primary" nombre="boton" value="Zoom"/>
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