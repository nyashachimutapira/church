import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Phone, User, ArrowRight, X } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { apiRequest } from '../lib/api';
import './CellGroups.css';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

const CellGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({
    groupName: '',
    groupLeader: '',
    attendance: '',
    offering: '',
    meetingTime: '',
    notes: '',
    captchaToken: '',
    website: '',
  });
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const cellGroups = [
    { area: 'Charity Brooke 6128 Westlea', leader: 'Sister Linda', phone: '+263 771 111 222', time: 'Wednesday 19:00' },
    { area: 'Ebeneza 6182 Westlea', leader: 'Elder Mumbiro', phone: '+263 772 333 444', time: 'Wednesday 19:00' },
    { area: 'Joy 6394 Westlea', leader: 'Mrs Sibanda', phone: '+263 719 555 666', time: 'Wednesday 19:00' },
    { area: 'Bloomingdale', leader: 'Evangelist Gumbo', phone: '+263 774 777 888', time: 'Thursday 18:00' },
    { area: 'Area D / Westgate Mall', leader: 'Mrs. Kazembe', phone: '+263 783 999 000', time: 'Tuesday 17:00' },
    { area: 'Sandton', leader: 'Mr. Maphosa', phone: '+263 775 222 333', time: 'Wednesday 18:00' },
  ];

  const filteredGroups = cellGroups.filter(g =>
    g.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateFeedbackForm = (field: string, value: string) => {
    setFeedbackForm(prev => ({ ...prev, [field]: value }));
  };

  const openRegisterModal = (groupName: string, groupLeader: string, meetingTime: string) => {
    setFeedbackForm(prev => ({
      ...prev,
      groupName,
      groupLeader,
      meetingTime,
    }));
    setFeedbackError('');
    setFeedbackSuccess('');
    setIsRegisterModalOpen(true);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError('');
    setFeedbackSuccess('');
    setFeedbackLoading(true);

    try {
      await apiRequest<{ message: string }>('/api/cell-groups/feedback', {
        method: 'POST',
        body: feedbackForm,
      });
      setFeedbackSuccess('Thank you. Your cell group feedback has been submitted.');
      setFeedbackForm({
        groupName: '',
        groupLeader: '',
        attendance: '',
        offering: '',
        meetingTime: '',
        notes: '',
        captchaToken: '',
        website: '',
      });
      setIsRegisterModalOpen(false);
    } catch (requestError) {
      setFeedbackError(requestError instanceof Error ? requestError.message : 'Could not submit feedback.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="section cell-groups-page">
      <div className="container">
        <div className="cell-groups-header">
          <h2 className="serif cell-groups-title">Find Your Cell Group</h2>
          <p className="cell-groups-subtitle">
            We believe in fellowship beyond the Sunday service. Join a Cell Group near you in the Westgate Province.
          </p>
        </div>

        <div className="cell-groups-search-wrap">
          <Search size={24} className="cell-groups-search-icon" />
          <input
            type="text"
            placeholder="Search by area (e.g., Madokero, Sandton)..."
            className="form-control cell-groups-search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="cell-groups-grid">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass glass-card"
            >
              <div className="cell-group-card-top">
                <div className="cell-group-location-icon-wrap">
                  <MapPin size={24} className="cell-group-accent-icon" />
                </div>
                <div className="cell-group-time-pill">
                  {group.time}
                </div>
              </div>

              <h3 className="serif cell-group-title">{group.area}</h3>

              <div className="cell-group-details">
                <div className="cell-group-detail-item">
                  <User size={18} /> <span>{group.leader}</span>
                </div>
                <div className="cell-group-detail-item">
                  <Phone size={18} /> <span>{group.phone}</span>
                </div>
              </div>

              <button
                className="btn-outline cell-group-join-btn"
                type="button"
                onClick={() => openRegisterModal(group.area, group.leader, group.time)}
              >
                Fill Register <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="cell-groups-empty-state">
              No cell groups found for "{searchTerm}". Please try a different area.
            </div>
          )}
        </div>
      </div>

      {isRegisterModalOpen ? (
        <div
          className="cell-groups-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Cell Group Feedback Register"
          onClick={() => setIsRegisterModalOpen(false)}
        >
          <div className="glass glass-card cell-groups-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cell-groups-modal-close"
              onClick={() => setIsRegisterModalOpen(false)}
              aria-label="Close register form"
            >
              <X size={18} />
            </button>
            <h3 className="serif cell-groups-feedback-title">Cell Group Feedback Register</h3>
            <p className="cell-groups-feedback-subtitle">
              Submit weekly home cell data for admin review.
            </p>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="cell-groups-feedback-grid">
                <div className="form-group">
                  <label htmlFor="cell-group-name">Group Name</label>
                  <input
                    id="cell-group-name"
                    className="form-control"
                    placeholder="e.g. Westgate Central"
                    value={feedbackForm.groupName}
                    onChange={e => updateFeedbackForm('groupName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="group-leader">Group Leader</label>
                  <input
                    id="group-leader"
                    className="form-control"
                    value={feedbackForm.groupLeader}
                    onChange={e => updateFeedbackForm('groupLeader', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="group-attendance">Attendance</label>
                  <input
                    id="group-attendance"
                    className="form-control"
                    type="number"
                    min="0"
                    value={feedbackForm.attendance}
                    onChange={e => updateFeedbackForm('attendance', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="group-offering">Offering (USD)</label>
                  <input
                    id="group-offering"
                    className="form-control"
                    type="number"
                    min="0"
                    step="0.01"
                    value={feedbackForm.offering}
                    onChange={e => updateFeedbackForm('offering', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="group-meeting-time">Meeting Time</label>
                <input
                  id="group-meeting-time"
                  className="form-control"
                  placeholder="e.g. Tuesday 18:00"
                  value={feedbackForm.meetingTime}
                  onChange={e => updateFeedbackForm('meetingTime', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback-message">Notes (optional)</label>
                <textarea
                  id="feedback-message"
                  className="form-control"
                  rows={4}
                  value={feedbackForm.notes}
                  onChange={e => updateFeedbackForm('notes', e.target.value)}
                />
              </div>
              {turnstileSiteKey ? (
                <div className="form-group">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={token => updateFeedbackForm('captchaToken', token)}
                    onExpire={() => updateFeedbackForm('captchaToken', '')}
                  />
                </div>
              ) : null}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="cell-groups-honeypot"
                aria-hidden="true"
                value={feedbackForm.website}
                onChange={e => updateFeedbackForm('website', e.target.value)}
              />
              {feedbackError ? <p className="cell-groups-feedback-error">{feedbackError}</p> : null}
              {feedbackSuccess ? <p className="cell-groups-feedback-success">{feedbackSuccess}</p> : null}
              <button type="submit" className="btn-primary cell-groups-feedback-submit" disabled={feedbackLoading}>
                {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CellGroups;
