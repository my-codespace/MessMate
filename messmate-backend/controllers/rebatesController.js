const db = require('../db');

exports.applyRebate = (req, res) => {
  console.log('Received rebate POST:', req.body);
  const { user_id, from_date, to_date } = req.body;
  if (!user_id || !from_date || !to_date) return res.status(400).json({ error: 'All fields required' });
  db.run(
    'INSERT INTO rebates (user_id, from_date, to_date) VALUES (?, ?, ?)',
    [user_id, from_date, to_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

exports.getRebates = (req, res) => {
  db.all('SELECT * FROM rebates ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.updateRebateStatus = (req, res) => {
  const { id, status } = req.body;
  db.run('UPDATE rebates SET status = ? WHERE id = ?', [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};
