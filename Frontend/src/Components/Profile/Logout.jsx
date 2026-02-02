import React from 'react'
import "./logout.css"
import { RiLogoutBoxFill } from "react-icons/ri";
const Logout = ({setOpen}) => {
  return (
    <div className='logout-container'>

        <div className="popup">
<RiLogoutBoxFill className='logout-icon'/>

   <p>Are you sure you want to logout ?</p>


        <div className="btn-holder">
            <button className='cancel-btn' onClick={()=>setOpen(false)}>cancel</button>
            <button className='logout-btn'>Logout</button>
        </div>
        </div>


     
    </div>
  )
}

export default Logout