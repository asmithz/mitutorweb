import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario';
import FormularioAsignaturas from './FormularioAsignaturas';

const validacion = () => {

}

const FormularioTutor = (props) => {

    return(
       <Formik
        initialValues={{
            tipo: props.tipo, 
            nombre: '', 
            apellido: '', 
            rut: '', 
            edad: '', 
            email: '',
            asignaturas: [''],
        }}
        onSubmit={values => console.log(values)}
       >
           <Form>
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
                <BotonFormulario className="btn btn-primary" name="boton" value="Registrar"/>
           </Form>
       </Formik> 
    );
}

export default FormularioTutor;