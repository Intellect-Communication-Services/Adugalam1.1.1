import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState(""); // ✅ NEW
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    try {
      await API.post("api/send-otp/", { mobile });
      setStep(2);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "OTP send failed");
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    try {
      const res = await API.post("api/verify-otp/", { mobile, otp });

      // ✅ SAVE OTP TOKEN FROM BACKEND
      setOtpToken(res.data.otp_token);

      setStep(3);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "OTP invalid");
    }
  };

  // ---------------- CREATE ACCOUNT ----------------
  const createAccount = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("api/signup/", {
        mobile,
        password,
        otp_token: otpToken, // ✅ IMPORTANT
      });

      alert("Account created ✅");
      navigate("login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      {error && <p className="error-text">{error}</p>}

      {step === 1 && (
        <>
          <input
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={createAccount}>Create Account</button>
        </>
      )}

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
