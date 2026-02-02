import React from "react";
import "./tvl.css";
import heart from "../assets/heart.gif";

const Tvl = ({ onHit }) => {
  return (
    <div className="tvl-wrapper">
      {/* LEFT */}
      <div className="tvl-left">
        <p className="hashtag">#iLoveAdugalam</p>
        <h1 className="Play1">Play</h1>
        <p className="like-pro">like a Pro with</p>
        <h1 className="adugalam">Adugalam</h1>
      </div>

      {/* RIGHT */}
      <div className="tvl-right">
        <p className="hit-me">Hit me!</p>
        <img
          src={heart}
          alt="Heart"
          className="heart-img"
          onClick={onHit}   // ⭐ SAME PAGE SWITCH
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Tvl;
