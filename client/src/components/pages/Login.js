import React from 'react';
import { Formik, Form, ErrorMessage, useFormik, Field } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import '../pages_css/Login.css'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'

const validaciones = () => {

}

const Login = () => {
    return(
      <Formik
        initialValues = {{
          username: '',
          password: '',
        }} 
        validate={validaciones}
        onSubmit={(values => alert(JSON.stringify(values, null, 2)))}
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
                <Field placeholder="Usuario" className="form-control" id="floatingUsuario" name="username" type="text"/>
                <label for="floatingUsuario">Usuario</label>
                <ErrorMessage name="username"/>
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
