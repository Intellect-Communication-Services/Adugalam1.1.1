import React from 'react'
import "./Categories.css"
import { useNavigate } from 'react-router-dom';

const Categories = () => {


const navigate=useNavigate();


  const categories = [
  {
    id: 1,
    name: "Football",
    icon: "/Football.png",
  },
  {
    id: 2,
    name: "Tennis",
    icon: "/Tennis.png",
  },
  {
    id: 3,
    name: "Swimming",
    icon: "/Swimming.png",
  },
  {
    id: 4,
    name: "Volleyball",
    icon: "/VolleyBall.png",
  },
  {
    id: 5,
    name: "Cricket",
    icon: "/cricket.png",
  },
  {
    id: 6,
    name: "Badminton",
    icon: "/Badminton.png",
  },
//   {
//     id: 7,
//     name: "Football",
//     icon: "/icons/football.png",
//   },
//   {
//     id: 8,
//     name: "Tennis",
//     icon: "/icons/tennis.png",
//   },
//   {
//     id: 9,
//     name: "Basketball",
//     icon: "/icons/basketball.png",
//   },
//   {
//     id: 10,
//     name: "Volleyball",
//     icon: "/icons/volleyball.png",
//   },
//   {
//     id: 11,
//     name: "Cricket",
//     icon: "/icons/cricket.png",
//   },
//   {
//     id: 12,
//     name: "Badminton",
//     icon: "/icons/badminton.png",
//   },
];

  return (
    <div className="categories-containerr">
      
      <div className="category-headerr">
        <h3>Categories</h3>
        <button className="view-all-btnn" onClick={()=>navigate("/allcategories")}>View all</button>
      </div>

      <div className="category-listt">
        {categories.map((cat) => (
          <div key={cat.id} className="category-itemm" onClick={()=>navigate("/bookhome")}>
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Categories