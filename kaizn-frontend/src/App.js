import logo from './logo.svg';
import './App.css';
import LoginPage from './components/login/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';

function App() {
  const isAuthenticated = () => {
    // Add logic to check if the user is authenticated
    // For example, check if a user token exists in local storage
    console.log("isAuthenticated")
    const token = localStorage.getItem('userToken');
    return !!token;
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
