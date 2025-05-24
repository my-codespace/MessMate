import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WardenFeedbackPanel() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/ratings`)
      .then(res => setRatings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Student Feedback</h2>
      {loading ? <div>Loading...</div> : (
        ratings.length === 0 ? <div>No feedback yet.</div> : (
          <ul>
            {ratings.filter(r => r.feedback).map(rating => (
              <li key={rating.id} style={{ marginBottom: 10 }}>
                <strong>{rating.meal.charAt(0).toUpperCase() + rating.meal.slice(1)}</strong>:
                <span> {rating.feedback} </span>
                <span style={{ color: '#888', fontSize: '0.95em' }}>
                  ({new Date(rating.created_at).toLocaleDateString()})
                </span>
                {rating.anonymous ? <span style={{ color: '#2196f3', marginLeft: 8 }}>[Anonymous]</span> : ''}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
