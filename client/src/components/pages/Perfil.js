import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../pages_css/Perfil.css';
import missing_picture from '../../img/missing_picture.png';
import BotonFormulario from '../botones/BotonFormulario';
import SelectFormulario from '../botones/SelectFormulario';
import PerfilEstudiante from './PerfilEstudiante';
import PerfilTutor from './PerfilTutor';

const Perfil = () => {
    return(
        <div>
            <div>
                <h1>l </h1>
                <h1>Mi perfil </h1>
            </div>
            <PerfilTutor />
        </div>
    );
}

export default Perfil;