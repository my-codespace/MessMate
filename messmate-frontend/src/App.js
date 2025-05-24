import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WardenDashboard from './pages/WardenDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize socket outside component to avoid multiple connections
const socket = io(`${process.env.REACT_APP_API_URL}`); // Change to your backend URL in production

function App() {
  useEffect(() => {
    // Listen for menu notifications
    socket.on('menu-notification', (menu) => {
      toast.info(
        <>
          <strong>Menu Updated!</strong><br />
          Breakfast: {menu.breakfast}<br />
          Lunch: {menu.lunch}<br />
          Dinner: {menu.dinner}
        </>,
        {
          position: "top-right",
          autoClose: 5000
        }
      );
    });

    // Listen for notice notifications
    socket.on('notice-notification', (notice) => {
      toast.info(
        <>
          <strong>New Notice:</strong> {notice.message}
        </>,
        {
          position: "top-right",
          autoClose: 5000
        }
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off('menu-notification');
      socket.off('notice-notification');
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/warden/*" element={<WardenDashboard />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'student') return <Navigate to="/student" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;
  if (user.role === 'warden') return <Navigate to="/warden" />;
  return <Navigate to="/login" />;
}

export default App;
