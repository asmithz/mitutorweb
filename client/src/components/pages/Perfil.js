import React, { useEffect, useState } from 'react';
import '../pages_css/Perfil.css';
import PerfilTutor from './PerfilTutor';
import PerfilEstudiante from './PerfilEstudiante';
import DetectarTipoUsuario from '../controllers/DetectarTipoUsuario';

const Perfil = () => {
    const usuario = DetectarTipoUsuario();
    return(
        <div>
            <div>
                <h1>l </h1>
                <h1>Mi perfil </h1>
            </div>
            {usuario.tipo === "estudiante" &&
                <PerfilEstudiante datos_estudiante={usuario} /> 
            }
            {usuario.tipo === "tutor" &&
                <PerfilTutor datos_tutor={usuario} />
            }
        </div>
    );
}

export default Perfil;