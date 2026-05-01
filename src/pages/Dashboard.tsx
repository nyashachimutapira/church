import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Heart, CreditCard, Activity } from "lucide-react";
import { apiRequest } from "../lib/api";
import "./Dashboard.css";

type MemberData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  interests: string[];
  createdAt: string;
};

type DonationData = {
  _id: string;
  amount: number;
  category: string;
  providerStatus: string;
  createdAt: string;
  reference: string;
};

const Dashboard: React.FC = () => {
  const [member, setMember] = useState<MemberData | null>(null);
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("memberToken");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await apiRequest<{ member: MemberData; donations: DonationData[] }>("/api/member/dashboard", {
          token: token
        });
        setMember(response.member);
        setDonations(response.donations);
      } catch (err) {
        setError("Failed to load dashboard. Please log in again.");
        localStorage.removeItem("memberToken");
        localStorage.removeItem("memberEmail");
        localStorage.removeItem("memberName");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("memberToken");
    localStorage.removeItem("memberEmail");
    localStorage.removeItem("memberName");
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  if (error || !member) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <a href="/login" className="btn-primary">Return to Login</a>
      </div>
    );
  }

  return (
    <div className="section dashboard-page">
      <div className="container dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2 className="serif dashboard-title">Welcome back, {member.fullName.split(" ")[0]}!</h2>
            <p className="dashboard-subtitle">Manage your profile and view your giving history.</p>
          </div>
          <button onClick={handleLogout} className="dashboard-logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="dashboard-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass dashboard-card profile-card">
            <h3 className="card-title"><User size={18} /> My Profile</h3>
            <div className="profile-details">
              <p><strong>Name:</strong> {member.fullName}</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Address:</strong> {member.address || "Not provided"}</p>
              <p><strong>Joined:</strong> {new Date(member.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="profile-interests">
              <h4><Heart size={16} /> Areas of Interest</h4>
              {member.interests && member.interests.length > 0 ? (
                <div className="interests-tags">
                  {member.interests.map((interest, idx) => (
                    <span key={idx} className="interest-tag">{interest}</span>
                  ))}
                </div>
              ) : (
                <p className="no-data">No interests selected.</p>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass dashboard-card giving-card">
            <h3 className="card-title"><CreditCard size={18} /> Giving History</h3>
            {donations && donations.length > 0 ? (
              <div className="table-responsive">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation._id}>
                        <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                        <td className="capitalize">{donation.category}</td>
                        <td>${donation.amount.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${donation.providerStatus}`}>
                            {donation.providerStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <Activity size={32} className="empty-icon" />
                <p>You haven't made any online donations yet.</p>
                <a href="/give" className="btn-primary mt-3">Give Now</a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
