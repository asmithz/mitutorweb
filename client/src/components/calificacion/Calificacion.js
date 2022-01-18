import './Calificacion.css'
import { Form, Formik ,Field } from 'formik'
import BotonFormulario from '../botones/BotonFormulario'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import missing_picture from '../../img/missing_picture.png';

const api = axios.create({
    baseURL: `http://localhost:2000/api/usuariosControlador`
})

const Calificacion = () =>{
    const tutorID = useLocation().pathname.split("/")[2]
    const [nombreTutor, setnombreTutor] = useState('')
    const [puntuacion, setPuntuacion] = useState('')
    useEffect(() => {
        const mostrarCalificacion = async() => {
            try{
                const response = await api.get("/obtenerCalificacion/"+tutorID)
                if(response){
                    setnombreTutor(response.data.nombre_tutor)
                    setPuntuacion(response.data.calificacion_tutor)
                }
            }catch(error){
                console.log(error)
            }
        }
        mostrarCalificacion()
    })

    const calificar = async (calificacion) => {
        const puntaje = {"puntaje": calificacion}
            try{
                const response = await api.put("/actualizarCalificacion/"+tutorID, puntaje)
                if(response){
                    alert("Gracias por calificar a su tutor!")
                    window.location.replace('/Bandeja')
                }
            }catch(error){
                console.log(error)
            }
        
    }

    return(
    <div className="plantilla-calificacion">
        <div className="plantilla-parte">
            <h2>- Califique a su tutor -</h2>
            <h2>¿Qué le pareció la clase de: {nombreTutor} ?</h2>
            <h3>Puntuación actual: {puntuacion} </h3>
            <div className="tarjeta-tutor-imagen">
                <img src={missing_picture}/>
            </div>
            <br/>
            <div  className="plantilla-form" >
                <Formik initialValues={{
                    calificacion: ''
                }}
                onSubmit={values => calificar(values.calificacion)}>
                    <Form className="plantilla-form">
                        <div>
                        <div className="calificaciones">
                            <div>
                    <Field type="radio" name="calificacion" key="c-1" id="c-1" value="1.0" style={{marginRight: 10}}/>
                        <label for="c-1">1.0</label>
                            </div>
                            <div>
                        <Field type="radio" name="calificacion" key="c-2" id="c-2" value="2.0" style={{marginRight: 10}}/>
                        <label for="c-2">2.0</label>
                            </div>
                            <div>
                        <Field type="radio" name="calificacion" key="c-3" id="c-3" value="3.0" style={{marginRight: 10}}/>
                        <label for="c-3">3.0</label>
                            </div>
                            <div>
                        <Field type="radio" name="calificacion" key="c-4" id="c-4" value="4.0" style={{marginRight: 10}}/>
                        <label for="c-4">4.0</label>
                            </div>
                            <div>
                        <Field type="radio" name="calificacion" key="c-5" id="c-5" value="5.0" style={{marginRight: 10}}/>
                        <label for="c-5">5.0</label>
                            </div>
                        </div>
                        <br/>
                        </div>
                    <BotonFormulario className="boton-aceptar" nombre="boton" value="Calificar"/>
                    </Form>
                </Formik>
                <BotonFormulario className="boton-eliminar" nombre="boton" value="No quiero calificar" func={() => window.location.replace("/Bandeja")}/>
            </div>
        </div>
    </div>
    )
}

export default Calificacion