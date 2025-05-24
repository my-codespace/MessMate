import React, { useState } from 'react';
import axios from 'axios';

export default function RatingStars({ meal }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/ratings`, {
      meal,
      rating,
      feedback,
      anonymous,
    });
    setSubmitted(true);
  };

  if (submitted) return <div style={{ marginTop: 16, color: '#4caf50' }}>Thank you for rating {meal}!</div>;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h3 style={{ marginBottom: 10 }}>
        {meal.charAt(0).toUpperCase() + meal.slice(1)}
      </h3>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="Comment (optional)"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        className="feedback-input"
      />
      <div className="anon-row">
        <label className="anon-label">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={e => setAnonymous(e.target.checked)}
          />
          Submit anonymously
        </label>
        <button type="submit" className="submit-btn">
          Submit Rating
        </button>
      </div>
    </form>
  );
}
