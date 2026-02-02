import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AdminSignup.css";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send OTP
  const sendOtp = async () => {
    if (!form.name || !form.email || !form.phone) {
      return setError("All fields are required");
    }
    if (!nameRegex.test(form.name)) {
      return setError("Name should contain only letters");
    }
    if (!emailRegex.test(form.email)) {
      return setError("Invalid email format");
    }
    if (!phoneRegex.test(form.phone)) {
      return setError("Invalid phone number");
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/admin/send-otp/", {
        phone: form.phone
      });
      setOtpSent(true);
      setError("");
    } catch {
      setError("OTP sending failed");
    }
  };

  // Verify OTP + Create Account
  const verifyOtp = async () => {
    if (!form.otp) return setError("Enter OTP");
    if (!form.password || !form.confirmPassword) {
      return setError("Password fields are required");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
    await axios.post("http://127.0.0.1:8000/api/admin/verify-otp/", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          otp: form.otp,
          password: form.password
      });


      navigate("/AdminLogin"); // 👉 AdminLogin.jsx
    } catch {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="admin-signup-wrapper">
      <div className="admin-signup">
        <h2>Admin Signup</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        {!otpSent ? (
          <button onClick={sendOtp}>Send OTP</button>
        ) : (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
            />

            {/* Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }>
                {showConfirmPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button onClick={verifyOtp}>Create Account</button>
          </>
        )}

        {/* 🔗 Login Redirect */}
         <p className="login-link">
              Already have an account?
           <Link to="AdminLogin"> Login</Link>
          </p>

      </div>
    </div>
  );
};

export default AdminSignup;
