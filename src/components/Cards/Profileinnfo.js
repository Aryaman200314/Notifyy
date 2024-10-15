import React from 'react';
import './profileinnfo.css';
import { getIntials } from '../../utils/helper';
const ProfileInnfo = ({ userInfo, onLogout }) => {
  
  return (
    <div className='profile-container'>
      <div className='profile-icon-holder'>
        {getIntials(userInfo?.fullName)} 
      </div>

      <div className='user-details'>
        <p>{userInfo?.fullName}</p>
        <button onClick={onLogout} className='logout-btn'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInnfo;
