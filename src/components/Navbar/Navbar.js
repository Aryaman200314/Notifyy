import React, { useState } from 'react';
import './navbar.css';
import ProfileInnfo from '../Cards/Profileinnfo.js';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa'; 
import logo from '../../assets/Images/logo.png';

function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const navigate = useNavigate();

  const Logout = () => {
    console.log("logging out");
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen); 
  };

  return (
    <div className='navbar'>
      <img className='navbar-log-img' src={logo} alt="logo" />


      <div className={`search-bar-container ${isSearchOpen ? 'open' : ''}`}>
        {isSearchOpen && (
          <>
            <input
              type="text"
              className={`search-input ${isSearchOpen ? 'visible' : 'hidden'}`}
              placeholder="Search..."
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />
            <FaTimes className="clear-icon" onClick={onClearSearch} />
            <FaSearch className="submit-search-icon" onClick={handleSearch} />
          </>
        )}


        {!isSearchOpen && (
          <FaSearch className="search-icon" onClick={toggleSearchBar} />
        )}
      </div>

      <ProfileInnfo userInfo={userInfo} onLogout={Logout} />
    </div>
  );
}

export default Navbar;
