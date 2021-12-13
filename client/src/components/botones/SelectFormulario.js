import { useField } from 'formik'

const SelectFormulario = ({ label, ...props }) => {
    const [field] = useField(props);
    return(
        <div>
            <label>{label}</label>
            <select {...field} {...props} />
        </div>
    );
}

export default SelectFormulario;