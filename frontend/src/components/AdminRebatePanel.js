import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminRebatePanel() {
  const [rebates, setRebates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRebates = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/rebates');
    setRebates(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRebates();
  }, []);

  const handleStatus = async (id, status) => {
    await axios.post('http://localhost:5000/api/rebates/status', { id, status });
    fetchRebates();
  };

  return (
    <div className="card">
      <h2>Rebate Requests</h2>
      {loading ? <div>Loading...</div> : (
        <ul>
          {rebates.map(reb => (
            <li key={reb.id} style={{ marginBottom: 10 }}>
              User #{reb.user_id}: {reb.from_date} → {reb.to_date} &nbsp;
              <span style={{ color: reb.status === 'approved' ? '#7fffd4' : reb.status === 'rejected' ? '#ff6b6b' : '#fff' }}>
                ({reb.status})
              </span>
              {reb.status === 'pending' && (
                <>
                  <button
                    style={{
                      marginLeft: 8,
                      background: '#7fffd4',
                      color: '#1a1a40',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleStatus(reb.id, 'approved')}
                  >Approve</button>
                  <button
                    style={{
                      marginLeft: 6,
                      background: '#ff6b6b',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleStatus(reb.id, 'rejected')}
                  >Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
