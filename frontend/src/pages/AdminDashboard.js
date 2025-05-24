import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminMenuPanel from '../components/AdminMenuPanel';
import AdminNoticePanel from '../components/AdminNoticePanel';
import AdminAnalyticsPanel from '../components/AdminAnalyticsPanel';
import AdminInventoryPanel from '../components/AdminInventoryPanel';
import AdminSuggestionsPanel from '../components/AdminSuggestionsPanel';
import AdminRebatePanel from '../components/AdminRebatePanel';
import AdminBillPanel from '../components/AdminBillPanel';
import AISuggestionsPanel from '../components/AISuggestionsPanel';


export default function AdminDashboard() {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.classList.add('faded-bg');
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="dashboard-root">
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      <h1>Welcome, {user.username} (Admin)!</h1>
      <div className="dashboard-grid">
        <AdminMenuPanel />
        <AdminNoticePanel />
        <AdminAnalyticsPanel />
        <AdminInventoryPanel />
        <AdminSuggestionsPanel />
        <AdminRebatePanel />
        <AdminBillPanel />
        <AISuggestionsPanel />
      </div>
    </div>
  );
}
