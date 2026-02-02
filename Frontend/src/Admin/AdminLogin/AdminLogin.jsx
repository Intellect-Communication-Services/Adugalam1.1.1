import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError("Email / Phone and Password are required");
      return;
    }

    let payload = { password };

    if (emailRegex.test(identifier)) {
      payload.email = identifier;
    } else if (phoneRegex.test(identifier)) {
      payload.phone = identifier;
    } else {
      setError("Enter valid Email or Phone number");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/admin/login/", payload);

      setError("");
      alert("Login success");

      navigate("/Dashboard");   // ✅ CORRECT

    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login">
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Enter Email or Phone Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="signup-link">
          Don’t have an account?
          <Link to="/admin/signup"> Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
