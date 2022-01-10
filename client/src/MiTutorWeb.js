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
	return (
		<div className="MiTutorWeb">
			<Router>
				<Switch>
					<Route path='/Login' exact component={Login}/>
					<Route path='/SignUp' exact component={SignUp}/>
					<Route path='/ChatVirtual/:id' exact component={ChatVirtual}/>
					<Route path='/PagoEnLinea/:id' exact component={PagoEnLinea}/>
					<Route path='/Calificacion/:id' exact component={Calificacion}/>
						<div>
							<Navbar />
							<Route path='/Inicio' exact component={Inicio}/>
							<Route path='/Buscar' exact component={Buscar}/>
						{localStorage.getItem('x-token') && 
							<>
							<Route path='/Bandeja' exact component={Bandeja}/>
							<Route path='/Perfil' exact component={Perfil}/>
							</>
						}
					</div>
				</Switch>
			</Router>
		</div>
	);
}

export default MiTutorWeb;
