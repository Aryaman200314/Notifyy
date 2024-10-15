import React, { useState } from 'react';
import './profileinnfo.css';
import { getIntials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className='profile-container'>
      {/* Profile Icon */}
      <div className='profile-icon-holder' onClick={toggleDropdown}>
        {getIntials(userInfo?.fullName)}
      </div>

      {/* User Details */}
      <div className='user-details'>
        <p>{userInfo?.fullName}</p>
        <button onClick={onLogout} className='logout-btn'>
          Logout
        </button>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isDropdownOpen && (
        <div className='dropdown-menu'>
          <div className='dropdown-item'>
            <p>{userInfo?.fullName}</p>
            <button onClick={onLogout} className='logout-btn'>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
