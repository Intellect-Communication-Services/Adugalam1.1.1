import React from "react";
import "./GalleryStrip.css";
import { useNavigate } from "react-router-dom";

const galleryImages = [
  "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg",
  "https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg",
  "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
  "https://images.pexels.com/photos/54123/pexels-photo-54123.jpeg",
  "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
  "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg",
  "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
  "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg",
];

const Gallery = () => {

const navigate=useNavigate();




  return (
    <div className="gs-wrapper">
      {/* Header row */}
      <div className="gs-header">
          <h3 className="gp-section-title4">Gallery</h3>
        <a className="gs-view-all" onClick={()=>navigate("/galary")}>View all</a>
      </div>

      {/* Image row */}
      <div className="gs-row">
        {galleryImages.map((src, idx) => (
          <div className="gs-item" key={idx}>
            <img src={src} alt={`gallery-${idx}`} className="gs-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
