import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 1️⃣ Send OTP
  const sendOtp = async () => {
    try {
      await API.post("api/send-otp/", { mobile });
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send OTP");
    }
  };

  // 2️⃣ Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await API.post("api/verify-otp/", { mobile, otp });
      setOtpToken(res.data.otp_token);
      setStep(3);
    } catch {
      setError("Invalid OTP");
    }
  };

  // 3️⃣ Reset Password
  const resetPassword = async () => {
    try {
      await API.post("api/reset-password/", {
        mobile,
        password,
        otp_token: otpToken,
      });

      alert("Password reset successful ✅");
      navigate("/login");
    } catch {
      setError("Password reset failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>
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
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
