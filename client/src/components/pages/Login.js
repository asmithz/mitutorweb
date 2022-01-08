import React from 'react';
import { Formik, Form, ErrorMessage,Field } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import '../pages_css/Login.css'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'
import axios from 'axios'

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/log`
})


const validaciones = () => {
}

const Login = () => {

  const loginUsuario = async (values) => {
    const { user, password } = values
    try{
      const usuario = await api.post('/Login', { user, password }, {
        headers: {
          'Content-type': 'application/json'
        }
      });
      console.log(usuario)
      localStorage.setItem('x-token', usuario.data.token)
      if(usuario.data.hasOwnProperty("tutor")){
          alert("Bienvenido, " + usuario.data.tutor.datos.nombre + " " + usuario.data.tutor.datos.apellido)
          window.location.href = '/Inicio';
      }
      else if(usuario.data.hasOwnProperty("estudiante")){
          alert("Bienvenido, " + usuario.data.estudiante.nombre + " " + usuario.data.estudiante.apellido)
          window.location.href = '/Inicio';
      }
    }catch(error){
      console.log(error)
        alert("Usuario o contraseña inválidos.")
    }
  }
    return(
      <Formik
        initialValues = {{
          user: '',
          password: '',
        }} 
        validate={validaciones}
        onSubmit={(values => loginUsuario(values))}
      > 
        <Form>
          <div className="login">
            <div>
              <h3>Login</h3>
            </div>
            <div className="modulo-login">
              <div className="icono-centrar">
                <AiOutlineUser size={35}/>
              </div>
              <div className="form-floating">
                <Field placeholder="Usuario" className="form-control" id="floatingUsuario" name="user" type="text"/>
                <label for="floatingUsuario">Usuario</label>
                <ErrorMessage name="user"/>
              </div>
            </div>
            <div className="modulo-login">
              <div className="icono-centrar">
                <AiFillLock size={35}/>
              </div>
              <div className="form-floating">
                <Field placeholder="Contraseña" className="form-control" id="floatingContraseña" name="password" type="text"/>
                <label for="floatingContraseña">Contraseña</label>
                <ErrorMessage name="password"/>
              </div>
            </div>
            <div>
              <BotonFormulario className="boton-siguiente" name="boton" value="Ingresar" />
            </div>
              <a href={'/SignUp'} rel="noopener noreferrer">No posee cuenta? Registrese!</a>
            </div>
        </Form>
      </Formik>
  );
}

export default Login;
