import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DishVoting({ userId }) {
  const [dishes, setDishes] = useState([]);
  const [voted, setVoted] = useState(null);

  useEffect(() => {
    // Assume admin-curated dishes are the approved ones
    axios.get(`${process.env.REACT_APP_API_URL}/api/suggestions`)
      .then(res => setDishes(res.data.filter(d => d.approved)));
  }, []);

  const handleVote = (dishId) => {
    // For demo: store vote in localStorage (replace with real API in production)
    localStorage.setItem(`dishVote_${userId}`, dishId);
    setVoted(dishId);
  };

  useEffect(() => {
    const storedVote = localStorage.getItem(`dishVote_${userId}`);
    if (storedVote) setVoted(Number(storedVote));
  }, [userId]);

  return (
    <div className="card">
      <h2>Vote for Next Month's Dishes</h2>
      {dishes.length === 0 ? (
        <div>No dishes available for voting.</div>
      ) : (
        <ul>
          {dishes.map(dish => (
            <li key={dish.id} style={{ marginBottom: 8 }}>
              <span>{dish.dish}</span>
              <button
                style={{
                  marginLeft: 12,
                  background: voted === dish.id ? '#4caf50' : '#2196f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 12px',
                  cursor: voted === dish.id ? 'default' : 'pointer'
                }}
                disabled={voted === dish.id}
                onClick={() => handleVote(dish.id)}
              >
                {voted === dish.id ? 'Voted' : 'Vote'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
