import React, { useState } from 'react';
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
                             onClick={seleccionar}>{seleccion ? 
                                                    <p>&#9745;</p>
                                                    : 
                                                    <p>&#9744;</p>
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
            bloque.push(<Bloques hora={horas[i]} dia={props.dia} key={i}/>)
        }
    }
    return(
        <>{bloque}</>
    );
}

const Dias = () => {
    let horario = dias.map((dias) => 
        <div className='grid-dias'>
                {dias}
                {
                    (dias === 'Horario') ? 
                        <Horas dia="horario" />
                    : 
                        <Horas dia={dias}/>
                }
        </div>
        )

    return(
        <div className='grid-horario'>
            {horario}
        </div>
    );
}

const Horario = () => {
    return(
        <div className="grid-card">
            <Dias />
        </div>
    );
}

export default Horario;





































//import ScheduleSelector from 'react-schedule-selector'
//import { useState } from 'react'

//const Horario = () => {

    //// const state = { schedule = [] }
    //const [state, setState] = useState([])

    //const handleChange = newSchedule => {
      //setState({ schedule: newSchedule })
    //}

    //return(
        //<ScheduleSelector
        //selection={state.schedule}
        //numDays={7}
        //minTime={8}
        //maxTime={22}
        //hourlyChunks={1}
        //onChange={handleChange}
      ///>
    //);
//}

//export default Horario;































