import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { Menu, X, ShieldCheck, User } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMember(!!localStorage.getItem("memberToken"));
  }, [location.pathname]);

  return (
    <nav className="glass navbar-root">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand-link">
          <img src={logo} alt="ZAOGA FIF Logo" className="navbar-logo" />
          <span className="serif navbar-brand-text">
            ZAOGA FIF <br />
            <span className="navbar-brand-subtext">BESTLEA REGION | WESTGATE PROVINCE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/welcome" className="navbar-link">New Here?</Link>
          <Link to="/cell-groups" className="navbar-link">Cell Groups</Link>
          <Link to="/leadership" className="navbar-link">Leadership</Link>
          {isMember ? (
            <Link to="/dashboard" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <User size={16} /> Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Connect</Link>
            </>
          )}
          <Link to="/give" className="btn-primary navbar-give-btn">Give Now</Link>
          <Link to="/admin" className="navbar-admin-link" title="Admin Portal">
            <ShieldCheck size={18} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle navbar-mobile-toggle">
          {isOpen ? <X onClick={() => setIsOpen(false)} /> : <Menu onClick={() => setIsOpen(true)} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
