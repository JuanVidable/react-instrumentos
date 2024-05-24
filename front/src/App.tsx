
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <>
    
      <Router>
        <Header/>
        <AppRoutes/>
      </Router>
    </>
  )
}

export default App
