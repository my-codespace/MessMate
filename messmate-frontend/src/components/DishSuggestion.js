import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DishSuggestion({ userId }) {
  const [dish, setDish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/suggestions')
      .then(res => {
        const mySuggestions = res.data.filter(s => s.user_id === userId);
        // Find the latest suggestion by this user
        if (mySuggestions.length > 0) {
          setLastSuggestion(mySuggestions[0]);
          setSubmitted(true);
        }
      });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/suggestions', { user_id: userId, dish });
    setSubmitted(true);
    setLastSuggestion({ dish });
  };

  return (
    <div className="card">
      <h2>Suggest a Dish</h2>
      {submitted ? (
        <div>
          <div style={{ color: "#4caf50" }}>Thank you for your suggestion!</div>
          <div>Your last suggestion: <strong>{lastSuggestion?.dish}</strong></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your dish suggestion"
            value={dish}
            onChange={e => setDish(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Submit Suggestion</button>
        </form>
      )}
    </div>
  );
}
