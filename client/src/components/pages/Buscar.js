import React, { useEffect, useState } from 'react';
import '../pages_css/Buscar.css';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import FormularioAsignaturas from './FormulariosSignUp/FormularioAsignaturas';
import asignaturas from '../asignaturas/Asignaturas.json';
import Horario from '../horario/Horario'
import CheckBox from '../botones/Checkbox';
import Dropdown from '../botones/Dropdown';
import BotonFormulario from '../botones/BotonFormulario';
import missing_picture from '../../img/missing_picture.png';
import axios from 'axios';
import ModalBoton from '../../components/botones/ModalBoton';

const api = axios.create({
    baseURL: `http://localhost:2000/api/events`
})

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
const Filtro = (props) => {
  return(
    <div className="menu-filtro">
      <Formik initialValues={{
            nombre: '',
            apellido: '',
            asignaturas: '',
            calificacion: '',
            horario: [''],
          }}
          onSubmit={values => {props.func(values)}}>
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

const TarjetaTutor = (props) => {
  return(
    <div className="tarjeta-tutor" key={props.key_tutor}>
      <div className="tarjeta-tutor-imagen">
        <img src={missing_picture}/>
      </div>
      <div className="tarjeta-tutor-texto">
        <h5>{props.datos_tutor.nombre} {props.datos_tutor.apellido}</h5>
      </div>
      <div className="tarjeta-tutor-texto">
        <h6>Calificación: {props.datos_tutor.calificacion}</h6>
      </div>
      <div className="tarjeta-tutor-botones">
        <ModalBoton className="boton-agregar" value="Ver Horario" title="titulo" content="contenido"/>
        <ModalBoton className="boton-agregar" value="Asignaturas" title="titulo" content="contenido"/>
      </div>
      <div className="tarjeta-tutor-solicitud"> 
        <BotonFormulario className="boton-eliminar" value="Solicitar Tutoria"/>
      </div>
    </div>
  );
}

const Tutores = (props) => {
  return(
    <div className="plantilla-tutores">
      {props.datos_tutores.map((tutor) =>
        <TarjetaTutor key_tutor={tutor.id} datos_tutor={tutor.datos} horario_tutor={tutor.horario}/>)
      }
    </div>
  );
}

/*Componente clase Buscar*/
const Buscar = () => {
  //activar filtro
  const[filtro, setFiltro] = useState(false);
  const updateFiltro = (values) => {
    setFiltro(!filtro)
    /*
    console.log("yes")
    console.log(values)
    */
    //admitir minusculas
    //logica filtrar
    setTutoresFetch(tutoresFetch.filter((tutor) => compararDato(tutor.datos.nombre, values.nombre) 
    && compararDato(tutor.datos.apellido, values.apellido)
    && compararArr(tutor.datos.asignaturas, values.asignaturas)))
    //setTutoresFetch(tutoresFetch.filter((tutor) => tutor.datos.apellido === values.apellido))
    //setTutoresFetch(tutoresFetch.filter((tutor) => compararArr(tutor.datos.asignaturas, values.asignaturas)))
  }

  const compararDato = (dato1, dato2) => {
    dato1 = dato1.toLowerCase()
    dato2 = dato2.toLowerCase()
    if(dato2 === ""){
      return true
    }
    if(dato1 === dato2){
      return true
    }
    else{
      return false
    }
  }

  const compararArr = (arr1, arr2) => {
    if(arr2.length == 0){
      return true
    }
    for(let valor1 of arr1){
      for(let valor2 of arr2){
        if(valor1 === valor2){
          return true
        }
      }
    }
    return false
  }
  
  const[tutoresFetch, setTutoresFetch] = useState([]);
  useEffect(() => {
    const obtenerTutores = async () => {
      try{
          if(!filtro){
            const response = await api.get('/obtenerTutores');
            if(response && response.data.tutores) setTutoresFetch(response.data.tutores);
          }
        } catch(err){
          console.log(err)
        }
      }
      console.log(tutoresFetch)
    obtenerTutores();
  }, [filtro])
  return(
    <div>
      <h1>Buscar Tutor</h1>
      <div className="plantilla-buscar">
        {
          // check si existen tutores antes del GET
          tutoresFetch && 
          <>
            <Filtro func={updateFiltro} />
            {tutoresFetch.length == 0 ?
              <h2>No hay coincidencias</h2> 
            :
              <Tutores key="1" datos_tutores={tutoresFetch}/>
            }
          </>
        }
      </div>
    </div>
  )
}

export default Buscar
