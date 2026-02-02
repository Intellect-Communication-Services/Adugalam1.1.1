import React from "react";
import "./Book.css";
import GroundFacilities from "./Facilities";
import Gallery from "./Gallery";


import { FaLocationDot } from "react-icons/fa6";

import stadium from "../assets/stadium.jpg";

import { useNavigate } from "react-router-dom";

const GroundDetails = () => {

const navigate=useNavigate();


  return (
    <div className="ground-pagee">
      {/* TOP BAR */}
      <div className="gp-headerr">
        <button className="back-btnn" onClick={()=>navigate(-1)}>&lt;</button>
      </div>

      {/* IMAGE SECTION */}
      <div className="gp-image-wrapperr">
        <img
          src={stadium}
          alt="Football groundd"
          className="gp-imagee"
        />
        <div className="gp-image-overlayy">
          <span className="gp-image-counterr">1/3</span>
          <span className="gp-pricee">$30</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="gp-contentt">
        {/* Tag + location row */}
        <div>
          <span className="gp-tagg">Football</span>
          
          <div className="gp-location-ratingg" style={{marginTop:30}}>
            <span className="gp-location-dott"><FaLocationDot size={18}/></span>
            <span className="gp-location-textt">Central park</span>
            <span className="gp-starr">⭐</span>
            <span className="gp-ratingg">4.2</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="gp-titlee">Wonder fun grounds</h2>

        {/* Description */}
        <div className="gp-sectionn">
          <h3 className="gp-section-titlee">Description</h3>
          <p className="gp-descriptionn">
            Connect with your inner child and revisit emotional moments that
            still echo in your adult life. This reading is loving, gentle, and
            nurturing. It helps restore your sense of joy, creativity, and
            innocence by identifying emotional gaps or abandonment patterns.
            Ideal for emotional trauma recovery or simply reconnecting with your
            playful, authentic self.
          </p>
        </div>
      </div>
      <GroundFacilities/>
        <Gallery/>
 {/* BOTTOM FIXED BUTTON */}
      <div className="gp-footerrr">
        
        <a href="./BookingGround" className="gp-buy-btnnm" style={{display:"block",textAlign:"center"}}>Book now</a>
      </div>

    </div>
  );
};

export default GroundDetails;
