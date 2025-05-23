import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminSuggestionsPanel() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/suggestions');
    setSuggestions(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleApprove = async (id) => {
    await axios.post('http://localhost:5000/api/suggestions/approve', { id });
    fetchSuggestions();
  };

  return (
    <div className="card">
      <h2>Dish Suggestions</h2>
      {loading ? <div>Loading...</div> : (
        <ul>
          {suggestions.map(sug => (
            <li key={sug.id} style={{ marginBottom: 10 }}>
              {sug.dish} {sug.approved ? <span style={{ color: '#7fffd4' }}>(Approved)</span> : (
                <button
                  style={{
                    marginLeft: 12,
                    background: '#00ffff',
                    color: '#1a1a40',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleApprove(sug.id)}
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
