import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Summary.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Razorpay from "../assets/image copy 3.png";
import { useLocation } from "react-router-dom";

const Summary = () => {

  const location = useLocation();
const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);



useEffect(() => {
    if (location.state?.paymentId) {
      setShowPopup(true);
    }
  }, []);




  

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirmPayment = () => {
    setShowSuccess(true); // 🔥 show popup
  };


  const handlePayment = async () => {
  try {
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }),
    });

    const order = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Adugalam",
      description: "Ground Booking Payment",
      order_id: order.id,

      handler: function (response) {
        // ✅ SUCCESS
        navigate("/summary", {
          
          state: { paymentId: response.razorpay_payment_id },
          
        });
        setShowSuccess(true); 
      },

      handler: function (response) {
  console.log("Payment ID:", response.razorpay_payment_id);
  console.log("Order ID:", response.razorpay_order_id);
    setShowSuccess(true); 

},

      modal: {
        ondismiss: function () {
          // ✅ User clicked cancel → DO NOTHING
          console.log("User closed razorpay popup");
        },
      },

      prefill: {
        name: "Test User",
        email: "test@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#16a34a",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      // ❌ Only real failure

      console.log("Payment failed", response);
      
    });

    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Server error. Try again.");
  }
};





  return (
    <>
      <div className="summary-page">
        {/* Header */}
        <div className="summary-header">
          <button className="back-btnn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h2>Summary</h2>
        </div>

        {/* Booking Details */}
        <div className="summary-card">
          <div className="summary-row">
            <span>Name</span>
            <span>Dev Cooper</span>
          </div>
          <div className="summary-row">
            <span>Phone</span>
            <span>+91 9909999099</span>
          </div>
          <div className="summary-row">
            <span>Booking date</span>
            <span>Nov 8, 2025</span>
          </div>
          <div className="summary-row">
            <span>Booking time</span>
            <span>03:00 pm - 06:00 pm</span>
          </div>
          <div className="summary-row">
            <span>Ground</span>
            <span>Football</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <div className="method-left">
            <span className="step"><img src={Razorpay} alt="" /></span>
            <span>Razorpay</span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>

          <div className="summary-line">
            <span>Price</span>
            <span>₹2000</span>
          </div>
          <div className="summary-line">
            <span>Discount</span>
            <span className="discount">-₹200</span>
          </div>
          
          <hr />

          <div className="summary-line total">
            <span>Total payment amount</span>
            <span>₹2000</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="confirm-btn"  onClick={handlePayment}>
          Confirm Payment
        </button>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <FaCheck />
            </div>

            <h2>Payment successful</h2>
            <p>Payment confirmed. Your ground is now scheduled</p>

            <div className="success-actions">
              <button
                className="outline-btn"
                onClick={() => navigate("/mybooking")}
              >
                View my booking
              </button>

               <button
                className="outline-btn"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;