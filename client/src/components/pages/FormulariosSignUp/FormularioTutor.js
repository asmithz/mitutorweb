import React , { useState } from 'react';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario';
import FormularioAsignaturas from './FormularioAsignaturas';
import Horario from '../../horario/Horario'
import { horario } from '../../horario/Horario'

const validacion = () => {

}


const FormularioTutor = (props) => {

    const [displayHorario, setTipo] = useState(false);
    const updatedisplayHorario = () => {
        setTipo(true);
    }

    const [datos_tutor, setDatos] = useState([])
    const obtenerDatos = (values) => {
        updatedisplayHorario();
        setDatos(datos_tutor.push(values))
        alert(JSON.stringify(datos_tutor, null, 4));
    }

    return(
        <div>
            {displayHorario === false &&
            <div className="form">
                <Formik
                    initialValues={{
                        tipo: props.tipo, nombre: '', 
                        apellido: '', 
                        rut: '', 
                        edad: '', 
                        email: '',
                        asignaturas: [''],
                    }}
                    onSubmit={values => obtenerDatos(values)}
                >
                    <Form>
                        <h4>Ingrese sus datos</h4>
                        <label>Nombre</label>
                            <Field name="nombre" type="text"/>
                            <ErrorMessage name="nombre"/>
                            <br/>
                        <label>Apellido</label>
                            <Field name="apellido" type="text"/>
                            <ErrorMessage name="apellido"/>
                            <br/>
                        <label>Rut</label>
                            <Field name="rut" type="text"/>
                            <ErrorMessage name="rut"/>
                            <br/>
                        <label>Edad</label>
                            <Field name="edad" type="text"/>
                            <ErrorMessage name="edad"/>
                            <br/>
                        <label>Email</label>
                            <Field name="email" type="email"/>
                            <ErrorMessage name="email"/>
                            <br/>
                            <FormularioAsignaturas name="asignaturas" label="Agregue las asignaturas que realiza" />
                            <BotonFormulario className="boton-siguiente" name="boton" value="Siguiente"/>
                    </Form>
                </Formik> 
            </div>
                }
                {displayHorario === true && 
                    <Horario name="horario" accion="registrar" datos={datos_tutor}/>
                }

       </div>
    );
}

export default FormularioTutor;