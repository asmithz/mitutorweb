import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Buscar from './components/pages/Buscar'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Bandeja from './components/pages/Bandeja'
import Perfil  from './components/pages/Perfil';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
function App() {
  return (
    <div className="App">
      <Router>
	<Switch>
	  <Route path='/Login' exact component={Login}/>
	  <Route path='/SignUp' exact component={SignUp}/>
	  <div>
	    <Navbar />
	    <Route path='/Inicio' exact component={Inicio}/>
	    <Route path='/Buscar' exact component={Buscar}/>
	    <Route path='/Bandeja' exact component={Bandeja}/>
	    <Route path='/Perfil' exact component={Perfil}/>
	  </div>
	</Switch>
      </Router>
    </div>
  );
}

export default App;
