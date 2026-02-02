import { useState } from "react";
import "./Nearby.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Nearby = () => {
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);

     const nearbyGrounds = [
  {
    id: 1,
    title: "Mayan’s Sky Turf",
    location: "Stc Road, NGO B Colony, Tirunelveli",
    distance: "8 KM",
    image:   "/mayan.jpeg",
  },
  {
    id: 2,
    title: "MMM Multi sports Arena",
    location: "V.M.CHATRAM, Tirunelveli",
    distance: "9 KM",
    image:  "/mmm.jpeg",
  },
  {
    id: 3,
    title: "Aaduthalam",
    location: "Krishnapuram, Tirunelveli",
    distance: "10 KM",
    image:  "/aduthalam.jpeg",
  },
  {
    id: 4,
    title: "Sportzverse",
    location: "Vasantha Nager, Tirunelveli",
    distance: "8 KM",
    image:   "/sportzverse.jpeg",
  },
  {
    id: 5,
    title: "MKM BADMINTON CLUB",
    location: "Tirunelveli",
    distance: "9 KM",
    image:  "/mkm.jpeg",
  },
  {
    id: 6,
    title: "mani&co BADMINTON CLUB",
    location: "Tirunelveli",
    distance: "10 KM",
    image:  "/mani.jpg",
  },
  {
    id: 7,
    title: "Annam indoor cricket",
    location: "Tirunelveli",
    distance: "8 KM",
    image:   "/annam.jpeg",
  },
  {
    id: 8,
    title: "Stadium with a lot of seats sky",
    location: "Agasean Institute",
    distance: "9 KM",
    image:  "/gr (1).png",
  },
  {
    id: 9,
    title: "Cricket world cup trophy generative",
    location: "Viet nam",
    distance: "10 KM",
    image:  "/gr (1).png",
  }
];

  return (
    <div className="nb-section1">
      <div className="nb-header1">
        <h3>Nearby you</h3>
        <span
          className="view-all1"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "Show less" : "View all"}
        </span>
      </div>

      <div className={`nb-container1 ${viewAll ? "grid-view1" : ""}`}>
        {nearbyGrounds.map((gr) => (
          <div
            className="nb-card1"
            key={gr.id}
            onClick={() => navigate("/book")}   // ✅ navigation added
          >
            <div className="img-wrapper1">
              <img src={gr.image} className="nb-img1" alt={gr.title} />
              <span className="distance1">{gr.distance}</span>
            </div>

            <h4>{gr.title}</h4>

            <div className="loc1">
              <FaMapMarkerAlt size={12} /> {gr.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nearby;
