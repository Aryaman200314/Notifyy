import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import "./Toast.css"
const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`toast-container ${isShown ? "show" : "hide"}`}
      style={{ position: "absolute", top: "20px", right: "24px" }}
    >
      <div className={`toast ${type}`}>
        <div className="toast-icon">
          {type === "delete" ? <MdDeleteOutline /> : <LuCheck />}
        </div>
        <div className="toast-message">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;









