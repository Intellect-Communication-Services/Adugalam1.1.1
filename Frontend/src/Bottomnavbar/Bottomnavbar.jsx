import React, { useEffect, useState } from "react";
  import "./Bottomnavbar.css";
import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaBookmark,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Bottomnavbar = () => {


const navigate=useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    
    const fetchBookings = async () => {
      const data = [
        {
          id: "42798",
          title: "Summer sports carnival",
          date: "Nov 8, 2025",
          time: "03:00 pm - 06:00 pm",
          price: "$20.00",
          status: "Completed",
          image:
            "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        },
      ];
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
   
      
      <div className="bottom-nav1">

<br /><br /><br /><br /><br />

        <div className="nav-item" onClick={()=>navigate("/")}>
          <FaHome />
          <span>Home</span>
        </div>

        <div className="nav-item" onClick={()=>navigate("/events")}>
          <FaCalendarAlt />
          <span>Events</span>
        </div>

        <div className="nav-item" onClick={()=>navigate("/cart")}>
          <FaShoppingCart />
          <span>Cart</span>
        </div>

        <div className="nav-item active">
          <FaBookmark />
          <span>My booking</span>
        </div>

        <div className="nav-item" onClick={()=>navigate("/profile")}>
          <FaUser />
          <span>Profile</span>
        </div>
      </div>
  
  );
};

export default Bottomnavbar;
