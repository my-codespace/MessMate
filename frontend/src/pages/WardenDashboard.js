import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import WardenAnalyticsPanel from '../components/WardenAnalyticsPanel';
import WardenMenuApprovalPanel from '../components/WardenMenuApprovalPanel';
import WardenFeedbackPanel from '../components/WardenFeedbackPanel';
import WardenComplaintsPanel from '../components/WardenComplaintsPanel';
import AISuggestionsPanel from '../components/AISuggestionsPanel';

export default function WardenDashboard() {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.classList.add('faded-bg');
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="dashboard-root">
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      <h1>Welcome, {user.username} (Warden)!</h1>
      <div className="dashboard-grid">
        <WardenAnalyticsPanel />
        <WardenMenuApprovalPanel />
        <WardenFeedbackPanel />
        <WardenComplaintsPanel />
        <AISuggestionsPanel />
        
      </div>
    </div>
  );
}
