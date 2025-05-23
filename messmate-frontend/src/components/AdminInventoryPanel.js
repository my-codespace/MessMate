import React, { useState, useEffect } from 'react';
import axios from 'axios';

// For demo: let's assume inventory API endpoints exist
export default function AdminInventoryPanel() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [qty, setQty] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/inventory');
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/inventory', { item, qty });
    setItem('');
    setQty('');
    fetchInventory();
  };

  return (
    <div className="card">
      <h2>Inventory Management</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={e => setItem(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={e => setQty(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Add Item</button>
      </form>
      <h3>Current Inventory</h3>
      {loading ? <div>Loading...</div> : (
        <ul>
          {items.map((inv, idx) => (
            <li key={idx}>{inv.item} — {inv.qty}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
