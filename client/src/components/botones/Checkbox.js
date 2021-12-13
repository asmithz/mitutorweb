import { useField } from 'formik';
import './Checkbox.css'

const CheckBox = (props) => {
    const [field] = useField({...props, type: 'checkbox'});
    return(
        <label className="espacio-label">{props.value}
            <input className="espacio-input" type="checkbox" {...field} {...props}/>
        </label>
    );
}

export default CheckBox;