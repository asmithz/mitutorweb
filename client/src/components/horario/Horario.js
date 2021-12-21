import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import BotonFormulario from '../botones/BotonFormulario';
import './Horario.css';

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

const horario = 
    [
        {
            "Lunes": []
        },
        {
            "Martes": []
        },
        {
            "Miércoles": []
        },
        {
            "Jueves": []
        },
        {
            "Viernes": []
        },
        {
            "Sábado": []
        },
        {
            "Domingo": []
        }
    ]

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
                                    <p>&#9745;</p>
                                    : 
                                    <p>&#9744;</p>
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
    }

    /*Quita, del arreglo, la hora del dia que se selecciona*/
    const uncheckHora = (diaSeleccionado, horaSeleccionada) => {
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
    }

    /*Muestra el horario con su className*/
    const mostrarHorario = () => {
        return(
            <div className="grid-card">
                <Dias check={checkHora} uncheck={uncheckHora} horario={horario}/>
            </div>
        );
    }

    /*Registra al tutor con su horario */
    const registrarHorarioTutor = () => {
        return(
            <Formik
                initialValues={{
                    datos: props.datos,
                    horario: horario
                }}
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
            >
                <Form>
                    <BotonFormulario className="boton-siguiente" name="boton" value="Registrar" />
                </Form>
            </Formik>
        );
    }

    return(
        <div>
            {props.accion === "registrar" && 
            <div>
                {mostrarHorario()}
                {registrarHorarioTutor()}
            </div>
            }
        </div>
    );
}

export default Horario;