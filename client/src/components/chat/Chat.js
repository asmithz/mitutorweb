import './Chat.css'
import BotonFormulario from '../botones/BotonFormulario';

const Chat = () => {
    return (
            <div className="modulo-chat">
                <div className="elemento-chat">
                    <span>Imagen</span>
                </div>
                <div className="elemento-chat">
                    <span>Nombre</span>
                </div>
                <div className="elemento-chat">
                    <span>Comunicación Asíncrona</span>
                </div>
                <div className="elemento-chat">
                    <div className="botones-chat">
                        <BotonFormulario className="boton-aceptar" name="boton" value="Abrir"/>
                        <BotonFormulario className="boton-rechazar" name="boton" value="Eliminar"/>
                    </div>
                </div>
            </div>
    );

}

export default Chat;