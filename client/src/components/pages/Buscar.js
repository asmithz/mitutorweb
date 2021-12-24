import React from 'react';
import '../pages_css/Buscar.css';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import FormularioAsignaturas from './FormulariosSignUp/FormularioAsignaturas';
import asignaturas from '../asignaturas/Asignaturas.json';
import CheckBox from '../botones/Checkbox';
import BotonFormulario from '../botones/BotonFormulario';
import missing_picture from '../../img/missing_picture.png'

/*Componente filtro de asignaturas(los checkbox)*/
const Asignaturas = (props) => {
  const asignatura = asignaturas.filter((ramo) => ramo.materia === props.value).map((ramo) => 
          <CheckBox name={props.name} materia={props.value} key={ramo.id} value={ramo.ramo} /> 
      );
      return(
          <>{asignatura}</>
      );
}

/*Permite filtrar a los tutores*/
const Filtro = () => {
  return(
      <div className="filtro">
      <h3>Filtro</h3>
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
  );
}

const TarjetaTutor = () => {
  return(
    <div className="tarjeta-tutor">
      <div className="tarjeta-tutor-imagen">
        <img src={missing_picture}/>
      </div>
      <div className="tarjeta-tutor-texto">
        <h5>Ariel Smith</h5>
      </div>
      <div className="tarjeta-tutor-texto">
        <h6>Calificación: 5.0</h6>
      </div>
      <div className="tarjeta-tutor-botones">
        <BotonFormulario className="boton-agregar" value="Ver Horario" />
        <BotonFormulario className="boton-agregar" value="Asignaturas" />
      </div>
      <div className="tarjeta-tutor-solicitud"> 
        <BotonFormulario className="boton-eliminar" value="Solicitar Tutoria"/>
      </div>
    </div>
  );
}

const Tutores = () => {
  return(
    <div className="plantilla-tutores">
      <TarjetaTutor />
      <TarjetaTutor />
      <TarjetaTutor />
      <TarjetaTutor />
      <TarjetaTutor />
      <TarjetaTutor />
      <TarjetaTutor />
    </div>
  );
}

/*Componente clase Buscar*/
const Buscar = () => {
  return(
    <div>
      <h1>Buscar Tutor</h1>
      <h1>Buscar Tutor</h1>
      <div className="plantilla-buscar">
        <Filtro />
        <Tutores />
      </div>
    </div>
  )
}

export default Buscar
