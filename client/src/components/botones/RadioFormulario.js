import { useField } from 'formik'

const RadioFormulario = ({label, ...props}) => {
    const [field] = useField({ ...props, type: 'radio'});
    return(
        <>
            <label>
                <input type='radio' {...field} {...props}/>
                {label}
            </label>
        </>
    );
}

export default RadioFormulario;