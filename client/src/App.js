import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Buscar from './components/pages/Buscar'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Bandeja from './components/pages/Bandeja'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
	  </div>
	</Switch>
      </Router>
    </div>
  );
}

export default App;
