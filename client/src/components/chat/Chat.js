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
                    <BotonFormulario className="boton-aceptar" name="boton" value="Abrir chat"/>
                </div>
            </div>
    );

}

export default Chat;