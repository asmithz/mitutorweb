import React from 'react';
import { useField } from 'formik';
import asignaturas from './Asignaturas.json'
import BotonFormulario from '../botones/BotonFormulario';

// <option> mostrar ramo por grupo
const OpcionAsignatura = (props) => {
    const asignatura = asignaturas.filter((ramo) => ramo.materia === props.name).map((ramo) => 
        <option key={ramo.id} value={ramo.ramo}>
            {ramo.ramo}
        </option>
    );
    return(
        <>{asignatura}</>
    );
}

// <optgroup> mostrar por grupo
const OptGroupAsignatura = (props) => {
    return(
        <optgroup key="optgroup" label={props.name}>
            <OpcionAsignatura name={props.name}/>
        </optgroup>
    );
}

// <select>
const SelectAsignaturas = (props) => {
    const [field] = useField(props);
    return(
        <>
        <select className="form-select form-select-sm" {...field} {...props}>
            <option key="optgroup" label="Seleccione"></option>
            <OptGroupAsignatura name="Matemática"/>
            <OptGroupAsignatura name="Física"/>
            <OptGroupAsignatura name="Informática"/>
        </select>
        </>
    );
}

export default SelectAsignaturas;