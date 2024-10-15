import React, { useState } from 'react';
import './notecard.css';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const Notecard = ({ 
    title,
    date,
    content,
    tags,
    onEdit,
    onDelete, 
    onPinNote }) => {

    const [isPinned, setIsPinned] = useState(false); 


    const handlePinNote = () => {
        setIsPinned(!isPinned);
        onPinNote(); 
    };

    return (
        <div className='main-card'>
            <div className='card-title-data-holder'>
                <div className='title-and-date-container'>
                    <span className='title'>{title}</span> <br />
                    <span className='date'>{moment(date).format('Do MMM YYYY')}</span>
                </div>
                
               
                <MdOutlinePushPin 
                    className={`icon ${isPinned ? 'pinned' : ''}`} 
                    onClick={handlePinNote} 
                />
            </div>

            <p className='content'>{content?.slice(0, 60).concat('..')}</p>

            <div className='edit-delete-icon-container'>
                <div className='tags'>
                    {tags.map((item) => `#${item}  `)}
                </div>
                <div className='icon-buttons'>
                    <MdCreate className='icon' id='create-icon' onClick={onEdit} />
                    <MdDelete className='icon' id='delete-icon' onClick={onDelete} />
                </div>
            </div>
        </div>
    );
};

export default Notecard;



















