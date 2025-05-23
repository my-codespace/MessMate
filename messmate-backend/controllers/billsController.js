const db = require('../db');

exports.createBill = (req, res) => {
  const { user_id, month, amount } = req.body;
  if (!user_id || !month || !amount) return res.status(400).json({ error: 'All fields required' });
  db.run(
    'INSERT INTO bills (user_id, month, amount) VALUES (?, ?, ?)',
    [user_id, month, amount],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

exports.getBills = (req, res) => {
  db.all('SELECT * FROM bills ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.payBill = (req, res) => {
  const { id } = req.body;
  db.run('UPDATE bills SET paid = 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};
