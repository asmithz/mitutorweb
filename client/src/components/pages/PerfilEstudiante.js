import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import missing_picture from '../../img/missing_picture.png';
import BotonFormulario from '../botones/BotonFormulario';
import SelectFormulario from '../botones/SelectFormulario';
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';
import axios from 'axios'

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/events`
})

const EditarDatos = (props) => {

    const mi_token = localStorage.getItem('x-token')
    const estudianteID = ObtenerUsuarioID()
    
    
    const actualizarEstudiante = async (datos) => {
        try{
            //actualizar 
            await api.put('/actualizarEstudiante/'+estudianteID, datos, {
                headers: {
                'Content-type': 'application/json',
                'x-token': mi_token
                }
            });
            alert("Sus datos se actualizaron correctamente")
            window.location.reload(false);
        }catch(error){
            alert("Algo ocurrio, error.")
            console.log(error)
            window.location.reload(false);
        }
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
                }}
                onSubmit={values => actualizarEstudiante(values)}
                > 
                <Form>
                    <div className="editar-perfil">
                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.nombre} className="form-control" id="floatingNombre" name="nombre" type="text"/>
                            <label for="floatingNombre">Nombre: {props.datos_estudiante.nombre}</label>
                            <ErrorMessage name="nombre"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.apellido} className="form-control" id="floatingApellido" name="apellido" type="text"/>
                            <label for="floatingApellido">Apellido: {props.datos_estudiante.apellido}</label>
                            <ErrorMessage name="apellido"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.rut} className="form-control" id="floatingRut" name="rut" type="text"/>
                            <label for="floatingRut">Rut: {props.datos_estudiante.rut}</label>
                            <ErrorMessage name="rut"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.edad} className="form-control" id="floatingEdad" name="edad" type="text"/>
                            <label for="floatingEdad">Edad: {props.datos_estudiante.edad}</label>
                            <ErrorMessage name="edad"/>
                        </div>

                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.establecimiento} className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text"/>
                            <label for="floatingEstablecimiento">Establecimiento Educacional: {props.datos_estudiante.establecimiento}</label>
                            <ErrorMessage name="establecimiento"/>
                        </div>
                        <div className="form-floating">
                            <Field placeholder={props.datos_estudiante.email} className="form-control" id="floatingEmail" name="email" type="email"/>
                            <label for="floatingEmail">Email: {props.datos_estudiante.email}</label>
                            <ErrorMessage name="email"/>
                        </div>
                            <div class="form-floating">
                            <SelectFormulario className="form-select" name="sexo">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="s_otro">Otro</option>
                            </SelectFormulario>
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
        <div className="editar-perfil">
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.nombre} className="form-control" id="floatingNombre" name="nombre" type="text" disabled/>
                <label for="floatingNombre">Nombre: {props.datos_estudiante.nombre}</label>
            </div>
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.apellido} className="form-control" id="floatingApellido" name="apellido" type="text" disabled/>
                <label for="floatingApellido">Apellido: {props.datos_estudiante.apellido}</label>
            </div>
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.rut} className="form-control" id="floatingRut" name="rut" type="text" disabled/>
                <label for="floatingRut">Rut: {props.datos_estudiante.rut}</label>
            </div>
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.edad} className="form-control" id="floatingEdad" name="edad" type="text" disabled/>
                <label for="floatingEdad">Edad: {props.datos_estudiante.edad}</label>
            </div>

            <div className="form-floating">
                <input placeholder={props.datos_estudiante.establecimiento} className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text" disabled/>
                <label for="floatingEstablecimiento">Establecimiento Educacional: {props.datos_estudiante.establecimiento}</label>
            </div>
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.email} className="form-control" id="floatingEmail" name="email" type="email" disabled/>
                <label for="floatingEmail">Email: {props.datos_estudiante.email}</label>
            </div>
            <div className="form-floating">
                <input placeholder={props.datos_estudiante.sexo} className="form-control" id="floatingSexo" name="sexo" type="sexo" disabled/>
                <label for="floatingSexo">Sexo: {props.datos_estudiante.sexo}</label>
            </div>
        </div>
    )
}

const PerfilEstudiante = (props) => {

    const [editarDatos, seteditarDatos] = useState(false);
    const [borrarEstudiante, setBorrar] = useState(false);
    const estudianteID = ObtenerUsuarioID();
    const [estudiante, setEstudiante] = useState([])
    const [dataEstudiante, setdataEstudiante] = useState(true)

    const updateEditar = () => {
        seteditarDatos(true)
    }

    useEffect(() => {
        const datosEstudiante = async () => {
            try{
                const response = await api.get('/obtenerEstudiante', props.datos_estudiante);
                if(response && response.data.estudiantes){
                    const encontrarEstudiante = response.data.estudiantes.filter(alumno => alumno._id === props.datos_estudiante.id )
                    if(dataEstudiante){
                        setEstudiante(encontrarEstudiante)
                        setdataEstudiante(false)
                    }
                }
            }catch(error){
                console.log(error) 
            }

        }
        datosEstudiante();
    }, [estudiante])
    
    const updateBorrarEstudiante = () => {
        setBorrar(true);
    }

    const mi_token = localStorage.getItem('x-token');

    useEffect(() => {
        if(borrarEstudiante){
            const borrarCuenta = async () => {
                try{
                    const response = await api.delete('/borrarEstudiante'+estudianteID, props.dato, {
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
            borrarCuenta();
        }
    }, [borrarEstudiante])
    return(
        <div>
            {estudiante.length >= 1 &&
            <div className="plantilla-perfil">
                <div className="informacion-perfil">
                    <div className="imagen">
                        <img src={missing_picture}/>
                    </div>
                    <div className="datos-perfil">
                        <h3>Estudiante:</h3>
                        <h4>{estudiante[0].nombre} {estudiante[0].apellido}</h4>
                    </div>
                    <hr></hr>
                </div>
                <div>
                <h2>Mis datos personales</h2>
                { 
                    editarDatos === false ?
                    <>
                        <div>
                            <MostrarDatos datos_estudiante={estudiante[0]} />
                            <BotonFormulario func={updateEditar} className="boton-editar" nombre="boton-editar" value="Editar Datos" />
                        </div>
                        <div className="botones-perfil">
                            <BotonFormulario className="boton-eliminar" func={updateBorrarEstudiante} nombre="boton" value="Borrar mi cuenta"/>
                        </div>
                    </>
                    :
                        <EditarDatos datos_estudiante={estudiante[0]} id_estudiante={props.datos_estudiante.id}/>
                }

                </div>
            </div>
            }
        </div>
    );
}

export default PerfilEstudiante;