import { useField } from 'formik'

const SelectFormulario = ({ label, ...props }) => {
    const [field] = useField(props);
    return(
        <div>
            <label>{label}</label>
            <select className="form-select form-select-sm" {...field} {...props} />
        </div>
    );
}

export default SelectFormulario;