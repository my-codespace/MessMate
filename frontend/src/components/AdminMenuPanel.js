import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMenuPanel() {
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [menu, setMenu] = useState({ breakfast: '', lunch: '', dinner: '' });
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/menu/today');
    setMenu(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/menu', {
      breakfast,
      lunch,
      dinner,
    });
    setBreakfast('');
    setLunch('');
    setDinner('');
    fetchMenu();
  };

  return (
    <div className="card">
      <h2>Update Today's Menu</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 18 }}>
        <input
          type="text"
          value={breakfast}
          onChange={e => setBreakfast(e.target.value)}
          placeholder="Breakfast"
          required
        />
        <input
          type="text"
          value={lunch}
          onChange={e => setLunch(e.target.value)}
          placeholder="Lunch"
          required
        />
        <input
          type="text"
          value={dinner}
          onChange={e => setDinner(e.target.value)}
          placeholder="Dinner"
          required
        />
        <button type="submit" className="submit-btn">Post/Update Menu</button>
      </form>
      <h3>Current Menu</h3>
      {loading ? <div>Loading...</div> : (
        <div className="menu-box">
          <strong>Breakfast:</strong> {menu.breakfast || 'Not set'}<br />
          <strong>Lunch:</strong> {menu.lunch || 'Not set'}<br />
          <strong>Dinner:</strong> {menu.dinner || 'Not set'}
        </div>
      )}
    </div>
  );
}
