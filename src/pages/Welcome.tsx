import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Coffee, Users, ArrowRight, Sun, Heart } from 'lucide-react';
import './Welcome.css';

const Welcome: React.FC = () => {
  const steps = [
    {
      icon: <Clock size={32} className="welcome-accent-icon" />,
      title: "Service Times",
      text: "Our main service starts at 9:00 AM every Sunday. We recommend arriving 15 minutes early to find a good seat and settle in."
    },
    {
      icon: <Users size={32} className="welcome-accent-icon" />,
      title: "Kids & Youth",
      text: "We have vibrant programs for children and teenagers. Our stewards will guide you to the appropriate classrooms upon arrival."
    },
    {
      icon: <Coffee size={32} className="welcome-accent-icon" />,
      title: "Fellowship",
      text: "Join us for a cup of tea and fellowship immediately after the service. We would love to get to know you better!"
    },
    {
      icon: <MapPin size={32} className="welcome-accent-icon" />,
      title: "Parking",
      text: "Secure parking is available within the church premises. Our security team will assist you with parking and directions."
    }
  ];

  return (
    <div className="section welcome-page">
      <div className="container">
        {/* Hero Welcome */}
        <div className="welcome-hero">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="welcome-guide-badge">
              VISITOR'S GUIDE
            </div>
            <h1 className="serif welcome-title">Welcome to Your <br /><span className="welcome-title-highlight">Spiritual Home</span></h1>
            <p className="welcome-subtitle">
              We know that visiting a new church can be intimidating. We've prepared this guide to help you feel comfortable and excited about your first visit to ZAOGA FIF Bestlea Region.
            </p>
            <div className="welcome-hero-actions">
              <Link to="/register" className="btn-primary">
                I'm Planning to Visit <Heart size={18} />
              </Link>
              <a href="#guide" className="btn-outline">Tell Me More</a>
            </div>
          </motion.div>

          <div className="welcome-hero-image-wrap">
             <div className="glass welcome-hero-image-card">
                <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800" alt="Welcome" className="welcome-hero-image" />
             </div>
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="welcome-floating-note">
                <Sun size={24} className="welcome-sun-icon" />
                <p className="welcome-floating-note-title">Next Sunday, 9AM</p>
                <p className="welcome-floating-note-text">See you there!</p>
             </motion.div>
          </div>
        </div>

        {/* The Guide Section */}
        <div id="guide" className="welcome-guide-header">
           <h2 className="serif welcome-guide-title">What to Expect</h2>
        </div>

        <div className="welcome-steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass glass-card"
            >
              <div className="welcome-step-icon">{step.icon}</div>
              <h3 className="serif welcome-step-title">{step.title}</h3>
              <p className="welcome-step-text">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass welcome-final-cta">
           <h2 className="serif welcome-final-cta-title">We're saving a seat for you!</h2>
           <p className="welcome-final-cta-text">
             Whether you're exploring faith for the first time or looking for a new church family, we can't wait to meet you.
           </p>
           <Link to="/register" className="btn-primary">
             Register Your Attendance <ArrowRight size={18} />
           </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
