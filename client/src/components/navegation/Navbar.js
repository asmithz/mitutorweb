import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  navbar: {
    backgroundColor: '#004369',
	position: 'fixed',
	width: '100%',
    color: '#fff',
  },
  navtext: {
    color: '#fff',
  },
}

const Navbar = () => {
	const salir = () => {
		localStorage.removeItem('x-token');
		window.location.reload(false);
	}

	return(
    <div>
     <nav className="navbar navbar-expand-lg" style={styles.navbar}>
		<div className="container-fluid">
			<a className="navbar-brand" href="/Inicio" style={styles.navtext}>MiTutorWeb</a>
			<div> 
			<ul className="navbar-nav">
				<li className="nav-item">
				<Link className="nav-link" to="/Buscar" style={styles.navtext}>Buscar Tutor</Link>
				</li>

				{localStorage.getItem('x-token') && 
					<li className="nav-item">
					<Link className="nav-link" to="/Bandeja" style={styles.navtext}>Bandeja de peticiones</Link>
					</li>
				}
				{localStorage.getItem('x-token') && 
					<li className="nav-item">
					<Link className="nav-link" to="/Perfil" style={styles.navtext}>Mi perfil</Link>
					</li>
				}
				{!localStorage.getItem('x-token') &&
					<li className="nav-item">
					<Link to="/Login">
					<button type="button" className="btn btn-primary" style={styles.navtext}>Ingresar</button>
					</Link>
					</li>
				}
				{localStorage.getItem('x-token') &&
					<li className="nav-item">
					<Link to="/">
					<button type="button" onClick={salir} className="btn btn-primary" style={styles.navtext}>Cerrar Sesión</button>
					</Link>
					</li>
				}
			</ul>
			</div>
		</div>
     </nav>
    </div>
  )
}

export default Navbar
