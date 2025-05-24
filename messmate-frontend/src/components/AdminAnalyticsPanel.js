import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

export default function AdminAnalyticsPanel() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/analytics/ratings`)
      .then(res => setAnalytics(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading analytics...</div>;
  if (!analytics) return <div className="card">No analytics data.</div>;

  const mealData = Object.entries(analytics.perMeal).map(([meal, data]) => ({
    meal,
    avg: data.avg ? Number(data.avg) : 0,
    count: data.count
  }));

  return (
    <div className="card">
      <h2>Ratings Analytics</h2>
      <div style={{ marginBottom: 10 }}>
        <strong>Overall Average:</strong> {analytics.overall.avg || 'N/A'}<br />
        <strong>Total Ratings:</strong> {analytics.overall.count}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={mealData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="meal" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg" fill="#4caf50" name="Avg Rating" />
          <Bar dataKey="count" fill="#2196f3" name="Total Ratings" />
        </BarChart>
      </ResponsiveContainer>
      <h3 style={{ marginTop: 20 }}>Ratings Trend (Avg per Day)</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={analytics.timeline}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="avg" stroke="#ff9800" name="Avg Rating" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
