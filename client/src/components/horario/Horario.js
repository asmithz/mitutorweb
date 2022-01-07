import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import BotonFormulario from '../botones/BotonFormulario';
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID';
import { FaCheck, FaWindowClose, FaPencilAlt } from 'react-icons/fa'
import './Horario.css';
import axios from 'axios'

const horas = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '13:00 PM',
    '14:00 PM',
    '15:00 PM',
    '16:00 PM',
    '17:00 PM',
    '18:00 PM',
    '19:00 PM',
    '20:00 PM',
    '21:00 PM',
    '22:00 PM',
    '23:00 PM'
] 

const dias = ['Horario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const horario= {
                Lunes: [],
                Martes: [],
                Miércoles: [],
                Jueves: [],
                Viernes: [],
                Sábado: [],
                Domingo: []
                }

//call api 
const api = axios.create({
    baseURL: `http://localhost:2000/api/log`
});

const registrarHorario = async (values) => {
    console.log(values)
    await api.post('/registrarTutor', values);
}

const apiHorario = axios.create({
    baseURL: `http://localhost:2000/api/events`
})




const Bloques = (props) => {
    const[seleccion, setSeleccion] = useState(false);

    const seleccionar = (estado) => {
        setSeleccion(!seleccion)
    };

    let bloque = '';
        {
            (props.dia === "horario") ?
            bloque = <div hora={props.hora}>{props.hora}</div>
            :
            bloque = <div className={seleccion ? 'grid-bloque-clicked' : 'grid-bloque'} >
                        <div hora={props.hora} 
                            dia={props.dia} 
                            estado={seleccion ? 'true':'false'} 
                            onClick={seleccionar}>
                                {seleccion ? 
                                    <FaPencilAlt />
                                    : 
                                    <FaWindowClose />
                                }
                                {seleccion ?
                                    props.check(props.dia, props.hora)
                                    :
                                    props.uncheck(props.dia, props.hora)
                                }
                        </div>
                     </div>
        }
    return(
        <>{bloque}</>
    );
}

const Horas = (props) => {
    let bloque = [];
    for(let i = 0; i < horas.length; i++){
        {
            (props.dia === "horario") ?
            bloque.push(<Bloques hora={horas[i]} dia={props.dia} key={i}/>)
            :
            bloque.push(<Bloques hora={horas[i]} dia={props.dia} key={i} check={props.check} uncheck={props.uncheck}/>)
        }
    }
    return(
        <>{bloque}</>
    );
}

const Dias = (props) => {
    let horario = dias.map((dias) => 
        <div className='grid-dias'>
                {dias}
                {
                    (dias === 'Horario') ? 
                        <Horas dia="horario" />
                    : 
                        <Horas dia={dias} check={props.check} uncheck={props.uncheck}/>
                }
        </div>
        )

    return(
        <div className='grid-horario'>
            {horario}
        </div>
    );
}

const Horario = (props) => {

    /*Agrega, al arreglo, la hora al dia que se selecciona*/
    const checkHora = (diaSeleccionado, horaSeleccionada) => {
        for(var dia of Object.entries(horario)){
            if(dia[0] === diaSeleccionado){
                if(!dia[1].includes(horaSeleccionada)){
                    dia[1].push(horaSeleccionada)
                }
            }
        }
    }

    /*Quita, del arreglo, la hora del dia que se selecciona*/
    const uncheckHora = (diaSeleccionado, horaSeleccionada) => {
        for(var dia of Object.entries(horario)){
            if(dia[0] === diaSeleccionado){
                if(dia[1].includes(horaSeleccionada)){
                    dia[1].pop(horaSeleccionada)
                }
            }
        }
    }

    /*Muestra el horario con su className*/
    const mostrarHorario = () => {
        return(
            <div className="grid-card">
                <h4>{props.titulo}</h4>
                <Dias check={checkHora} uncheck={uncheckHora} horario={horario}/>
            </div>
        );
    }

    /*Registra el horario del tutor*/
    const registrarHorarioTutor = () => {
        return(
            <div>
                <Formik
                    initialValues={{
                        datos: props.datos,
                        horario: horario
                    }}
                    onSubmit={values => registrarHorario(values)}
                >
                    <Form>
                        <BotonFormulario className="boton-siguiente" name="boton" value="Registrar" />
                    </Form>
                </Formik>
            </div>
        );
    }

    /*Modifica el horario del tutor */
    const modificarHorarioTutor = () => {
        return(
            <div>
                <Formik
                    initialValues={{
                        horario: horario
                    }}
                    onSubmit={values => console.log(values)}
                >
                    <Form>
                        <BotonFormulario className="boton-aceptar" name="boton" value="Publicar Horario" />
                    </Form>
                </Formik>
            </div>
        );
    }

    const mi_token = localStorage.getItem('x-token')
    const tutorID = ObtenerUsuarioID();

    const publicarHorario = async (nuevoHorario) => {
        try{
            await apiHorario.put('/actualizarHorario/:'+tutorID, nuevoHorario,{
                headers: {
                'Content-type': 'application/json',
                'x-token': mi_token
                }
            })
            alert("Horario publicado con exito")
            window.location.reload(false);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            {props.accion === "registrar" && 
            <>
                {mostrarHorario()}
                {registrarHorarioTutor()}
            </>
            }
            {props.accion === "buscar-horario" &&
            <>
                {mostrarHorario()}
            </>
            }
            {props.accion === "modificar" &&
            <>
                {mostrarHorario()}
                {modificarHorarioTutor()}
            </>
            }
        </>
    );
}

export default Horario;