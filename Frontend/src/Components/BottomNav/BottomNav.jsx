import React from 'react'

import "./BottomNav.css"
import { NavLink } from 'react-router-dom'
import { RiHome3Fill } from "react-icons/ri";
import { RiCalendarTodoLine } from "react-icons/ri";
import { PiTrophy } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
const BottomNav = () => {
  return (
     <div className="bottom-nav">

      <NavLink to="/home" className="nav-item">
        <RiHome3Fill className='menu-icon'/>
        <span>Home</span>
      </NavLink>

           <NavLink to="/event" className="nav-item">
       <PiTrophy className='menu-icon'/>
        <span>Book</span>
      </NavLink>

      <NavLink to="/booking" className="nav-item">
       <RiCalendarTodoLine className='menu-icon'/>
        <span>My Booking</span>
      </NavLink>


   <NavLink to="/profile" className="nav-item">
        <CiUser className='menu-icon'/>
        <span>Profile</span>
      </NavLink>
 
{/* 
      <NavLink to="/history" className="nav-item">
        <CiClock2 className='menu-icon' />
        <span>History</span>
      </NavLink> */}

   

    </div>
  )
}

export default BottomNav