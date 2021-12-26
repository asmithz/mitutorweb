import { useState } from 'react';
import './Dropdown.css'

const Dropdown = (props) => {

    const [mostrar, setMostrar] = useState(false);
    const updateMostrar = () => {
        setMostrar(!mostrar)
    }

    return(
        <div>
        {props.tipo === "checkboxes" &&
            <div className="dropdown">
                <button className="button-dropdown" type="button" onClick={updateMostrar}>{props.value}</button>
                    {mostrar === true && 
                        <div className="dropdown-card">
                            {props.component} 
                        </div> 
                    }
            </div>
        }
        </div>
    );
}

export default Dropdown;