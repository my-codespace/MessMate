import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BillPanel({ userId }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/bills`)
      .then(res => setBills(res.data.filter(b => b.user_id === userId)))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="card">
      <h2>My Mess Bills</h2>
      {loading ? <div>Loading...</div> : (
        bills.length === 0 ? <div>No bills yet.</div> : (
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.id}>
                  <td>{bill.month}</td>
                  <td>₹{bill.amount}</td>
                  <td style={{ color: bill.paid ? '#4caf50' : '#e53935' }}>
                    {bill.paid ? 'Paid' : 'Unpaid'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
