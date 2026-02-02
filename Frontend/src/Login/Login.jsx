import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 redirect back if user tried protected page
  const redirectPath = location.state?.from || "/";

  const handleLogin = async () => {
    if (!mobile || !password) {
      setError("Mobile and Password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("api/login/", {
        mobile,
        password,
      });

      // ✅ SAVE TOKEN (ONLY AUTH SOURCE)
      localStorage.setItem("token", res.data.token);

      // 🔔 Sync Navbar + ProtectedRoute
      window.dispatchEvent(new Event("authChange"));

      // ✅ Redirect (previous page or home)
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
<p>
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

      <p>
        No account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
  