import React from 'react';
import { useFormik } from 'formik';
import BotonFormulario from '../botones/BotonFormulario';
import '../pages_css/Form.css'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
 });

  return(
    <div>
      <h1>Página de Login</h1>
      <br/>
      <div className="plantilla-form">
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Usuario</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                onChange={formik.handleChange} 
                value={formik.values.username}
              />
            <br/>
            <label htmlFor="password">Constraseña</label>
              <input 
                id="password" 
                name="password" 
                type="text" 
                onChange={formik.handleChange} 
                value={formik.values.password}
              />
            <br/>
            <a href={'/SignUp'} rel="noopener noreferrer">No posee cuenta? Registrese!</a>
            <br/>
            <BotonFormulario className="boton-siguiente" name="boton" value="Ingresar" />
            <br/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login