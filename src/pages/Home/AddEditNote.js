import React, { useState } from 'react'
import './addeditcard.css'
import TagInput from '../../components/Input/TagInput'
import axiosInstance from '../../utils/axiosInstance'
const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [content, setContent] = useState(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || [])

  const [error, setError] = useState(null)
  const addNewNote = async() => {
    try{
      const response =  await axiosInstance.post("/add-notes",{
        title,
        content,
        tags
    });

    if(response.data && response.data.note) {
      showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
    }

    }
    catch(error){
      if(error.response && 
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }
  };


  const editNote = async() => {
    const noteId = noteData._id;
    try{
      const response =  await axiosInstance.put("/edit-notes/" + noteId,{
        title,
        content,
        tags
    });

    if(response.data && response.data.note) {
      showToastMessage("Note Updated Successfully");
        getAllNotes()
        onClose()
    }

    }
    catch(error){
      if(error.response && 
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }

  }





  const handleAddNote = () => {
    if (!title) {
      setError('Please enter a title')
      return;
    }
    if (!content) {
      setError('Please enter a content')
      return;
    }

    setError("")
    if(type === "edit") {
      editNote()
    }
    else{
      addNewNote()
    }
  };

  return (
    <div className=''>
      <div className='edit-card-title'>
        <label className='title'>Title</label>
        <input
          type='text'
          className='title-placeholder-text-edit-card'
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>


      <div className='edit-card-content'>
        <label className='content'>Content</label>
        <textarea className='content-placeholder-text-edit-card'
          placeholder='content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className='edit-card-tags'>
        <label className='tags'>Tags</label>
        <TagInput className='tag-input' tags={tags} setTags={setTags} />
      </div>


      {error && <p className='error-message'>{error}</p>}

      <div className='add-close-btn-container'>
        <button className='edit-card-btn' onClick={handleAddNote}>
          {type === 'edit' ? 'UPDATE' : 'ADD'}
        </button>
        <div className='close-btn-container'>
          <button className='close-btn' onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>


    </div>

  )
}

export default AddEditNotes