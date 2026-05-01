import React from 'react';
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.webp';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div>
            <img src={logo} alt="ZAOGA FIF" className="site-footer-logo" />
            <h3 className="serif site-footer-brand-title">ZAOGA FIF</h3>
            <p className="site-footer-region-text">
              Bestlea Region | Westgate Province
            </p>
            <p className="site-footer-description">
              Forward In Faith Ministries International. Empowering lives through faith, fellowship, and service.
            </p>
            <div className="site-footer-socials">
              <Globe size={20} className="site-footer-social-icon" />
              <Share2 size={20} className="site-footer-social-icon" />
              <MessageCircle size={20} className="site-footer-social-icon" />
            </div>
          </div>

          <div>
            <h4 className="site-footer-section-title">Quick Links</h4>
            <ul className="site-footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/register">Connect & Grow</a></li>
              <li><a href="/give">Online Giving</a></li>
              <li>About Us</li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer-section-title">Contact Info</h4>
            <ul className="site-footer-list">
              <li className="site-footer-contact-item">
                <MapPin size={18} className="site-footer-accent-icon" />
                <span>ZAOGA FIF WESTLEA CHURCH 8336 187th ST Westlea Harare</span>
              </li>
              <li className="site-footer-contact-item">
                <Phone size={18} className="site-footer-accent-icon" />
                <span>+263 770 000 000</span>
              </li>
              <li className="site-footer-contact-item">
                <Mail size={18} className="site-footer-accent-icon" />
                <span>info@christiancentre.org.zw</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="site-footer-copyright">
          &copy; {new Date().getFullYear()} ZAOGA FIF - Bestlea Region, Westgate Province. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
