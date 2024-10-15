import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './login.css';
import Passwordinput from '../../components/Input/Passwordinput.js';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import NavbarSL from '../../components/NavbarTwo/NavbatSL.js';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if(!password){
      setError('Please enter a password');
      return;
    }
    setError("");

    try{
      const response = await axiosInstance.post("/login", {
        email: email, 
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch(error){
      if(error.response &&  error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else{
        setError("An error has occured. Please try again later");
      }
    }

  };

  return (
    <>
      <NavbarSL/>

      <div className='login-upper-div'>
        <div className='login-inner-div'>
          <form onSubmit={handleLogin}> 
            <h4>Login</h4>
            <input type="text" placeholder="Email" className="input-box" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='error-message'>{error}</p>} {/* Error message */}

            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="form-para">
              Not registered yet?{' '}
              <Link to="/signup" className="create-an-account">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
