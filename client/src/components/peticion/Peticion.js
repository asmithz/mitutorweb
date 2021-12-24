import '../peticion/Peticion.css'
import BotonFormulario from '../botones/BotonFormulario';

const Peticion = () => {
    return (
            <div className="modulo-peticion">
                <div className="elemento-peticion">
                    <span>Imagen</span>
                </div>
                <div className="elemento-peticion">
                    <span>Nombre</span>
                </div>
                <div className="elemento-peticion">
                    <span>Descripción</span>
                </div>
                <div className="elemento-peticion">
                    <div className="botones-peticion">
                        <BotonFormulario className="boton-aceptar" name="boton" value="Aceptar"/>
                        <BotonFormulario className="boton-rechazar" name="boton" value="Rechazar"/>
                    </div>
                </div>
            </div>
    );

}

export default Peticion;