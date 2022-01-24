import React, { useEffect, useState } from 'react';
import '../pages_css/Buscar.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import asignaturas from '../asignaturas/Asignaturas.json';
import CheckBox from '../botones/Checkbox';
import Dropdown from '../botones/Dropdown';
import BotonFormulario from '../botones/BotonFormulario';
import missing_picture from '../../img/missing_picture.png';
import axios from 'axios';
import ModalBotonBuscar from '../botones/ModalBotonBuscar';
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';

const api = axios.create({
    baseURL: `http://localhost:2000/api/usuariosControlador`
})

const api_peticion = axios.create({
    baseURL: `http://localhost:2000/api/peticionControlador`
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
            horario: '',
            calificacion: '1.0'
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
            <div>
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
              <Dropdown tipo="checkboxes" value="Horario" 
                component={
                  <div>
                    <span name="horario">Días</span>
                      <CheckBox name="horario" key="l-1" value="Lunes"/>
                      <CheckBox name="horario" key="ma-1" value="Martes"/>
                      <CheckBox name="horario" key="mi-1" value="Miércoles"/>
                      <CheckBox name="horario" key="j-1" value="Jueves"/>
                      <CheckBox name="horario" key="v-1" value="Viernes"/>
                      <CheckBox name="horario" key="s-1" value="Sábado"/>
                      <CheckBox name="horario" key="d-1" value="Domingo"/>
                  </div>
                }/>
            </div>
            <div> 
              <Dropdown tipo="checkboxes" value="Calificación" 
                component={
                  <div>
                    <span>Mínima puntuación</span>
                    <br/>
                      <Field type="radio" name="calificacion" key="c-1" id="c-1" value="1.0" style={{marginRight: 10}}/>
                      <label for="c-1">1.0</label>
                    <br/>
                      <Field type="radio" name="calificacion" key="c-2" id="c-2" value="2.0" style={{marginRight: 10}}/>
                      <label for="c-2">2.0</label>
                    <br/>
                      <Field type="radio" name="calificacion" key="c-3" id="c-3" value="3.0" style={{marginRight: 10}}/>
                      <label for="c-3">3.0</label>
                    <br/>
                      <Field type="radio" name="calificacion" key="c-4" id="c-4" value="4.0" style={{marginRight: 10}}/>
                      <label for="c-4">4.0</label>
                    <br/>
                      <Field type="radio" name="calificacion" key="c-5" id="c-5" value="5.0" style={{marginRight: 10}}/>
                      <label for="c-5">5.0</label>
                    <br/>
                  </div>
                }/>
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
  const mi_token = localStorage.getItem('x-token')
  const estudianteID = ObtenerUsuarioID()
  const enviarSolicitud = async (id_tutor) => {
    if(!estudianteID){
      alert("Debe iniciar sesión para solicitar una tutoría")
      return
    }
    try{
      const response = await api_peticion.post('/agregarPeticion', 
                { estudiante_id: estudianteID, tutor_id: id_tutor }, 
                  {
                  headers: {
                  'Content-type': 'application/json',
                  'x-token': mi_token
                  }
                  }
                )
                console.log(response)
      if(!response.data.ok){
        alert("Ya realizó una solicitud de chat virtual con este tutor anteriormente.")
      }
      else{
	alert("Usted realizó una solicitud de chat virtual.")
      }
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div className="tarjeta-tutor" key={props.key_tutor}>
      <div className="tarjeta-tutor-imagen">
        <img src={missing_picture}/>
      </div>
      <div className="tarjeta-tutor-texto">
        <h5>{props.datos_tutor.nombre} {props.datos_tutor.apellido}</h5>
      </div>
      <div className="tarjeta-tutor-texto">
        <h6>Calificación: {props.datos_tutor.puntaje}</h6>
      </div>
      <div className="tarjeta-tutor-botones">
        <ModalBotonBuscar className="boton-agregar" value="Horario" 
          title={"Horario de "+props.datos_tutor.nombre+" "+props.datos_tutor.apellido} 
          user={props.datos_tutor.user}
          content={props.horario_tutor} tipo="horario" />
        <ModalBotonBuscar className="boton-agregar" value="Asignaturas" 
          title={"Asignaturas de "+props.datos_tutor.nombre+" "+props.datos_tutor.apellido} 
          user={props.datos_tutor.user}
          content={props.datos_tutor.asignaturas} tipo="asignaturas"/>
      </div>
      <div className="tarjeta-tutor-solicitud"> 
        <BotonFormulario func={() => enviarSolicitud(props.datos_tutor._id)} className="boton-eliminar" value="Solicitar Tutoria"/>
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

const Buscar = () => {
  //activar filtro
  const[filtro, setFiltro] = useState(false);
  const[tutoresFetch, setTutoresFetch] = useState([]);
  const updateFiltro = (values) => {
    setFiltro(!filtro)
    //logica filtrar
    setTutoresFetch(tutoresFetch.filter((tutor) => compararDato(tutor.datos.nombre.toLowerCase(), values.nombre.toLowerCase()) 
    && compararDato(tutor.datos.apellido.toLowerCase(), values.apellido.toLowerCase())
    && compararArr(tutor.datos.asignaturas, values.asignaturas)
    && checkDia(tutor.horario, values.horario)
    && checkCalificacion(tutor.datos.puntaje, values.calificacion)
    ))
  }

  const checkCalificacion = (tutorCal, selectCal) =>{
    if(parseInt(tutorCal) >= parseInt(selectCal)){
      return true
    }
    else{
      return false
    }

  }

  const checkDia = (horario, horarioSelec) => {
    for(const diaSelec in horarioSelec){
      for(let dia of Object.keys(horario)){
        if(dia === horarioSelec[diaSelec] && dia !== "_id"){
          if(horario[dia].length === 0){
            return false
          }
        }
      }
    }
    return true
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
    if(arr2.length === 0){
      return true
    }
    for(let valor1 of arr2){
      if(!(arr1.includes(valor1))){
        return false
      }
    }
    return true
  }
  
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
            {tutoresFetch.length === 0 ?
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
