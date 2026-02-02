import React, { useEffect, useState } from "react";
import "./MyBooking.css";
import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaBookmark,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {


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
    <div className="booking-page">
      <h2 className="page-title">My booking</h2>

      <div className="booking-list">
        {bookings.map((item) => (
          <div className="booking-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="booking-info">
              <span className="booking-id">Booking ID: #{item.id}</span>
              <h3>{item.title}</h3>

              <p className="booking-date">{item.date}</p>
              <p className="booking-time">{item.time}</p>

              <span className="booking-status">{item.status}</span>
            </div>

            <div className="booking-price">{item.price}</div>
          </div>
        ))}
      </div>

      
      <div className="bottom-nav">
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
    </div>
  );
};

export default MyBooking;
