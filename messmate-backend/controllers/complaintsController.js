const db = require('../db');

// Get all complaints (for warden)
exports.getComplaints = (req, res) => {
  db.all('SELECT * FROM complaints ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Submit a new complaint (student)
exports.submitComplaint = (req, res) => {
  const { user_id, message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  db.run(
    'INSERT INTO complaints (user_id, message) VALUES (?, ?)',
    [user_id || null, message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

// Mark complaint as resolved
exports.resolveComplaint = (req, res) => {
  const { id } = req.body;
  db.run('UPDATE complaints SET resolved = 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};
