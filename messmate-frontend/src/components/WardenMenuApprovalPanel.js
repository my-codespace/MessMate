import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WardenMenuApprovalPanel() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume /api/menu/all returns all proposed menus (latest first)
    axios.get(`${process.env.REACT_APP_API_URL}/api/menu/all`)
      .then(res => setMenus(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/menu/approve`, { id });
    // Refresh list after approval
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/menu/all`);
    setMenus(res.data);
  };

  return (
    <div className="card">
      <h2>Monthly Menu Approval</h2>
      {loading ? <div>Loading...</div> : (
        menus.length === 0 ? <div>No menus to approve.</div> : (
          <ul>
            {menus.map(menu => (
              <li key={menu.id} style={{ marginBottom: 12 }}>
                <div>
                  <strong>Proposed Menu (by Admin):</strong>
                  <div>Breakfast: {menu.breakfast}</div>
                  <div>Lunch: {menu.lunch}</div>
                  <div>Dinner: {menu.dinner}</div>
                  <div style={{ fontSize: '0.95em', color: '#888' }}>
                    {new Date(menu.created_at).toLocaleDateString()}
                  </div>
                  {menu.approved
                    ? <span style={{ color: '#4caf50', fontWeight: 600 }}>Approved</span>
                    : (
                      <button
                        style={{
                          marginTop: 8,
                          background: '#4caf50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleApprove(menu.id)}
                      >
                        Approve
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
