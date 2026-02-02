import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <div className="myprofile-page">
      {/* Header */}
      <div className="myprofile-header">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h3>My profile</h3>
        <button onClick={() => navigate("/EditProfile")}>
          <FaEdit />
        </button>
      </div>

      {/* Details */}
      <div className="myprofile-box">
        <label>First name</label>
        <div className="myprofile-field">{user.firstname}</div>

        {/* <label>Last name</label>
        <div className="myprofile-field">{user.lastname}</div> */}

        <label>Username</label>
        <div className="myprofile-field">{user.username}</div>

        <label>Email address</label>
        <div className="myprofile-field">{user.email}</div>

        <label>Phone number</label>
        <div className="myprofile-field">+91 {user.mobile}</div>
      </div>
    </div>
  );
};

export default MyProfile;
