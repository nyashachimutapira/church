import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { apiRequest } from "../lib/api";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest<{ token: string; role: string; email: string; fullName: string }>("/api/member/login", {
        method: "POST",
        body: { email, password },
      });

      // Save token and info
      localStorage.setItem("memberToken", result.token);
      localStorage.setItem("memberEmail", result.email);
      if (result.fullName) {
        localStorage.setItem("memberName", result.fullName);
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section login-page">
      <div className="container login-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass glass-card login-card">
          <div className="login-header">
            <h2 className="serif login-title">Member Login</h2>
            <p className="login-subtitle">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="login-label">
                <Mail size={14} className="login-label-icon" /> Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="login-label">
                <Lock size={14} className="login-label-icon" /> Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn-primary login-submit-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"} <LogIn size={18} />
            </button>
            
            <p className="login-footer-text">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
