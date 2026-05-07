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
    {
      area: 'Charity Brooke',
      location: '6128 Westlea',
      leader: 'Sister Linda',
      phone: '+263 771 111 222',
      time: 'Wednesday 19:00',
      members: [
        'Eld Mr and Mrs Chimutapira',
        'Mrs Hunda',
        'Str Nokutenda',
        'Mrs Madzika',
        'Mrs Hungwe',
        'Str Kiki',
        'Mrs Kamvura'
      ]
    },
    {
      area: 'Ebeneza',
      location: '6182 Westlea',
      leader: 'Elder Mumbiro',
      phone: '+263 772 333 444',
      time: 'Wednesday 19:00',
      members: [
        'Mrs Kanyongo',
        'Mrs Chiwara',
        'Sr Rutendo',
        'St Lynnette',
        'Br Vanie Mumbiro (C.E)'
      ]
    },
    {
      area: 'Joy',
      location: '6394 Westlea',
      leader: 'Mrs Sibanda',
      phone: '+263 719 555 666',
      time: 'Wednesday 19:00',
      members: [
        'Elder Chipandu',
        'Mr and Mrs Sibanda',
        'Sister Faith',
        'Sister Gladys',
        'Micky Sibanda (C.E.)'
      ]
    },
    {
      area: 'Group 3',
      location: '6344 Westlea',
      leader: 'Elder Gwini',
      phone: '+263 776589293',
      time: 'Wedensday 19:00',
      members: [
        'En Gwini',
        'M. D Timbe',
        'T Timbe',
        'Mai Takavarasha',
        'R Takavarasha',
        'Mai Zvenyika',
        'Baba Paradza',
        'N Paradza'
      ]
    },
    {
      area: 'Group 4',
      location: '6391 Westlea',
      leader: 'R Salatiele',
      phone: '+263 782516587',
      time: 'Wednesday 19:00',
      members: [
        'M Takavingofa',
        'L Nyandoro',
        'T Nyandoro',
        'Br Andrew'
      ]
    },
    {
      area: 'Group 5',
      location: '6327 Westlea',
      leader: 'R Tsanga',
      phone: '+263 776950590',
      time: 'Wednesday 19:00',
      members: [
        'M MVURA',
        'Mai Chikakayi',
        'Baba Chikakayi'
      ]
    },
    {
      area: 'Group 1',
      location: '6424 Westlea',
      leader: 'Elder Mkadhla',
      phone: '+263 775898306',
      time: 'Wednesday 19:00',
      members: [
        'M Mkandla',
        'T Njavha',
        'M Njavha',
        'R Mushonga',
        'D Mushonga'
      ]
    },
    {
      area: 'Group 2',
      location: '6444 Westlea',
      leader: 'Elder P Karikoga',
      phone: '+263 775618418',
      time: 'Wednesday 19:00',
      members: [
        'T Karikoga',
        'C Mushonga',
        'E Antonio',
        'L Antonio',
        'H Mushonga'
      ]
    },
    {
      area: 'Kaizen',
      location: '6228 Westlea',
      leader: 'L Matizanadzo',
      phone: '+263772958167',
      time: 'Wednesday 19:00',
      members: [
        'Le Matizanadzo',
        'C Matizanadzo',
        'P Makuvatsine',
        'F Makuvatsine',
        'Mai Goromonzi',
        'Mai Magura',
        'Br Ronnie'
      ]
    },
    {
      area: 'Group 7',
      leader: 'C Momberume',
      phone: '=263 779689698',
      time: 'Wednesday 19:00',
      members: [
        'J Momberume',
        'Baba Chakawa',
        'Mai Chakawa',
        'Mai Ossie',
        'Sis Polite Jacob'
      ]
    },
    {
      area: 'Group 8',
      location: '10069 Westlea',
      leader: 'Mai Manyeruke',
      phone: '+263 775497428',
      time: 'Wednesday 19:00',
      members: [
        'Mai Chikada',
        'Baba Madondo',
        'Mai Madondo',
        'Lo Manyeruke'
      ]
    },
    {
      area: 'Group 9',
      leader: 'S Shamhu',
      phone: '+263 773 799 701',
      time: 'Wednesday 19:00',
      members: [
        'Mai Karuma',
        'Baba Monday',
        'Mai Monday'
      ]
    },
    {
      area: 'Elishadai',
      leader: 'Mai Chimhete',
      phone: '0772648080',
      time: 'Wednesday 19:00',
      members: [
        'Charle family',
        'Museva family',
        'Machona family'
      ]
    },
    {
      area: 'Group',
      leader: 'Mai Kabara',
      phone: '0774350548',
      time: 'Wednesday 19:00',
      members: [
        'Muunde family',
        'Dube family',
        'Hlabiso family',
        'Munyuki family',
        'Dube 2 family',
        'Sami family'
      ]
    },
    {
      area: 'Group',
      leader: 'Mai Mandaza',
      phone: '0773761696',
      time: 'Wednesday 19:00',
      members: [
        'Gwezere family',
        'Makava family',
        'Siste Mupfundirwa',
        'Dimbi family',
        'Afiki family'
      ]
    },
    {
      area: 'Group',
      leader: 'Jena family',
      phone: '+263783219673',
      time: 'Wednesday 19:00',
      members: [
        'Chimusasa',
        'Matiyenga family'
      ]
    },
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
                  {group.location && <span className="cell-group-location-text">{group.location}</span>}
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
                {group.members && (
                  <div className="cell-group-members-list" style={{ marginTop: '10px', fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Members:</div>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
                      {group.members.map((member, i) => (
                        <li key={i}>{member}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
