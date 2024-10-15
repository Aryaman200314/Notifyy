import React from 'react';
import './emptycard.css';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className='img-carrier'>
      <img src={imgSrc} alt="No Notes added" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyCard;
