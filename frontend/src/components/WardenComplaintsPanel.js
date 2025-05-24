import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WardenComplaintsPanel() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume /api/complaints returns all complaints
    axios.get('http://localhost:5000/api/complaints')
      .then(res => setComplaints(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleResolve = async (id) => {
    await axios.post('http://localhost:5000/api/complaints/resolve', { id });
    const res = await axios.get('http://localhost:5000/api/complaints');
    setComplaints(res.data);
  };

  return (
    <div className="card">
      <h2>Complaints Moderation</h2>
      {loading ? <div>Loading...</div> : (
        complaints.length === 0 ? <div>No complaints.</div> : (
          <ul>
            {complaints.map(complaint => (
              <li key={complaint.id} style={{ marginBottom: 10 }}>
                <div>
                  <span>{complaint.message}</span>
                  <span style={{ color: '#888', marginLeft: 8, fontSize: '0.95em' }}>
                    ({new Date(complaint.created_at).toLocaleDateString()})
                  </span>
                  {complaint.resolved
                    ? <span style={{ color: '#4caf50', marginLeft: 8 }}>Resolved</span>
                    : (
                      <button
                        style={{
                          marginLeft: 12,
                          background: '#4caf50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleResolve(complaint.id)}
                      >
                        Mark Resolved
                      </button>
                    )}
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
