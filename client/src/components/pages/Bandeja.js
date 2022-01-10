import React, { useEffect, useState } from 'react'
import Peticion from '../peticion/Peticion'
import DetectarTipoUsuarioID from '../controllers/DetectarTipoUsuario'
import ObtenerUsuarioID from '../controllers/ObtenerUsuarioID'
import '../pages_css/Bandeja.css'
import '../peticion/Peticion.css'
import axios from 'axios'
import ChatAsincrono from '../chatsincrono/ChatAsincrono'


const api_peticion = axios.create({
    withCredentials: true, 
    credentials: 'include',
    baseURL: `http://localhost:2000/api/peticion`
})

const api_chat = axios.create({
    withCredentials: true, 
    credentials: 'include',
    baseURL: `http://localhost:2000/api/chat`
})

const Bandeja = () => {
  const usuarioID = ObtenerUsuarioID()
  const tipo_usuario = DetectarTipoUsuarioID()
  const [peticionesFetch, setpeticionesFetch] = useState([])
  const [endFetch, setendFetch] = useState(true)

  useEffect(()=>{
    //checkear cuando se obtenga el id del usuario
    if(usuarioID && tipo_usuario){
    const obtenerPeticiones = async () => {
      const mi_token = localStorage.getItem('x-token')
      try{
        const response = await api_peticion.get("/obtenerPeticion/"+usuarioID, {
                    headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                    }}
                  )
        if(response && response.data.peticiones){
          if(endFetch){
            setpeticionesFetch(response.data.peticiones)
            setendFetch(false)
          }
        }
      }catch(error){
        console.log(error)
      }
    }
    obtenerPeticiones()
    }
  },[usuarioID, tipo_usuario, peticionesFetch])

  const mostrarPeticiones = () => {
    if(peticionesFetch && peticionesFetch.length > 0){
      if(tipo_usuario.tipo === "tutor" || tipo_usuario.tipo === "estudiante"){
        return true
      }
    }
    else{
      return false
    }
  }

  const [chatsFetch, setchatsFetch] = useState([])
  const [endChatFetch, setendChatFetch] = useState(true)

  useEffect(()=>{
    //checkear cuando se obtenga el id del usuario
    if(usuarioID && tipo_usuario){
    const obtenerChats = async () => {
      const mi_token = localStorage.getItem('x-token')
      try{
        const response = await api_chat.get("/obtenerChat/"+usuarioID, {
                    headers: {
                    'Content-type': 'application/json',
                    'x-token': mi_token
                    }}
                  )
        if(response && response.data.chats){
          if(endChatFetch){
            setchatsFetch(response.data.chats)
            console.log(chatsFetch)
            setendChatFetch(false)
          }
        }
      }catch(error){
        console.log(error)
      }
    }
    obtenerChats()
    }
  },[usuarioID, tipo_usuario, chatsFetch])

  const mostrarChats = () => {
    if(chatsFetch && chatsFetch.length > 0){
      if(tipo_usuario.tipo === "tutor" || tipo_usuario.tipo === "estudiante"){
        return true
      }
    }
    else{
      return false
    }
  }

  return(
    <div className="plantilla-bandeja">
      <br/>
        <h1>Bandeja de peticiones</h1>
        <div className="modulos">
            { mostrarPeticiones && 
              peticionesFetch.map((peticion, i) => {
                return <Peticion key={i} titulo={peticion.titulo} 
                estado={peticion.estado} 
                id_tutor={peticion.tutor_id} 
                id_estudiante={peticion.estudiante_id}
                id_peticion={peticion._id}
                tipo_usuario={tipo_usuario}/>
              })
            }
        </div>
        <h1>Chats</h1>
        <div className="modulos">
            { mostrarChats && 
              chatsFetch.map((chat, i) => {
                return <ChatAsincrono key={i} titulo={chat.titulo} 
                estado={chat.estado} 
                id_receptor={chat.receptor_id} 
                id_emisor={chat.emisor_id}
                id_chat={chat._id}
                tipo_usuario={tipo_usuario}/>
              })
            }
        </div>
    </div>
  )
}

export default Bandeja
