import axios from 'axios'
import { useState, useEffect } from 'react'

const api = axios.create({
  withCredentials: true, 
  credentials: 'include',
  baseURL: `http://localhost:2000/api/checkToken`
})

const DetectarTipoUsuario = () => {
  const [usuario, setUsuario] = useState([])
  const [dataUsuario, setdataUsuario] = useState(true)
  useEffect(()=>{
      const obtenerUsuario = async () => {
          try{
              const mi_token = localStorage.getItem('x-token')
              //console.log(mi_token)
              const tipo_usuario = await api.get('/checkUser',{
                  headers: {
                  'Content-type': 'application/json',
                  'x-token': mi_token
                  }
              });
              if(dataUsuario){
                  setUsuario(tipo_usuario.data.usuario)
                  setdataUsuario(false)
              }
          }catch(error){
              console.log(error)
          }
      }
      obtenerUsuario();
      console.log(usuario)
  }, [usuario])
  return usuario
}

export default DetectarTipoUsuario