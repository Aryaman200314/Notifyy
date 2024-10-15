import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/SignUp/SignUp.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirecting to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Your other routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Optional: Catch-all route to handle undefined routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
