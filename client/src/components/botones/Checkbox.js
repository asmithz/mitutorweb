import { useField } from 'formik';
import './Checkbox.css'

const CheckBox = (props) => {
    const [field] = useField({...props, type: 'checkbox'});
    return(
        <div className="form-check">
            <input className="form-check-input" id="flexCheckDefault" type="checkbox" {...field} {...props}/>
            <label className="form-check-label" for="flexCheckDefault">
                {props.value}
            </label>
        </div>
    );
}

export default CheckBox;