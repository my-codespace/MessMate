import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AISuggestionsPanel() {
  const [suggestions, setSuggestions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ai/menu-suggestions')
      .then(res => {
        setSuggestions(res.data.suggestions || []);
        setFeedbacks(res.data.topFeedbacks || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading AI suggestions...</div>;

  return (
    <div className="card">
      <h2>Menu Suggestions</h2>
      <ul>
        {suggestions.map(s => (
          <li key={s.meal}>
            <strong>{s.meal.charAt(0).toUpperCase() + s.meal.slice(1)}:</strong> Avg Rating {Number(s.avg_rating).toFixed(2)}
          </li>
        ))}
      </ul>
      <h4 style={{ marginTop: 12 }}>Top Feedbacks</h4>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}>
            <strong>{f.meal.charAt(0).toUpperCase() + f.meal.slice(1)}</strong> ({f.rating}★): {f.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}
