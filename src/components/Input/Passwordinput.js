import React, { useState } from 'react'
import './passwordinput.css'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
const Passwordinput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () =>{
      setIsShowPassword(!isShowPassword);
    }
  return (
    <div className='password-input'>
      <input 
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Password"}
      type={isShowPassword ? "text" : "password"}
      className='passowrd-input-field'
      />
      {isShowPassword ? (<FaRegEye className='show-icon'
      size={15} 
      onClick={toggleShowPassword}/> 
      ) : ( 
        <FaRegEyeSlash 
        size={15}
        className='not-show-icon'
        onClick={()=>toggleShowPassword()}
       />
      )}
    </div>
  )
}

export default Passwordinput