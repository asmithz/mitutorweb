import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario';
import SelectFormulario from '../../botones/SelectFormulario';
import CheckBox from '../../botones/Checkbox';

const validaciones = () => {
    const errors = {};
}

const FormularioEstudiante = (props) => {
    return(
        <div className="form">
            <Formik
                initialValues={{
                    tipo: props.tipo,
                    nombre: '', 
                    apellido: '', 
                    rut: '', 
                    edad: '', 
                    sexo:'', 
                    email: '', 
                    establecimiento: '',
                }}
                onSubmit={values => console.log(values)}
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
                <SelectFormulario name="sexo" label="Sexo">
                    <option>Seleccione</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="s_otro">Otro</option>
                    </SelectFormulario>
                <label>Establecimiento Educacional</label>
                    <Field name="establecimiento" type="text"/>
                    <ErrorMessage name="establecimiento"/>
                    <br/>
                <label>Email</label>
                    <Field name="email" type="email"/>
                    <ErrorMessage name="email"/>
                    <br/>
                    <BotonFormulario className="boton-siguiente" nombre="boton" value="Registrar"/>
            </Form>
        </Formik> 
       </div>
    );
}

export default FormularioEstudiante;