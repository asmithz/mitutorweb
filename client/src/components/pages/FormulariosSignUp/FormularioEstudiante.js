import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario';
import SelectFormulario from '../../botones/SelectFormulario';
import CheckBox from '../../botones/Checkbox';
import axios from 'axios'
import { useHistory } from 'react-router';

const api = axios.create({
    baseURL: `http://localhost:2000/api/log`
})

const validaciones = () => {
    const errors = {};
}

const crearEstudiante = async (values) => {
    console.log(values)
    try{
        await api.post('/registrarEstudiante', values);
        alert("Se ha registrado! ")
        window.location.replace('/Login');
    }catch{
        alert("Error intente denuevo")
        window.location.reload(false);
    }
}

const FormularioEstudiante = (props) => {
    return(
        <div>
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
                onSubmit={values => crearEstudiante(values)}
        >
            <Form>
                <div className="form-estudiante">
                    <div>
                        <h4>Rellene el formulario</h4>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Nombre" className="form-control" id="floatingNombre" name="nombre" type="text"/>
                        <label for="floatingNombre">Nombre</label>
                        <ErrorMessage name="nombre"/>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Apellido" className="form-control" id="floatingApellido" name="apellido" type="text"/>
                        <label for="floatingApellido">Apellido</label>
                        <ErrorMessage name="apellido"/>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Rut" className="form-control" id="floatingRut" name="rut" type="text"/>
                        <label for="floatingRut">Rut</label>
                        <ErrorMessage name="rut"/>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Edad" className="form-control" id="floatingEdad" name="edad" type="text"/>
                        <label for="floatingEdad">Edad</label>
                        <ErrorMessage name="edad"/>
                    </div>
                    <div class="form-floating">
                        <SelectFormulario className="form-select" name="sexo">
                            <option>Seleccione sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="s_otro">Otro</option>
                        </SelectFormulario>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Establecimiento Educacional" className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text"/>
                        <label for="floatingEstablecimiento">Establecimiento Educacional</label>
                        <ErrorMessage name="establecimiento"/>
                    </div>
                    <div className="form-floating">
                        <Field placeholder="Email" className="form-control" id="floatingEmail" name="email" type="email"/>
                        <label for="floatingEmail">Email</label>
                        <ErrorMessage name="email"/>
                    </div>
                    <div>
                        <BotonFormulario className="boton-siguiente" nombre="boton" value="Registrar"/>
                    </div>
                </div>
            </Form>
        </Formik> 
       </div>
    );
}

export default FormularioEstudiante;