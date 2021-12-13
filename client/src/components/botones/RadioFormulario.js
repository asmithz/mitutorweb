import { useField } from 'formik'

const RadioFormulario = ({label, ...props}) => {
    const [field] = useField({ ...props, type: 'radio'});
    return(
        <div>
            <label>
                <input type='radio' {...field} {...props}/>
                {label}
            </label>
        </div>
    );
}

export default RadioFormulario;