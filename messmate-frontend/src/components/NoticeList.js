import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/notices`)
      .then(res => setNotices(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading notices...</div>;

  return (
    <div className="card">
      <h2>Latest Notices</h2>
      {notices.length === 0 ? (
        <div>No notices yet.</div>
      ) : (
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
