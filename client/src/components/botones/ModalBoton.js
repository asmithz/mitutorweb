import './BotonFormulario.css' 

const ModalBoton = (props) => {
    return(
        <>
        <button type="button" className={props.className} data-bs-toggle="modal" data-bs-target="#exampleModal">
        {props.value} 
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{props.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  {props.content}
              </div>
              <div class="modal-footer">
                <button type="button" class="boton-agregar" data-bs-dismiss="modal" >Entiendo</button>
                <button type="button" class="boton-agregar">Entiendo</button>
              </div>
            </div>
          </div>
        </div>
        </>        
    )
}

export default ModalBoton;