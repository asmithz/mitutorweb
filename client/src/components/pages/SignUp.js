import React, { useState } from 'react';
import { Formik, Form, ErrorMessage} from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import RadioFormulario from '../botones/RadioFormulario';
import FormularioEstudiante from './FormulariosSignUp/FormularioEstudiante'
import FormularioTutor from './FormulariosSignUp/FormularioTutor'

const validaciones = (values) => {
    const errors = {};
    
    if(!values.tipo){
        errors.tipo = 'Debe asignar un valor'
    }

    return errors;
}

const SignUp = () => {
    const [estado, setEstado] = useState(0);
    // updateEstado -> avanza en el formulario
    // estado = 0 -> tutor o estudiante
    // estado = 1 -> datos personales 
    // estado = 2 -> asignaturas
    // estado = 3 -> horario
    const updateEstado = () => {
        setEstado(estado+1);
    }

    const [tipo, setTipo] = useState('');
    const updateTipo = (nuevo_tipo) => {
        setTipo(nuevo_tipo);
    }


    return(
        <div>
            <h1>Página crear cuenta</h1>
            {tipo === '' && 
            <Formik 
                initialValues={{tipo:''}}
                validate={validaciones}
                onSubmit={(values => updateTipo(values.tipo))}
            >
                <Form>
                    <RadioFormulario name="tipo" value="estudiante" label="Estudiante" />
                    <br/>
                    <RadioFormulario name="tipo" value="tutor" label="Tutor" />
                    <br/>
                    <ErrorMessage name="tipo" />
                    <BotonFormulario className="btn btn-primary" name="boton" value="Siguiente"/>
                </Form>
            </Formik>
            }
            {tipo === 'tutor' && <FormularioTutor tipo={tipo}/>}
            {tipo === 'estudiante' && <FormularioEstudiante tipo={tipo}/>}
        </div>
    );
}

export default SignUp