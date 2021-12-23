import React from 'react'
import Peticion from '../peticion/Peticion'
import Chat from '../chat/Chat'
import '../pages_css/Bandeja.css'
import '../peticion/Peticion.css'

const Bandeja = () => {
  return(
    <div className="plantilla-bandeja">
      <h1>Bandeja de peticiones</h1>
      <div className="modulos">
        <Peticion />
        <Peticion />
        <Peticion />
        <Peticion />
      </div>
      <h1>Chats</h1>
      <div className="modulos">
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </div>
    </div>
  )
}

export default Bandeja
