import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HealthInsurance from './pages/HealthInsurance';
import VehicleInsurance from './pages/VehicleInsurance';
import HomeInsurance from './pages/HomeInsurance';
import IPInsurance from './pages/IPInsurance';
import Compare from './pages/Compare';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import './styles/main.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/health" element={<HealthInsurance />} />
              <Route path="/vehicle" element={<VehicleInsurance />} />
              <Route path="/home" element={<HomeInsurance />} />
              <Route path="/ip" element={<IPInsurance />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

