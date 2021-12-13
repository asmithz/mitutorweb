import React from 'react';
import '../pages_css/Buscar.css';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import FormularioAsignaturas from './FormulariosSignUp/FormularioAsignaturas';
import asignaturas from '../asignaturas/Asignaturas.json';
import CheckBox from '../botones/Checkbox';
import BotonFormulario from '../botones/BotonFormulario';

const Tutor = () => {

}

const Tutores = () => {
  return(
    <label></label>
  );
}

const Asignaturas = (props) => {
  const asignatura = asignaturas.filter((ramo) => ramo.materia === props.value).map((ramo) => 
          <CheckBox name={props.name} materia={props.value} key={ramo.id} value={ramo.ramo} /> 
      );
      return(
          <>{asignatura}</>
      );
}

const Horario = () => {

}

const Filtro = () => {
  return(
    <div className="plantilla-buscar">
      <div className="filtro">
      <Formik initialValues={{
            nombre: '',
            apellido: '',
            asignaturas: '',
            calificacion: '',
            horario: [''],
          }}
          onSubmit={values => console.log(values)} 
        >
        <Form>
            <div className="filtro-elemento">
              <h5>Nombre</h5>
              <Field name="nombre" type="text" />
              <ErrorMessage name="nombre"/>
              <br/>
            </div>
            <div className="filtro-elemento">
              <h5>Apellido</h5>
              <Field name="apellido" type="text" />
              <ErrorMessage name="apellido"/>
              <br/>
            </div>
            <div className="filtro-elemento">
              <h5>Matemática</h5>
              <div className="filtro-elemento">
                <Asignaturas name="asignaturas" value="Matemática"/>
              </div>
              <h5>Física</h5>
              <div className="filtro-elemento">
                <Asignaturas name="asignaturas" value="Física"/>
              </div>
              <h5>Informática</h5>
              <div className="filtro-elemento">
                <Asignaturas name="asignaturas" value="Informática"/>
              </div>
            </div>
            <BotonFormulario className="btn btn-primary" nombre="boton" value="Buscar"/>
        </Form>
      </Formik>
      </div>
    </div>
  );
}

const Buscar = () => {
  return(
    <div>
      <h1>Buscar Tutor</h1>
      <Filtro />
    </div>
  )
}

export default Buscar
