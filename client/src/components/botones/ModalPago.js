const ModalPago = (props) => {
    return(
        <>
        <button type="button" className="boton-aceptar" data-bs-toggle="modal" func={props.func} nombre="boton" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Generar Pago</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Generar enlace de pago</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Valor de la tutoría:</label>
                    <input placeholder="Ingrese el monto" type="text" class="form-control" id="recipient-name"/>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="boton-aceptar">Generar</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default ModalPago