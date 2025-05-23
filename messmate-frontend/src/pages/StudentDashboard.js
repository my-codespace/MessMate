import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import NoticeList from '../components/NoticeList';
import RatingStars from '../components/RatingStars';
import DishSuggestion from '../components/DishSuggestion';
import DishVoting from '../components/DishVoting';
import RebatePanel from '../components/RebatePanel';
import BillPanel from '../components/BillPanel';
import MyRatingsPanel from '../components/MyRatingsPanel';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    document.body.classList.add('faded-bg');
  }, []);

  if (!user) return <Navigate to="/login" />;
  console.log('StudentDashboard user:', user);

  return (
    <div className="dashboard-root">
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      <h1>Welcome, {user.username} (Student)!</h1>
      <div className="dashboard-grid">
        <MenuCard />
        <NoticeList />
        <div className="card">
          <h2>Rate a Meal</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
            <button className="meal-btn" onClick={() => setSelectedMeal('breakfast')}>Breakfast</button>
            <button className="meal-btn" onClick={() => setSelectedMeal('lunch')}>Lunch</button>
            <button className="meal-btn" onClick={() => setSelectedMeal('dinner')}>Dinner</button>
          </div>
          {selectedMeal && (
            <RatingStars meal={selectedMeal} />
          )}
        </div>
        <MyRatingsPanel userId={user.id} />
        <DishSuggestion userId={user.id} />
        <DishVoting userId={user.id} />
        <RebatePanel userId={user.id} />
        <BillPanel userId={user.id} />
      </div>
    </div>
  );
}
