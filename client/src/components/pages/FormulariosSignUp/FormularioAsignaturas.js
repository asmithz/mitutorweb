import React from 'react';
import {FieldArray } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario'
import SelectAsignaturas from '../../asignaturas/SelectAsignaturas';

const FormularioAsignaturas = (props) => {
    return(
        <div>
            <label>{props.label}</label>
            <FieldArray name={props.name} >
                {/* se obtienen los metodos, valores y arreglo de FieldArray, o sea, de su funcion */}
                {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { asignaturas } = values;
                    return (
                        <div>
                        {
                            // loop en el array e ir agregando
                            asignaturas.map((asignatura, i) => (
                                <div key={i}>
                                    {
                                        i >= 0 && 
                                    <div>
                                        <label>Asignatura</label><SelectAsignaturas name={`asignaturas[${i}]`} /> 
                                        <BotonFormulario className="btn btn-primary" value="Borrar" func={() => remove(i)}/>
                                    </div>
                                    } 
                                </div>
                            ))
                        }
                        <BotonFormulario className="btn btn-primary" value="Agregar" func={() => push('')}/>
                        </div>
                    )
                    }
                } 
            </FieldArray>
        </div>
    );
}

export default FormularioAsignaturas;