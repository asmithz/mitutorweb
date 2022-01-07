import React from 'react';
import { Formik, Form, ErrorMessage, useFormik, Field } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import '../pages_css/Login.css'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

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
      console.log(usuario.data.login.data)
      
      if(usuario.data.login.hasOwnProperty('datos')){
          alert("Bienvenido, " + usuario.data.login.datos.nombre + " " + usuario.data.login.datos.apellido)
          window.location.href = '/Inicio';
      }
      else{
          alert("Bienvenido, " + usuario.data.login.nombre + " " + usuario.data.login.apellido)
          window.location.href = '/Inicio';
      }
    }catch(error){
      console.log(error)
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
