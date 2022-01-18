import './MiTutorWeb.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Buscar from './components/pages/Buscar'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Bandeja from './components/pages/Bandeja'
import Perfil  from './components/pages/Perfil';
import ChatVirtual from './components/chat/ChatVirtual';
import PagoEnLinea from './components/pago/PagoEnLinea';
import Calificacion from './components/calificacion/Calificacion';

function MiTutorWeb() {
	const routeLogin = () => {
		return <Login />
	}
	const routeSignUp = () => {
		return <SignUp />
	}
	const routeChatVirtual = () => {
		return <ChatVirtual />
	}
	const routePagoEnLinea = () => {
		return <PagoEnLinea />
	}
	const routeCalificacion = () =>{
		return <Calificacion />
	}
	const routeInicio = () => {
		return <Inicio />
	}
	const routeBuscar = () => {
		return <Buscar />
	}
	const routeBandeja = () => {
		return <Bandeja />
	}
	const routePerfil = () =>{
		return <Perfil />
	}
	return (
		<div className="MiTutorWeb">
			<Router>
				<Switch>
					<Route path='/Login' exact component={routeLogin}/>
					<Route path='/SignUp' exact component={routeSignUp}/>
					<Route path='/ChatVirtual/:id' exact component={routeChatVirtual}/>
					<Route path='/PagoEnLinea/:id' exact component={routePagoEnLinea}/>
					<Route path='/Calificacion/:id' exact component={routeCalificacion}/>
						<div>
							<Navbar />
							<Route path='/Inicio' exact component={routeInicio}/>
							<Route path='/Buscar' exact component={routeBuscar}/>
						{localStorage.getItem('x-token') && 
							<>
							<Route path='/Bandeja' exact component={routeBandeja}/>
							<Route path='/Perfil' exact component={routePerfil}/>
							</>
						}
					</div>
				</Switch>
			</Router>
		</div>
	);
}

export default MiTutorWeb;
