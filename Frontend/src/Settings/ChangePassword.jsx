import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No user found. Please login again.");
      return;
    }

    //  Old password check
    if (oldPassword !== savedUser.password) {
      setError("Old password is incorrect");
      return;
    }

    //  New password validation
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    // Confirm password check
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    //  Update password
    const updatedUser = {
      ...savedUser,
      password: newPassword,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Force logout
    localStorage.removeItem("isAuthenticated");
    window.dispatchEvent(new Event("authChange"));

    setSuccess("Password changed successfully. Please login again.");

    // Redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="change-password-page">
      <form className="change-password-card" onSubmit={handleChangePassword}>
        <h2>Change Password</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <label>Old Password</label>
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError("");
          }}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
        />

        <button type="submit" className="change-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
