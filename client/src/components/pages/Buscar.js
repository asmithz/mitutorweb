import React from 'react';
import '../pages_css/Buscar.css';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import FormularioAsignaturas from './FormulariosSignUp/FormularioAsignaturas';
import asignaturas from '../asignaturas/Asignaturas.json';
import Horario from '../horario/Horario'
import CheckBox from '../botones/Checkbox';
import Dropdown from '../botones/Dropdown';
import BotonFormulario from '../botones/BotonFormulario';
import SelectFormulario from '../botones/SelectFormulario';
import missing_picture from '../../img/missing_picture.png';

/*Componente filtro de asignaturas(los checkbox)*/
const Asignaturas = (props) => {
  const asignatura = asignaturas.filter((ramo) => ramo.materia === props.value).map((ramo) => 
          <CheckBox name={props.name} materia={props.value} key={ramo.id} value={ramo.ramo}/>
      );
      return(
          <>{asignatura}</>
      );
}

/*Permite filtrar a los tutores*/
const Filtro = () => {
  return(
    <div className="menu-filtro">
      <Formik initialValues={{
            nombre: '',
            apellido: '',
            asignaturas: '',
            calificacion: '',
            horario: [''],
          }}
          onSubmit={values => console.log(values)} >
        <Form>
          <div className="filtro">
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
            <div >
                <Dropdown tipo="checkboxes" value="Asignaturas" 
                  component={
                    <div>
                      <span>Matemática</span>
                      <Asignaturas name="asignaturas" value="Matemática"/>
                      <span>Informática</span>
                      <Asignaturas name="asignaturas" value="Informática"/>
                      <span>Física</span>
                      <Asignaturas name="asignaturas" value="Física"/>
                    </div>
                  }/>
            </div>
            <div> 
              {
                /* 
              <Dropdown tipo="horario" value="Horario" component={<Horario name="horario" accion="buscar-horario"/>}/> 
                */
              }
            </div>
            <div>
            <BotonFormulario className="btn btn-primary" nombre="boton" value="Buscar"/>
            </div>
          </div>
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
      <div className="plantilla-buscar">
        <Filtro />
        <Tutores />
      </div>
    </div>
  )
}

export default Buscar
