import React, { useState } from 'react';  // Added the useState import
import { MdClose, MdAdd } from 'react-icons/md';
import './taginput.css';

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTags = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTags();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              # {tag}
              <button onClick={() => handleRemoveTag(tag)} className="remove-tag-btn">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="add-tags-container">
        <input
          type="text"
          value={inputValue}
          className="input-form-tags"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add-tag-btn" onClick={addNewTags}>
          <MdAdd className="tag-input-modal" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;































// import React from 'react'
// import { MdClose, MdAdd} from 'react-icons/md'
// import './taginput.css'
// function TagInput({tags, setTags}) {

//   const [inputValue, setInputValue] = useState('')
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   }

//   const addNewTags = () => {
//     if(inputValue.trim() !== '') {
//       setTags([...tags, inputValue]);
//       setInputValue('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if(e.key === 'Enter') {
//       addNewTags();
//     }
//   }

//   const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag!== tagToRemove))
//   };

//   return (
//     <div>
//      {tags?.length > 0 && ( <div className=''>
//         {tags.map((tag, index) => (
//           <span key={index} className=''>
//             # {tag}
//             <button onClick={() => {}}>
//               <MdClose />
//             </button>
//           </span>
//         ))}
//       </div> 
//     )}
//         <div className='add-tags-container'>
//             <input 
//             type='text' 
//             value={inputValue}
//             className='input-form-tags' 
//             placeholder='Add tags'
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}/>

//             <button className=''
//             onClick={() => {
//               addNewTags();

//             }}>
//                 <MdAdd className='tag-input-modal'/>
//             </button>
//         </div>
//     </div>
//   )
// }

// export default TagInput