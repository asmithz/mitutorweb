import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import missing_picture from '../../img/missing_picture.png';
import BotonFormulario from '../botones/BotonFormulario';
import SelectFormulario from '../botones/SelectFormulario';
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';
import Horario from '../horario/Horario';
import FormularioAsignaturas from './FormulariosSignUp/FormularioAsignaturas';
import DetectarTipoUsuario from '../controllers/DetectarTipoUsuario';
import axios from 'axios'

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/events`
})

const api_checkTOKEN = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/checkToken`
})
const EditarDatos = (props) => {

    const [datos_tutor, setDatos] = useState({})
    const obtenerDatos = (values) => {
        setDatos({...values})
    }

    return(
        <div>
            <Formik initialValues={{
                nombre: '', 
                apellido: '', 
                rut: '', 
                edad: '', 
                sexo:'', 
                email: '', 
                establecimiento: '',
                asignaturas: ['']
                }}
                onSubmit={values => console.log(values)}
                > 
                <Form>
                    <div className="editar-perfil">
                        <div className="form-floating">
                            <Field placeholder="Nombre" className="form-control" id="floatingNombre" name="nombre" type="text"/>
                            <label for="floatingNombre">Nombre: {props.datos_tutor.datos.nombre} </label>
                            <ErrorMessage name="nombre"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder="Apellido" className="form-control" id="floatingApellido" name="apellido" type="text"/>
                            <label for="floatingApellido">Apellido: {props.datos_tutor.datos.apellido}</label>
                            <ErrorMessage name="apellido"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder="Rut" className="form-control" id="floatingRut" name="rut" type="text"/>
                            <label for="floatingRut">Rut: {props.datos_tutor.datos.rut}</label>
                            <ErrorMessage name="rut"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder="Edad" className="form-control" id="floatingEdad" name="edad" type="text"/>
                            <label for="floatingEdad">Edad: {props.datos_tutor.datos.edad}</label>
                            <ErrorMessage name="edad"/>
                        </div>

                        <div className="form-floating">
                            <Field placeholder="Establecimiento Educacional" className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text"/>
                            <label for="floatingEstablecimiento">Establecimiento Educacional: {props.datos_tutor.datos.establecimiento}</label>
                            <ErrorMessage name="establecimiento"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder="Email" className="form-control" id="floatingEmail" name="email" type="email"/>
                            <label for="floatingEmail">Email: {props.datos_tutor.datos.email}</label>
                            <ErrorMessage name="email"/>
                        </div>
                            <div class="form-floating">
                            <SelectFormulario className="form-select" name="sexo">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="s_otro">Otro</option>
                            </SelectFormulario>
                        </div>                               
                        <div className="form-floating">
                            <h4>Mis asignaturas</h4>
                            <FormularioAsignaturas name="asignaturas" label="Agregue las asignaturas que realiza" />
                        </div>
                        <div>
                            <BotonFormulario className="boton-aceptar" nombre="boton" value="Aceptar"/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

const MostrarDatos = (props) => { 
    return(
        <>
        <div className="editar-perfil-tutor">
            <div className="form-floating">
                <input placeholder="Nombre" className="form-control" id="floatingNombre" name="nombre" type="text" disabled/>
                <label for="floatingNombre">Nombre: {props.datos_tutor.datos.nombre}</label>
            </div>
            <div className="form-floating">
                <input placeholder="Apellido" className="form-control" id="floatingApellido" name="apellido" type="text" disabled/>
                <label for="floatingApellido">Apellido: {props.datos_tutor.datos.apellido}</label>
            </div>
            <div className="form-floating">
                <input placeholder="Rut" className="form-control" id="floatingRut" name="rut" type="text" disabled/>
                <label for="floatingRut">Rut: {props.datos_tutor.datos.rut}</label>
            </div>
            <div className="form-floating">
                <input placeholder="Edad" className="form-control" id="floatingEdad" name="edad" type="text" disabled/>
                <label for="floatingEdad">Edad: {props.datos_tutor.datos.edad}</label>
            </div>

            <div className="form-floating">
                <input placeholder="Establecimiento Educacional" className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text" disabled/>
                <label for="floatingEstablecimiento">Establecimiento Educacional: {props.datos_tutor.datos.establecimiento}</label>
            </div>
            <div className="form-floating">
                <input placeholder="Email" className="form-control" id="floatingEmail" name="email" type="email" disabled/>
                <label for="floatingEmail">Email: {props.datos_tutor.datos.email}</label>
            </div>
            <div className="form-floating">
                <input placeholder="Sexo" className="form-control" id="floatingSexo" name="sexo" type="sexo" disabled/>
                <label for="floatingSexo">Sexo: {props.datos_tutor.datos.sexo}</label>
            </div>
        </div>

        </>
    )
}

const PerfilTutor = (props) => {
    const [editarDatos, seteditarDatos] = useState(false);
    const updateEditar = () => {
        seteditarDatos(true)
    }

    const [tutor, setTutor] = useState([])
    const [dataTutor, setdataTutor] = useState(true)

    useEffect(() => {
        const datosTutor = async () => {
            try{
                const response = await api.get('/obtenerTutor', props.datos_tutor);
                if(response && response.data.tutores){
                    const encontrarTutor = response.data.tutores.filter(profesor => profesor.datos._id === props.datos_tutor.id )
                    if(dataTutor){
                        setTutor(encontrarTutor)
                        setdataTutor(false)
                    }
                }
            }catch(error){
                console.log(error) 
            }

        }
        datosTutor();
        console.log(tutor)
    }, [tutor])
    
    const [borrarTutor, setBorrar] = useState(false);
    const updateBorrarTutor = () => {
        setBorrar(true);
    }

    const mi_token = localStorage.getItem('x-token')
    const tutorID = ObtenerUsuarioID();


    useEffect(() => {
        if(borrarTutor){
            const borrar = async () => {
                try{
                    const response = await api.delete('/'+tutorID, props.dato, {
                        headers: {
                        'Content-type': 'application/json',
                        'x-token': mi_token
                        }
                    })
                    alert("Gracias por utilizar la plataforma MiTutorWeb. Hasta pronto.")
                    localStorage.removeItem('x-token')
                    window.location.replace('/Inicio')
                }catch(error){
                    console.log(error)
                }
            }
            borrar();
        }
    }, [borrarTutor])

    return(
        <div>
            {   tutor.length >= 1 &&
                <div className="plantilla-perfil">
                    <div className="informacion-perfil">
                        <div className="imagen">
                            <img src={missing_picture}/>
                        </div>
                        <div className="datos-perfil">
                            <h3>Tutor:</h3>
                            <h4>{tutor[0].datos.nombre} {tutor[0].datos.apellido}</h4>
                        </div>
                        <hr></hr>
                    </div>
                    <div>
                    <h2>Mis datos personales</h2>
                    { 
                        editarDatos === false ?
                            <>
                                <MostrarDatos datos_tutor={tutor[0]} />
                                <BotonFormulario func={updateEditar} className="boton-editar" nombre="boton-editar" value="Editar Datos" />
                                <div className="botones-perfil">
                                    <BotonFormulario className="boton-eliminar" nombre="boton" value="Borrar mi cuenta"/>
                                </div>
                                <div>
                                    <Horario accion="modificar" titulo="Publicar Horario"/>
                                </div>
                            </>
                        :
                            <EditarDatos datos_tutor={tutor[0]} />
                    }
                    </div>
                </div>
            }
        </div>
    );
}

export default PerfilTutor;
