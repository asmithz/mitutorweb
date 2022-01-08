import './BotonFormulario.css' 
import './ModalBotonBuscar.css'

const ModalBotonBuscar = (props) => {
    return(
        <>
        { props.tipo === "asignaturas" &&
          <>
            <button type="button" className={props.className} data-bs-toggle="modal" data-bs-target={"#"+props.user+"Asignaturas"}>
            {props.value} 
            </button>
              <div class="modal fade" id={props.user+"Asignaturas"} tabindex="-1" aria-labelledby={props.user+"LabelAsignaturas"} aria-hidden="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id={props.user+"LabelAsignaturas"}>{props.title}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <ul className="asignatura-tutor">
                      {
                        props.content.map(asignatura => 
                          <li>{asignatura}</li>
                        )
                      }
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="boton-siguiente" data-bs-dismiss="modal" >Ok</button>
                    </div>
                  </div>
                </div>
              </div>
          </>
        }

        { props.tipo === "horario" &&
          <>
            <button type="button" className={props.className} data-bs-toggle="modal" data-bs-target={"#"+props.user+"Horario"}>
            {props.value} 
            </button>
              <div class="modal fade" id={props.user+"Horario"} tabindex="-1" aria-labelledby={props.user+"LabelHorario"} aria-hidden="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id={props.user+"LabelHorario"}>{props.title}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <dl className="horario-tutor">
                      {
                        Object.entries(props.content).map((dia, i) => {
                          if(dia[0] !== "_id"){
                            let horas = dia[1].map((hora, i) => {
                              return hora
                            })
                                    console.log(horas)
                            return <>
                                    <dt className="horario-dia" key={i}>{dia[0]}</dt> 
                                    { horas.length === 0 ? 
                                        <dd className="horario-hora" key={i}>No hay horas disponibles para este día</dd>
                                        :
                                        horas.map((hora, i)=> {
                                        return <dd className="horario-hora" key={i}>{"--> "+hora}</dd>
                                      })
                                    }
                                  </>
                          }
                        }
                        )
                      }
                      </dl>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="boton-siguiente" data-bs-dismiss="modal" >Ok</button>
                    </div>
                  </div>
                </div>
              </div>
          </>
        }
        </>        
    )
}

export default ModalBotonBuscar;