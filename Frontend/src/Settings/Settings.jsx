import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import {
  FaHeart,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔥 DELETE ACCOUNT FUNCTION
  const handleDeleteAccount = () => {
    // ❌ Remove user data
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // 🔄 Update navbar immediately
    window.dispatchEvent(new Event("authChange"));

    // Close modal
    setShowConfirm(false);

    // Optional confirmation
    alert("Your account has been permanently deleted ");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="Settings-Page">
      <h2 className="Setting-heading">Settings</h2>

      <div className="Setting-List">
        <div
          className="Setting-items"
          onClick={() => navigate("/ChangePassword")}
        >
          <FaHeart />
          <span>Change Password</span>
          <FaChevronRight />
        </div>

        <div
          className="Setting-items"
          onClick={() => navigate("/Privacy")}
        >
          <FaHeart />
          <span>Privacy & Policy</span>
          <FaChevronRight />
        </div>

        <div
          className="Setting-items"
          onClick={() => navigate("/Terms")}
        >
          <FaHeart />
          <span>Terms & Conditions</span>
          <FaChevronRight />
        </div>

        {/* DELETE ACCOUNT */}
        <div
          className="Setting-items danger"
          onClick={() => setShowConfirm(true)}
        >
          <FaHeart />
          <span>Delete Account</span>
          <FaChevronRight />
        </div>
      </div>

      {/* CONFIRMATION POPUP */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <FaTrash />
            </div>

            <p className="modal-text">
              Are you sure you want to <br />
              <strong>delete your account permanently?</strong>
            </p>

            <div className="modal-actions">
              <button
                className="btn-no"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>

              <button
                className="btn-yes"
                onClick={handleDeleteAccount}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
