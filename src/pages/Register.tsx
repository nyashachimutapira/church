import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Heart, Send, CheckCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { apiRequest } from "../lib/api";
import "./Register.css";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  address: string;
  dob: string;
  source: "friends" | "social" | "website" | "billboard" | "other";
  interests: string[];
  captchaToken: string;
  website: string;
};

const interestOptions = ["Small Groups", "Youth Ministry", "Worship Team", "Volunteer Work", "Missions"];
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const Register: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    dob: "",
    source: "social",
    interests: [],
    captchaToken: "",
    website: "",
  });

  const setField = <K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);

    try {
      const { confirmPassword, ...payload } = formData;
      await apiRequest<{ message: string }>("/api/register", {
        method: "POST",
        body: payload,
      });
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not submit registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  if (submitted) {
    return (
      <div className="section register-success-section">
        <div className="container register-success-container">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <CheckCircle size={80} className="register-accent-icon register-success-icon" />
            <h2 className="serif register-success-title">Welcome to the Family!</h2>
            <p className="register-success-text">
              Thank you for registering, {formData.fullName.split(" ")[0]}. We are excited to have you join us.
              A member of our team will be in touch with you shortly.
            </p>
            <button className="btn-primary" type="button" onClick={() => (window.location.href = "/")}>
              Return Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section register-page">
      <div className="container register-container">
        <div className="register-header">
          <h2 className="serif register-title">Connect &amp; Grow</h2>
          <p className="register-subtitle">Fill in the details below to join our community.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass glass-card">
          <form onSubmit={handleSubmit}>
            <div className="register-form-grid">
              <div className="form-group">
                <label htmlFor="full-name" className="register-label">
                  <User size={14} className="register-label-icon" /> Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email-address" className="register-label">
                  <Mail size={14} className="register-label-icon" /> Email Address
                </label>
                <input
                  id="email-address"
                  type="email"
                  className="form-control"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </div>
            </div>

            <div className="register-form-grid">
              <div className="form-group">
                <label htmlFor="phone-number" className="register-label">
                  <Phone size={14} className="register-label-icon" /> Phone Number
                </label>
                <input
                  id="phone-number"
                  type="tel"
                  className="form-control"
                  placeholder="+263..."
                  required
                  value={formData.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date-of-birth" className="register-label">
                  <Calendar size={14} className="register-label-icon" /> Date of Birth
                </label>
                <input
                  id="date-of-birth"
                  type="date"
                  className="form-control"
                  value={formData.dob}
                  onChange={(e) => setField("dob", e.target.value)}
                />
              </div>
            </div>

            <div className="register-form-grid">
              <div className="form-group">
                <label htmlFor="password" className="register-label">
                  Create Password (Optional)
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Set password for your account"
                  value={formData.password}
                  onChange={(e) => setField("password", e.target.value)}
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="register-label">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  minLength={8}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="residential-address" className="register-label">
                <MapPin size={14} className="register-label-icon" /> Residential Address
              </label>
              <textarea
                id="residential-address"
                className="form-control"
                rows={3}
                placeholder="Street name, Suburb, City"
                value={formData.address}
                onChange={(e) => setField("address", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="how-you-heard">How did you hear about us?</label>
              <select
                id="how-you-heard"
                className="form-control"
                value={formData.source}
                onChange={(e) => setField("source", e.target.value as RegisterForm["source"])}
              >
                <option value="friends">Friend or Family</option>
                <option value="social">Social Media</option>
                <option value="website">Website</option>
                <option value="billboard">Billboard</option>
                <option value="other">Other</option>
              </select>
            </div>

            <fieldset className="register-interest-fieldset form-group">
              <legend className="register-label">
                <Heart size={14} className="register-label-icon" /> I am interested in:
              </legend>
              <div className="register-interest-grid">
                {interestOptions.map((item) => (
                  <label key={item} className="register-checkbox-label" htmlFor={`interest-${item}`}>
                    <input
                      id={`interest-${item}`}
                      type="checkbox"
                      className="register-checkbox-input"
                      checked={formData.interests.includes(item)}
                      onChange={() => handleInterestChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-group">
              <label className="register-label">Anti-spam verification</label>
              {turnstileSiteKey ? (
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={(token) => setField("captchaToken", token)}
                  onExpire={() => setField("captchaToken", "")}
                />
              ) : (
                <p className="register-help-text">
                  Add `VITE_TURNSTILE_SITE_KEY` to your `.env` to enable Turnstile on this form.
                </p>
              )}
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="register-honeypot"
              aria-hidden="true"
              value={formData.website}
              onChange={(e) => setField("website", e.target.value)}
            />

            {error ? <p className="register-error">{error}</p> : null}

            <div className="register-submit-row">
              <button type="submit" className="btn-primary register-submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Join the Community"} <Send size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
