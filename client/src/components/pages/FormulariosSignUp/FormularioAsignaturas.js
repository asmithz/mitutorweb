import React from 'react';
import { FieldArray } from 'formik';
import BotonFormulario from '../../botones/BotonFormulario'
import SelectAsignaturas from '../../asignaturas/SelectAsignaturas';

const FormularioAsignaturas = (props) => {
    return(
        <>
            <strong>{props.label}</strong>
            <FieldArray name={props.name} >
                {/* se obtienen los metodos, valores y arreglo de FieldArray, o sea, de su funcion */}
                {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { asignaturas } = values;
                    return (
                        <>
                        {
                            // loop en el array e ir agregando
                            asignaturas.map((asignatura, i) => (
                                <div key={i}>
                                    {
                                        i >= 0 && 
                                    <div className="input-group">
                                        <SelectAsignaturas name={`asignaturas[${i}]`} /> 
                                        <BotonFormulario className="boton-eliminar" value="-" func={() => remove(i)} />
                                    </div>
                                    } 
                                </div>
                            ))
                        }
                        <BotonFormulario className="boton-agregar" value="+" func={() => push('')}/>
                        </>
                    )
                    }
                } 
            </FieldArray>
        </>
    );
}

export default FormularioAsignaturas;