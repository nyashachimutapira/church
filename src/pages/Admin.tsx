import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Download, LogOut, Search, UserCheck } from "lucide-react";
import { apiRequest } from "../lib/api";
import "./Admin.css";

type Member = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  source: string;
  timestamp: string;
};

type AdminStats = {
  totalMembers: number;
  newThisWeek: number;
  monthlyGiving: number;
};

type CellGroupFeedback = {
  id: string;
  groupName: string;
  groupLeader: string;
  attendance: number;
  offering: number;
  meetingTime: string;
  notes: string;
  status: "new" | "reviewed";
  timestamp: string;
};

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [feedbackEntries, setFeedbackEntries] = useState<CellGroupFeedback[]>([]);
  const [stats, setStats] = useState<AdminStats>({ totalMembers: 0, newThisWeek: 0, monthlyGiving: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(token);

  const loadData = async (authToken: string, query = "") => {
    const [membersResponse, statsResponse, feedbackResponse] = await Promise.all([
      apiRequest<{ members: Member[] }>(`/api/admin/members?search=${encodeURIComponent(query)}`, { token: authToken }),
      apiRequest<AdminStats>("/api/admin/stats", { token: authToken }),
      apiRequest<{ feedback: CellGroupFeedback[] }>("/api/admin/cell-group-feedback", { token: authToken }),
    ]);
    setMembers(membersResponse.members);
    setStats(statsResponse);
    setFeedbackEntries(feedbackResponse.feedback);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const timeout = setTimeout(() => {
      loadData(token, search).catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Could not apply search.");
        localStorage.removeItem("adminToken");
        setToken("");
      });
    }, 250);
    return () => clearTimeout(timeout);
  }, [search, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await apiRequest<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: { email, password },
      });
      localStorage.setItem("adminToken", response.token);
      setToken(response.token);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Address", "Source", "Timestamp"];
    const rows = members.map((member) => [
      member.fullName,
      member.email,
      member.phone,
      member.address || "",
      member.source,
      member.timestamp,
    ]);
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${rows.map((row) => row.join(",")).join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ZAOGA_Members_Export.csv");
    document.body.appendChild(link);
    link.click();
  };

  const emptyMessage = useMemo(
    () => (search ? "No members found for this search." : "No members registered yet."),
    [search]
  );

  if (!isLoggedIn) {
    return (
      <div className="section hero admin-login-section">
        <div className="container admin-login-container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass glass-card">
            <h2 className="serif admin-login-title">Admin Portal</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="admin-email">Admin Email</label>
                <input
                  id="admin-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@church.org"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="admin-password">Admin Password</label>
                <input
                  id="admin-password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {error ? <p className="admin-error">{error}</p> : null}
              <button type="submit" className="btn-primary admin-login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section admin-page">
      <div className="container">
        <div className="admin-header">
          <h2 className="serif admin-dashboard-title">Leadership Dashboard</h2>
          <div className="admin-actions">
            <button onClick={exportCSV} className="btn-outline admin-action-btn" type="button">
              <Download size={18} /> Export CSV
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                setToken("");
                setMembers([]);
                setFeedbackEntries([]);
              }}
              className="btn-primary admin-logout-btn"
              type="button"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="admin-stats-grid">
          <div className="glass glass-card admin-stat-card">
            <div className="admin-stat-icon admin-gold-icon-bg">
              <Users size={30} className="admin-gold-icon" />
            </div>
            <div>
              <p className="admin-stat-label">Total Members</p>
              <h3 className="admin-stat-value">{stats.totalMembers}</h3>
            </div>
          </div>
          <div className="glass glass-card admin-stat-card">
            <div className="admin-stat-icon admin-green-icon-bg">
              <DollarSign size={30} className="admin-green-icon" />
            </div>
            <div>
              <p className="admin-stat-label">Monthly Giving</p>
              <h3 className="admin-stat-value">${stats.monthlyGiving.toLocaleString()}</h3>
            </div>
          </div>
          <div className="glass glass-card admin-stat-card">
            <div className="admin-stat-icon admin-blue-icon-bg">
              <UserCheck size={30} className="admin-blue-icon" />
            </div>
            <div>
              <p className="admin-stat-label">New This Week</p>
              <h3 className="admin-stat-value">{stats.newThisWeek}</h3>
            </div>
          </div>
        </div>

        <div className="glass glass-card admin-table-card">
          <div className="admin-table-header">
            <h4 className="serif">Registered Members</h4>
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search members..."
                className="form-control admin-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search members"
              />
            </div>
          </div>
          {error ? <p className="admin-error admin-data-error">{error}</p> : null}
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Source</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="admin-empty-state">{emptyMessage}</td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.fullName}</td>
                      <td className="admin-muted">{member.email}</td>
                      <td>{member.phone}</td>
                      <td>
                        <span className="admin-source-pill">{member.source}</span>
                      </td>
                      <td className="admin-muted">{new Date(member.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass glass-card admin-table-card admin-feedback-card">
          <div className="admin-table-header">
            <h4 className="serif">Cell Group Feedback</h4>
          </div>
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Group Leader</th>
                  <th>Attendance</th>
                  <th>Offering</th>
                  <th>Time</th>
                  <th>Notes</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbackEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="admin-empty-state">No cell group feedback submitted yet.</td>
                  </tr>
                ) : (
                  feedbackEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.groupName}</td>
                      <td>{entry.groupLeader}</td>
                      <td>{entry.attendance}</td>
                      <td>${Number(entry.offering).toLocaleString()}</td>
                      <td className="admin-muted">{entry.meetingTime}</td>
                      <td className="admin-muted">{entry.notes || "-"}</td>
                      <td className="admin-muted">{new Date(entry.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
