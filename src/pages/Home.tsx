import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowRight, Camera, Share2, MessageCircle, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './Home.css';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container home-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="home-hero-title">
              Let Dry Bones <br />
              <span className="home-hero-highlight">Live Again</span>
            </h1>
            <p className="home-hero-subtitle">
              Welcome to ZAOGA FIF Bestlea Region. Whether you're new or a long-time member, 
              we're glad you're here. Let's build a stronger faith community.
            </p>
            <div className="home-hero-actions">
              <Link to="/register" className="btn-primary">
                Join our Family <UserPlus size={20} />
              </Link>
              <Link to="/give" className="btn-outline">
                Support the Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QR Cards Section - Inspired by the User's Image */}
      <section className="section home-qr-section">
        <div className="container">
          <div className="home-qr-header">
            <h2 className="home-section-title">Get Connected Instantly</h2>
            <p className="home-section-subtitle">Scan the codes below to register or give online</p>
          </div>

          <motion.div 
            className="qr-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Card 1: Member Registration */}
            <motion.div variants={itemVariants} className="glass glass-card home-qr-card">
              <div className="home-qr-card-top home-qr-card-top-register">
                <div className="home-qr-code-wrap">
                  <QRCodeSVG value={window.location.origin + '/register'} size={150} />
                </div>
                <div>
                  <h3 className="serif home-qr-card-title home-qr-card-title-register">
                    Church <br />
                    <span className="home-qr-card-register-highlight">Connect</span> <br />
                    & Grow!
                  </h3>
                </div>
              </div>
              <div className="home-qr-card-bottom">
                <span className="home-qr-card-caption">Member Registration Platform</span>
                <Link to="/register" className="home-inline-link">
                   Go to form <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Giving Details */}
            <motion.div variants={itemVariants} className="glass glass-card home-qr-card">
              <div className="home-qr-card-top home-qr-card-top-give">
                <div className="home-qr-code-wrap home-qr-code-wrap-shadow">
                  <QRCodeSVG value="https://www.paynow.co.zw/thcp" size={150} />
                </div>
                <div>
                  <h3 className="serif home-qr-card-title home-qr-card-title-give">
                    Giving Details
                  </h3>
                  <div className="home-qr-give-meta">
                    <div className="home-qr-scan-badge">SCAN</div>
                    <span className="home-qr-give-url">https://www.paynow.co.zw/thcp</span>
                  </div>
                </div>
              </div>
              <div className="home-qr-card-bottom">
                <span className="home-qr-card-caption">Online Giving Example</span>
                <Link to="/give" className="home-inline-link">
                   Give Online <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="section">
        <div className="container">
          <div className="home-social-header">
            <div>
              <h2 className="serif home-section-title">Social Media Hub</h2>
              <p className="home-section-subtitle">Stay updated with our latest posts and stories.</p>
            </div>
            <div className="home-social-icons">
               <Globe size={20} className="home-accent-icon" />
               <Share2 size={20} />
            </div>
          </div>

          <div className="home-social-grid">
             {[1, 2, 3].map((post) => (
               <motion.div key={post} whileHover={{ y: -10 }} className="glass home-social-card">
                  <div className="home-social-card-image" />
                  <div className="home-social-card-body">
                     <div className="home-social-card-top">
                        <div className="home-social-account">
                           <Camera size={16} className="home-accent-icon" />
                           <span className="home-social-account-handle">@zaogafif_bestlea</span>
                        </div>
                        <MessageCircle size={16} className="home-muted-icon" />
                     </div>
                     <p className="home-social-card-text">
                        What a powerful service we had this Sunday! The word was life-changing. #ZAOGAFIF #Bestlea #Faith
                     </p>
                     <span className="home-social-card-time">2 hours ago</span>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
