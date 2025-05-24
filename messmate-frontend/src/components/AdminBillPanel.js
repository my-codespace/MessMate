import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminBillPanel() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bills`);
    setBills(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handlePay = async (id) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/bills/pay`, { id });
    fetchBills();
  };

  return (
    <div className="card">
      <h2>Mess Bills</h2>
      {loading ? <div>Loading...</div> : (
        <table style={{ width: '100%', color: '#cce7ff', marginTop: 12 }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id}>
                <td>{bill.user_id}</td>
                <td>{bill.month}</td>
                <td>₹{bill.amount}</td>
                <td>{bill.paid ? 'Paid' : 'Unpaid'}</td>
                <td>
                  {!bill.paid && (
                    <button
                      style={{
                        background: '#00ffff',
                        color: '#1a1a40',
                        border: 'none',
                        borderRadius: 6,
                        padding: '4px 10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePay(bill.id)}
                    >Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
