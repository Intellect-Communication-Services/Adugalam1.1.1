import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";
import aa from "../assets/aa.jpg";
import bb from "../assets/bb.jpg";
import { FaHome, FaCalendarAlt, FaShoppingCart, FaBookmark, FaUser } from "react-icons/fa";


const Cartpage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="summary-empty">
        <h2>No booking details found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="summary-wrapper">
      
      
      <div className="cart-card">
        <img src={state.ground.img} alt={state.ground.name} />

        <div className="cart-info">
          <h3>{state.ground.name}</h3><br></br>
          <p>Date: Nov {state.date}, 2025</p><br></br>
          <p>Time: {state.time.slot}</p><br></br>
          <h4>$20.00</h4>
        </div>
      </div>
<h3 className="more-title">There's more service to try!</h3>
<div className="more-services">
  <div className="service-card faded">
    <img src={aa} alt="Net masters ground" />
    <div className="service-rating">
      ⭐ 4.2 <span className="tennis-tag">Tennis</span>
    </div>
    <div className="service-info">
      <h4>Net masters ground</h4>
      <div className="location-price-row">
        <div className="service-location">
          <span className="location-dot"></span>
          <span className="location-text">Brookvale</span>
        </div>
        <span className="price">$30</span>
      </div>
    </div>
  </div>
  <div className="service-card faded">
    <img src={bb} alt="Rainbow fun arena" />
    <div className="service-rating">
      ⭐ 4.2 <span className="tennis-tag">Tennis</span>
    </div>
    <div className="service-info">
      <h4>Rainbow fun arena</h4>
      <div className="location-price-row">
        <div className="service-location">
          <span className="location-dot"></span>
          <span className="location-text">Crestview heights</span>
        </div>

        <span className="price">$60</span>
      </div>
    </div>
  </div>
</div>
      <div className="grandcheck">
  <div className="grand-left">
    <p className="grand-label">Grand total</p>
    <h2 className="grand-amount">$20.00</h2>
  </div>
  <button className="checkout-btn-fixed" onClick={()=>navigate("/payment")}>Checkout</button>
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

  <div className="nav-item active">
    <FaShoppingCart />
    <span>Cart</span>
  </div>

  <div className="nav-item" onClick={()=>navigate("/mybooking")}>
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

export default Cartpage;
