import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandinPage from "./Components/LandingPage/LandingPage"
import Login from "./Components/LoginPage/login"
import SignUp from "./Components/SignUpPage/SignUpPage"
import BottomTab from './Navigation/Routes';
import TinyChat from "./Components/TinyChat";
import './App.css';


function App() {
  return (
    
     <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/dashboard" element={<><TinyChat /><BottomTab /></>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;