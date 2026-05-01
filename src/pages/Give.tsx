import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Turnstile } from '@marsidev/react-turnstile';
import { CreditCard, DollarSign, Smartphone, ShieldCheck, Heart, Info, ArrowRight, User } from 'lucide-react';
import { apiRequest } from '../lib/api';
import './Give.css';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

const Give: React.FC = () => {
  const [amount, setAmount] = useState('10');
  const [selectedCategory, setSelectedCategory] = useState('offering');
  const [paynowLink, setPaynowLink] = useState('https://www.paynow.co.zw/thcp');
  const [reference, setReference] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const donationTypes = [
    { id: 'offering', label: 'Offerings', icon: <DollarSign size={18} /> },
    { id: 'tithe', label: 'Tithe', icon: <DollarSign size={18} /> },
    { id: 'missions', label: 'Missions', icon: <Heart size={18} /> },
    { id: 'cell', label: 'Cell Groups', icon: <User size={18} /> },
    { id: 'alms', label: 'Alms', icon: <Heart size={18} /> },
    { id: 'building', label: 'Building Fund', icon: <Heart size={18} /> },
  ];

  const paymentMethods = ['EcoCash', 'Telecash', 'OneMoney', 'Bank Transfer', 'Visa Card'];

  const createDonationIntent = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiRequest<{ reference: string; paynowLink: string }>('/api/donations/intent', {
        method: 'POST',
        body: {
          amount: Number(amount),
          category: selectedCategory,
          captchaToken,
          website,
        },
      });
      setReference(response.reference);
      setPaynowLink(response.paynowLink);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not initialize donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="give-page section">
      <div className="container">
        <div className="give-hero">
          <h2 className="serif give-title">Support the Mission</h2>
          <p className="give-subtitle">
            "Each of you should give what you have decided in your heart to give." — 2 Corinthians 9:7
          </p>
        </div>

        <div className="give-grid">
          {/* Left Column: Giving Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass glass-card"
          >
            <h3 className="serif give-card-title">
              <CreditCard className="give-accent-icon" /> Online Giving
            </h3>

            <div className="form-group">
              <fieldset className="give-category-fieldset">
                <legend className="give-field-label">Select Category</legend>
                <div className="category-grid">
                  {donationTypes.map(type => (
                    <button
                      key={type.id}
                      className={`category-btn ${selectedCategory === type.id ? 'category-btn--active' : 'btn-outline'}`}
                      onClick={() => setSelectedCategory(type.id)}
                      type="button"
                      aria-pressed={selectedCategory === type.id}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="form-group give-amount-group">
              <label htmlFor="give-amount">Amount (USD)</label>
              <div className="give-amount-wrapper">
                <span className="give-currency-symbol" aria-hidden="true">$</span>
                <input
                  id="give-amount"
                  type="number"
                  className="form-control give-amount-input"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min="1"
                  aria-label="Donation amount in USD"
                  title="Donation amount in USD"
                />
              </div>
            </div>

            <div className="form-group">
              <p className="give-methods-label">Supported Payment Methods</p>
              <div className="payment-methods-list">
                {paymentMethods.map(method => (
                  <span key={method} className="payment-badge">{method}</span>
                ))}
              </div>
            </div>

            <a
              href={paynowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary give-cta"
            >
              Continue to Paynow <ArrowRight size={18} />
            </a>

            <div className="form-group give-captcha-group">
              <label className="give-methods-label">Anti-spam verification</label>
              {turnstileSiteKey ? (
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={token => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken('')}
                />
              ) : (
                <p className="give-help-text">
                  Add <code>VITE_TURNSTILE_SITE_KEY</code> to your <code>.env</code> to enable Turnstile.
                </p>
              )}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="give-honeypot"
                aria-hidden="true"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
              <button type="button" className="btn-outline give-intent-btn" onClick={createDonationIntent} disabled={loading}>
                {loading ? 'Preparing...' : 'Generate Donation Reference'}
              </button>
              {reference ? <p className="give-reference-text">Reference: {reference}</p> : null}
              {error ? <p className="give-error-text">{error}</p> : null}
            </div>

            <div className="give-security-note">
              <p className="give-security-text">
                <ShieldCheck size={16} className="give-accent-icon" /> Secure transactions via Paynow Zimbabwe.
              </p>
            </div>
          </motion.div>

          {/* Right Column: QR Code Scanning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass glass-card give-qr-card"
          >
            <Smartphone size={40} className="give-qr-icon give-accent-icon" />
            <h3 className="serif give-qr-title">Scan to Give</h3>
            <p className="give-qr-desc">
              Open your banking app or Paynow scanner to contribute via mobile.
            </p>

            <div className="give-qr-wrapper">
              <QRCodeSVG value={paynowLink} size={250} level="H" />
            </div>

            <div className="give-scan-label-wrapper">
              <div className="scan-badge">SCAN</div>
              <p className="give-paynow-url">{paynowLink}</p>
            </div>

            <div className="give-notice">
              <Info size={30} className="give-notice-icon give-accent-icon" />
              <div>
                <h4 className="give-notice-title">Notice</h4>
                <p className="give-notice-text">
                  For EcoCash, OneMoney or Telecash, follow the prompts on the Paynow secure page after scanning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Give;
