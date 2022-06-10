// import  {Button} from 'react-bootstrap';
import './App.css';
import { Register } from './pages/register-login/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from './pages/register-login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
 



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    
   
    </div>
  );
}

export default App;
