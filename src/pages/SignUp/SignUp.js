import React, { useState } from 'react';
import './signup.css';
import Passwordinput from '../../components/Input/Passwordinput.js';
import { validateEmail } from '../../utils/helper.js';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import NavbarSL from '../../components/NavbarTwo/NavbatSL.js';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter a name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/login');
        alert("Account created successfully");
        // showToastMessage("Account created successfully");
        // navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error has occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <NavbarSL />
      <div className='signup-page-container'>
        <div className='signup-form-container'>
          <form onSubmit={handleSignUp}>
            <h4>Sign Up</h4>

            <input type="text" placeholder="Name" className="input-box-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input type="text" placeholder="Email" className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='error-message'>{error}</p>}

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="form-para">
              Already have an account?{' '}
              <Link to="/login" className="create-an-account">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
