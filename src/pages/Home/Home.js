import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './home.css';
import Notecard from '../../components/Cards/Notecard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNote.js';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import Toast from '../../components/ToastMessage/Toast.js';
import EmptyCard from '../../components/EmptyCard/EmptyCard.js';
import noNote from '../../assets/Images/No_results.png';
import noData from '../../assets/Images/No-Data.png';
function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [navDisable, setNavDisable] = useState(false);
  const navigate = useNavigate();


  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    });
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };


  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again this is to get all notes");
    }
  };


  const deleteNote = async (data) => {
    const noteId = data._id;
    try{
      const response =  await axiosInstance.delete("/delete-notes/" + noteId);

    if(response.data && !response.data.error) {
      showToastMessage("Note Deleted Successfully", 'deleted');
        getAllNotes();
    }

    }
    catch(error){
      if(error.response && 
        error.response.data &&
        error.response.data.message
      )
      {
        console.log("An unexped error has occured. Please try again");
       }
    }
  }

  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes", {
        params: {
          query
        },
      });
      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }


    catch(error){
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const handleIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try{
      const response =  await axiosInstance.put("/update-note-pinned/" + noteId,{
      "isPinned": !noteId.isPinned,
    });

    if(response.data && response.data.note) {
      showToastMessage("Note Updated Successfully");
        getAllNotes()
    }

    }
    catch(error){
      console.log(error);
      
    }

  }


  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} 
      onSearchNote={onSearchNote} 
      handleClearSearch={handleClearSearch}/>





      <div className='note-card-container'>
       {allNotes.length > 0 ? <div className='note-cards'>
          {allNotes.map((item, index) =>(

            <Notecard
            key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned} 
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => handleIsPinned(item)}
            />

          ))}
          
        </div> : <EmptyCard 
        imgSrc={isSearch ? noData : noNote} 
        message={isSearch ? "Oops! No notes found matching your search" : <>
      Start creating your first note! Click on the + button to note down your thoughts, ideas, and reminders using <span className="notify-span">Notify</span>.
    </>}/> }
      </div> 

      <button
        className='add-new-btn-container'
        onClick={() =>
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null,
          })
        }
      >
        <MdAdd className='add-new-icon' />
      </button>


      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: 'add', data: null });
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel="Add/Edit Note"
        className="edit-card-modal"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage = {showToastMessage}
        />
      </Modal>

          <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
          />

    </>
  );
}

export default Home;
