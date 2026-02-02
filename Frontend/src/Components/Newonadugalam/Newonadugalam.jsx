import React, { useState } from 'react';
import "./Newonadugalam.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcRating } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Newonadugalam = () => {

const navigate=useNavigate();


  const [viewAll, setViewAll] = useState(false);

  const popularGrounds = [
    { id: 1,category:"Football",img: "/gr (1).png",title: "Hover ground", location: "Fairfield", icons: ["⚽", "🏏", "🏀"] },
    { id: 2,category:"Football",  img: "/gr (2).png", title: "Sport ground", location: "Bangalore", icons: ["🏸", "🎾", "🏐"] },
    { id: 3,category:"Football",  img: "/gr (3).png", title: "Futsal ground", location: "Fairfield", icons: ["⚽", "🥅", "🏃"] },
    { id: 4,category:"Football",  img: "/gr (4).png", title: "Unique blend", location: "Vietnam", icons: ["⚽", "🏏", "🥅"] },
    { id: 5,category:"Football",  img: "/gr (1).png", title: "New ground 1", location: "Delhi", icons: ["⚽", "🏏", "🏀"] },
    { id: 6,category:"Football",  img: "/gr (2).png", title: "New ground 2", location: "Mumbai", icons: ["🏸", "🎾", "🏐"] },
    { id: 7,category:"Football",  img: "/gr (3).png", title: "New ground 3", location: "Chennai", icons: ["⚽", "🥅", "🏃"] },
    { id: 8,category:"Football",  img: "/gr (4).png", title: "New ground 4", location: "Kolkata", icons: ["⚽", "🏏", "🥅"] },
  ];

  return (
    <div className="pg-section1">
      <div className="pg-header1">
        <h3>New On Adugalam</h3>
        <span className="view-all1" onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "Show less" : "View all"}
        </span>
      </div>

      {/* Same container, layout changes based on viewAll */}
      <div className={`pg-container1 ${viewAll ? "grid-view1" : ""}`}>
        {popularGrounds.map(item => (
         <div className="pg-card1" onClick={()=>navigate("/book")}>
  <div className="pg-img-wrapper">
    <img src={item.img} className="pg-img1" alt={item.title} />
  </div>

  <h4>{item.title}</h4>
  <button className='cat'>{item.category}</button>

  <div className="loc1">
    <FaMapMarkerAlt size={12} /> {item.location}
  </div>

  <div className="icons1">
    {item.icons.map((i, idx) => (
      <span key={idx}>{i}</span>
    ))}
  </div>
</div>

        ))}
      </div>
    </div>





  );
};

export default Newonadugalam;
