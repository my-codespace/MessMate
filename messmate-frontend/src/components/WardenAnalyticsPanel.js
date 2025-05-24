import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WardenAnalyticsPanel() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/ratings`)
      .then(res => setRatings(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Calculate overall and per-meal averages
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const averages = mealTypes.map(meal => {
    const mealRatings = ratings.filter(r => r.meal === meal);
    const avg = mealRatings.length
      ? (mealRatings.reduce((sum, r) => sum + r.rating, 0) / mealRatings.length).toFixed(2)
      : 'N/A';
    return { meal, avg, count: mealRatings.length };
  });

  const overallAvg = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
    : 'N/A';

  return (
    <div className="card">
      <h2>Mess Analytics</h2>
      {loading ? <div>Loading...</div> : (
        <>
          <div style={{ marginBottom: 10 }}>
            <strong>Overall Average Rating:</strong> {overallAvg}
          </div>
          <table>
            <thead>
              <tr>
                <th>Meal</th>
                <th>Average</th>
                <th>Total Ratings</th>
              </tr>
            </thead>
            <tbody>
              {averages.map(({ meal, avg, count }) => (
                <tr key={meal}>
                  <td style={{ textTransform: 'capitalize' }}>{meal}</td>
                  <td>{avg}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
