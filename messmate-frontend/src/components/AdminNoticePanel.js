import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminNoticePanel() {
  const [message, setMessage] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notices`);
    setNotices(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await axios.post(`${process.env.REACT_APP_API_URL}/api/notices`, { message });
    setMessage('');
    fetchNotices();
  };

  return (
    <div className="card">
      <h2>Post a Notice/Update</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 18 }}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your notice here..."
          rows={3}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            fontSize: '1rem',
            marginBottom: 12
          }}
        />
        <button type="submit" className="submit-btn">Post Notice</button>
      </form>
      <h3>All Notices</h3>
      {loading ? <div>Loading...</div> : (
        <ul className="notices-list">
          {notices.map(notice => (
            <li key={notice.id} className="notice-item">
              <div className="notice-message">{notice.message}</div>
              <div className="notice-date">
                {new Date(notice.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
