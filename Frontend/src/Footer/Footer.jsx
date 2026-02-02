import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaHome } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      
      <div className="footer-promo">
        <div className="promo-text">
          <h2>Play All Matches & Book Your Ground !</h2>
          <p>Your perfect sports spot is just one click away !!!</p>

          <div className="app-buttons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="App Store" />
            
            
          </div>
        </div>

        <div className="promo-image">
          <img src="/player1.png" alt="Healthy app" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <img src="/Adugalam_Logo (1).png" alt="logo image" />
          <p>©2025 All rights.Intellect Communication Services.</p>
          <p>Terms of Service | Privacy Policy</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Features</h4>
            <p>Book & Play</p>
            <p>List Your Venue</p>
            <p>Train Yourself</p>
            <p>Request access</p>
           
          </div>

          <div>
            <h4>About us</h4>
            <p>Who We are</p>
           <p>What We do</p>
            <p>Features</p>
            <p>Careers</p>
             <p>Contact us</p>
          </div>

          <div>
            <h4>Resources</h4>
            <p>Help center</p>
            <p>Refund</p>
            <p>Cancellation</p>
            <p>Blog</p>
          </div>

          <div>
            <h4>Get in touch</h4>
            <p>Questions or feedback?</p>
            

            <div className="social-icons">
             <FaFacebook size={30} color="blue" />
      <FaTwitter size={30} color="skyblue" />
      <FaHome size={30} color="green" />
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
