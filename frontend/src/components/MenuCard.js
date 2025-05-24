import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MenuCard() {
  const [menu, setMenu] = useState({ breakfast: '', lunch: '', dinner: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/today')
      .then(res => setMenu(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading menu...</div>;

  return (
    <div className="card">
      <h2>Today's Menu</h2>
      <div><strong>Breakfast:</strong> {menu.breakfast || 'Not set'}</div>
      <div><strong>Lunch:</strong> {menu.lunch || 'Not set'}</div>
      <div><strong>Dinner:</strong> {menu.dinner || 'Not set'}</div>
    </div>
  );
}
