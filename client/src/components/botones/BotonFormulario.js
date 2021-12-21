import './BotonFormulario.css' 

const BotonFormulario = (props) => {
    let button = '';
    if(props.func == null){
        button =  <button className={props.className} type="submit">{props.value}</button>
    }
    else{
        button =  <button className={props.className} type="button" onClick={props.func}>{props.value}</button>
    }
    return(
        <div>{button}</div>
    );
}

export default BotonFormulario;