import React from 'react'
import { useNavigate } from "react-router-dom";   
import { FaArrowLeft } from "react-icons/fa";
import "./Terms.css"

const Terms = () => {
    const navigate = useNavigate();

  return (
    <div className="Terms-page">
      <div className="Terms-card">
        {/* Header */}
        <div className="Terms-header">
          <span>
               <button className="back-btn" onClick={() => navigate(-1)}><FaArrowLeft /></button>
          </span>
         
          <h2>Terms & Conditions</h2>
        </div>

        {/* Content */}
        <div className="Terms-content">
          <h3>1. Types of data we collect</h3>
          <p>
            Duis tristique diam nunc. Sed at tincidunt orci. Mauris
            egestas congue leo, cras erat at vitae convallis.
            Duis semper magna nec tortor tincidunt, id tincidunt
            quam blandit. Vivamus vehicula dictum magna quis
            eleifend. Fusce ac odio ac nibh tempus euismod.
          </p>

          <h3>2. Use of your personal data</h3>
          <p>
            Sed sollicitudin nisi mollis libero consectetur rutrum.
            Nam maximus mollis nisl quis facilisis. Integer
            fermentum commodo nibh. Ut mollis tincidunt
            hendrerit. Duis ipsum velit, maximus sed commodo
            imperdiet, dapibus id velit.
          </p>

          <h3>3. Disclosure of your personal data</h3>
          <p>
            Sed sollicitudin nisi mollis libero consectetur rutrum.
            Nam maximus mollis nisl quis facilisis. Integer
            fermentum commodo nibh. Ut mollis tincidunt
            hendrerit. Duis ipsum velit, maximus sed commodo
            imperdiet, dapibus id velit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms