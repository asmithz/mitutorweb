import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import './PagoEnLinea.css';
import axios from 'axios'

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/pago`
})

const PagoEnLinea = () => {
  const [creditCardNum, setCreditCardNum] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [cardTypeUrl, setCardTypeUrl] = useState('https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png');
  const pagoID = useLocation().pathname.split("/")[2]
  const [pagoDatos, setPagoDatos] = useState({})

  useEffect(() => {
    const mostrarPago = async () => {
      try{
        const mi_token = localStorage.getItem('x-token')
        const buscar = await api.get("/buscarPago/"+pagoID, {
          headers: {
              'Content-type': 'application/json',
              'x-token': mi_token
          }
        })
        if(buscar.data){
          setPagoDatos(buscar.data.buscarPago)
          console.log(buscar.data.buscarPago.monto)
        }
      }catch(error){
        console.log(error)
      }
    }
    mostrarPago()
  })

  const registrarPago = async () =>{
    try{
      const mi_token = localStorage.getItem('x-token')
      const registrar = await api.put("/registrarPago/"+pagoID, {
        headers: {
            'Content-type': 'application/json',
            'x-token': mi_token
        }
      })
      //enviar a la calificación
      if(registrar.data){
        alert()
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleNum = (e) => {
    setCreditCardNum(e.target.value);
  }
  
  const handleCardHolder = (e) => {
    setCardHolder(e.target.value);
  }

  const handleExpMonth = (e) => {
    setExpireMonth(e.target.value);
  }

  const handleExpYear = (e) => {
    setExpireYear(e.target.value);
  }

  return (
      <div className="formmm">
       <div className="container">
        <form id="form">
            <div id="card">
                <div className="header">
                    <div className="sticker"></div>
                    <div>
                      <img className="logo" src={cardTypeUrl} alt="Card logo"/>
                    </div>
                </div>
                <div className="body">
                    <h2 id="creditCardNumber">{creditCardNum}</h2>
                </div>
                <div className="footer">
                    <div>
                        <h3>{cardHolder}</h3>
                    </div>
                    <div>
                        <h3>{expireMonth} / {expireYear}</h3>
                    </div>
                </div>
            </div>

            <div className="input-container mt">
                <h4>Titular de la tarjeta</h4>
                <input onChange={handleCardHolder} type="text" placeholder="Nombre completo" required/>
            </div>

            <div className="input-container ">
                <h4>Ingrese su tarjeta paga efectuar el pago de su tutoría</h4>
                <input onChange={handleNum}
                  placeholder="Número de la tarjeta"/>
            </div>


            <div className="input-grp">
                <div className="input-container">
                    <h4>Fecha de expiración</h4>
                    <select value={expireYear} onChange={handleExpYear}>
                      <option value="Enero">Enero</option>
                      <option value="Febrero">Febrero</option>
                      <option value="Marzo">Marzo</option>
                      <option value="Abril">Abril</option>
                      <option value="Mayo">Mayo</option>
                      <option value="Juni">Junio</option>
                      <option value="Julio">Julio</option>
                      <option value="Agosto">Agosto</option>
                      <option value="Septiembre">Septiembre</option>
                      <option value="Octubre">Octubre</option>
                      <option value="Noviembre">Noviembre</option>
                      <option value="Diciembre">Diciembre</option>
                    </select>
                </div>
                <div className="input-container">
                <h4>Mes</h4>
                <select value={expireMonth} onChange={handleExpMonth}>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                </div>
                <div className="input-container">
                    <h4>CVV</h4>
                    <input type="password" placeholder="CVV" required/>
                </div>
            </div>
            <div className="input-grp2">
                <h2>Monto total: {pagoDatos.monto} </h2>
                <h3>Tutor: </h3>
            </div>
            <button onClick={registrarPago}>Pagar</button>
        </form>
    </div>
    </div>
  );
}

export default PagoEnLinea;