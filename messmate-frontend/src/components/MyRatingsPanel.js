import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyRatingsPanel({ userId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ratings')
      .then(res => {
        // Show only ratings by this user (if userId is provided)
        setRatings(userId ? res.data.filter(r => r.user_id === userId) : res.data);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="card">
      <h2>My Previous Ratings</h2>
      {loading ? <div>Loading...</div> : (
        ratings.length === 0 ? <div>No ratings yet.</div> : (
          <ul>
            {ratings.map(rating => (
              <li key={rating.id} style={{ marginBottom: 8 }}>
                <strong>{rating.meal.charAt(0).toUpperCase() + rating.meal.slice(1)}</strong>: {rating.rating} ★
                {rating.feedback && <span> — {rating.feedback}</span>}
                <span style={{ color: '#888', marginLeft: 6, fontSize: '0.95em' }}>
                  ({new Date(rating.created_at).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
