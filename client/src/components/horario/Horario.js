import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import BotonFormulario from '../botones/BotonFormulario';
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

const crearTutor = async (values) => {
    console.log(values)
    await api.post('/registrarTutor', values);
}

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
        /*
        horario.map(
            (dia) => 
                {
                    if(Object.keys(dia)[0] === diaSeleccionado){
                        if(!Object.values(dia)[0].includes(horaSeleccionada)){
                            Object.values(dia)[0].push(horaSeleccionada)
                        }
                    }
                }
            )
        */
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
        /*
        horario.map(
            (dia) => 
                {
                    if(Object.keys(dia)[0] === diaSeleccionado){
                        if(Object.values(dia)[0].includes(horaSeleccionada)){
                            Object.values(dia)[0].pop(horaSeleccionada)
                        }
                    }
                }
            )
        */
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

    /*Registra al tutor con su horario */
    const registrarHorarioTutor = () => {
        return(
            <div>
                <Formik
                    initialValues={{
                        datos: props.datos,
                        horario: horario
                    }}
                    onSubmit={values => crearTutor(values)}
                >
                    <Form>
                        <BotonFormulario className="boton-siguiente" name="boton" value="Registrar" />
                    </Form>
                </Formik>
            </div>
        );
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
        </>
    );
}

export default Horario;