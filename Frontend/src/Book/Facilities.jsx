import React from "react";
import "./Facilities.css";

const grounds = [
  {
    id: 1,
    name: "Main",
    min: "Min. 3 hour",
    img: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg",
  },
  {
    id: 2,
    name: "Tenis",
    min: "Min. 1 hour",
    img: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
  },
  {
    id: 3,
    name: "Futsal",
    min: "Min. 2 hour",
    img: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg",
  },
];

const facilities = [
  { id: 1, icon: "P", label: "Parking" },
  { id: 2, icon: "📷", label: "Camera" },
  { id: 3, icon: "🏠", label: "Waiting room" },
  { id: 4, icon: "🧥", label: "Changing room" },
];

const features=[
  { id:1, label:"Hiring Partners"},
  {id:2, label:"Miniature Field"},
  {id:3, label:"Grass Pitch"},
  {id:4,label:"Outdoor/Indoor"}
]


const GroundFacilities = () => {
  return (
    <div className="gf-wrapper">
      {/* Ground list */}
      <div className="gf-section">
          <h3 className="gp-section-title1">Ground List</h3>
        <div className="gf-card-row">
          {grounds.map((g) => (
            <div className="gf-ground-card" key={g.id}>
              <img src={g.img} alt={g.name} className="gf-ground-img" />
              <div className="gf-ground-text">
                <span className="gf-ground-name">{g.name}</span>
                <span className="gf-ground-min">{g.min}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="gf-section">
          <h3 className="gp-section-title2">Facilities</h3>
        <div className="gf-chip-row">
          {facilities.map((f) => (
            <div className="gf-chip" key={f.id}>
              <span className="gf-chip-icon">{f.icon}</span>
              <span className="gf-chip-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>





      <div className="gf-section">
          <h3 className="gp-section-title3">Our Popular Features</h3>
        <div className="gf-chip-row">
          {features.map((f) => (
            <div className="gf-chip1" key={f.id}>
              <span className="gf-chip-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>





    </div>
  );
};

export default GroundFacilities;
