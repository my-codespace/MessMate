import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RebatePanel({ userId }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [rebates, setRebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRebates() {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rebates`);
      setRebates(res.data.filter(r => r.user_id === userId));
      setLoading(false);
    }
    fetchRebates();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/rebates`, {
      user_id: userId,
      from_date: fromDate,
      to_date: toDate
    });
    setFromDate('');
    setToDate('');
    // Fetch rebates again after submitting
    async function fetchRebates() {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rebates`);
      setRebates(res.data.filter(r => r.user_id === userId));
      setLoading(false);
    }
    fetchRebates();
  };

  return (
    <div className="card">
      <h2>Mess Rebate Application</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Apply for Rebate</button>
      </form>
      <h3>My Rebate Requests</h3>
      {loading ? <div>Loading...</div> : (
        <ul>
          {rebates.map(r => (
            <li key={r.id}>
              {r.from_date} to {r.to_date} — <span style={{
                color: r.status === 'approved' ? '#4caf50' : r.status === 'rejected' ? '#e53935' : '#888'
              }}>{r.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
