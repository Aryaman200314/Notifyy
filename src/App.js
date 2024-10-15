import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/SignUp/SignUp.js';

const routes = (
  <Routes>
    <Route path='/dashboard' element={<Home/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
  </Routes>
);

function App() {
  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
