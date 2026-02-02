import { useState } from "react";
import "./Galarypage.css";

// Import images from assets
import img1 from "../assets/image1.webp";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";

function Galarypage() {
  const images = [img1, img2, img3, img4, img5];

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const goBack = () => {
    if (selectedImage) {
      closeImage();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="all">
      <h2 className="title">Gallery</h2>

      <div className="gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`gallery-${index}`}
            onClick={() => openImage(img)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={closeImage}>&times;</span>
          <img className="modal-content1" src={selectedImage} alt="full-view" />
        </div>
      )}

      {/* Back Button */}
      <button className="back-btn1" onClick={goBack}>⬅ Back</button>
    </div>
  );
}

export default Galarypage;
