import './ChatAsincrono.css'
import BotonFormulario from '../botones/BotonFormulario';
import { Link } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({
    withCredentials: true, 
    credentials: 'include',
    baseURL: `http://localhost:2000/api/chat`
})

const ChatAsincrono = (props) => {
    const eliminarChat = async () => {
        const mi_token = localStorage.getItem('x-token')
        if(window.confirm("Usted esta por eliminar este chat, está seguro?") === true){
            try{
                const response = await api.delete("/eliminarChat/"+props.id_chat, {
                    headers: {
                        'Content-type': 'application/json',
                        'x-token': mi_token
                    }
                })
                if(response.data.ok){
                    alert("Usted a eliminado el chat con éxito")
                    window.location.reload(false);
                }
                else{
                    alert ("Algo ocurrió")
                    window.location.reload(false);
                }

            }catch(error){
                console.log(error)
            }
        }
    }

    const abrirChat = () => {
        return "/ChatVirtual/"+props.id_chat
    }

    return (
            <div className="modulo-chat">
                <div className="elemento-chat">
                    <span>{props.titulo}</span>
                </div>
                <div className="elemento-chat">
                    <span>Comunicación Asíncrona</span>
                </div>
                <div className="elemento-chat">
                    <div className="botones-chat">
                        <Link to={abrirChat}><BotonFormulario className="boton-aceptar" name="boton" value="Abrir"/></Link>
                        <BotonFormulario className="boton-rechazar" func={eliminarChat} name="boton" value="Eliminar"/>
                    </div>
                </div>
            </div>
    );

}

export default ChatAsincrono;