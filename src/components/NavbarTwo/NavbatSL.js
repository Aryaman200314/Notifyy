import React, { useState } from 'react';
import './navbarsl.css';
import notify from '../../assets/Images/logo.png';
import { FaGithub, FaLinkedin, FaBars } from 'react-icons/fa';

function NavbarSL() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar-container'>
      <img className="navbar-log-img" src={notify} alt="logo" />

      {/* Hamburger Icon for smaller screens */}
      <div className='hamburger-icon' onClick={toggleMenu}>
        <FaBars />
      </div>

      <div className={`connect-info ${isMenuOpen ? 'active' : ''}`}>
        <a href='https://www.linkedin.com/in/aryaman-sharma-07a233233/' target="_blank" rel="noopener noreferrer">
          <FaLinkedin className='social-icon' />
        </a>
        <a href='https://github.com/Aryaman200314' target="_blank" rel="noopener noreferrer">
          <FaGithub className='social-icon' />
        </a>
      </div>
    </div>
  );
}

export default NavbarSL;
