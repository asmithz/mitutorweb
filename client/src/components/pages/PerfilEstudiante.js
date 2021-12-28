import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import missing_picture from '../../img/missing_picture.png';
import BotonFormulario from '../botones/BotonFormulario';
import SelectFormulario from '../botones/SelectFormulario';

const EditarDatos = () => {
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
                onSubmit={values => console.log(values)}
                > 
                <Form>
                    <div className="editar-perfil">
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
                            <div class="form-floating">
                            <SelectFormulario className="form-select" name="sexo">
                                <option>Seleccione sexo</option>
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

const MostrarDatos = () => { 
    return(
        <div className="editar-perfil">
            <div className="form-floating">
                <input placeholder="Nombre" className="form-control" id="floatingNombre" name="nombre" type="text" disabled/>
                <label for="floatingNombre">Nombre</label>
            </div>
            <div className="form-floating">
                <input placeholder="Apellido" className="form-control" id="floatingApellido" name="apellido" type="text" disabled/>
                <label for="floatingApellido">Apellido</label>
            </div>
            <div className="form-floating">
                <input placeholder="Rut" className="form-control" id="floatingRut" name="rut" type="text" disabled/>
                <label for="floatingRut">Rut</label>
            </div>
            <div className="form-floating">
                <input placeholder="Edad" className="form-control" id="floatingEdad" name="edad" type="text" disabled/>
                <label for="floatingEdad">Edad</label>
            </div>

            <div className="form-floating">
                <input placeholder="Establecimiento Educacional" className="form-control" id="floatingEstablecimiento" name="establecimiento" type="text" disabled/>
                <label for="floatingEstablecimiento">Establecimiento Educacional</label>
            </div>
            <div className="form-floating">
                <input placeholder="Email" className="form-control" id="floatingEmail" name="email" type="email" disabled/>
                <label for="floatingEmail">Email</label>
            </div>
            <div className="form-floating">
                <input placeholder="Sexo" className="form-control" id="floatingSexo" name="sexo" type="sexo" disabled/>
                <label for="floatingSexo">Sexo</label>
            </div>
        </div>
    )
}

const PerfilEstudiante = () => {
    const [editarDatos, seteditarDatos] = useState(false);
    const updateEditar = () => {
        seteditarDatos(true)
    }
    return(
        <div>
            <div className="plantilla-perfil">
                <div className="informacion-perfil">
                    <div className="imagen">
                        <img src={missing_picture}/>
                    </div>
                    <div className="datos-perfil">
                        <h3>Estudiante:</h3>
                        <h4>Nombre Apellido</h4>
                    </div>
                    <hr></hr>
                </div>
                <div>
                <h2>Mis datos personales</h2>
                { 
                    editarDatos === false ?
                        <div>
                            <MostrarDatos />
                            <BotonFormulario func={updateEditar} className="boton-editar" nombre="boton-editar" value="Editar Datos" />
                        </div>
                    :
                        <EditarDatos />
                }
                <div className="botones-perfil">
                    <BotonFormulario className="boton-eliminar" nombre="boton" value="Borrar mi cuenta"/>
                </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilEstudiante;